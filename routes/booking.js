const express = require("express");
const router = express.Router();
const controller = require("../controller");
const auth = require("../middleware/auth");

router.get("/getAllData", auth, controller.booking.getAll);
router.get("/getById/:id", auth, controller.booking.getById);
router.post("/create", controller.booking.create);
router.patch("/update/:id", auth, controller.booking.update);
router.delete("/delete/:id", auth, controller.booking.delete);

module.exports = router;
