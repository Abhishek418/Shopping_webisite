const Product = require('../Models/product');
const Cart = require('../Models/cart');

exports.getCart = (req,res,next) => {
    res.render('shop/cart',{
      path: '/cart',
      pageTitle: 'Cart'
    })
  }

exports.postCart = (req,res,next) => {
  const prodId = req.body.productId.trim();
  /*here we have to insert the prodId into the cart */
  Product.findById(prodId,product => {
    Cart.addProduct(product.id,product.price);
    res.redirect('/');
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
    const productId = req.params.productId.trim();
    Product.findById(productId,result => {
      if(result == undefined)
      {
        res.status(404).render('404.ejs',{ path: req.originalUrl,pageTitle: 'Page Not Found' });
        return;
      }
      res.render('shop/product-detail.ejs',{
        product: result,
        pageTitle: 'Your Product',
        path: '/products',
        title: result.title
      });
    });
  }


  