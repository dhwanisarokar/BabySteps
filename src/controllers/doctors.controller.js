const moment = require("moment");
const { Appointment, Doctor } = require("../models/index.js");
const catchAsync = require("../utils/catchAsync");

const getDoctors = catchAsync(async (req, res) => {
  const doctors = await Doctor.find({});
  
  res.json(doctors);
});

const getAvailableSlots = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { date } = req.query;

  const doctor = await Doctor.findById(id);
  if (!doctor) return res.status(404).json({ error: "Doctor not found" });

  const appointments = await Appointment.find({
    doctorId: id,
    date: { $gte: new Date(date), $lt: new Date(date).setHours(23, 59, 59) },
  });

  const slots = [];
  let start = moment(date + " " + doctor.workingHours.start);
  let end = moment(date + " " + doctor.workingHours.end);

  while (start.isBefore(end)) {
    if (!appointments.some((a) => moment(a.date).isSame(start, "minute"))) {
      slots.push(start.format("HH:mm"));
    }
    start.add(30, "minutes");
  }

  res.json(slots);
});

module.exports = {
  getAvailableSlots,
  getDoctors,
};
