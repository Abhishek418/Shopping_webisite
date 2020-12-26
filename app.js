const path = require('path');
const errorController = require('./controllers/errorController');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter.routes);
app.use(shopRouter);

app.use(errorController.pageNotFound);

app.listen(3000,() => {
  console.log('server is listening at port 3000');
});