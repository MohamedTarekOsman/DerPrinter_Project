import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
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
import Select from "react-select";

const Signup = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetails, setAddressDetails] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [visible, setVisible] = useState(false);
  const [gender, setGender] = useState("male");

  const navigate = useNavigate();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const options = [
    { value: "male", label: "männlich" },
    { value: "female", label: "weiblich" },
  ];

  const handleChange = (selectedOption) => {
    setGender(selectedOption.value); // تحديث الحالة بناءً على اختيار المستخدم
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const gender = gender === "male" ? "male" : "female";

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("address", address);
    formData.append("addressDetails", addressDetails);
    formData.append("postalCode", postalCode);
    formData.append("city", city);
    formData.append("phone", phone);
    formData.append("gender", gender);
    dispatch(
      registerUser({
        email,
        password,
        name,
        address,
        addressDetails,
        postalCode,
        phone,
        city,
        gender,
      })
    );
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
      {/* Email SignUp form */}
      <form
        onSubmit={handleSubmit}
        className="lg:mt-12 md:mt-10 mt-6 w-full max-w-2xl"
      >
        <div className="flex flex-col max-w-[500px] w-full justify-center mx-auto">
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

          <div className="">
            <Select
              placeholder="Choose..."
              options={options}
              isSearchable={false}
              value={options.find((option) => option.value === gender)}
              onChange={handleChange}
            />
          </div>

          {/* <div className="flex gap-4 mb-4 inputLogin justify-between">
            <label htmlFor="gender" className="flex items-center">
            Geschlecht
            </label>
            <select
              name="gender"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mr-2 p-2 border border-gray-300 rounded"
            >
              <option value="male">männlich</option>
              <option value="female">weiblich</option>
            </select>
          </div> */}
        </div>

        <Button
          type="submit"
          text="Als Unternehmen ein Konto erstellen"
          className="bg-black text-white hover:bg-gray-800 w-full max-w-2xl mt-6"
        />
      </form>

      <h3 className="lg:my-5 md:my-4 my-3 md:text-[20px] sm:text-[17px] text-[15px] text-black font-semibold">
        Oder
      </h3>

      <a
        className="bg-white hover:bg-gray-100 max-w-2xl w-full btnLog text-center"
        href="/login"
      >
        Erstellen Sie ein Konto als Einzelperson
      </a>
    </AuthForm>
  );
};

export default Signup;
