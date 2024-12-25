import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import AuthForm from "../../components/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/actions/authAction";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // setLoading(true); 
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Login successful!");
      window.location.href = "/";
    } else if (error) {
      toast.error(error);
    }
  }, [isAuthenticated, error, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <AuthForm>
      {/* Email login form */}
      <form
        onSubmit={handleSubmit}
        className="lg:mt-12 md:mt-10 mt-6 max-w-2xl w-full"
      >
        <div className="flex flex-col max-w-[500px] w-full justify-center mx-auto">
          <Input
            type="email"
            placeholder="E-Mail"
            className="lg:mb-[30px] md:mb-[25px] sm:mb-[20px] mb-[17px]"
            error={error?.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type={visible ? "text" : "password"}
            placeholder="Passwort"
            className="md:mb-4 mb-2"
            error={error?.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={
              visible ? (
                <FaEyeSlash
                  className=" text-gray-400 cursor-pointer"
                  onClick={() => setVisible(!visible)}
                />
              ) : (
                <FaEye
                  className="text-gray-400 cursor-pointer"
                  onClick={() => setVisible(!visible)}
                />
              )
            }
          />
          <a href="#" className="text-sm text-black underline">
            Passwort vergessen?
          </a>
          <p className="text-xs text-black/50 md:my-6 my-4">
            Ich stimme den Nutzungsbedingungen zu, dass Sie meine persönlichen
            Daten gemäß der Datenschutzrichtlinie verwenden, und erkenne an,
            dass ich das Recht habe, meine Zustimmung jederzeit zu widerrufen.
          </p>
        </div>
        <Button
          type="submit"
          text="Anmelden"
          className="bg-black text-white hover:bg-gray-800 max-w-2xl w-full "
        />
      </form>

      <h3 className="lg:my-5 md:my-4 my-3 md:text-[20px] sm:text-[17px] text-[15px] text-black font-semibold">
        Oder
      </h3>

      <a
        href="/signup"
        className="bg-white hover:bg-gray-100 max-w-2xl w-full btnLog text-center"
      >
        Ein Konto erstellen
      </a>
    </AuthForm>
  );
};

export default Login;
