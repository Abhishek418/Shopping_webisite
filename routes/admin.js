const path = require('path');
const productController = require('../controllers/productsController');
const adminController = require('../controllers/admin');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product',adminController.getAddProductsPage);

// /admin/add-product => POST
router.post('/add-product',adminController.postProducts);

router.get('/products',adminController.getAdminProducts);

exports.routes = router;

