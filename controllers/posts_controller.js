const Post = require('../models/post');
const Comment = require('../models/comment');
const logger = require('../util/logger');

module.exports.showAll = function (req, res) {
    Post.find({}, (err, posts) => {
        if (err) {
            logger.err(err);
            return;
        }
        return res.render('home', { title: 'All Posts', posts });
    })
}

module.exports.createPost = (req, res) => {
    logger.log("createPost")
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, (err, post) => {
        logger.log(err, post)
        if (err) {
            logger.err(err);
            return;
        }
        return res.redirect('back');
    });
}

module.exports.destroy = (req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if (err) {
            logger.err(err);
            return;
        }
        // .id means objectId to string conversion
        // console.log(typeof post.user, typeof req.user.id, post.user, req.user.id, post.user == req.user.id, post.user === req.user.id)
        if (post.user == req.user.id) {
            post.remove();
            Comment.deleteMany({ post: req.params.id }, (err) => {
                if (err) {
                    logger.err(err);
                    return;
                }
                return res.redirect('back');
            });
        }
    })
}