const Post = require('../models/post');
const User = require('../models/user');
const logger = require('../util/logger');

module.exports.home = async function(req, res){
    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user', ['name', 'createdAt', '_id'])
        .populate({
            path:'comments',
            populate: {
                path: 'user'
            }
        });
        let users = await User.find({});
        return res.render(
            'home', 
            { 
                title: 'Home Page', 
                posts,
                users
            }
        );    
    }
    catch(err){
        logger.err(err);
    }

}

module.exports.about = function(req, res){
    return res.send("<h1>About Section</h1>")
}