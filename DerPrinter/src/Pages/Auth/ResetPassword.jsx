/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../Redux/actions/authAction';

const ResetPasswordPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(true)


    const OnChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const OnChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }
    const onSubmit = async () => {
        if (password === "") {
            toast.error("Bitte geben Sie das Passwort ein");
            return
        }
        if (password !== confirmPassword) {
            toast.error("Das Passwort stimmt nicht mit der Passwortbestätigung überein");
            return
        }

        setLoading(true)
        await dispatch(resetPassword({
            email: localStorage.getItem("user-email"),
            newPassword: password
        }))
        setLoading(false)
    }

    const res = useSelector(state => state.auth.verifyPassword)

    useEffect(() => {
        if (loading === false) {
            if (res) {
                if (res.status === "success") {
                    toast.success("Das Passwort wurde erfolgreich geändert");
                    setTimeout(() => {
                        navigate("/login")
                    }, 1500);
                }else{
                    toast.error("Bitte fordern Sie einen neuen Code an");
                }
            }
        }
    }, [loading])
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Neues Passwort eingeben</h2>
                <input
                    value={password}
                    onChange={OnChangePassword}
                    placeholder="Neues Passwort eingeben"
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                />
                <input
                    value={confirmPassword}
                    onChange={OnChangeConfirmPassword}
                    placeholder="Neues Passwort bestätigen"
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                />
                <button 
                    onClick={onSubmit} 
                    className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
                >
                    Speichern
                </button>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
