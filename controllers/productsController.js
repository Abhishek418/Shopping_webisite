const Product = require('../Models/product');



exports.getShopPage = (req, res, next) => {
  Product.getAllProducts((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
  }


exports.getIndexPage = (req,res,next) => {
  Product.getAllProducts((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'All Products',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
}


