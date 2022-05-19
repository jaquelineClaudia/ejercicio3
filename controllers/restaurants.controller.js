const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');
const { catchAsync } = require('../utils/catchAsync');

const getAllRestaurants = catchAsync(async (req, res, next) => {
    const restaurants = await Repair.findAll({
        where: { status: 'active' },
        include: [{ model: Review }],
    });

    res.status(200).json({ restaurants });
});

const getRestaurantById = catchAsync(async (req, res, next) => {
    const { restaurant } = req;

    res.status(200).json({ restaurant });
});

const createRestaurant = catchAsync(async (req, res, next) => {
    const { name, address, rating } = req.body;

    const newRestaurant = await Repair.create({
        name,
        address,
        rating,
    });

    res.status(201).json({ newRestaurant });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req;
    const {name, address, rating}= req.body;
    await restaurant.update({ name.address});
    res.status(200).json({ status: 'Success' });
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req;

    await restaurant.update({ status: 'disable' });
    res.status(200).json({ restaurant });
});

const createReview = catchAsync(async(req, res, next) => {
    const { id } = req.params;
    const { sessionUser } = req;
    const { comment, rating } = req.body;

    const newReview = await Review.create({ userId: sessionUser.id, comment, restaurantId: id, rating });

    res.status(200).json({ newReview });
});

const updateReview = catchAsync(async(req, res, next) => {
    const { review } = req;
    const { comment, rating } = req.body;

    await review.update({ comment, rating });
    res.status(200).json({ status: 'success' });
});

const deleteReview = catchAsync(async(req, res, next) => {
    const { review } = req;
    await review.update({ status: 'deleted' });
    res.status(200).json({ status: 'success' });
});
module.exports = {
    getAllRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant, 
    deleteRestaurant,
    createReview,
    updateReview,
    deleteReview
};
