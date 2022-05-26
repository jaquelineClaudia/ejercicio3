const express = require('express');
const dotenv = require('dotenv');

const { usersRouter } = require('./routers/users.routes');
const { repairsRouter } = require('./routers/repairs.routes');
const { globalErrorHandler } = require('./controllers/error.controller');

dotenv.config({ path: './config.env' });

const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    max: 100,
    windowMs: 30 * 60 * 1000,
    message: 'You exceed the limit request for your IP',
});

const app = express();

app.use(limiter);
app.use(express.json());

app.use(helmet());
app.use(compression());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);

app.use('*', globalErrorHandler);

module.exports = { app };
