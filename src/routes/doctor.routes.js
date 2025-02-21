const express = require("express");
const { doctorController } = require("../controllers");

const router = express.Router();

router.get("/", doctorController.getDoctors);
router.get("/:id/slots", doctorController.getAvailableSlots);

module.exports = router;
