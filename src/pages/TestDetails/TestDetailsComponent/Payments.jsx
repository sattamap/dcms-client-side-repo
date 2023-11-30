// import { loadStripe } from "@stripe/stripe-js";

// import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useEffect, useState } from "react";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import useAuth from "../../../hooks/useAuth";
// //import { useNavigate } from "react-router-dom";



// // TODO: add publishable key
// const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

// const Payments = ({ currentPrice}) => {
//     const [error, setError] = useState('');
//     const [clientSecret, setClientSecret] = useState('')
//     const [transactionId, setTransactionId] = useState('');
//     const stripe = useStripe();
//     const elements = useElements();
//     const axiosPublic = useAxiosPublic();
//     const { user } = useAuth();

//     console.log(user);
//     //const navigate = useNavigate();

    

//     useEffect(() => {
//         if (currentPrice > 0) {
//             axiosPublic.post('/create-payment-intent', { price: currentPrice })
//                 .then(res => {
//                     console.log(res.data.clientSecret);
//                     setClientSecret(res.data.clientSecret);
//                 })
//         }

//     }, [axiosPublic, currentPrice])

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!stripe || !elements) {
//             return
//         }

//         const card = elements.getElement(CardElement)

//         if (card === null) {
//             return
//         }

//         const { error, paymentMethod } = await stripe.createPaymentMethod({
//             type: 'card',
//             card
//         })

//         if (error) {
//             console.log('payment error', error);
//             setError(error.message);
//         }
//         else {
//             console.log('payment method', paymentMethod)
//             setError('');
//         }

//         // confirm payment\clg
//         console.log(user);
//         const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
//             payment_method: {
//                 card: card,
//                 billing_details: {
//                     email: user?.email || 'anonymous',
//                     name: user?.displayName || 'anonymous'
//                 }
//             }
//         })

//         if (confirmError) {
//             console.log('confirm error')
//         }
//         else {
//             console.log('payment intent', paymentIntent)
//             if (paymentIntent.status === 'succeeded') {
//                 console.log('transaction id', paymentIntent.id);
//                 setTransactionId(paymentIntent.id);

//                 // now save the payment in the database
//                 const payment = {
//                     email: user.email,
//                     price: currentPrice,
//                     transactionId: paymentIntent.id,
//                     // date: new Date(), // utc date convert. use moment js to 
//                     // cartIds: cart.map(item => item._id),
//                     // menuItemIds: cart.map(item => item.menuId),
//                     // status: 'pending'
//                 }
//                 console.log(payment);

//                 // const res = await axiosPublic.post('/payments', payment);
//                 // console.log('payment saved', res.data);
//                 // //refetch();
//                 // if (res.data?.paymentResult?.insertedId) {
//                 //     Swal.fire({
//                 //         position: "top-end",
//                 //         icon: "success",
//                 //         title: "Thank you for the taka paisa",
//                 //         showConfirmButton: false,
//                 //         timer: 1500
//                 //     });
//                 //     navigate('/dashboard/paymentHistory')
//                 // }

//             }
//         }

//     }

//     return (
//         <div>
            
//             <div>
//                 <Elements stripe={stripePromise}>
//          <div>
//          <form onSubmit={handleSubmit}>
//             <CardElement
//                 options={{
//                     style: {
//                         base: {
//                             fontSize: '16px',
//                             color: '#424770',
//                             '::placeholder': {
//                                 color: '#aab7c4',
//                             },
//                         },
//                         invalid: {
//                             color: '#9e2146',
//                         },
//                     },
//                 }}
//             />
//             <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
//                 Pay
//             </button>
//             <p className="text-red-600">{error}</p>
//             {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
//         </form>
//          </div>
//                 </Elements>

//                 <h2>Payment</h2>
//             </div>
//         </div>
//     );
// };

// export default Payments;


import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../Payment/CheckoutForm";
import PropTypes from 'prop-types';


// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payments = ({ currentPrice, handleConfirm}) => {
console.log(typeof(currentPrice,handleConfirm));
    return (
        <div>
            
                <Elements stripe={stripePromise}>
                   <CheckoutForm currentPrice={ currentPrice} handleConfirm={handleConfirm}></CheckoutForm> 
                </Elements>
            </div>
       
    );
};

Payments.propTypes = {
    currentPrice: PropTypes.function ,
    handleConfirm: PropTypes.function ,
}

export default Payments;