const { Meal } = require('../models/meal.model');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const mealExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const meal = await Meal.findOne({ where: { id } });

    if (!meal) {
        return next(new AppError(`meal not found for id ${id}`, 404));
    }
    req.meal = meal;
    next();
});

module.exports = { mealExists };
