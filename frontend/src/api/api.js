import axios from "axios";

const API_URL = "http://localhost:8082/api";

export const fetchDoctors = async () => {
  const response = await axios.get(`${API_URL}/doctors`);
  return response.data;
};

export const fetchDoctorSlots = async (doctorId, date) => {
  const response = await axios.get(`${API_URL}/doctors/${doctorId}/slots`, {
    params: { date },
  });
  return response.data;
};

export const bookAppointment = async (appointmentData) => {
  const response = await axios.post(`${API_URL}/appointments`, appointmentData);
  return response.data;
};

export const fetchAppointments = async () => {
  const response = await axios.get(`${API_URL}/appointments`);
  return response.data;
};

export const updateAppointment = async (appointmentId, updatedData) => {
  const response = await axios.put(
    `${API_URL}/appointments/${appointmentId}`,
    updatedData
  );
  return response.data;
};

export const deleteAppointment = async (appointmentId) => {
  await axios.delete(`${API_URL}/appointments/${appointmentId}`);
};
