/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyPassword } from "../../Redux/actions/authAction";
import toast from "react-hot-toast";


const VerifyPasswordPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(true)


    const OnChangeCode = (e) => {
        setCode(e.target.value)
    }

    const onSubmit = async () => {
        if (code === "") {
            toast.error("Bitte geben Sie den Code ein");
            return
        }
        setLoading(true)
        await dispatch(verifyPassword({
            resetCode: code
        }))
        setLoading(false)
    }

    const res = useSelector(state => state.auth.verifyPassword)

    useEffect(() => {
        if (loading === false) {
            if (res) {
                if (res.status === "success") {
                    toast.success("Aktivierungscode ist korrekt");
                    setTimeout(() => {
                        navigate("/resetPassword")
                    }, 1500);
                }else{
                    toast.error("Der Code ist falsch oder abgelaufen");
                }
            }
        }
    }, [loading])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Geben Sie den an die E-Mail gesendeten Code ein</h2>
                <input
                    value={code}
                    onChange={OnChangeCode}
                    placeholder="Code eingeben..."
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                />

                <button 
                    onClick={onSubmit} 
                    className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
                >
                    Bestätigen
                </button>
            </div>
        </div>
    );
};

export default VerifyPasswordPage;
