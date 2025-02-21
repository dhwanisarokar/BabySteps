import { useState, useEffect } from "react";
import { fetchDoctorSlots } from "../api/api";

const AppointmentForm = ({
  doctorId,
  selectedSlot,
  initialData,
  onClose,
  onSave,
  apptEditable,
  onBookAppiontment,
}) => {
  const [patientName, setPatientName] = useState("");
  const [appointmentType, setAppointmentType] = useState("Routine Check-Up");
  const [notes, setNotes] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);
  // const [appointmentData, setAppointmentData] = useState({
  //   patientName: "",
  //   appointmentType: "",
  //   nots: "",
  //   doctor: {},
  //   date: ""
  // })

  useEffect(() => {
    if (initialData) {
      setPatientName(initialData.patientName);
      setAppointmentType(initialData.appointmentType);
      setNotes(initialData.notes || "");
      const existingDate = initialData.date.split("T")[0]; // Extract YYYY-MM-DD
      const existingTime = new Date(initialData.date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setSelectedDate(existingDate);
      setSelectedTime(existingTime);
      fetchSlots(existingDate);
    }
  }, [initialData]);

  const fetchSlots = async (date) => {
    if (!date) return;
    try {
      const slots = await fetchDoctorSlots(doctorId, date);
      const currentTime = new Date();
      const currentHourMinute = `${currentTime.getHours()}:${currentTime.getMinutes()}`;

      // Convert slots to HH:MM format & filter invalid slots for today
      const formattedSlots = slots
        .map((slot) => {
          const [hour, minute] = slot.split(":");
          return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
        })
        .filter((slot) => {
          return (
            date !== new Date().toISOString().split("T")[0] ||
            slot >= currentHourMinute
          );
        });

      setAvailableSlots(formattedSlots);
      setSelectedTime(formattedSlots[0] || ""); // Default to first available slot
    } catch (error) {
      alert("Error fetching slots: " + error.message);
    }
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    fetchSlots(newDate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (initialData) {
      if (!selectedDate || !selectedTime) {
        alert("Please select a valid date and time slot.");
        return;
      }

      setLoading(true);
      try {
        if (apptEditable) {
          await onSave({
            doctorId,
            date: `${selectedDate} ${selectedTime}`, // Format for backend
            duration: 30,
            appointmentType,
            patientName,
            notes,
          });
        } else {
          onBookAppiontment(appointmentType, patientName, notes);
        }
        alert(
          initialData
            ? "Appointment updated successfully!"
            : "Appointment booked successfully!"
        );
        onClose();
      } catch (error) {
        alert("Error processing request: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Appointment" : "Book Appointment"}
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mt-2">Patient Name:</label>
          <input
            className="border p-2 w-full"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />

          <label className="block mt-2">Appointment Type:</label>
          <select
            className="border p-2 w-full"
            value={appointmentType}
            onChange={(e) => setAppointmentType(e.target.value)}
          >
            <option>Routine Check-Up</option>
            <option>Ultrasound</option>
          </select>

          {apptEditable && (
            <>
              <label className="block mt-2">Select Date:</label>
              <input
                type="date"
                className="border p-2 w-full"
                value={selectedDate}
                min={new Date().toISOString().split("T")[0]} // Restrict past dates
                onChange={handleDateChange}
                required
              />

              <label className="block mt-2">Select Time Slot:</label>
              <select
                className="border p-2 w-full"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
                disabled={availableSlots.length === 0}
              >
                {availableSlots.length === 0 ? (
                  <option>No available slots</option>
                ) : (
                  availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))
                )}
              </select>
            </>
          )}

          <label className="block mt-2">Notes:</label>
          <textarea
            className="border p-2 w-full"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Processing..." : initialData ? "Update" : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
