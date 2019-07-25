const Post = require('../models/post');

module.exports.home = function(req, res){
    Post.find({})
    .populate('user')
    .exec((err, posts)=>{
        if(err){
            logger.err(err);
            return;
        }
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