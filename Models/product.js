const path = require('path');
const fs = require('fs');
const { type } = require('os');
const Cart = require('./cart');
const p = path.join(path.dirname(process.mainModule.filename),'data','products.json');


const getProductsFromFile = (cb) => {
    fs.readFile(p,(err,content) => {
        if(err){
            cb([]);
        }
        else{
            cb(JSON.parse(content));
        }
    })
}



/*here we will create a class and return it so the location where it is exported will create a new object of this */
module.exports =  class Product{
    constructor(id,title,price,description,imageUrl){
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        
    }
    save(){
        getProductsFromFile(products => {
            if(this.id)
            {
                const existingProductIndex = products.findIndex((prod) => {
                    return this.id === prod.id;
                });
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p,JSON.stringify(updatedProducts),(err) => {
                    if(err){
                        console.log(err);
                    }
                })
            }
            else
            {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p,JSON.stringify(products),(err) => {
                    if(err){
                        console.log(err);
                    }
                })
            }
            
        })
    }
    static deleteById(id)
    {
        getProductsFromFile(products => {
            const updatedProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(p,JSON.stringify(updatedProducts),(err) => {
                if(err){
                    console.log(err);
                }
                else
                {
                    const product = products.find(prod => prod.id === id);
                    Cart.deleteProduct(id,product.price);
                }
            })
        })
    }
    static getAllProducts(cb){
        getProductsFromFile(cb);
    }

    static findById(id,cb){
        getProductsFromFile(products => {
            const prod = products.find(p => {
                if(p.id === id) 
                {
                    return true;
                } 
            });
            cb(prod);
        })
    }
}