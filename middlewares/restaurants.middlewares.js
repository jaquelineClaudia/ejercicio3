const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const restaurantExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const restaurant = await Restaurant.findOne({
        where: { id },
        include: { model: Review },
    });

    if (!restaurant) {
        return next(new AppError(`Restaurant not found for id ${id}`, 404));
    }

    req.restaurant = restaurant;
    next();
});

const reviewExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const review = await Review.findOne({
        where: { id },
    });

    if (!review) {
        return next(new AppError(`no review for the id ${id}`, 404));
    }

    req.review = review;
    next();
});

module.exports = { reviewExists, restaurantExists };
