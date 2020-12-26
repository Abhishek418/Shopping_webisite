const Product = require('../Models/product');

exports.getAddProductsPage = (req, res, next) => {
    res.render('admin/add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  };

exports.postProducts = (req, res, next) => {
    const product = new Product(req.body.title,req.body.price,req.body.description,req.body.imageUrl,);
    product.save();
    res.redirect('/');
  };

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