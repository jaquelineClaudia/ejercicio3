const express = require('express');

const {
    userExists,
    protectToken,
    protectOwner,
} = require('../middlewares/users.middlewares');

const {
    createUserValidations,
    checkValidations,
} = require('../middlewares/validations.middlewares');

const {
    getAllUsersOrders,
    createUser,
    getOrderById,
    updateUser,
    deleteUser,
    login,
} = require('../controllers/users.controller');

const router = express.Router();

router.post('/signup', createUserValidations, checkValidations, createUser);
router.post('/login', login);
router.use(protectToken);
router.patch('/:id', userExists, updateUser, protectOwner);
router.get('/orders', getAllUsersOrders);
router.get('/:id/orders', getOrderById);
router.get('/:id', userExists, updateUser);
router.delete('/:id', userExists, protectOwner, deleteUser);

module.exports = { usersRoter: router };
