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
import SideMenu from "./SideMenu";

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
      <div className="lg:px-8 px-5 grid lg:grid-cols-5 grid-cols-2 py-3 items-center gap-3">
        {/* Logo Section */}
        <Link to="/" className="flex mb-4">
          <img
            src={Logo}
            alt="Logo"
            className="md:w-[190px] sm:w-[160px] w-[120px] md:h-[88px]"
          />
        </Link>

        {/* Links Section */}
        <ul className="lg:flex lg:justify-start justify-center lg:px-5 px-0 hidden xl:gap-9 lg:gap-7 md:gap-[20px] gap-4 md:col-span-3 col-span-1">
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
            <Link to="/blogs" className="txtNavbar">
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
        <div ref={userCard} className="lg:block hidden">
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
                          <Link to="/dashboard" className="liNav">
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
          className="flex justify-end lg:hidden text-bgWhite"
          onClick={() => setOpenMenu(true)}
        >
          <MdOutlineMenu className="text-3xl" />
        </div>

        {openMenu && (
          <SideMenu
            menuRef={menuRef}
            setSidebarOpen={setSidebarOpen}
            setOpenMenu={setOpenMenu}
          />
        )}
        {sidebarOpen && <ProfileSidebar setSidebarOpen={setSidebarOpen} />}
      </div>
    </nav>
  );
};

export default Navbar;
