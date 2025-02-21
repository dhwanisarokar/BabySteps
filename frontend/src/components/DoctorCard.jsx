import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <div
      className="p-4 border rounded-lg shadow-md hover:shadow-lg cursor-pointer bg-white"
      onClick={() => navigate(`/book/${doctor._id}`)}
    >
      <h3 className="text-lg font-bold">{doctor.name}</h3>
      <p className="text-gray-600">
        Working Hours: {doctor.workingHours.start} - {doctor.workingHours.end}
      </p>
    </div>
  );
};
export default DoctorCard;
