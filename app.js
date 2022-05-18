const express = require('express');
const { usersRouter } = require('./routers/users.routes');
const { repairsRouter } = require('./routers/repairs.routes');
const { globalErrorHandler } = require('./controllers/error.controller');
const rateLimit = require('express-rate-limit');

const limit = rateLimit({
    max: 100,
    windowMs: 30 * 60 * 1000,
    message: 'You exceed the limit request for your IP',
});
const app = express();
app.use(limit);
app.use(express.json());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);

app.use('*', globalErrorHandler);

module.exports = { app };
