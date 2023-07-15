const Post = require('../models/post');

async function index(req, res) {
    try {
        const posts = await Post.find({});
        const isLoggedIn= !!req.user;
        const hasPosts = !!posts.length;
        res.render('posts/index', { posts, isLoggedIn, hasPosts });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
}

function newPost(req, res) {
    res.render('posts/new', { title: 'Add Content', errorMsg: '' });
}

async function create(req, res) {
    try {
      const { title, description, link, content } = req.body;
      const newPost = new Post({
        title,
        description,
        link,
        content,
        user: req.user._id
      });
      console.log(newPost);
      await newPost.save();
      res.redirect('/posts');
    } catch (err) {
      console.log(err);
      res.redirect('/');
    }
  }
  

module.exports = {
    index,
    new: newPost,
    create
}