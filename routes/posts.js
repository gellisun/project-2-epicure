const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/posts');
// const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', postsCtrl.index);

module.exports = router;
