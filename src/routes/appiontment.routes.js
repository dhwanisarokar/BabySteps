const express = require("express");
const { appiontmentController } = require("../controllers");

const router = express.Router();

router.get("/", appiontmentController.getAppointments);
router.post("/", appiontmentController.bookAppointment);
router.put("/:id", appiontmentController.updateAppointment);
router.delete("/:id", appiontmentController.deleteAppointment);

module.exports = router;