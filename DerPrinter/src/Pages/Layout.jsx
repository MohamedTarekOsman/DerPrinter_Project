import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

const RootLayout = () => {
  const location = useLocation().pathname;
  const isDash = location.split("/").find((e) => e === "dashboard");

  return (
    <div className="flex flex-col w-full h-screen">
      {isDash == "dashboard" ? null : <Navbar />}
      <div className="flex-1">
        <Outlet />
      </div>
      {isDash == "dashboard" ? null : <Footer />}
    </div>
  );
};

export default RootLayout;
