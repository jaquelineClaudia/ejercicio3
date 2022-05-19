const express = require('express');
const {
    getAllUserOrders,
    createOrder,
    updateOrder,
    deleteOrder,
} = require('../controllers/orders.controllers');

const {
    protectToken,
    protectOwner,
} = require('../middlewares/users.middlewares');

const router = express.Router();

router.use(protectToken);
router.post('/', createOrder);
router.get('/me', getAllUserOrders);
router.patch('/:id', protectOwner, updateOrder);
router.delete('/:id', protectOwner, deleteOrder);

module.exports = { ordersRouter: router };
