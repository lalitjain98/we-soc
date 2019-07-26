const express = require('express');
const postsController = require('../controllers/posts_controller');
const router = express.Router();
const passport = require('../config/passport-local');
const commentsRouter = require('./comments');
const commentsController = require('../controllers/comments_controller');

router.get('/', postsController.showAll);
router.post('/create', passport.checkAuthentication, postsController.createPost);
router.post(
    '/:id/comments/create',
    passport.checkAuthentication,
    // (req, res, next)=>{
    //     console.log("req.params", req.params);
    //     next()
    // },
    commentsController.createComment
);
module.exports = router;