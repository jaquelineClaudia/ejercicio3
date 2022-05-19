const { Order } = require('../models/order.model');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const orderExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const order = await Order.findOne({ where: { id } });

    if (!order) {
        return next(new AppError(`Order not found for id ${id}`, 404));
    }
    req.order = order;
    next();
});

module.exports = { orderExists };
