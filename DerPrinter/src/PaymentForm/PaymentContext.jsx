/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {createContext, useEffect, useState} from 'react';
import {Urls} from './Urls';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const PaymentContext = createContext();

export const PaymentProvider = props => {
    const navigate=useNavigate()
    const[tokenObject, setTokenObject] = useState({});
    const[isPaymentMade, setIsPaymentMade] = useState(false);
    const[transactionData, setTransactionData] = useState({});

    useEffect(()=> {
        getToken();
    }, []);

    const getToken = async ()=> {
       let result = await axios(Urls.InitializeUrl, {withCredentials: true})
       const tokenObject = result.data.data;
       setTokenObject(tokenObject);
    }

    const paymentTransaction = async (data) => {
        let result = await axios.post(Urls.ConfirmUrl, data, { withCredentials: true });
        setTransactionData(result.data.data);
        setIsPaymentMade(true);
    
        // Redirect to order confirmation page
        navigate('/order-confirmation', { state: { transactionData: result.data.data } });
    };
    

    return(
        <PaymentContext.Provider value={{tokenObject, paymentTransaction, isPaymentMade, setIsPaymentMade, transactionData, setTransactionData}}>
            {props.children}
        </PaymentContext.Provider>
    );
}