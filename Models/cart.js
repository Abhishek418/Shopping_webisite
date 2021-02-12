// const path = require('path');
// const fs = require('fs');
// const { json } = require('body-parser');
// const p = path.join(path.dirname(process.mainModule.filename),'data','cart.json');

// /*we will save the product in our file as a json object which will contain two things a products array and a totalPrice */
// /*products array will also have two things id of that product and qty of that products */
// /*when we insert a new product in the cart  */
// /*check if product already exists in the cart */
// /*if it doesnt exist in the cart */

// module.exports = class cart {
//     static addProduct(id,productPrice)
//     {
//         /*reading the cart first */
        
//         fs.readFile(p,(err,fileContent) => {
//             let cart = {products: [], totalPrice: 0};
//             if(!err)
//             {
//                 cart = JSON.parse(fileContent);
//             }
//             const temp = id.trim();
//             /*now checking if the product already exits in the cart */
//             const existingProductIndex = cart.products.findIndex(prod => {prod.id === temp});
//             const existingProduct = cart.products[existingProductIndex];
//             console.log(existingProduct);
//             let updatedProduct;
//             /*if prodIndex will be -1 then product is not found in the cart then we need to add new product to the cart else just update the existing product qty by 1 */
//             if(existingProduct)
//             {
//                 updatedProduct = {...existingProduct};
//                 updatedProduct.qty = updatedProduct.qty + 1;
//                 cart.products = [...cart.products];
//                 cart.products[existingProductIndex] = updatedProduct;
//             }
//             else
//             {
//                 updatedProduct = {id:id, qty:1};
//                 cart.products = [...cart.products,updatedProduct];
//             }
            
//             /*updating the price of the cart */
//             cart.totalPrice = cart.totalPrice + +productPrice;
//             /*now writting the updated cart to the file system */
//             fs.writeFile(p,JSON.stringify(cart  ),(err) => {
//                 if(err)
//                 {
//                     console.log(err.message);
//                 }
//             })
//         })
//     }
// }



const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id,productPrice) {
    fs.readFile(p,(err,fileContent) => {
      if(err)
      {
        return;
      }
      const cart = JSON.parse(fileContent);
      const updatedCart = {...cart};
      const product = updatedCart.products.find(prod => prod.id === id);
      if(!product){
        return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
      updatedCart.totalPrice = updatedCart.totalPrice - (productQty * productPrice);
      fs.writeFile(p,JSON.stringify(updatedCart), err => {
        console.log(err);
      })
    })
  }
 
  static getCart(cb) {
    fs.readFile(p,(err,fileContent) => {
      if(err)
      {
        cb(null);
      }
      else{
        cb(JSON.parse(fileContent))
      }
    })
  }
};
