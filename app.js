import dotenv from 'dotenv'; 
dotenv.config();

import express from 'express';
import { connectDB} from './config/connectdb.js';
import router  from './routes/web.js';
import path from 'path';
import session from 'express-session'; 
import flash from 'connect-flash'; 


const app = express();

// Session middleware
app.use(session({
  secret: process.env.SECRET_KEY, 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
})); 

// Flash middleware
app.use(flash());

// Make flash messages available to all views
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success');
    res.locals.error_msg = req.flash('error');
    next();
});

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'views'));

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/', router);

// 404 Error
app.use((req, res, next) => {
    req.flash('error', 'Page not found');
    res.status(404).render('error', { error: null, title: '404 Not Found' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  req.flash('error', 'Something went wrong. Please try again.');
  res.status(500).render('error', {
      error: process.env.NODE_ENV === 'development' ? err : null,
      title: 'Error'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});