import Input from "../../components/ui/Input";
// import Button from "../../components/ui/Button";
import AuthForm from "../../components/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Redux/actions/authAction";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
// import male from "../../assets/images/male.png";
// import female from "../../assets/images/female.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [vorname, setVorname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetails, setAddressDetails] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("male");
  const [visible, setVisible] = useState(false);
  const [role, setRole] = useState("user"); // Default role

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const validateForm = () => {
    if (
      !vorname ||
      !name ||
      !email ||
      !password ||
      !address ||
      !postalCode ||
      !city ||
      !phone
    ) {
      toast.error("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const userData = {
      email,
      password,
      name: `${vorname} ${name}`,
      addresses:[
        {
          userName: `${vorname} ${name}`,
          userEmail: email,
          userPhone: phone,
          address,
          AddressDetails: addressDetails,
          city,
          postalCode,
        },
      ],
      phone,
      gender,
      role,
    };

    dispatch(registerUser(userData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Signup successful!");
      window.location.href = "/";
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading) {
    return <Loader />;
  }

  return (
    <AuthForm>
      <form
        onSubmit={handleSubmit}
        className="lg:mt-12 md:mt-10 mt-6 w-full max-w-2xl flex flex-col justify-center items-center"
      >
        <div className="flex flex-col max-w-[500px] w-full justify-center mx-auto">
          <div className="flex justify-between px-10 text-3xl mb-5">
            <label>
              <input
                type="radio"
                value="male"
                checked={gender === "male"}
                className="w-5 h-5 mx-2"
                onChange={(e) => setGender(e.target.value)}
              />
              Herr
            </label>
            <label>
              <input
                type="radio"
                value="female"
                checked={gender === "female"}
                className="w-5 h-5 mx-2"
                onChange={(e) => setGender(e.target.value)}
              />
              Frau
            </label>
          </div>

          <Input
            type="text"
            placeholder="Vorname"
            error={error?.vorname}
            value={vorname}
            onChange={(e) => setVorname(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Nachname"
            error={error?.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Straße und Hausnummer"
            className="md:mb-4 mb-2 w-full"
            error={error?.address}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Adresszusatzinformation"
            className="md:mb-4 mb-2"
            error={error?.addressDetails}
            value={addressDetails}
            onChange={(e) => setAddressDetails(e.target.value)}
          />
          <div className="flex gap-2 md:mb-4 mb-2">
            <Input
              type="text"
              placeholder="Postleitzahl"
              error={error?.postalCode}
              value={postalCode}
              onChange={(e) => setpostalCode(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Ort"
              error={error?.city}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <Input
            type="text"
            placeholder="Telefonnummer"
            className="md:mb-4 mb-2"
            error={error?.phone}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            type="email"
            placeholder="E-Mail-Adresse"
            className="md:mb-4 mb-2"
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
        </div>

        {/* Submit as User */}
        <button
          type="submit"
          className="bg-black text-white hover:bg-gray-800 w-full max-w-[500px] mt-6 py-4 rounded-xl"
          onClick={() => setRole("user")}
        >
          Als Benutzer ein Konto erstellen
        </button>

        {/* Submit as Company */}
        <button
          type="submit"
          className="bg-gray-500 text-white hover:bg-gray-600 w-full max-w-[500px] mt-6 py-4 rounded-xl"
          onClick={() => setRole("company")}
        >
          Als Unternehmen ein Konto erstellen
        </button>
      </form>
    </AuthForm>
  );
};

export default Signup;


