/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import logout from "../../assets/svg/log-out.svg";
import { IoMdClose } from "react-icons/io";

const cookies = new Cookies();
const user = cookies.get("user");

const SideMenu = ({ menuRef, setSidebarOpen, setOpenMenu }) => {
  return (
    <>
      <div
        ref={menuRef}
        className="absolute z-50 text-sm right-0 top-[0px] h-full py-10 bg-white shadow-lg w-full border-gray-300 border"
      >
        <button
          onClick={() => setOpenMenu(false)}
          className="absolute top-4 left-4 text-2xl font-bold text-black"
        >
          <IoMdClose />
        </button>
        <ul className="flex flex-col gap-5 text-black text-center py-3">
          <li>
            <Link to="/" className="hover:underline sm:text-[18px] text-[15px]">
              Startseite
            </Link>
          </li>

          <li
            onClick={() => setSidebarOpen(true)}
            className="hover:underline sm:text-[18px] text-[15px] cursor-pointer"
          >
            Profil
          </li>

          <li>
            <Link
              to="Address"
              onClick={() => setOpenMenu(false)}
              className="hover:underline sm:text-[18px] text-[15px]"
            >
              Unsere Vorteile
            </Link>
          </li>
          <li>
            <Link
              to="/blogs"
              onClick={() => setOpenMenu(false)}
              className="hover:underline sm:text-[18px] text-[15px]"
            >
              Blog
            </Link>
          </li>
        </ul>
        {user ? (
          <>
            <ul className="flex flex-col text-center gap-5">
              <li>
                <Link
                  to="/OrderOverview"
                  onClick={() => setOpenMenu(false)}
                  className="hover:underline sm:text-[18px] text-[15px] text-black"
                >
                  Bestellungen
                </Link>
              </li>
              {user?.role === "admin" && (
                <li>
                  <Link
                    to="/dashboard"
                    onClick={() => setOpenMenu(false)}
                    className="hover:underline sm:text-[18px] text-[15px] text-black"
                  >
                    Armaturenbrett
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/about-us"
                  onClick={() => setOpenMenu(false)}
                  className="hover:underline sm:text-[18px] text-[15px] text-black"
                >
                  Über uns
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  onClick={() => setOpenMenu(false)}
                  className="hover:underline sm:text-[18px] text-[15px] text-black"
                >
                  cart
                </Link>
              </li>
            </ul>
            <hr className="w-[90%] h-[2px] block bg-gray-200 mx-auto mt-2" />

            {/* <ul className="flex cursor-pointer justify-evenly items-center my-4">
              <li>
                <img
                  src={telephone}
                  alt="telephone"
                  className="w-6 h-6 filter invert"
                />
              </li>
              <li className="relative group ">
                <img
                  src={User}
                  alt="User"
                  onClick={() => setSidebarOpen(true)}
                  className="w-6 h-6 filter invert"
                />
                <span className=" text-gray-800 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Profil
                    </span>
              </li>
              <li>
                <img src={store} alt="user" className="w-6 h-6 filter invert" />
              </li>
            </ul> */}

            <hr className="w-[90%] h-[2px] block bg-gray-200 mx-auto" />
            <div
              className="flex items-center justify-center gap-2 my-4 cursor-pointer"
              onClick={() => {
                cookies.remove("user");
                window.location.href = "/login";
              }}
            >
              <img
                src={logout}
                alt="logout"
                className="filter invert w-6 h-6"
              />
              <p className="text-black sm:text-[18px] text-[15px]">ausloggen</p>
            </div>
          </>
        ) : (
          <ul className="flex flex-col gap-5 text-black text-center py-3">
            <hr className="w-[90%] h-[2px] block bg-gray-200 mx-auto" />

            <li className="liNav text-black">
              <Link to="/login">Anmelden</Link>
            </li>
            <li>
              <Link to="/about-us" className="txtNavbar">
                Über uns
              </Link>
            </li>
            <li className="liNav text-black">
              <Link to="/signup">Ein Konto erstellen</Link>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default SideMenu;
