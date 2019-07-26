const express = require('express');
const commentsController = require('../controllers/comments_controller');
const router = express.Router();
const passport = require('../config/passport-local');

// router.get('/', commentsController.showAll);
router.post('/create', passport.checkAuthentication, commentsController.createComment);
module.exports = router;