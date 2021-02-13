const Product = require('../Models/product');



exports.getShopPage = (req, res, next) =>{
  Product.getAllProducts().then(([products,details]) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
  })
  }).catch(err => console.log(err))
}


exports.getIndexPage = (req,res,next) => {
  Product.getAllProducts().then(([products,details]) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'All Products',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  }).then(err => console.log(err));
}


