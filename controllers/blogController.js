const Blog = require("../models/blog");

exports.getAllBlogs = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createBlog = (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id);
    res.render("details", { title: "Blog Detail", blog });
  } catch (err) {
    res.status(404).render("404", { title: "Blog not found" });
  }
};

exports.deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    await Blog.findByIdAndDelete(id);
    res.json({ redirect: "/blogs" });
  } catch (err) {
    console.log(err);
  }
};
