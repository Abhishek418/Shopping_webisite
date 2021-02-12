const path = require('path');
const productController = require('../controllers/productsController');
const shopController = require('../controllers/shopController');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/',productController.getShopPage);
router.get('/products',productController.getIndexPage);
router.get('/products/:productId',shopController.getViewProductPage);
router.get('/cart',shopController.getCart);
router.post('/cart',shopController.postCart)
router.get('/checkout',shopController.getCheckout);
router.get('/orders',shopController.getOrders);
router.post('/cart-delete-item',shopController.deleteCartItem);

module.exports = router;
