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
            let post = Post.findById(postId)
            post.comments = post.comments.filter(item=>item != req.params.id);
            post.save();
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