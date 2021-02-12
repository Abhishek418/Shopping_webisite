const path = require('path');
const errorController = require('./controllers/errorController');
const db = require('./util/database');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');

db.execute('SELECT * FROM products').then(result => {
  console.log(result[0]);
}).catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter.routes);
app.use(shopRouter);

app.use(errorController.pageNotFound);

app.listen(3000,() => {
  console.log('server is listening at port 3000');
});
