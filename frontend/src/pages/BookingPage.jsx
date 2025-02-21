// src/pages/BookingPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bookAppointment, fetchDoctorSlots } from "../api/api";
import AppointmentForm from "../components/AppointmentForm";
import { useAppContext } from "../context/AppContext";

const BookingPage = () => {
  const { setAppointments } = useAppContext();
  const { doctorId } = useParams();
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const today = new Date();
  const minDate = today.toISOString().split("T")[0]; // Restrict past dates

  const convertSlotIntoDateObject = (slot) => {
    const [hours, minutes] = slot.split(":").map(Number);
    const slotDate = new Date(selectedDate);

    slotDate.setHours(hours, minutes, 0, 0); // Set hours and minutes
    return slotDate;
  };

  useEffect(() => {
    if (!selectedDate) return;

    const loadSlots = async () => {
      setLoading(true);
      try {
        let availableSlots = await fetchDoctorSlots(doctorId, selectedDate);

        // Convert slots from "HH:mm" format to valid Date objects
        availableSlots = availableSlots.map((slot) => {
          return convertSlotIntoDateObject(slot);
        });

        // If today, filter out past slots
        if (selectedDate === minDate) {
          availableSlots = availableSlots.filter((slotTime) => {
            return slotTime.getTime() >= today.getTime(); // Ensure it's in the future
          });
        }

        // Convert filtered slots back to "HH:mm" format
        availableSlots = availableSlots.map((slotTime) => {
          const hours = slotTime.getHours().toString().padStart(2, "0");
          const minutes = slotTime.getMinutes().toString().padStart(2, "0");
          return `${hours}:${minutes}`;
        });

        setSlots(availableSlots);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSlots();
  }, [doctorId, selectedDate, minDate]);

  const handleSlotClick = (slot) => {
    setSelectedSlot(convertSlotIntoDateObject(slot));
    setIsModalOpen(true);
  };

  const onBookAppiontment = async ({ appointmentType, patientName, notes }) => {
    try {
      const newAppointment = await bookAppointment({
        doctorId,
        date: selectedSlot,
        duration: 30,
        appointmentType,
        patientName,
        notes,
      });

      setAppointments((prev) => [...prev.newAppointment]);
    } catch (error) {
      alert("Error booking appointment: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Book an Appointment</h1>

      {/* Date Picker with min date restriction */}
      <label className="block mb-2">Select Date:</label>
      <input
        type="date"
        className="border p-2 rounded"
        value={selectedDate}
        min={minDate} // Prevent past dates
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      {loading && <p>Loading slots...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {slots.length > 0 && (
        <div className="my-4">
          <h2 className="text-xl font-bold">Available Slots</h2>
          <div className="grid grid-cols-2 md:grid-cols-8 gap-4 mt-2">
            {slots.map((slot) => (
              <button
                key={slot}
                className={`p-2 border rounded ${
                  selectedSlot === slot
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => handleSlotClick(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedSlot && isModalOpen && (
        <AppointmentForm
          doctorId={doctorId}
          selectedSlot={selectedSlot}
          onClose={() => setIsModalOpen(false)}
          onBookAppiontment={onBookAppiontment}
        />
      )}
    </div>
  );
};

export default BookingPage;
