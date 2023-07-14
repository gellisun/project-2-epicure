const Post = require('../models/post');

async function index(req, res) {
    try {
        const posts = await Post.find({});
        const isLoggedInHasPosts = !!req.user && !!posts.length;
        console.log(isLoggedInHasPosts);
        res.render('posts/index', {posts, isLoggedInHasPosts});
    } catch(err) {
        console.log(err);
        res.redirect('/');
    }
}

module.exports = {
    index
}