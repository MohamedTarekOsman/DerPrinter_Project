import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const AuthUser = ({ children }) => {
  const user = cookies.get("user");

  if (user && user.email) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthUser;
