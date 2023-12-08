const blogSchema = require('../Model/blog');

// Create a new blog
const createBlog = async (req, res) => {
  try {
    const newBlog = await blogSchema.create(req.body);
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all blogs
const getAllBlogs = async (req, res) => {
    try {
      console.log('Getting all blogs...');
      const blogs = await blogSchema.find();
      res.status(200).json(blogs);
    } catch (error) {
      console.error('Error getting blogs:', error);
      res.status(500).json({ error: error.message });
    }
  };
  

// Get a specific blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await blogSchema.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a blog by ID
const updateBlogById = async (req, res) => {
  try {
    const updatedBlog = await blogSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a blog by ID
const deleteBlogById = async (req, res) => {
  try {
    const deletedBlog = await blogSchema.findByIdAndRemove(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserBlogs = async (req, res) => {
  console.log("req.params.userId", req.params.userId);

  try {
    const blogs = await blogSchema.find({ user: req.params.userId });
    
    if (blogs.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error getting user blogs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
  getUserBlogs
};
