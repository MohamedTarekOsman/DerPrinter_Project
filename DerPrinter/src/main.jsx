import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Redux/store/Store";
import { GoogleOAuthProvider } from "@react-oauth/google";
//import statement


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="3946753116-upq3gh8h0dsq0b0f3hbgt0sth53jkuql.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
