const express = require('express');
const postsController = require('../controllers/posts_controller');
const router = express.Router();
const passport = require('../config/passport-local');

router.get('/', postsController.showAll);
router.post('/create', passport.checkAuthentication, postsController.createPost);

module.exports = router;