import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Redux/store/Store";
import { GoogleOAuthProvider } from "@react-oauth/google";
//import statement


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="166243804416-vpi65meg2gr6vnme9a96eb87jcn690fo.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
