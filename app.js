var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
const { create } = require("express-handlebars");
var app = express();
var fileUpload=require('express-fileupload')
const bodyParser = require('body-parser')
var db=require('./config/connection');
const { defaultConfiguration } = require('express/lib/application');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
/*app.engine('hbs', hbs({extname: 'hbs', defualtLayout : 'layout' , layoutsDir: __dirname + '/views/layouts',partialsDir:__dirname+'/views/partials/'}));*/
// new code edited//
const hbs = create({
  layoutsDir: `${__dirname}/views/layout`,
  extname: `hbs`,
  defaultLayout: 'layout',
  partialsDir: `${__dirname}/views/partials`
});
app.engine('hbs', hbs.engine);
// ended//
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload())
// body praser added
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
// endeed
db.connect((err)=>{
  if(err) console.log("connection error while database connection processes"+err)
  else console.log("database connected to port 27017 through server (mongodb:username@amalprasad0)[Operation Successfully completed]")
})
app.use('/', userRouter);
app.use('/admin', adminRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
