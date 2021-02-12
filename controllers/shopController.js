const Product = require('../Models/product');
const Cart = require('../Models/cart');

exports.getCart = (req,res,next) => {
    Cart.getCart(cart => {
      //now we have the cart products so we need to send it to be rendered but this is just an {[{id,qty}],totalPrice} but we need the title also so we need the product model to  find the title and description
      //so now finding all the products and then we will filter out the products which are in our cart
      Product.getAllProducts(products => {
        //here we have all the products so finding the product which are in the cart
        let cartProducts = [];
        //looping through the products

        cart.products.forEach(product => {
          const matchingProduct = products.find(prod => prod.id === product.id);
          if(matchingProduct)
          {
            cartProducts.push({productData: matchingProduct,qty: product.qty});
          }
        })
        //now in cartProducts we have the product matching in the cart and products array
        //so we have to render the product
        console.log(cartProducts);
        res.render('shop/cart',{
          path: '/cart',
          pageTitle: 'Cart',
          products: cartProducts
        })
      })
    });
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


  