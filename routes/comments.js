const express = require('express');
const router = express.Router();

const commentsCtrl = require('../controllers/comments');
const ensureLoggedIn = require('../config/ensureLoggedIn');

//POST /movies/:id/comments
router.post('/posts/:id/comments', commentsCtrl.create);

// DELETE /comments/:id
router.delete('/comments/:id', ensureLoggedIn, commentsCtrl.delete);

// GET	/comments/:id/edit commentsCtrl.edit
router.get('/comments/:id/edit', ensureLoggedIn, commentsCtrl.edit);
// PUT /comments/:id commentsCtrl.update
router.put('/comments/:id', commentsCtrl.update);	

module.exports = router;