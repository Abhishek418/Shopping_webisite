const Product = require('../Models/product');
const Cart = require('../Models/cart');

exports.getCart = (req,res,next) => {
    res.render('shop/cart',{
      path: '/cart',
      pageTitle: 'Cart'
    })
  }

exports.postCart = (req,res,nxt) => {
  const prodId = req.body.prodId;
  console.log('type pf prodId from postCart is:' + typeof prodId + ' and its value is:' + prodId);
  /*here we have to insert the prodId into the cart */
  Product.findById(prodId,product => {
    Cart.addProduct(prodId,product.price);
  })
}

  exports.getCheckout = (req,res,next) => {
    res.render('shop/checkout',{
      path: '/checkout',
      pageTitle: 'Checkout'
    })
  }
 
  exports.getOrders = (req,res,next) => {
    res.render('shop/orders',{
      path: '/orders',
      pageTitle: 'Your Orders'
    })
  }

  exports.getViewProductPage = (req,res,next) => {
    const productId = req.params.productId;
    Product.findById(productId,result => {
      res.render('shop/product-detail.ejs',{
        product: result,
        pageTitle: 'Your Product',
        path: '/products',
        title: 'title'
      });
    });
  }


  