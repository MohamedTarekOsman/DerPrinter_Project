/* eslint-disable react/prop-types */

import google from "../assets/svg/google.svg";
import facebook from "../assets/svg/facebook.svg";
import apple from "../assets/svg/apple-logo.svg";
import ImgButton from "./ui/ImgButton";

const AuthForm = ({ children }) => {
  return (
    <div className="max-w-5xl lg:my-[100px] md:my-[80px] sm:my-[65px] my-[50px] mx-auto md:px-10 px-8">
      <div className="flex items-center flex-col ">
        <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold text-black lg:mb-[38px] md:mb-[30px] sm:mb-[25px] mb-[20px] text-center">
          Melden Sie sich bei Ihrem Konto an !
        </h1>
        <p className="text-black/70 lg:text-2xl md:text-xl sm:text-[18px] text-[15px] text-center sm:px-16 px-0">
          Greifen Sie auf Ihr Konto zu, um Bestellungen zu prüfen, Ihre Projekte
          zu verwalten und über die neuesten Angebote und Updates auf dem
          Laufenden zu bleiben.
        </p>

        {/* Social login buttons */}
        <div className="space-y-7 w-full max-w-[500px] lg:mt-14 md:mt-12 sm:mt-10 mt-8">
          <ImgButton src={google} alt="Google" text="Weiter mit Google" />
          <ImgButton src={facebook} alt="Facebook" text="Weiter mit Facebook" />
          <ImgButton src={apple} alt="Apple" text="Weiter mit Apple" />
        </div>

        <hr className="w-full h-[2px] bg-black/65 block lg:my-12 md:my-10 sm:my-10 my-8" />

        <div className="flex items-center w-full justify-center flex-col">
          <span className="text-black lg:text-2xl md:text-xl text-[18px] font-bold text-center">
            Oder melden Sie sich mit Ihrer E-Mail-Adresse an.
          </span>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
