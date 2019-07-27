const Comment = require('../models/comment');
const logger = require('../util/logger');
const Post = require('../models/post');

module.exports.createComment = async (req, res)=>{
    logger.info("createComment")
    console.log(req.params)
    try{
        let post = await Post.findById(req.params.id);
        let comment = await Comment.create({
            content: req.body.content,
            post: req.params.id,
            user: req.user._id
        });
        let updatePost = await Post.findByIdAndUpdate(comment.post, {$push: {comments: comment._id}});
        if(req.xhr){
            return res.status(200).json({
                data: {comment, post, user: {_id: req.user._id, name: req.user.name, createdAt: req.user.createdAt}},
                message: 'Comment Created!'
            })
        }
        req.flash('success', 'Created Comment!')
        return res.redirect('back');
    }
    catch(err){
        logger.err(err)
        return;
    }
}

module.exports.destroy = async (req, res) => {

    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            const postId = comment.post;
            comment.remove();
            let post = await Post.findById(postId)
            post.comments = post.comments.filter(item=>item != req.params.id);
            post.save();
            if(req.xhr){
                return res.status(200).json({
                    data: {comment, user: {_id: req.user._id, name: req.user.name, createdAt: req.user.createdAt}},
                    message: 'Comment Deleted!'
                })
            }    
            req.flash('success', 'Comment Deleted!');
        }else{
            req.flash('error', 'You are not Authorized to delete this comment!')
        }
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