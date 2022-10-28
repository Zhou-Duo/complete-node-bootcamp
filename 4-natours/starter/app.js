const express = require('express');
const morgan = require('morgan');

const app = express();

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// 1) MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json()); // add middleware function to the middleware stack
app.use(express.static(`${__dirname}/public`));

/* app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
}); */

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// 3) ROUTES
// routers are also middleware that typically appear at the end of the middleware stack
// mounting routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Error handling middleware
app.use(globalErrorHandler);

// 4) START SERVER
module.exports = app;
