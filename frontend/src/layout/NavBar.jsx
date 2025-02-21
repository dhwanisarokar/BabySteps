import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 bg-blue-600 text-white flex justify-between">
      <Link to="/" className="text-lg font-bold">
        BabySteps
      </Link>
      <div>
        <Link to="/doctors" className="mr-4">
          Doctors
        </Link>
        <Link to="/appointments">My Appointments</Link>
      </div>
    </nav>
  );
};
export default Navbar;
