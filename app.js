const express = require('express');
const { usersRouter } = require('./routers/users.routes');
const { retaurantsRouter } = require('./routers/restaurants.routes');
const { globalErrorHandler } = require('./controllers/error.controller');
const { mealsRouter } = require('./routes/meals.routes');
const { ordersRouter } = require('./routes/orders.routes');

const app = express();

app.use(express.json());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/restaurants', restaurantsRouter);
app.use('/api/v1/meals', mealsRouter);
app.use('/api/v1/orders', ordersRouter);

app.use('*', globalErrorHandler);

module.exports = { app };
