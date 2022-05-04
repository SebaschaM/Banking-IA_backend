const { Router } = require("express");
const { register, login } = require("../controllers/auth.js");
const { uploadMiddleware } = require("../middleware/upload.js");

const router = Router();

router.post("/register", uploadMiddleware.single("photo"), register);
router.post("/login", login);

module.exports = router;
