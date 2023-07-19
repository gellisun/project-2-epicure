const Post = require("../models/post");

async function index(req, res) {
  try {
    const user = req.user;
    let posts = [];
    posts = await Post.find({}).populate("user").sort("-createdAt");
    const isLoggedIn = !!user;
    const hasPosts = !!posts.length;
    let wishlistPosts = [];
    if (isLoggedIn) {
      wishlistPosts = posts.filter(
        (post) => post.wishlist && post.user.equals(user._id)
      );
    }

    res.render("posts/index", { posts, isLoggedIn, hasPosts, wishlistPosts });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
}

function newPost(req, res) {
  res.render("posts/new", { title: "Add Content", errorMsg: "" });
}

async function create(req, res) {
  try {
    const { title, description, link, photo, content, wishlist } = req.body;
    const user = req.user;
    if (!user) {
      return res.redirect("/login");
    }

    const isWishlist = wishlist === "on";
    const newPost = new Post({
      title,
      description,
      link,
      photo,
      content,
      wishlist: isWishlist,
      user: user._id,
    });
    await newPost.save();
    res.redirect("/posts");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
}

async function show(req, res) {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate("user");
    if (!post) {
      return res.redirect("/error");
    }
    const user = req.user;
    const isLoggedIn = !!user;
    const isAuthor = post.user.equals(user._id);

    res.render("posts/show", { post, isLoggedIn, isAuthor });
  } catch (err) {
    console.log(err);
    res.redirect("/posts");
  }
}

async function edit(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      // Handle the case when the post is not found
      // For example, redirect to an error page or display an error message
      return res.redirect("/error");
    }
    if (!post.user.equals(req.user._id)) {
      return res.redirect("/error");
    }
    res.render("posts/edit", { post });
  } catch (err) {
    console.log(err);
    res.redirect("/posts");
  }
}

async function update(req, res) {
  try {
    const { title, description, link, photo, content } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post.user.equals(req.user._id)) {
      return res.redirect("/error");
    }

    await Post.findByIdAndUpdate(req.params.id, {
      title,
      description,
      link,
      photo,
      content,
    });
    res.redirect(`/posts/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.redirect("/posts");
  }
}

async function deletePost(req, res) {
  try {
    const post = await Post.findOne({ _id: req.params.id, user: req.user._id });
    if (!post) return res.redirect("/posts");
    await post.deleteOne();
    res.redirect(`/posts`);
  } catch (err) {
    console.log(err);
    res.redirect("/posts");
  }
}

async function toggleWishlist(req, res) {
  console.log('hello');
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.redirect("/error");
    }

    post.wishlist = !post.wishlist;
    await post.save();
    res.redirect(`/posts/${postId}`);
  } catch (err) {
    console.log(err);
    res.redirect("/posts");
  }
}

module.exports = {
  index,
  new: newPost,
  create,
  show,
  edit,
  update,
  delete: deletePost,
  toggleWishlist,
};
