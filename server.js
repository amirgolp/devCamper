const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

//Route files
const bootcamps = require('./routes/bootcamps');

//Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

// const logger = (req, res, next) => {
//   req.hello = 'Hello world';
//   console.log('Middleware ran!');
//   next();
// };

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
// app.use(logger);

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`));