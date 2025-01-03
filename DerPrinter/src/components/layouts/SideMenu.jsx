/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import logout from "../../assets/svg/log-out.svg";
import { IoMdClose } from "react-icons/io";

const cookies = new Cookies();
const user = cookies.get("user");

const SideMenu = ({ menuRef, setOpenMenu }) => {
  const [startX, setStartX] = useState(0);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX > endX + 50 || startX < endX - 50) {
      setOpenMenu(false);
    }
  };

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);

      document.body.classList.remove("overflow-hidden");
    };
  }, [startX]);

  return (
    <div
      ref={menuRef}
      className="absolute z-50 text-sm inset-0 py-10 bg-white shadow-lg w-full border-gray-300 border min-h-screen"
    >
      <button
        onClick={() => setOpenMenu(false)}
        className="absolute top-4 left-4 text-2xl font-bold text-black"
      >
        <IoMdClose />
      </button>
      <ul className="flex flex-col gap-5 text-black text-center py-3">
        <li>
          <Link
            onClick={() => setOpenMenu(false)}
            to="/"
            className="hover:underline sm:text-[18px] text-[15px]"
          >
            Startseite
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
        <li>
          <Link
            onClick={() => setOpenMenu(false)}
            to="/about-us"
            className="hover:underline sm:text-[18px] text-[15px]"
          >
            Über uns
          </Link>
        </li>
      </ul>
      {user ? (
        <>
          <ul className="flex flex-col text-center gap-5">
            <li>
              <Link
                to="Address"
                onClick={() => setOpenMenu(false)}
                className="hover:underline sm:text-[18px] text-[15px] text-black"
              >
                Adressbuch
              </Link>
            </li>
            <li>
              <Link
                to="/OrderOverview"
                onClick={() => setOpenMenu(false)}
                className="hover:underline sm:text-[18px] text-[15px] text-black"
              >
                Bestellungen
              </Link>
            </li>
            {/* <li>
              <Link
                to="/about-us"
                onClick={() => setOpenMenu(false)}
                className="hover:underline sm:text-[18px] text-[15px] text-black"
              >
                Über uns
              </Link>
            </li> */}
            <li>
              <Link
                to="/cart"
                onClick={() => setOpenMenu(false)}
                className="hover:underline sm:text-[18px] text-[15px] text-black"
              >
                Warenkorb
              </Link>
            </li>
          </ul>
          <hr className="w-[90%] h-[2px] block bg-gray-200 mx-auto mt-2" />
          <div
            className="flex items-center justify-center gap-2 my-4 cursor-pointer"
            onClick={() => {
              cookies.remove("user");
              window.location.href = "/login";
            }}
          >
            <img src={logout} alt="logout" className="filter invert w-6 h-6" />
            <p className="text-black sm:text-[18px] text-[15px]">ausloggen</p>
          </div>
        </>
      ) : (
        <ul className="flex flex-col gap-5 text-black text-center py-3">
          <hr className="w-[90%] h-[2px] block bg-gray-200 mx-auto" />
          <li onClick={() => setOpenMenu(false)} className="liNav text-black">
            <Link to="/signup">Ein Konto erstellen</Link>
          </li>
          <li className="liNav text-black">
            <Link onClick={() => setOpenMenu(false)} to="/login">
              Anmelden
            </Link>
          </li>
          {/* <li>
            <Link
              onClick={() => setOpenMenu(false)}
              to="/about-us"
              className="liNav"
            >
              Über uns
            </Link>
          </li> */}
        </ul>
      )}
    </div>
  );
};

export default SideMenu;
