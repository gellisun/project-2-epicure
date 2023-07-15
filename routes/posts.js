const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/posts');
const posts = require('../controllers/posts');
// const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /books
router.get('/', postsCtrl.index);

// GET /books/new
router.get('/new', postsCtrl.new);

// POST /books
router.post('/', postsCtrl.create);

module.exports = router;
