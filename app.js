var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//flash函数，res.flash导入
var flash = require('connect-flash');
var session = require('express-session');


var app = express();

app.use(session({
  secret: 'cookieSecret' , //加密签名
  key:'mysql', //数据库名字
  cookie: {maxAge: 60000},
  resave: false,
  saveUninitialized: true,
}));

app.use(flash());
//在所有路由的最上面加入flash中间件，将flash消息存储在本地变量。
app.use(function (req, res, next) {
  res.locals.flash_success_message = req.flash('flash_success_message'); 
  res.locals.flash_error_message = req.flash('flash_error_message');        
  next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//监听
var debug = require('debug')('my-application'); // debug模块
app.set('port', process.env.PORT || 3000); // 设定监听端口

//启动监听
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

//module.exports = app;
