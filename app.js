const path = require('path');
const errorController = require('./controllers/errorController');
const sequelize = require('./util/database');
const Product = require('./Models/product');
const User = require('./Models/user');
const Order = require('./Models/order');
const OrderItem = require('./Models/order-item');

/*requiring cart and cart item model */
const Cart = require('./Models/cart');
const CartItem = require('./Models/cart-item');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const cartItem = require('./Models/cart-item');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) => {
  User.findByPk(1).then(result => {
    req.user = result;
    next();
  })
  .catch(err => {
    console.log(err); 
  })
})

app.use('/admin', adminRouter.routes);
app.use(shopRouter);

app.use(errorController.pageNotFound);

/*defining the associations */
User.hasMany(Product);
Product.belongsTo(User);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through: cartItem});
Product.belongsToMany(Cart, {through: cartItem});

/*defining the order relationships */
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product,{
  through: OrderItem
});
let fetchedUser;

sequelize.sync().then((result) => {
  return User.findByPk(1);
})
.then(user => {
  if(!user){
    return User.create({name:'Abhishek Yadav',email:'abc@gmail.com'});
  } 
  return user;
})
.then(user => {
  fetchedUser = user;
   return fetchedUser.getCart();
})
.then(fetchedCart => {
  if(!fetchedCart){
    return fetchedUser.createCart();
  }
})
.then(result => {
  app.listen(3000,() => {
    console.log('sever is listening on port 3000');
  });
})
.catch(err => {
  console.log(err);
})

