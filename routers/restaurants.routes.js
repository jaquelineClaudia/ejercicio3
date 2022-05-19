const express = require('express');
const {
    protectToken,
    protectAdmin,
    protectOwner,
} = require('../middlewares/users.middlewares');

const {
    restaurantExists,
    reviewExists,
} = require('../middlewares/restaurants.middlewares');

const {
    createRestaurantValidations,
    checkValidations,
} = require('../middlewares/validations.middlewares');

const {
    getAllRestaurants,
    createRestaurant,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
    createReview,
    updateReview,
    deleteReview,
} = require('../controllers/restaurants.controller');

const router = express.Router();

router.post('/', protectAdmin, createRestaurantValidations, createRestaurant);
router.get('/', getAllRestaurants);
router.get('/:id', restaurantExists, getRestaurantById);
router.patch('/:id', protectAdmin, restaurantExists, updateRestaurant);
router.delete('/:id', protectAdmin, restaurantExists, deleteRestaurant);
router.post('/reviews/:id', restaurantExists, protectToken, createReview);
router.patch(
    '/reviews/:restaurantId/:id',
    restaurantExists,
    reviewExists,
    protectOwner,
    updateReview
);

router.delete(
    '/reviews/:restaurantId/:id',
    restaurantExists,
    reviewExists,
    protectOwner,
    deleteReview
);

module.exports = { restaurantsRouter: router };
