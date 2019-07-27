{
    const flash = {
        success: (msg) => {
            new Noty({
                theme: 'relax',
                text: msg,
                type: 'success',
                layout: 'topRight',
                timeout: 1500
            }).show();
        },
        err: (msg) => {
            new Noty({
                theme: 'relax',
                text: msg,
                type: 'error',
                layout: 'topRight',
                timeout: 1500
            }).show();
        },
    }
    console.log("home_posts")
    const deletePost = (e) => {
        console.log(e.target);
        //    let postId = e.target;
    }
    const createPost = () => {
        let newPostForm = $('#new-post-form');
        newPostForm.submit((e) => {
            console.log("form submit caught!")
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: (data) => {
                    console.log(data);
                    $('#posts-list-container').prepend(newPostDom(data.data.post, data.data.user))
                    $('form', '.comment-form-container', `#post-${data.data.post._id}-comments-container`)
                        .each(function (index, element) {
                            $(this).submit((e) => addSubmitCommentFormListener(e, $(this)));
                        })
                    $(' .delete-post', `#post-${data.data.post._id}`).click(deletePostHandler);
                    newPostForm.trigger('reset');
                    flash.success(data.message);
                },
                error: (err) => {
                    flash.err(err)
                    console.log(err.responseText())
                }
            })
        })
    }
    const newCommentDom = (comment, user) => {
        return `
            <div id="comment-${comment._id}" class="comment-container">
                <div><a class="delete-comment" href="/comments/destroy/${comment._id}">Delete Comment</a></div>
                <div>${comment.content}</div>
                <div>-${user.name}</div>
            </div>
        `
    }

    const addSubmitCommentFormListener = (e, element) => {
        console.log("comment form submit caught!")
        console.log(e, element);
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: element.prop('action'),
            data: element.serialize(),
            success: (data) => {
                console.log(data);
                $(" .comments-list-container", `#post-${data.data.post._id}-comments-container`)
                    .prepend(newCommentDom(data.data.comment, data.data.user));
                $(' .delete-comment', `#comment-${data.data.comment._id}`).click(deleteCommentHandler);
                element.trigger('reset');
                flash.success(data.message);
            },
            error: (err) => {
                flash.err(err)
                console.log(err.responseText())
            }
        })
    }

    const createComment = () => {
        $('form', '.comment-form-container').each(function (index, element) {
            $(this).submit((e) => addSubmitCommentFormListener(e, $(this)));
        })
    }
    const newPostDom = (post, user) => {
        return `
            <div id="post-${post._id}" class="post-container">
                <div class="post-content-container">
                    <div>
                        <div class="post-content">${post.content}</div>
                        <div class="post-author">${user.name}</div>
                    </div>
                    <a class="delete-post" id="delete-post-${post._id}" href="/posts/destroy/${post._id}">X</a>
                </div>
            <div class="comments-container" id="post-${post._id}-comments-container">
                        <div class="comments-list-container">
                        </div>
                        <div class="comment-form-container">
                            <form action="/posts/${post._id}/comments/create" method="POST" id="post-${post._id}-new-comment-form">
                                <textarea required name="content" id="content" cols="30" rows="1" placeholder="Type Here..."></textarea>
                                <input type="submit" value="create Comment">
                            </form>
                        </div>	

                </div>
            </div>
                    `
    }
    const deletePostHandler = (e) => {
        e.preventDefault();
        console.log(e.target.href);
        // let link = $(`#${e.target.id}`)
        $.ajax({
            method: "GET",
            url: e.target.href,
            success: (data) => {
                console.log(data);
                $(`#post-${data.data.post_id}`).remove();
                flash.success(data.message);
            },
            error: (err) => {
                flash.err(err)
                console.log(err.responseText);
            }
        })
    }
    addDeletePostHandlers = () => {
        $('.delete-post').click(deletePostHandler)
    }

    const deleteCommentHandler = (e) => {
        e.preventDefault();
        console.log(e.target.href);
        // let link = $(`#${e.target.id}`)
        $.ajax({
            method: "GET",
            url: e.target.href,
            success: (data) => {
                console.log(data);
                console.log($(`#comment-${data.data.comment._id}`))
                $(`#comment-${data.data.comment._id}`).remove();
                flash.success(data.message);
            },
            error: (err) => {
                flash.err(err)
                console.log(err.responseText);
            }
        })
    }
    addDeleteCommentHandlers = () => {
        $('.delete-comment').click(deleteCommentHandler);
    }
    createPost();
    addDeletePostHandlers();
    createComment();
    addDeleteCommentHandlers();
}