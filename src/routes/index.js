const express = require("express");
const doctorRoutes = require("./doctor.routes");
const appointmentRoutes = require("./appiontment.routes");

const router = express.Router();

router.use("/doctors", doctorRoutes);
router.use("/appointments", appointmentRoutes);

module.exports = router;