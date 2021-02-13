const path = require('path');
const fs = require('fs');
const db = require('../util/database');
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
        return db.execute('INSERT INTO products (title,price,description,imageUrl) VALUES(?,?,?,?)',[this.title,this.price,this.description,this.imageUrl]);
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
    static getAllProducts(){
        return db.execute('SELECT * FROM products');
    }

    static findById(id){
        return db.execute('SELECT * FROM products WHERE id = ?',[id]);
    }
}