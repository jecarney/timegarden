const express = require("express");
const Router = express.Router;
const router = Router();

// router.use("/auth", require("./auth"));
// router.use("/user", require("./user"));
router.use("/project", require("./project"));
router.use("/snapShot", require("./snapShot"));

module.exports = router;
