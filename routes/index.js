const express = require('express');
const homeController = require('../controllers/home_controller');
const router = express.Router();
const usersRouter = require('./users');
const postsRouter = require('./posts');
const homeRouter = require('./home');

router.use('/', homeRouter)
router.use('/users', usersRouter)
router.use('/posts', postsRouter)

router.use('*', (req, res)=>{
    res.send('<div style="margin:-8px; height:-webkit-fill-available; display:flex; align-self:center; align-items:center; justify-content: center; background: linear-gradient(to bottom right, #ffeeaa, #ff5555)"><p style="font-size: 2.5rem; font-family: sans-serif; color:#7d0852;text-align:center;">Error 404: Not Found</p></div>')
})

module.exports = router;