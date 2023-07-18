const Post = require('../models/post');

async function create(req, res) {
    const post = await Post.findById(req.params.id);
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    console.log(req.user.avatar);

    post.comments.push(req.body);

    try {
        await post.save();
    } catch(err) {
        console.log(err);
    }
    res.redirect(`/posts/${post._id}`);
}

async function edit(req, res) {
    const post = await Post.findOne({'comments._id': req.params.id});
    const comment = post.comments.id(req.params.id);
    res.render('comments/edit', {comment});
}

async function update(req, res) {
    const post = await Post.findOne({'comments._id': req.params.id});
    const commentSubdoc = post.comments.id(req.params.id);
    console.log('hello', commentSubdoc);
    if(!commentSubdoc.user.equals(req.user._id)) return res.redirect(`/posts/${post._id}`);
    commentSubdoc.content = req.body.content;
    try {
        await post.save();
    } catch(err) {
        console.log(err);
    }
    res.redirect(`/posts/${post._id}`);
}

async function deleteComment(req, res) {
    const post = await Post.findOne({'comments._id': req.params.id, 'comments.user': req.user._id});
    if(!post) return res.redirect(`/posts/${post._id}`);
    post.comments.remove(req.params.id);
    await post.save();
    res.redirect(`/posts/${post._id}`);
}

module.exports = {
    create,
    edit,
    update,
    delete: deleteComment
}