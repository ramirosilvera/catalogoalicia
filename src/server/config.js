const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const erroHandler = require('errorhandler');
const routes = require('../routes/index');

const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

module.exports = app => {

    //SETTINGS
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers'),
        handlebars: handlebars,
    }));
    app.set('view engine', '.hbs');

    //MIDDLEWARES
    app.use(morgan('dev'));
    app.use(multer({ dest: path.join(__dirname, '../public/upload/temp') }).single('image'));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(methodOverride('_method'));
    app.use(session({
        secret: 'mysecretapp',
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    // Global Variables
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error_msg = req.flash('error');
        res.locals.user = req.user || null;
        next();
    });

    //ROUTES
    routes(app);
    app.use(require('../routes/users'));

    //STATIC FILES
    app.use('/public', express.static(path.join(__dirname, '../public')));

    //ERRORHANDLERS
    if ('development' === app.get('env')) {
        app.use(erroHandler);
    }

    return app;
}