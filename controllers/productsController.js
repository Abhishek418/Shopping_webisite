const Product = require('../Models/product');

exports.getShopPage = (req, res, next) =>{
  console.log(req.user.id);
  req.user.getProducts().then((products) => {
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
  req.user.getProducts().then(products => {
    console.log(products);
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
    console.log(err);
  })
}


