const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(blogController.createBlog);

router.get("/create", (req, res) => {
  res.render("create", { title: "Create new Blog" });
});

router
  .route("/:id")
  .get(blogController.getBlog)
  .delete(blogController.deleteBlog);

module.exports = router;
