const Post = require('../models/post');
const logger = require('../util/logger');
module.exports.showAll = function(req, res){
    Post.find({}, (err, posts)=>{
        if(err){
            logger.err(err);
            return;
        }
        return res.render('home', {title: 'All Posts', posts});
    })
}

module.exports.createPost = (req, res)=>{
    logger.log("createPost")
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, (err, post)=>{
        logger.log(err, post)
        if(err){
            logger.err(err);
            return;
        }
        return res.redirect('back');
    });
}