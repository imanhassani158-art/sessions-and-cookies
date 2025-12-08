const express = require('express')
const router = express.Router();
const { getAllposts, createpost, updatepost, deletePost } = require("../controllers/postController");

router.get("/", getAllposts)
router.post("/", createpost);
router.put("/:id", updatepost);
router.delete("/:id", deletePost);

module.exports = router;