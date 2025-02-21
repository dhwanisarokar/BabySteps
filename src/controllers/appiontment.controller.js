const { Appointment } = require("../models");
const catchAsync = require("../utils/catchAsync");

const getAppointments = catchAsync(async (req, res) => {
  const appointments = await Appointment.find().populate("doctorId");
  res.json(appointments);
});

const bookAppointment = catchAsync(async (req, res) => {
  const { doctorId, date, duration, appointmentType, patientName } = req.body;
  console.log({ doctorId, date, duration, appointmentType, patientName });
  
  const existing = await Appointment.findOne({ doctorId, date });
  if (existing)
    return res.status(400).json({ error: "Time slot not available" });

  const appointment = new Appointment({
    doctorId,
    date,
    duration,
    appointmentType,
    patientName,
  });
  await appointment.save();
  res.status(201).json(appointment);
});

const updateAppointment = catchAsync(async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(appointment);
});

const deleteAppointment = catchAsync(async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.json({ message: "Appointment deleted" });
});

module.exports = {
  bookAppointment,
  deleteAppointment,
  getAppointments,
  updateAppointment,
};
