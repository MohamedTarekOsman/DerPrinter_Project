import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

const RootLayout = () => {
  const location = useLocation();
  const isDash = location.pathname.includes("dashboard");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]); 
  return (
    <div className="flex flex-col w-full h-screen">
      {!isDash && <Navbar />}
      <div className="flex-1">
        <Outlet />
      </div>
      {!isDash && <Footer />}
    </div>
  );
};

export default RootLayout;
