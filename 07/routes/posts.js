const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts");
const { uploadSingle, uploadMultiple } = require("../middlewares/upload");
const { authenticate } = require("../middlewares/auth");

// router.post("/", uploadSingle, postController.createPost);
router.post("/", authenticate, uploadMultiple, postController.createPost);
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

router.post("/:postId/comments", postController.createComment);
router.get("/:postId/comments", postController.getComments);
router.put("/:postId/comments/:id", postController.updateComment);
router.delete("/:postId/comments/:id", postController.deleteComment);

module.exports = router;
