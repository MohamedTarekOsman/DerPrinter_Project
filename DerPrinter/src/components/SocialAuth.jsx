import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { REGISTER } from "../Redux/types/Types";
import { useEffect } from "react";
import FacebookLogin from '@greatsumini/react-facebook-login';
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import facebook from "../assets/images/facebook-2 1.png";
import axios from "axios";
import toast from "react-hot-toast";

const cookies = new Cookies();

const SocialAuth = () => {
  const dispatch = useDispatch();

  // Function to handle authentication
  const handleUserAuth = async (name, email, fbId = null) => {
    try {
      const response = await axios.post(
        "https://api.derprinter.softforte.site/api/v1/user/facebook",
        { email, name, fbId }
      );
      console.log(response, "res");

      if (response.data.exists) {
        toast.success("Erfolgreich eingeloggt!");
      } else {
        toast.success("Konto erfolgreich erstellt!");
      }

      cookies.set("user", response.data?.data, {
        path: "/",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        secure: true,
      });

      dispatch({ type: REGISTER, payload: email });
    } catch (error) {
      toast.error("Es gab einen Fehler bei der Verbindung mit dem Server.");
      console.error("Error during user authentication:", error);
    }
  };

  // Handling Google login response
  const handleGoogleResponse = (response) => {
    const { name, email, sub } = response;
    if (name && email) {
      handleUserAuth(name, email, sub);
    } else {
      console.error("Google signup Error: Invalid response", response);
    }
  };

  const handleFacebookResponse = (response) => {
    if (response.name && response.email && response.id) {
      const { name, email, id: fbId } = response;
      handleUserAuth(name, email, fbId);
    } else {
      console.error("Facebook signup Error: Invalid response", response);
    }
  };

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTimeout(() => {
        const googleButton = document.querySelector(
          ".nsm7Bb-HzV7m-LgbsSe-BPrWId"
        );
        const container = document.querySelector(
          ".nsm7Bb-HzV7m-LgbsSe-bN97Pc-sM5MNb"
        );
        const img = document.querySelector(".nsm7Bb-HzV7m-LgbsSe-Bz112c");
  
        if (googleButton) {
          // Change the button text
          googleButton.textContent = "Mit Google anmelden";
  
          // Add custom styles using classList
          googleButton.classList.add(
            "text-black",
            "md:text-2xl",
            "text-[18px]",
            "font-extrabold"
          );
          container.classList.add(
            "rounded-lg",
            "flex",
            "justify-center",
            "gap-2"
          );
          container.style.width = "auto";
          img.style.width = "23px";
          img.style.height = "23px";
        }
      }, 100); // Small delay
    });
  
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  
    return () => observer.disconnect();
  }, []);
  

  return (
    <div className="space-y-7 w-full max-w-[500px] lg:mt-14 md:mt-12 sm:mt-10 mt-8">
      {/* Google Login Button Styled */}
      <div className="google-login-wrapper">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const decode = jwtDecode(credentialResponse.credential);
            handleGoogleResponse(decode);
          }}
          onError={() => {
            console.error("Login Failed");
          }}
        />
      </div>

      {/* Facebook Login Button */}
      <FacebookLogin
        appId="944645997618910"
        autoLoad={false}
        fields="name,email,picture"
        callback={handleFacebookResponse}
        render={({ onClick }) => (
          <button
            onClick={onClick}
            className="facebook-login flex items-center justify-center py-2 px-4 rounded-lg w-full h-12 "
          >
            <img
              src={facebook}
              alt="Facebook"
              className="mr-2 md:h-7 h-6 md:w-7 w-6"
            />
            <span className="text-center">Weiter mit Facebook</span>
          </button>
        )}
      />
    </div>
  );
};

export default SocialAuth;