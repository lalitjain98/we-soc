const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const logger = require('../util/logger');

passport.use(new LocalStrategy({
    usernameField: 'email', 
    passReqToCallback: true
}, (req, email, password, done)=>{
    
    // find user and establish identity
    User.findOne({email}, (err, user)=>{
        if (err){
            req.flash('error', err);
            logger.err(err);
            return done(err);
        }
        if(!user || user.password !== password){
            req.flash('error', 'Invalid Email or Password');
            logger.err('Invalid Email or Password')
            return done(null, false);
        }
        logger.info('User Authenticated', user)
        return done(null, user)
    })
}))

// serializing user to decide what will be kept in cookies

passport.serializeUser((user, done)=>{
    done(null, user.id);
})

// deserializing user from key in cookies

passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
        if (err){
            logger.err(err);
            return done(err);
        }
        return done(null, user)
    })
})

passport.checkUnauthenticated = (req, res, next)=>{
    logger.info('checkUnauthenticated');
    logger.info(!req.isAuthenticated());
    if(!req.isAuthenticated()){
        // allow user to access resource
        // req.flash('error', 'You are not Signed In!');
        logger.info('User Not Authenticated');
        return next();
    }
    // if user is already signed in
    return res.redirect('/users/profile')
}

passport.checkAuthentication = (req, res, next)=>{
    logger.info('CheckAuthentication');
    logger.info(req.isAuthenticated());
    if(req.isAuthenticated()){
        // allow user to access resource
        logger.info('User Authenticated');
        return next();
    }
    // if user is not signed in
    req.flash('error', 'You need to Sign In!');
    return res.redirect('/users/sign-in')
}

passport.setAuthenticatedUser = (req, res, next)=>{
    logger.info('setAuthenticatedUser');
    if(req.isAuthenticated()){
        // req.user is set by passport already
        res.locals.user = req.user
        logger.info(res.locals.user)
        logger.info('Authenticated user set in res.locals');
    }
    next();
    // if user is not signed in
    // return res.redirect('/users/sign-in')
}

module.exports = passport;