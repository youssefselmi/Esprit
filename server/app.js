var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
const dotenv = require("dotenv")
//const User = require('./routes/user');


var indexRouter = require('./routes/index');
var productRouter = require('./routes/product');
var userRouter = require('./routes/user');
var departementRouter = require('./routes/departement');
var classeRouter = require('./routes/classe');
var upRouter = require('./routes/up');
var moduleRouter = require('./routes/module');
var competenceRouter =  require('./routes/competence');
var enseignantRouter =  require('./routes/enseignant');
var typeRouter= require('./routes/type');
var heuresupRouter = require('./routes/heuresup');

var affectationRouter = require('./routes/affectation');
var optupRouter = require('./routes/optup')

var affectationtabchargehorraireRouter =  require('./routes/AffectationTableauxChargeHorraires');
var disponibiliteRouter =  require('./routes/disponibilite');
var affectationenseignantRouter= require('./routes/affectationenseignant')
var sendmailRouter =  require('./routes/sendmail');

var historiqueaffectation= require('./routes/historiqueaffectation')



var app = express();


dotenv.config();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/product', productRouter);
app.use('/user', userRouter);
app.use('/departement', departementRouter);
app.use('/classe', classeRouter);
app.use('/up', upRouter);
app.use('/module', moduleRouter);
app.use('/competence', competenceRouter);
app.use('/enseignant', enseignantRouter);
app.use('/affectation', affectationRouter);
app.use('/optup', optupRouter);
app.use('/affectationtabchargehorraire', affectationtabchargehorraireRouter);
app.use('/disponibilite',disponibiliteRouter);
app.use('/type',typeRouter);
app.use('/heuresup', heuresupRouter);
app.use('/affectationenseignant',affectationenseignantRouter);

app.use('/sendmail',sendmailRouter)
app.use('/historique',historiqueaffectation);



app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));
app.use(cors());






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




//import database 
var mongoose = require('mongoose');
var configDB = require('./database/mongodb.json');
const affectation = require('./models/affectation');
//mongo config 
const connect = mongoose.connect(
    configDB.mongo.uri, {
        useNewurlParser: true,
        useUnifiedTopology: true

    },
    () => console.log("Connected to DB !!"));



module.exports = app;