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
    const product = new Product(null,req.body.title,req.body.price,req.body.description,req.body.imageUrl,);
    product.save();
    res.redirect('/');
  };

exports.editProduct = (req,res,next) => {
  const prodId = req.params.productId;
  Product.findById(prodId,(product) => {
    if(!product){
      return res.redirect("/");
    }
    else
    {
      res.render('admin/edit-product',{
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        product: product,
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
        editing: true
      })
    }
  })
  
}

exports.postEditProduct = (req,res,next) => {
  const prodId = req.body.productId.trim();
  const title = req.body.title;
  const url = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const updatedProduct = new Product(prodId,title,price,description,url);
  console.log(updatedProduct);
  updatedProduct.save();
  res.redirect('/admin/products');
  
}


exports.deleteProduct = (req,res,next) => {
  const prodId = req.body.productId.trim();
  Product.deleteById(prodId);
  res.redirect('/admin/products');
}

exports.getAdminProducts = (req,res,next) => {
  Product.getAllProducts((products) => {
    res.render('admin/product-list',{
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    })
  })
}