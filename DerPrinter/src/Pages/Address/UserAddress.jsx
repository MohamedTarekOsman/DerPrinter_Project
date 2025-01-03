import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import { addAddress, deleteAddress, getUserById } from "../../Redux/actions/usersAction";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { CgTrash } from "react-icons/cg";

const UserAddress = () => {
    const cookies = new Cookies();
    const user = cookies.get("user");
    const dispatch = useDispatch();
    const userRes = useSelector((state) => state.users.oneUser);

    const [showForm, setShowForm] = useState(false); // To toggle form visibility
    const [newAddress, setNewAddress] = useState({
        firstName: "",
        lastName: "",
        userEmail: "",
        userPhone: "",
        address: "",
        AddressDetails: "",
        postalCode: "",
        city: "",
    });

    useEffect(() => {
        const run = async () => {
            await dispatch(getUserById(user._id));
        };
        run();
    }, [dispatch, user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleAddAddress = async () => {
        const { firstName, lastName, ...rest } = newAddress;
        const userName = `${firstName} ${lastName}`.trim();

        if (
            firstName &&
            lastName &&
            newAddress.userEmail &&
            newAddress.userPhone &&
            newAddress.address &&
            newAddress.AddressDetails &&
            newAddress.postalCode &&
            newAddress.city
        ) {
            await dispatch(addAddress(user._id, { userName, ...rest })); // Add name and other fields
            await dispatch(getUserById(user._id)); // Refresh the addresses
            toast.success("Adresse erfolgreich hinzugefügt");
            setShowForm(false); // Hide the form after submission
            setNewAddress({
                firstName: "",
                lastName: "",
                userEmail: "",
                userPhone: "",
                address: "",
                AddressDetails: "",
                postalCode: "",
                city: "",
            }); // Reset form
        }
    };

    const handleDeleteAddress = async (address) => {
        await dispatch(deleteAddress(user._id, address._id));
        await dispatch(getUserById(user._id));
        toast.success("Adresse erfolgreich gelöscht");
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="w-full my-28 bg-gray-300 py-14">
                <div className="w-[90%] mx-auto">
                    {/* Header Section */}
                    <h1 className="text-2xl font-bold mb-2">Adressbuch</h1>
                    <hr className="border-gray-400 border-t-1 my-10" />
                    <p className="text-gray-600 text-sm mb-6">
                        Legen Sie hier Ihre Lieferadressen an. Sie können diese dem jeweiligen
                        Auftrag hinzufügen, wohin Artikel und Belegexemplare gesendet werden sollen.
                        Der Versand ist nur innerhalb Deutschlands möglich. Packstationen, Postfächer
                        und DHL-Postfilialen können nicht beliefert werden.
                    </p>
                    <hr className="border-gray-400 border-t-1 my-10" />

                    {/* Button Section */}
                    <div className="flex justify-between items-center mb-8">
                        <p
                            className="flex items-center text-lg font-bold py-2 px-4 cursor-pointer"
                            onClick={() => setShowForm(!showForm)}
                        >
                            <FiPlus className="mr-2" />
                            Neue Adresse anlegen
                        </p>
                    </div>
                    <hr className="border-gray-400 border-t-1 my-10" />

                    {/* Address Form */}
                    {showForm && (
                        <div className="bg-gray-200 p-6 rounded-lg mb-10">
                            <h2 className="text-lg font-bold mb-4">Neue Adresse</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="Vorname"
                                    value={newAddress.firstName}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Nachname"
                                    value={newAddress.lastName}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                />
                                <input
                                    type="text"
                                    name="userEmail"
                                    placeholder="Email"
                                    value={newAddress.userEmail}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                />
                                <input
                                    type="text"
                                    name="userPhone"
                                    placeholder="Telefon"
                                    value={newAddress.userPhone}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                />
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Adresse"
                                    value={newAddress.address}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                />
                                <input
                                    type="text"
                                    name="AddressDetails"
                                    placeholder="Straße"
                                    value={newAddress.AddressDetails}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                />
                                <input
                                    type="text"
                                    name="postalCode"
                                    placeholder="PLZ"
                                    value={newAddress.postalCode}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                />
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="Ort"
                                    value={newAddress.city}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                />
                            </div>
                            <button
                                onClick={handleAddAddress}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg w-full sm:w-auto"
                            >
                                Adresse hinzufügen
                            </button>
                        </div>
                    )}

                    {/* Address Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm sm:text-lg">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 text-left">Name</th>
                                    <th className="px-4 py-3 text-left">Benutzer-E-Mail</th>
                                    <th className="px-4 py-3 text-left">Benutzer-Telefon</th>
                                    <th className="px-4 py-3 text-left">Adresse</th>
                                    <th className="px-4 py-3 text-left">Straße</th>
                                    <th className="px-4 py-3 text-left">PLZ</th>
                                    <th className="px-4 py-3 text-left">Ort</th>
                                    <th className="px-4 py-3 text-center">Aktion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userRes &&
                                    userRes?.data?.addresses.map((address, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="bg-white px-4 py-5">{address.userName}</td>
                                            <td className="bg-white px-4 py-5">{address.userEmail}</td>
                                            <td className="bg-white px-4 py-5">{address.userPhone}</td>
                                            <td className="bg-white px-4 py-5">{address.address}</td>
                                            <td className="bg-white px-4 py-5">{address.AddressDetails}</td>
                                            <td className="bg-white px-4 py-5">{address.postalCode}</td>
                                            <td className="bg-white px-4 py-5">{address.city}</td>
                                            <td
                                                className="bg-white px-4 py-5 text-center"
                                                onClick={() => {
                                                    handleDeleteAddress(address);
                                                }}
                                            >
                                                <CgTrash className="text-4xl ml-4 text-red-700 hover:text-red-400 cursor-pointer" />
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAddress;
