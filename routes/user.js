const express = require("express");
const router = express.Router();
const controller = require("../controller");
const auth = require("../middleware/auth");

router.get("/getAllData", auth, controller.user.getAll);
router.get("/getById/:id", auth, controller.user.getById);
router.post("/register", controller.user.register);
router.post("/login", controller.user.login);
router.patch("/update/:id", auth, controller.user.update);
router.delete("/delete/:id", auth, controller.user.delete);

module.exports = router;
