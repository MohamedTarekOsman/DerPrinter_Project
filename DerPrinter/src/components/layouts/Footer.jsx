import Logo from "../../assets/images/Logo.png";
import gmail from "../../assets/svg/gmail.svg";
import telephone from "../../assets/svg/telephone.svg";
import paypal from "../../assets/svg/paypal-2 1.svg";
import visa from "../../assets/svg/visa-2 1.svg";
import card from "../../assets/svg/card 1.svg";
import social from "../../assets/svg/social 2.svg";
import instagram from "../../assets/svg/instagram 2.svg";
import twitter from "../../assets/svg/twitter 2.svg";
import facebook from "../../assets/svg/facebook 2.svg";
import arrow from "../../assets/svg/arrow.svg";
import flag from "../../assets/svg/german-flag 1.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="lg:px-8 px-5 w-full bg-black py-20">
        <div className="grid md:grid-cols-3 grid-cols-2">
          {/* Logo */}
          <div className="w-full md:col-span-1 col-span-2">
            <a href="/">
              <img
                src={Logo}
                alt="Logo"
                className="md:w-[190px] w-[160px] md:h-[88px]"
              />
            </a>
            <p className="xl:text-[24px] lg:text-[22px] text-[18px] md:mt-7 mt-4 text-white/60">
              Sie brauchen es. Wir drucken es. <br />
              Sie lieben es.
            </p>
          </div>

          {/* Section */}
          <div className="col-span-2 grid sm:grid-cols-3 grid-cols-2 md:mt-0 mt-10">
            {/* Produkte Section */}
            <div className="w-full mb-6 md:mb-0">
              <h3 className="headFooter">Produkte</h3>
              <ul className="txtFooter space-y-[15px]">
                <li>Flyer</li>
                <li>Flazflyer</li>
                <li>Klebefolien</li>
                <li>Schilder</li>
                <li>Roll-Ups</li>
                <li>Visitenkarten</li>
              </ul>
            </div>

            {/* Dienstleistungen Section */}
            <div className="w-full mb-6 md:mb-0">
              <h3 className="headFooter">Dienstleistungen</h3>
              <ul className="txtFooter md:space-y-[18px] space-y-[15px]">
                <li>Geschäftsdruck</li>
                <li>Marketing</li>
                <li>Beschilderung</li>
                <li>Personalisierter Druck</li>
                <li>Verpackungsdruck</li>
              </ul>
            </div>

            {/* Kontakt Section */}
            <div className="w-full">
              <h3 className="headFooter">kontaktiere uns</h3>
              <ul className="md:space-y-[18px] space-y-[15px]">
                <li className="flex items-center space-x-2">
                  <img src={telephone} alt="telephone" className="lg:h-6 h-5" />
                  <span className="txtFooter">+49 30 12345678</span>
                </li>
                <li className="flex items-center space-x-2">
                  <img src={gmail} alt="Email" className="lg:h-6 h-5" />
                  <span className="txtFooter">printservices@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="bg-bgWhite px-5 w-full md:py-10 py-6 my-auto">
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-0 sm:gap-7 gap-4">
          <div>
            <Link to='/AGB'>
            <span>
            AGB , &nbsp;&nbsp;
          </span>
          </Link>
          <Link to='/Datenschutz'>
            <span>
            Datenschutz , &nbsp;&nbsp;
          </span>
          </Link>
          <Link to='/Impressum'>
            <span>
            Impressum
          </span>
          </Link>
          </div>
          

          <ul className="flex md:gap-1 gap-4 lg:justify-center sm:justify-end items-center">
            <li>
              <img src={visa} alt="visa" />
            </li>
            <li>
              <img src={card} alt="card" />
            </li>
            <li>
              <img src={paypal} alt="paypal" />
            </li>
          </ul>

          <div className="flex mx-auto items-center lg:justify-around justify-between w-full">
            <div className="flex gap-3">
              <a href="#" className="block" target="_blank">
                <img src={facebook} alt="" />
              </a>
              <a href="#" className="block " target="_blank">
                <img src={instagram} alt="" />
              </a>
              <a href="#" className="block " target="_blank">
                <img src={twitter} alt="" />
              </a>
              <a href="#" className="block " target="_blank">
                <img src={social} alt="" />
              </a>
            </div>

            <div className="flex gap-1">
              <img src={flag} alt="flag" className="w-[44px]" />
              <img src={arrow} alt="arrow" className="w-[13px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
