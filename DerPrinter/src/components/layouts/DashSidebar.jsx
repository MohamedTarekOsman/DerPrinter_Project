/* eslint-disable react/prop-types */

import { useEffect } from "react";
import Logo from "../../assets/images/Logo.png";
import profile from "../../assets/images/profile.png";
import dashboard from "../../assets/svg/dashboard-admin.svg";
import packagee from "../../assets/svg/package.svg";
import blogicon from "../../assets/images/blogicon.png";
import logout from "../../assets/svg/log-out.svg";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllSliders } from "../../Redux/actions/SliderAction";

const DashSidebar = ({ toggleSidebar, isOpen }) => {
  const cookies = new Cookies();
  const user = cookies.get("user");
  const dispatch = useDispatch();
  const { allSliders } = useSelector((state) => state.sliders);

  useEffect(() => {
    dispatch(getAllSliders());
  }, [dispatch]);

  const slider = allSliders[0] || {};
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-black text-white shadow-lg z-40 transition-transform duration-300 md:max-w-[360px] max-w-[300px] w-full ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className={`absolute top-4 right-[-40px] bg-white text-black p-2 rounded-full shadow-md transition-all duration-300 ${
          isOpen ? "rotate-0" : "rotate-180"
        }`}
      >
        {isOpen ? "✖" : "☰"}
      </button>
      <div className="px-8 h-full pb-2 mx-auto flex flex-col items-center">
        <Link to="/" className="flex my-4">
          <img
            src={Logo}
            alt="Logo"
            className="md:w-[190px] sm:w-[160px] w-[135px] md:h-[88px]"
          />
        </Link>

        <div className="flex flex-col items-center mt-12">
          <img src={profile} alt="profile" className="w-[150px] mb-4" />
          <h3 className="font-bold mb-12">{user?.name}</h3>

          <div className="flex flex-col gap-3">
            <Link to="/" className="flex items-center gap-3">
              <img src={dashboard} alt="dashboard" className="" />
              <p className="text-white md:text-[18px] text-[15px]">
                Startseite
              </p>
            </Link>
            <Link
              to={`/dashboard/slider/${slider._id}`}
              className="flex items-center gap-3"
            >
              <img src={packagee} alt="packagee" className="" />
              <p className="text-white md:text-[18px] text-[15px]">
                Schieberegler
              </p>
            </Link>
            <Link to={`/dashboard/blog`} className="flex items-center gap-3">
              <img
                src={blogicon}
                alt="blogicon"
                className="w-10 h-10 text-white filter invert"
              />
              <p className="text-white md:text-[18px] text-[15px]">Blog</p>
            </Link>

            <div
              onClick={() => {
                cookies.remove("user");
                window.location.href = "/login";
              }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <img src={logout} alt="logout" className="" />
              <p className="text-white md:text-[18px] text-[15px]">ausloggen</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashSidebar;
