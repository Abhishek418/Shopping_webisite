const path = require('path');
const fs = require('fs');
const { type } = require('os');
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
    constructor(title,price,description,imageUrl){
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.id = Math.random().toString();
    }
    save(){
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p,JSON.stringify(products),(err) => {
                if(err){
                    console.log(err);
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