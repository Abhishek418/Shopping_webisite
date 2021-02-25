const Product = require('../Models/product');



exports.getShopPage = (req, res, next) =>{
  Product.findAll().then((products) => {
    console.log(req.user);
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
  })
  })
  .catch(err => {
    console.log(err);
  })
}


exports.getIndexPage = (req,res,next) => {
  Product.findAll().then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'All Products',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  })
  .catch(err => {
    next(err);
  })
}


