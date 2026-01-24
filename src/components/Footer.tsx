import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="bg-slate-900 p-2  mt-auto">
      {/* <p className="text-center">One day. One step. No zero days.</p> */}
      <div  className="text-center">
        <span>Depressed?</span>
        <Link to="/motivation" className="ml-2 text-blue-600">
          see more..
        </Link>
      </div>

      <p className="text-center">NoZeroDays · © 2026</p>
    </div>
  );
};

export default Footer;
