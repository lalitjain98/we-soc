const Post = require('../models/post');
const Comment = require('../models/comment');
const logger = require('../util/logger');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

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
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        })

        if(req.xhr){
            return res.status(200).json({
                data: {post, user: {_id: req.user._id, name: req.user.name, createdAt: req.user.createdAt}},
                message: 'Post Created!'
            })
        }

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
        let post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {
            post.remove();
            let comment = await Comment.deleteMany({ post: req.params.id });
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: 'Post Deleted!'
                })
            }
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