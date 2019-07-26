const Comment = require('../models/comment');
const logger = require('../util/logger');
const Post = require('../models/post');

module.exports.createComment = (req, res)=>{
    logger.info("createComment")
    console.log(req.params)

    Post.findById(req.params.id, (err, post)=>{
        if(err || !post){
            logger.err(err || "Post Not Found!");
            return;
        }
        Comment.create({
            content: req.body.content,
            post: req.params.id,
            user: req.user._id
        }, (err, comment)=>{
            logger.log(err, comment)
            if(err){
                logger.err(err);
                return;
            }
            Post.findByIdAndUpdate(comment.post, {$push: {comments: comment._id}}, (err, post)=>{
                logger.log(err, post)
                if(err){
                    logger.err(err);
                    return;
                }
                return res.redirect('back');
            });
        });
    })


}