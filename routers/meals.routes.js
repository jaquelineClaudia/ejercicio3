const express = require('express');

const {
    getAllMeals,
    getMealById,
    createMeal,
    updateMeal,
    deleteMeal,
} = require('../controllers/meals.controllers');

const { mealExists } = require('../middlewares/meals.middlewares');
const { protectAdmin } = require('../middlewares/users.middlewares');

const router = express.Router();

router.post(':/id', protectAdmin, createMeal);
router.get('/', getAllMeals);
router.get('/:id', mealExists, getMealById);
router.patch('/:id', protectAdmin, mealExists, updateMeal);
router.delete('/:id', protectAdmin, mealExists, deleteMeal);

module.exports = { mealsRouter: router };
