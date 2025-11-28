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

dotenv.config()

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json())

app.use(rateLimiter)
// app.use(expressValidator)

app.use('/post', posts);
app.use('/user', userRoutes);
app.use('/dashboard', dashboardRoutes);

connectDb().then(
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
})

)



