const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');
const { catchAsync } = require('../utils/catchAsync');

const getAllMeals = catchAsync(async (req, res, next) => {
    const meals = await Meal.findAll({
        where: { status: 'active' },
        include: { model: Restaurant },
    });
    res.status(200).json({ meals });
});

const getMealById = catchAsync(async (req, res, next) => {
    const { meal } = req;
    res.status(200).json({ meal });
});

const createMeal = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { name, price } = req.body;

    const newMeal = await Meal.create({
        name,
        price,
        restaurantId: id,
    });

    res.status(200).json({ newMeal });
});

const updateMeal = catchAsync(async (req, res, next) => {
    const { meal } = req;
    const { name, price } = req.body;

    await meal.update({ name, price });

    res.status(200).json({ status: 'success' });
});

const deleteMeal = catchAsync(async (req, res, next) => {
    const { meal } = req.params;

    await meal.update({ status: 'deleted' });

    res.status(200).json({ status: 'success' });
});

module.exports = {
    createMeal,
    getAllMeals,
    getMealById,
    updateMeal,
    deleteMeal,
};
