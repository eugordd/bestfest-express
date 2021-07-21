"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = exports.getPosts = void 0;
const getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{ title: 'First post', content: 'This is first post!' }]
    });
};
exports.getPosts = getPosts;
const createPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    // Create post in db
    res.status(201).json({
        message: 'Post created successfully',
        post: {
            id: new Date().toISOString(),
            title,
            content
        }
    });
};
exports.createPost = createPost;
exports.default = { getPosts: exports.getPosts, createPost: exports.createPost };
