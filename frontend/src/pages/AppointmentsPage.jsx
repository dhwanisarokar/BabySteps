import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { updateAppointment, deleteAppointment } from "../api/api";
import AppointmentForm from "../components/AppointmentForm";

const AppointmentsPage = () => {
  const { appointments, setAppointments, loading, error } = useAppContext();
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (appointment) => {
    console.log(appointment);

    setEditingAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleUpdate = async (updatedData) => {
    try {
      const updatedAppointment = await updateAppointment(
        editingAppointment._id,
        updatedData
      );
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === editingAppointment._id ? updatedAppointment : appt
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      alert("Error updating appointment: " + error.message);
    }
  };

  const handleDelete = async (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        await deleteAppointment(appointmentId);
        setAppointments((prev) =>
          prev.filter((appt) => appt._id !== appointmentId)
        );
      } catch (error) {
        alert("Error deleting appointment: " + error.message);
      }
    }
  };

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Appointments</h1>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul>
          {appointments.map((appt) => (
            <li
              key={appt._id}
              className="border p-4 mb-2 rounded shadow flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>{appt.doctorId.name}</strong> - {appt.appointmentType}
                </p>
                <p>Date: {new Date(appt.date).toLocaleString()}</p>
              </div>
              <div>
                <button
                  className="bg-yellow-500 text-white px-3 py-1 mr-2 rounded"
                  onClick={() => handleEdit(appt)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(appt._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isModalOpen && (
        <AppointmentForm
          doctorId={editingAppointment.doctorId._id}
          selectedSlot={editingAppointment.date}
          initialData={editingAppointment}
          onClose={() => setIsModalOpen(false)}
          onSave={handleUpdate}
          apptEditable
        />
      )}
    </div>
  );
};

export default AppointmentsPage;
