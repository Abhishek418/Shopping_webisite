const Product = require('../Models/product');

exports.getAddProductsPage = (req, res, next) => {
    console.log(req.query.edit);
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true,
      editing: false
    });
  };

exports.postProducts = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    req.user.createProduct({
      title: title,
      price: price,
      description: description,
      imageUrl: imageUrl,
      userId: req.user.id
    })
    .then(result => {
      res.redirect('/'); 
    }).catch(err => {
      console.log(err);
    })
  };

exports.editProduct = (req,res,next) => {
  const prodId = req.params.productId;
  req.user.getProducts({
    where: {
      id: prodId
    }
  })
  .then(result => {
    if(!result){
      res.redirect('/');
    }
    else{
      console.log(result);
      res.render('admin/edit-product',{
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        product: result[0],
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
        editing: true
      })
    }
  }).catch(err => {
    console.log(err);
  })
  
}

exports.postEditProduct = (req,res,next) => {
  const prodId = req.body.productId.trim();
  const title = req.body.title;
  const url = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.findByPk(prodId).then(product => {
    product.title = title;
    product.price = price;
    product.url = url;
    product.description = description;
    return product.save();
  })
  .then(result => {
    console.log(result);
    res.redirect('/')
  })
  .catch(err => {
    console.log(err);
  })
  
}


exports.deleteProduct = (req,res,next) => {
  const prodId = req.body.productId.trim();
  Product.findByPk(prodId).then(product => {
    return product.destroy();
  })
  .then(result => {
    console.log('product succesfully deleted');
    res.redirect('/admin/products');
  })
  .catch(err => {
    console.log(err);
  })
}

exports.getAdminProducts = (req,res,next) => {
  Product.findAll().then(result => {
    res.render('admin/product-list',{
      prods: result,
      pageTitle: 'Admin Products',
      path: '/admin/products',
      hasProducts: true,
      activeShop: true,
      productCSS: true
    })
  }).catch(err => {
    console.log(err); 
  })
}