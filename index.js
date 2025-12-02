import express from 'express';
import posts from './routes/post.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import userRoutes from './routes/user.js'

import { connectDb } from './Database/db.js';
import rateLimiter from './middlewares/rateLimiter.js';
import dashboardRoutes from './routes/dashboard.js'
import { initRedisClient } from './controllers/redis.js';
import helmet from 'helmet';

import rateLimit from 'express-rate-limit';

dotenv.config()

const app = express();
const port = process.env.PORT;

const limiter = rateLimit({
  windowMs: 1000*60,
  max: 5,
  message: "Too many requests from this IP, please try again later"

})

app.use(bodyParser.json())

app.use(rateLimiter)
app.use(helmet())
// app.use(limiter)

app.use('/post', posts);
app.use('/user', userRoutes);
app.use('/dashboard', dashboardRoutes);

// connectDb().then(
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// })
// )


let server;

await initRedisClient();

connectDb().then(() => {
  server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('Failed to connect to DB', err);
  process.exit(1); 
});


const gracefulShutdown = async (signal) => {
  console.log(`\nReceived ${signal}. Closing resources...`);

  try {
    if (server) {
      server.close(() => {
        console.log('HTTP server closed');
      });
    }

    await mongoose.connection.close();
    console.log('MongoDB connection closed');

    console.log('Shutdown complete. Exiting process.');
    process.exit(0);

  } catch (err) {
    console.error('Error during shutdown', err);
    process.exit(1);
  }
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  

