/* eslint-disable react/prop-types */

import { IoMdClose } from "react-icons/io";
import sidebarLogo from "../../assets/images/sidebar-logo.png";
import social from "../../assets/svg/social 2.svg";
import instagram from "../../assets/svg/instagram 2.svg";
import twitter from "../../assets/svg/twitter 2.svg";
import facebook from "../../assets/svg/facebook 2.svg";
import profile from "../../assets/images/profile.png";
import { FaPhoneVolume } from "react-icons/fa6";
import { CgMail } from "react-icons/cg";
import { ImLocation } from "react-icons/im";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

const ProfileSidebar = ({ setSidebarOpen }) => {
  const cookies = new Cookies();
  const user = cookies.get("user");

  return (
    <div className="fixed top-0 right-0 lg:max-w-[440px] w-full h-full bg-white text-black shadow-lg z-50 lg:rounded-l-2xl">
      <button
        onClick={() => setSidebarOpen(false)}
        className="absolute top-4 left-4 text-2xl font-bold"
      >
        <IoMdClose />
      </button>
      <div className="px-8 h-full overflow-y-auto pb-2">
        <img
          src={sidebarLogo}
          alt="sidebarLogo"
          className="md:w-[190px] sm:w-[160px] w-[135px] md:h-[88px] mx-auto my-3"
        />
        <h2 className="lg:text-[30px] md:text-[25px] text-[20px] font-bold mb-2 text-black">
          {user?.role=="male"?"Herr : ":"Frau : "} {user?.name}
        </h2>
        <p className="text-black/80 md:text-[17px] text-[15px]">
          Kundennummer: {user?.id}
        </p>
        <p
          onClick={() => {
            cookies.remove("user");
            window.location.href = "/login";
          }}
          className="block mt-2 text-black/80 md:text-[17px] text-[15px] cursor-pointer text-red-500"
        >
          ausloggen
        </p>

        <hr className="my-5 bg-black/60 block w-full h-[1.5px]" />

        <div className="flex flex-col">
          <h3 className="font-bold text-lg text-black">KUNDENBEREICH</h3>
          <Link to="/orderoverview" className="mt-2 text-black/80 md:text-[17px] text-[15px]">
            Auftragsübersicht
          </Link>
          <Link to="/Address" className="mt-2 text-black/80 md:text-[17px] text-[15px]">
            Adressbuch
          </Link>
        </div>

        <hr className="my-4 bg-black/60 block w-full h-[2px]" />

        <div className="flex flex-col">
          <img src={profile} alt="profile" className="w-[150px] mx-auto" />
          <h3 className="font-bold lg:text-xl md:text-lg text-[15px] md:my-4 my-3">
            Persönliche Kontaktdaten
          </h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <FaPhoneVolume className="md:text-2xl text-xl" />
              <p className="text-black/50 md:text-[18px] text-[15px]">
                {user?.phone}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <CgMail className="md:text-4xl text-2xl" />
              <p className="text-black/50 md:text-[18px] text-[15px]">
                {user?.email}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ImLocation className="md:text-4xl text-2xl" />
              <p className="text-black/50 md:text-[18px] text-[15px]">
                {user?.addresses[0]?.city}
              </p>
            </div>
          </div>
        </div>

        <hr className="my-4 bg-black/60 block w-full h-[2px]" />

        <div>
          <h3 className="font-bold md:text-lg text-[15px]">Folgen Sie uns</h3>
          <div className="flex gap-4 mt-2">
            <a href="https://www.facebook.com/profile.php?id=61570682215802&mibextid=ZbWKwL" className="block" target="_blank">
              <img src={facebook} alt="" />
            </a>
            <a href="https://www.instagram.com/derprinter.official/profilecard/?igsh=b3h5MndraWdqMm5j" className="block " target="_blank">
              <img src={instagram} alt="" />
            </a>
            <a href="https://x.com/Derprinter_off?t=VVZ1A7yAuf0iDJhljrDdHQ&s=09" className="block " target="_blank">
              <img src={twitter} alt="" />
            </a>
            <a href="https://pin.it/5AYzrGnU9" className="block " target="_blank">
              <img src={social} alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
