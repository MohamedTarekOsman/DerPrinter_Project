import Logo from "../../assets/images/Logo.png";
import telephone from "../../assets/svg/telephone.svg";
import User from "../../assets/svg/user.svg";
import store from "../../assets/svg/grocery-store-2 1.svg";
import { useState, useRef, useEffect } from "react";
import ProfileSidebar from "./ProfileSidebar";
import { MdOutlineMenu } from "react-icons/md";
import logout from "../../assets/svg/log-out.svg";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
const cookies = new Cookies();
const user = cookies.get("user");

const Navbar = () => {
  const [open, setopen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userCard = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userCard.current && !userCard.current.contains(event.target)) {
        setopen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  return (
    <nav className="bg-black text-white">
      <div className="lg:px-8 px-5 grid md:grid-cols-5 grid-cols-2 py-3 items-center gap-3">
        {/* Logo Section */}
        <Link to="/" className="flex mb-4">
          <img
            src={Logo}
            alt="Logo"
            className="md:w-[190px] sm:w-[160px] w-[120px] md:h-[88px]"
          />
        </Link>

        {/* Links Section */}
        <ul className="md:flex lg:justify-start justify-center lg:px-5 px-0 hidden xl:gap-11 lg:gap-10 md:gap-[26px] gap-6 md:col-span-3 col-span-1 ">
          <li>
            <Link to="/" className="txtNavbar">
              Startseite
            </Link>
          </li>
          <li>
            <Link to="/OrderOverview" className="txtNavbar">
              Bestellungen
            </Link>
          </li>
          {user?.role === "admin" && (
          <li>
            <Link to="/dashboard" className="txtNavbar">
              Armaturenbrett
            </Link>
          </li>
          )}
          <li>
            <Link to="/Address" className="txtNavbar">
              Unsere Vorteile
            </Link>
          </li>
          <li>
            <Link
              to="/blogs"
              className="txtNavbar"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link to="/about-us" className="txtNavbar">
              Über uns
            </Link>
          </li>
        </ul>

        {/* Icons Section */}
        <div ref={userCard} className="md:block hidden">
          <ul className="flex lg:justify-center justify-end items-end lg:gap-10 md:gap-8 gap-6 cursor-pointer">
            <li>
              <a href="/contact-us">
                <img
                  src={telephone}
                  alt="telephone"
                  className="lg:w-8 sm:w-7 w-6 lg:h-8 sm:h-7 h-6"
                />
              </a>
            </li>
            <li>
              <img
                src={User}
                alt="User"
                onClick={() => setopen(!open)}
                className="lg:w-8 sm:w-7 w-6 lg:h-8 sm:h-7 h-6"
              />
            </li>
            <li>
              <Link to={"/cart"}>
                <img
                  src={store}
                  alt="user"
                  className="lg:w-8 sm:w-7 w-6 lg:h-8 sm:h-7 h-6"
                />
              </Link>
            </li>
          </ul>

          {/* mobile */}
          {open ? (
            <div className="absolute z-50 text-sm xl:right-[140px] lg:right-[120px] md:right-[75px] sm:right-[60px] right-[55px] md:top-[100px] top-[80px] bg-white shadow-lg rounded-md max-w-[240px] w-full border-gray-300 border">
              <ul className="flex flex-col gap-5 text-black text-center py-4 cursor-pointer">
                {user ? (
                  <>
                    <li onClick={() => setSidebarOpen(true)} className="liNav">
                      Profil
                    </li>
                    {user?.role === "admin" && (
                      <>
                        <li>
                          <Link a="/dashBoard" className="txtNavbar">
                            Armaturenbrett
                          </Link>
                        </li>
                        <hr className="w-[90%] h-[3px] block bg-gray-300 mx-auto my-2" />
                      </>
                    )}
                    <li
                      className="flex items-center justify-center gap-2 "
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
                      <p className="liNav">ausloggen</p>
                    </li>
                    
                  </>
                ) : (
                  <>
                    <li className="liNav">
                      <Link to="/login">Anmelden</Link>
                    </li>
                    <li className="liNav">
                      <Link to="/signup">Ein Konto erstellen</Link>
                    </li>
                    <li>
                      <Link to="/about-us" className="txtNavbar">
                        Über uns
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          ) : null}
        </div>

        <div
          className="flex justify-end md:hidden text-bgWhite"
          onClick={() => setOpenMenu(true)}
        >
          <MdOutlineMenu className="text-3xl" />
        </div>

        {openMenu && (
          <div
            ref={menuRef}
            className="absolute z-50 text-sm right-[20px] top-[80px] bg-white shadow-lg rounded-md max-w-[240px] w-full border-gray-300 border"
          >
            <ul className="flex flex-col gap-5 text-black text-center py-3">
              <li>
                <Link
                  to="/"
                  className="hover:underline sm:text-[18px] text-[15px]"
                >
                  Startseite
                </Link>
              </li>
              <li>
                <Link
                  to="Address"
                  className="hover:underline sm:text-[18px] text-[15px]"
                >
                  Unsere Vorteile
                </Link>
              </li>
              <li>
                <Link
                  to="#"
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
                      className="hover:underline sm:text-[18px] text-[15px] text-black"
                    >
                      Bestellungen
                    </Link>
                  </li>
                  {user?.role === "admin" && (
                  <li>
                    <Link
                      to="/dashboard"
                      className="hover:underline sm:text-[18px] text-[15px] text-black"
                    >
                      Armaturenbrett
                    </Link>
                  </li>
                  )}
                  <li>
                    <Link to="/about-us" className="hover:underline sm:text-[18px] text-[15px] text-black">
                      Über uns
                    </Link>
                  </li>
                </ul>
                <hr className="w-[90%] h-[2px] block bg-gray-200 mx-auto" />

                <ul className="flex cursor-pointer justify-between items-center my-3 px-3">
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
                    {/* <span className=" text-gray-800 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Profil
                    </span> */}
                  </li>
                  <li>
                    <img
                      src={store}
                      alt="user"
                      className="w-6 h-6 filter invert"
                    />
                  </li>

                </ul>

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
                  <p className="text-black sm:text-[18px] text-[15px]">
                    ausloggen
                  </p>
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
        )}
        {sidebarOpen && <ProfileSidebar setSidebarOpen={setSidebarOpen} />}
      </div>
    </nav>
  );
};

export default Navbar;
