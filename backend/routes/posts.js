const express = require('express');

const Posts = require('../controllers/post');
const router = express.Router();
const checkAuth = require('../middlware/check-auth');
const extractFile = require('../middlware/file');


router.post("", checkAuth, extractFile, Posts.createPosts);

router.put("/:id", checkAuth, extractFile, Posts.updatePost);

router.get('/:id', Posts.getPost);

router.delete("/:id", checkAuth, Posts.deletePost);

router.get("", Posts.getPosts);

module.exports = router;
