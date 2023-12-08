const express = require("express")
const router = express.Router()
const { createBlog , deleteBlogById , getAllBlogs , getBlogById , getUserBlogs , updateBlogById} = require('../Controller/blogsController');


router.post('/blogs', createBlog);
router.get('/blogs', getAllBlogs);
router.get('/blogs/:id', getBlogById);
router.put('/blogs/:id', updateBlogById);
router.delete('/blogs/:id', deleteBlogById);

// New route to get blogs by user ID
router.get('/user/:userId/blogs', getUserBlogs);

module.exports = router;
