const express = require('express');

const {
    userExists,
    protectToken,
    protectAccountOwner,
} = require('../middlewares/users.middlewares');

const {
    createUserValidations,
    checkValidations,
} = require('../middlewares/validations.middlewares');

const {
    getAllOrders,
    createUser,
    getOrderById,
    updateUser,
    deleteUser,
    login,
} = require('../controllers/users.controller');

const router = express.Router();

router.post('/', createUserValidations, checkValidations, createUser);
router.post('/login', login);

router.use(protectToken);

router.get('/', getAllUsers);
router.get('/orders', getAllOrders);
router.get('/:id/orders', getOrderById);
router.get('/:id', userExists, updateUser);
router.patch('/:id', userExists, updateUser);
router.delete('/:id', protectAccountOwner, deleteUser);

module.exports = { usersRoter: router };
