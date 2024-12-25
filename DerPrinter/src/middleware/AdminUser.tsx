import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const AdminUser = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = cookies.get("user");

    if (!user) {
      navigate("/login");
      return;
    }

    if (user?.role !== "admin") {
      navigate("/");
      return;
    }
  }, [navigate]);

  return children;
};

export default AdminUser;
