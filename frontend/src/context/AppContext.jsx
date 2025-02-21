import { createContext, useContext, useState, useEffect } from "react";
import { fetchDoctors, fetchAppointments } from "../api/api";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDoctors = async () => {
      setLoading(true);
      try {
        setDoctors(await fetchDoctors());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadDoctors();
  }, []);

  useEffect(() => {
    const loadAppointments = async () => {
      setLoading(true);
      try {
        setAppointments(await fetchAppointments());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadAppointments();
  }, []);

  return (
    <AppContext.Provider
      value={{ doctors, appointments, setAppointments, loading, error }}
    >
      {children}
    </AppContext.Provider>
  );
};
