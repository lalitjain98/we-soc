const express = require('express');
const logger = require('./util/logger');
const app = express();
const path = require('path');
const port = 5000;
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const sassMiddleware = require('node-sass-middleware');
// mongo store is used to store session cookie in db
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');

app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'assets/scss'),
    dest: path.join(__dirname, 'assets/css'),
    debug: true,
    outputStyle: 'extended',
    prefix:  '/css'
}));
app.locals.appName = 'We Soc';
app.locals.appTagLine = 'Be Social';
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
// app.use((req, res, next)=>{
//     console.log(req.cookies);
//     res.cookie('user_id', parseInt(Math.random()*1000))
//     next()
// })
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({extended: false}));

app.use(session({
    name: 'we_soc',
    secret: 'lalitjain',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    }, (err)=>{
        logger.log(err, 'Connect MongoStore Setup Done!')
    })
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleware.setFlash)
// app.use((req, res, next)=>{
//     logger.info(res.locals.user);
//     next();
// })
app.use('/', require('./routes'))
app.listen(port, (err)=>{
        
    logger.log( err, `Server Running on port ${port}`);
});
