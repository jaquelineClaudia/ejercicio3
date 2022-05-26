const { User } = require('../models/user.model');
const { Order } = require('../models/order.model');
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const getAllUsersOrders = catchAsync(async (req, res, next) => {
    const { sessionUser } = req;

    const orders = await Order.findAll({
        where: { userId: sessionUser.id, status: 'active' },
        include: { model: Meal, include: { model: Restaurant } },
    });
    res.status(200).json({ orders });
});

const getOrderById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findOne({
        where: { id },
        include: { model: Meal, include: { model: Restaurant } },
    });
    res.status(200).json({ order });
});

const createUser = catchAsync(async (req, res, next) => {
    const { name, email, password, role } = req.body;
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: hashPassword,
        role,
    });
    newUser.password = undefined;

    res.status(201).json({ newUser });
});

const updateUser = catchAsync(async (req, res, next) => {
    const { name, email } = req.body;
    const { user } = req;

    await user.update({ name, email });
    res.status(200).json({ status: 'success' });
});

const deleteUser = catchAsync(async (req, res, next) => {
    const { user } = req;

    await user.update({ status: 'disable' });

    res.status(200).json({ status: 'success' });
});

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        where: { email, status: 'available' },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new AppError('Invalid credentials', 400));
    }

    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    user.password = undefined;

    res.status(200).json({ token, user });
});

module.exports = {
    getAllUsersOrders,
    getOrderById,
    createUser,
    updateUser,
    deleteUser,
    login,
};
