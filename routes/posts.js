const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/posts');
const posts = require('../controllers/posts');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /posts
router.get('/', postsCtrl.index);

// GET /posts/new
router.get('/new', ensureLoggedIn, postsCtrl.new);

// GET /posts/:id
router.get('/:id', postsCtrl.show);

// GET /posts/:id/edit
router.get('/:id/edit', ensureLoggedIn, postsCtrl.edit)

// POST /posts
router.post('/', ensureLoggedIn, postsCtrl.create);

// PUT /posts/:id
router.put('/:id', postsCtrl.update);

// DELETE /posts/:id
router.delete('/:id', ensureLoggedIn, postsCtrl.delete);

// GET /posts/:id/wishlist
router.get('/:id/wishlist', ensureLoggedIn, postsCtrl.toggleWishlist);

module.exports = router;