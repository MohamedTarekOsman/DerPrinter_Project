/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgetPassword } from "../../Redux/actions/authAction";


export default function ForgetPasswordPage() {
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [email, setEmail]=useState('')
    const [loading, setLoading]=useState(true)

    const onChangeEmail=(e)=>{
        setEmail(e.target.value)
    }
    const onSubmit=async()=>{
        if(email===""){
            toast.error('Bitte geben Sie die E-Mail ein');
            return
        }
        localStorage.setItem("user-email",email)
        setLoading(true)
        await dispatch(forgetPassword({email}))
    setLoading(false)
    }

    const res=useSelector(state=>state.auth.forgetPassword)
    useEffect(() => {
        if(loading===false){
            if(res){
                if(res.status==="Success"){
                    toast.success('Code wurde gesendet');
                    setTimeout(()=>{
                        navigate('/verifyPassword')
                    },1500)
                    
                }else{
                    toast.error("Dieses Konto ist nicht registriert");
                }
            }
        }
    }, [loading])
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Passwort wiederherstellen</h2>
                <input
                    autoComplete='true'
                    value={email}
                    onChange={onChangeEmail}
                    placeholder="E-Mail eingeben..."
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                />
                <button 
                    className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
                    onClick={onSubmit}
                >
                    Code senden
                </button>
            </div>
        </div>
    );
}
