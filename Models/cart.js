const path = require('path');
const fs = require('fs');
const p = path.join(path.dirname(process.mainModule.filename),'data','cart.json');

/*we will save the product in our file as a json object which will contain two things a products array and a totalPrice */
/*products array will also have two things id of that product and qty of that products */
/*when we insert a new product in the cart  */
/*check if product already exists in the cart */
/*if it doesnt exist in the cart */

module.exports = class cart {
    constructor()
    {
        this.products = [];
        this.totalPrice = 0;
    }
    static addProduct(id,productPrice)
    {
        /*reading the cart first */
        let cart = {products: [], totalPrice: 0};
        fs.readFile(p,(err,fileContent) => {
            if(!err)
            {
                cart = JSON.parse(fileContent);
            }
        })
        /*now checking if the product already exits in the cart */
        const prodIndex = cart.products.findIndex(prod => prod.id === id);
        /*if prodIndex will be -1 then product is not found in the cart then we need to add new product to the cart else just update the existing product qty by 1 */
        if(prodIndex == -1)
        {
            cart.products = [...cart.products,{id: id, qty: 1}]
        }
        else
        {
            cart.products[prodIndex].qty == cart.products[prodIndex].qty + 1;
        }

        /*updating the price of the cart */
        cart.totalPrice = cart.totalPrice + productPrice;


        /*now writting the updated cart to the file system */
        fs.writeFile(p,JSON.stringify(cart),(err) => {
            console.log(err);
        })
    }
}
