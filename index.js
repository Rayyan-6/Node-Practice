// const express = require('express');
// const posts = require('./routes/post.js');
// const dotenv = require('dotenv')
// const mongoose = require('mongoose')
import express from 'express';
import posts from './routes/post.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import userRoutes from './routes/user.js'

import { connectDb } from './Database/db.js';
import rateLimiter from './middlewares/rateLimiter.js';

dotenv.config()

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json())

app.use(rateLimiter)
// app.use(expressValidator)

app.use('/', posts);
app.use('/user',userRoutes)

connectDb()

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


