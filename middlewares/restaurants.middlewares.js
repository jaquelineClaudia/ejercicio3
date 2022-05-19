const { Restaurant } = require('../models/restaurant.model');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const restaurantExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const restaurant = await Restaurant.findOne({ where: { id } });

    if (!restaurant) {
        return next(new AppError(`Restaurant not found for id ${id}`, 404));
    }

    req.restaurant = restaurant;
    next();
});

module.exports = { restaurantExists };
