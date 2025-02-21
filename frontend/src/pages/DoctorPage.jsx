import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const DoctorPage = () => {
  const { doctors, loading, error } = useAppContext();
  const navigate = useNavigate();

  if (loading) return <p>Loading doctors...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Select a Doctor</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="border p-4 rounded shadow cursor-pointer hover:bg-gray-100"
            onClick={() => navigate(`/book/${doctor._id}`)} // Navigate on click
          >
            <h2 className="text-xl font-semibold">{doctor.name}</h2>
            <p className="text-gray-600">Working Hours: {doctor.workingHours.start} - {doctor.workingHours.end}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorPage;
