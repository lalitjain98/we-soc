const express = require('express');
const homeController = require('../controllers/home_controller');
const router = express.Router();
const usersRouter = require('./users');
const postsRouter = require('./posts');
const homeRouter = require('./home');
const commentsRouter = require('./comments');

router.use('/', homeRouter)
router.use('/users', usersRouter)
router.use('/posts', postsRouter)
router.use('/comments', commentsRouter)

router.use('*', (req, res)=>{
    return res.render('404', {layout: '404'});
})

module.exports = router;