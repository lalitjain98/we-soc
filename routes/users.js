const express = require('express');
const usersController = require('../controllers/users_controller');
const router = express.Router();
const passport = require('../config/passport-local');


router.get('/sign-up', passport.checkUnauthenticated, usersController.signUp);
router.get('/sign-in', passport.checkUnauthenticated, usersController.signIn);
router.post('/create', passport.checkUnauthenticated, usersController.create);
router.post(
    '/create-session',
    passport.checkUnauthenticated, 
    passport.authenticate('local', {
        failureRedirect: '/users/sign-in'
    }), 
    usersController.createSession
);
router.get('/sign-out', passport.checkAuthentication, usersController.destroySession)
router.get('/profile', passport.checkAuthentication, usersController.profile)
module.exports = router;