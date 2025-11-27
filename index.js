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

import { connectDb } from './Database/db.js';

dotenv.config()

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json())
// app.use(expressValidator)

app.use('/', posts);

connectDb()

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


