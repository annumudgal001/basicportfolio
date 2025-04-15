import dotenv from 'dotenv';
import express from 'express';
import webRouter from './routes/web.js';
import mongoose from 'mongoose';
import connectDB from './config/connectdb.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enhanced middleware stack
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

connectDB();


// Route handling
app.use('/', webRouter); 

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); 
  res.status(500).render('error', { title: 'Error' });
});

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});