const { Meal } = require('../models/meal.model');
const { Order } = require('../models/order.model');
const { Restaurant } = require('../models/restaurant.model');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const getAllUserOrders = catchAsync(async (req, res, next) => {
    const { sessionUser } = req;

    const orders = await Order.findAll({
        where: { userId: sessionUser.id },
        include: { model: Meal, include: { model: Restaurant } },
    });

    res.status(200).json({ orders });
});

const createOrder = catchAsync(async (req, res, next) => {
    const { mealId, quantity } = req.body;
    const { sessionUser } = req;
    const meal = await Meal.findOne({
        where: { id: mealId },
    });

    if (!meal) {
        return next(new AppError(`No meal for id ${id}`, 404));
    }

    const totalPrice = meal.price * quantity;

    const newOrder = await Order.create({
        mealId,
        userId: sessionUser.id,
        totalPrice,
        quantity,
    });
    res.status(200).json({ newOrder });
});

const updateOrder = catchAsync(async (req, res, next) => {
    const { order } = req;
    await order.update({ status: 'completed' });
    res.status(200).json({ status: 'success' });
});

const deleteOrder = catchAsync(async (req, res, next) => {
    const { order } = req;
    await order.update({ status: 'deleted' });
    res.status(200).json({ status: 'success' });
});

module.exports = {
    getAllUserOrders,
    createOrder,
    updateOrder,
    deleteOrder,
};
