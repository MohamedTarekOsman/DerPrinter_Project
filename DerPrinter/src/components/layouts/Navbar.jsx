// import Logo from "../../assets/images/Logo.png";
import Logo from "../../assets/images/Derprinter.jpg";
// import Logo from "../../assets/svg/Logo.svg";
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
import { IoMdClose } from "react-icons/io";

const cookies = new Cookies();
const user = cookies.get("user");

const Navbar = () => {
  const [open, setopen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userCard = useRef(null);
  const menuRef = useRef(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    setTouchEnd(e.changedTouches[0].clientX);
    const swipeDistance = touchStart - touchEnd;

    if (Math.abs(swipeDistance) > 50) {
      setopen(false);
    }
  };

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
      <div className="lg:px-8 px-5 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div
            className="flex md:hidden text-bgWhite my-auto"
            onClick={() => setOpenMenu(true)}
          >
            <MdOutlineMenu className="text-xl" />
          </div>
          {/* Logo Section */}
          <Link to="/" className="flex mb-[-6px]">
            <img
              src={Logo}
              alt="Logo"
              className="lg:w-[190px] sm:w-[160px] w-[100px] lg:h-[88px] md:h-[77px] sm:h-[70px] h-[60px]"
            />
          </Link>
        </div>

        {/* Links Section */}
        <ul className="md:flex lg:justify-start justify-center lg:px-5 px-0 hidden xl:gap-9 lg:gap-7 md:gap-[16px] gap-4">
          <li>
            <Link to="/" className="txtNavbar">
              Startseite
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/OrderOverview" className="txtNavbar">
                  Bestellungen
                </Link>
              </li>

              <li>
                <Link to="/Address" className="txtNavbar">
                  Adresse
                </Link>
              </li>
            </>
          ) : (
            ""
          )}
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
        <div ref={userCard} className="">
          <ul className="flex lg:justify-center justify-end items-end lg:gap-10 gap-[22px] cursor-pointer">
            <li>
              <a href="/contact-us">
                <img
                  src={telephone}
                  alt="telephone"
                  className="lg:w-8 md:w-[25px] w-[20px] lg:h-8 md:h-[25px] h-[20px]"
                />
              </a>
            </li>
            <li>
              <img
                src={User}
                alt="User"
                onClick={() => setopen(!open)}
                className="lg:w-8 md:w-[25px] w-[20px] lg:h-8 md:h-[25px] h-[20px]"
              />
            </li>
            <li>
              <Link to={"/cart"}>
                <img
                  src={store}
                  alt="user"
                  className="lg:w-8 md:w-[25px] w-[20px] lg:h-8 md:h-[25px] h-[20px]"
                />
              </Link>
            </li>
          </ul>

          {/* mobile */}
          {open ? (
            <>
              <button
                onClick={() => setopen(false)}
                className=" md:absolute fixed top-4 left-4 text-2xl font-bold text-black md:hidden block z-[55]"
              >
                <IoMdClose />
              </button>
              <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="md:absolute fixed h-screen flex flex-col md:justify-center z-50 text-sm xl:right-[140px] lg:right-[120px] md:right-[75px] md:py-0 py-10 right-0 md:top-[100px] top-0 bg-white shadow-lg md:rounded-md md:max-w-[240px] w-full md:max-h-[185px] border-gray-300 border"
              >
                <ul className="flex flex-col gap-5 text-black text-center py-4 cursor-pointer">
                  {user ? (
                    <>
                      <li
                        onClick={() => setSidebarOpen(true)}
                        className="liNav"
                      >
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
                        <Link onClick={() => setopen(false)} to="/signup">
                          Ein Konto erstellen
                        </Link>
                      </li>
                      <li className="liNav">
                        <Link onClick={() => setopen(false)} to="/login">
                          Anmelden
                        </Link>
                      </li>

                      <li className="liNav">
                        <Link onClick={() => setopen(false)} to="/about-us">
                          Über uns
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </>
          ) : null}
        </div>

        {openMenu && <SideMenu menuRef={menuRef} setOpenMenu={setOpenMenu} />}
        {sidebarOpen && <ProfileSidebar setSidebarOpen={setSidebarOpen} />}
      </div>
    </nav>
  );
};

export default Navbar;
