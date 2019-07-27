const Post = require('../models/post');
const Comment = require('../models/comment');
const logger = require('../util/logger');

module.exports.showAll = async function (req, res) {
    try {
        let posts = await Post.find({});
        return res.render('home', { title: 'All Posts', posts });
    }
    catch(err){
        logger.err(err)
        return;
    }
}

module.exports.createPost = async (req, res) => {
    logger.log("createPost")
    try {
        let post = Post.create({
            content: req.body.content,
            user: req.user._id
        })
        req.flash('success', 'New Post Created!');
        return res.redirect('back');
    }
    catch(err){
        logger.err(err)
        return;
    }
}
// try{}
// catch(err){
//     logger.err(err)
//     return;
// }
module.exports.destroy = async (req, res) => {
    try{
        let post = Post.findById(req.params.id);
        if (post.user == req.user.id) {
            post.remove();
            let comment = Comment.deleteMany({ post: req.params.id });
            req.flash('success', 'Post Deleted!');
        }else{
            req.flash('error', 'You are not Authorized to delete this post!')
        }
        return res.redirect('back');
    }
    catch(err){
        logger.err(err)
        return;
    }
}