import { useEffect, useContext } from "react";
import { PaymentContext } from "./PaymentContext";
import { useLocation } from "react-router-dom";

export const PaymentForm = () => {
const location = useLocation();
const totalPrice = location.state?.totalPrice || 0;
  const paymentContext = useContext(PaymentContext);
  const {
    tokenObject,
    paymentTransaction,
    isPaymentMade,
    setIsPaymentMade,
    transactionData,
    setTransactionData,
  } = paymentContext;

  useEffect(() => {
    renderPayment();
  });

  const renderPayment = () => {
    let token = tokenObject;
    let authorization = token;
    var form = document.querySelector("#cardForm");

    window.braintree.client.create(
      { authorization: authorization },
      (err, clientInstance) => {
        if (err) {
          console.error(err);
          return;
        }
        createHostedFields(clientInstance, form);
      }
    );

    const createHostedFields = (clientInstance, form) => {
      window.braintree.hostedFields.create(
        {
          client: clientInstance,
          styles: {
            input: {
              "font-size": "16px",
              "font-family": "courier, monospace",
              "font-weight": "lighter",
              color: "#ccc",
            },
            ":focus": {
              color: "black",
            },
            ".valid": {
              color: "#8bdda8",
            },
          },
          fields: {
            number: {
              selector: "#card-number",
              placeholder: "4111 1111 1111 1111",
            },
            cvv: {
              selector: "#cvv",
              placeholder: "123",
            },
            expirationDate: {
              selector: "#expiration-date",
              placeholder: "MM/YYYY",
            },
            postalCode: {
              selector: "#postal-code",
              placeholder: "11111",
            },
          },
        },
        (err, hostedFieldsInstance) => {
          const teardown = (event) => {
            event.preventDefault();

            let formIsInvalid = false;
            const state = hostedFieldsInstance.getState();

            // Validate fields
            Object.keys(state.fields).forEach((field) => {
              if (!state.fields[field].isValid) {
                formIsInvalid = true;
              }
            });

            if (formIsInvalid) {
              alert("Card input is not valid");
              return;
            }

            hostedFieldsInstance.tokenize(
              { cardholderName: document.querySelector("#cc-name").value },
              (err, payload) => {
                if (err) {
                  console.error(err);
                  return;
                }
                paymentTransaction({ nonce: payload.nonce, amount: totalPrice });
              }
            );
          };

          form.addEventListener("submit", teardown, false);
        }
      );
    };
  };

  const gotoPayment = () => {
    setIsPaymentMade(false);
    setTransactionData({});
  };
  
  return (
    <>
      {isPaymentMade ? (
        <div className="p-6 bg-gray-100 text-center rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">
            Server returns {transactionData.success ? "success" : "failure"}
          </h3>
          <div className="mb-4">
            <p>Amount: {transactionData.transaction?.amount || "N/A"}</p>
            <p>
              Payment Instrument:{" "}
              {transactionData.transaction?.paymentInstrumentType || "N/A"}
            </p>
            <p>Status: {transactionData.transaction?.status || "N/A"}</p>
            <p>Transaction ID: {transactionData.transaction?.id || "N/A"}</p>
          </div>
          <button
            onClick={gotoPayment}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go back to payment page
          </button>
        </div>
      ) : (
        <div className="p-6 bg-gray-50 rounded-lg shadow-lg max-w-md mx-auto">
          <form
            id="cardForm"
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label
                htmlFor="cc-name"
                className="block text-sm font-medium text-gray-700"
              >
                Cardholder Name
              </label>
              <input
                type="text"
                id="cc-name"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label
                htmlFor="card-number"
                className="block text-sm font-medium text-gray-700"
              >
                Card Number
              </label>
              <div
                id="card-number"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm bg-gray-50 h-10"
              ></div>
            </div>
            <div>
              <label
                htmlFor="expiration-date"
                className="block text-sm font-medium text-gray-700"
              >
                Expiration Date
              </label>
              <div
                id="expiration-date"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm bg-gray-50 h-10"
              ></div>
            </div>
            <div>
              <label
                htmlFor="cvv"
                className="block text-sm font-medium text-gray-700"
              >
                CVV
              </label>
              <div
                id="cvv"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm bg-gray-50 h-10"
              ></div>
            </div>
            <div>
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium text-gray-700"
              >
                Postal Code
              </label>
              <div
                id="postal-code"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm bg-gray-50 h-10"
              ></div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Purchase
              </button>
              <button
                type="button"
                onClick={gotoPayment}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
