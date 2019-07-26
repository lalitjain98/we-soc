const Post = require('../models/post');
const logger = require('../util/logger');

module.exports.home = function(req, res){
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate: {
            path: 'user'
        }
    })
    .exec((err, posts)=>{
        if(err){
            logger.err(err);
            return;
        }
        logger.info(posts)
        return res.render(
            'home', 
            { 
                title: 'Home Page', 
                posts
            }
        );
    });
}

module.exports.about = function(req, res){
    return res.send("<h1>About Section</h1>")
}