import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { REGISTER } from "../Redux/types/Types";
import { useEffect } from "react";
// import FacebookLogin from "@greatsumini/react-facebook-login";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
// import facebook from "../assets/images/facebook-2 1.png";
import axios from "axios";
import toast from "react-hot-toast";

const cookies = new Cookies();

const SocialAuth = () => {
  const dispatch = useDispatch();

  const handleUserAuth = async (name, email, fbId = null) => {
    try {
      const response = await axios.post(
        "https://api.derprinter.softforte.site/api/v1/user/facebook",
        { email, name, fbId }
      );
      ;
      ;

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

      // window.location.href = "/";

      // window.location.href = "/";
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

  // const handleFacebookResponse = (response) => {
  //   if (response.name && response.email && response.id) {
  //     const { name, email, id: fbId } = response;
  //     handleUserAuth(name, email, fbId);
  //   } else {
  //     console.error("Facebook signup Error: Invalid response", response);
  //   }
  // };

  useEffect(() => {
    // Wait for Google button to load and apply styles after it's rendered
    const observer = new MutationObserver(() => {
      const googleButton = document.querySelector(".nsm7Bb-HzV7m-LgbsSe-BPrWId");
      if (googleButton) {
        googleButton.classList.add("custom-google-button");
        googleButton.innerHTML("Weiter mit Google");
      }
    });

    // Observe changes in the body for Google button
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-7 w-full max-w-[500px] lg:mt-14 md:mt-12 sm:mt-10 mt-8">
      {/* Google Login Button Styled */}
      <div className="google-login-wrapper flex justify-center">
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
      {/* <FacebookLogin
        // appId="944645997618910" // mo
        appId="589691103806515" // server
        // appId="588447343923134" // local
        autoLoad={false}
        fields="name,email,picture"
        callback={handleFacebookResponse}
        render={({ onClick }) => (
          <button
            onClick={onClick}
            className="facebook-login flex items-center justify-center py-2 px-4 rounded-lg w-full h-12 "
          >
          <button
            onClick={onClick}
            className="facebook-login flex items-center justify-center py-2 px-4 rounded-lg w-full h-12 "
          >
            <img
              src={facebook}
              alt="Facebook"
              className="mr-2 md:h-7 h-6 md:w-7 w-6"
              className="mr-2 md:h-7 h-6 md:w-7 w-6"
            />
            <span className="text-center">Weiter mit Facebook</span>
            <span className="text-center">Weiter mit Facebook</span>
          </button>
        )}
      /> */}
    </div>
  );
};

export default SocialAuth;