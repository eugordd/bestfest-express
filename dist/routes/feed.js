"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const feed_1 = require("../controllers/feed");
const router = express_1.Router();
// GET /feed/posts
router.get('/posts', feed_1.getPosts);
// POST /feed/post
router.post('/post', feed_1.createPost);
exports.default = router;
