const Product = require('../Models/product');
const Cart = require('../Models/cart');

exports.getCart = (req,res,next) => {
    // Cart.getCart(cart => {
    //   //now we have the cart products so we need to send it to be rendered but this is just an {[{id,qty}],totalPrice} but we need the title also so we need the product model to  find the title and description
    //   //so now finding all the products and then we will filter out the products which are in our cart
    //   Product.getAllProducts(products => {
    //     //here we have all the products so finding the product which are in the cart
    //     let cartProducts = [];
    //     //looping through the products

    //     cart.products.forEach(product => {
    //       const matchingProduct = products.find(prod => prod.id === product.id);
    //       if(matchingProduct)
    //       {
    //         cartProducts.push({productData: matchingProduct,qty: product.qty});
    //       }
    //     })
    //     //now in cartProducts we have the product matching in the cart and products array
    //     //so we have to render the product
    //     res.render('shop/cart',{
    //       path: '/cart',
    //       pageTitle: 'Cart',
    //       products: cartProducts
    //     })
    //   })
    // });

    req.user.getCart()
    .then(cart => {
      return cart.getProducts()
      .then(products => {
        res.render('shop/cart',{
          path: '/cart',
          pageTitle: 'Cart',
          products: products
        })
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  }

exports.postCart = (req,res,next) => {
  const prodId = req.body.productId.trim();
  let fetchedCart;

  /*fetching the cart associated with the user */
  req.user.getCart()
  .then(cart => {
    fetchedCart = cart;
    console.log(fetchedCart);
    return cart.getProducts({ where: {
      id: prodId
    }})
  })
  /*finding the product in the cart */
  .then(products => {
    let fetchedProduct;
    if(products.length > 0){
      /*if product already exists in the cart */
      fetchedProduct = products[0];
    }
    let newQty = 1;
    // console.log('fetched product is:' + fetchedProduct)
    if(!fetchedProduct){
      /*here product does not exits so finding the product using the id */
      // console.log('product does not exists so finding and adding the product into the cart');
      return Product.findByPk(prodId)
        .then(product => {
          // console.log(product);
          // console.log(fetchedCart);
          return fetchedCart.addProduct(product, {
            through: {
              qty: newQty
            }
          });
        })
        .catch(err => next(err));
    }
    else
    {
      // console.log('here product exists so just increasing the qty'); 
      const oldQty = fetchedProduct.cartItem.qty;
      newQty = oldQty + 1;
      return Product.findByPk(prodId)
      .then(product => {
        return fetchedCart.addProduct(product, {
          through: {
            qty: newQty
          }
        });
      })
      .catch(err => next(err));
    }
  })
  .then(result => {
    console.log(result);
    res.redirect('/cart');
  })
  .catch(err => console.log(err));
}

exports.deleteCartItem = (req,res,next) => {
  const prodId = req.body.productId;
  req.user.getCart()
  .then(cart => {
    return cart.getProducts({
      where:{
        id: prodId
      }
    })
  })
  .then(products => {
    const product = products[0];
    return product.cartItem.destroy();
  })
  .then(result => {
    res.redirect('/cart');
  })
  .catch(err => console.log(err));
}

  exports.getCheckout = (req,res,next) => {
    res.render('shop/checkout',{
      path: '/checkout',
      pageTitle: 'Checkout'
    })
  }
 
  exports.getOrders = (req,res,next) => {

    req.user.getOrders({include: ['products']})
    .then(order => {
      console.log(order);
      res.render('shop/orders',{
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: order
      })
    })
    .catch(err => console.log(err));
  }

  exports.getViewProductPage = (req,res,next) => {
    const productId = req.params.productId.trim();
    Product.findByPk(productId).then((result) => {
      res.render('shop/product-detail.ejs',{
        product: result,
        pageTitle: 'Your Product',
        path: '/products',
        title: result.title
      });
    }).catch(err => next(err));
  }


  exports.createOrder = (req,res,next) => {
    let fetchedCart;
    req.user.getCart().then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      req.user.createOrder()
      .then(order => {
        return order.addProduct(products.map(product => {
          product.orderItem = {
            qty: product.cartItem.qty
          }
          return product;
        }))
      })
      .catch(err => console.log(err))
    })
    .then(result => {
      return fetchedCart.setProducts(null);
    })
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err)); 
  }

  