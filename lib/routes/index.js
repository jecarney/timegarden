const express = require("express");
const Router = express.Router;
const router = Router();

router.use("/auth", require("./auth"));
router.use("/currentLog", require("./currentLog"));
router.use("/project", require("./project"));
router.use("/snapShot", require("./snapShot"));
router.use("/user", require("./user"));

module.exports = router;
