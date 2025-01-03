import { useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
    const location = useLocation();
    const transactionData = location.state?.transactionData;

    return (
        <div>
            <h1>Order Confirmation</h1>
            {transactionData ? (
                <div>
                    <p>Transaction ID: {transactionData.transaction.id}</p>
                    <p>Status: {transactionData.transaction.status}</p>
                    <p>Amount: ${transactionData.transaction.amount}</p>
                </div>
            ) : (
                <p>No transaction data available.</p>
            )}
        </div>
    );
};

export default OrderConfirmation;
