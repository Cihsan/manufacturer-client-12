import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import auth from '../../firebase_init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckOut = ({ tools }) => {
  const [user] = useAuthState(auth);
  const stripe = useStripe();
  const elements = useElements();
  // const [cardError, setCardError] = useState('');
  // const [success, setSuccess] = useState('');
  // const [processing, setProcessing] = useState(false);
  // const [transactionId, setTransactionId] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  const { _id, price, name, mOrder } = tools;

  useEffect(() => {
    fetch('http://localhost:5000/create-payment-intent', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({ price })
    })
      .then(res => res.json())
      .then(data => {
        if (data?.clientSecret) {
          console.log(data)
          setClientSecret(data.clientSecret);
        }
      });

  }, [price])

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   if (!stripe || !elements) {
  //     return;
  //   }

  //   const card = elements.getElement(CardElement);

  //   if (card === null) {
  //     return;
  //   }

  //   const { error } = await stripe.createPaymentMethod({
  //     type: 'card',
  //     card
  //   });
  //   console.log(processing);
  //   setCardError(error?.message || '')
  //   setSuccess('');
  //   setProcessing(true);
  //   // confirm card payment
  //   const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
  //     clientSecret,
  //     {
  //       payment_method: {
  //         card: card,
  //         billing_details: {
  //           email: user.email
  //           /* name: patientName,
  //           email: patient */
  //         },
  //       },
  //     },
  //   );

  //   if (intentError) {
  //     setCardError(intentError?.message);
  //     setProcessing(false);
  //   }
  //   else {
  //     setCardError('');
  //     setTransactionId(paymentIntent.id);
  //     console.log(paymentIntent);
  //     setSuccess('Congrats! Your payment is completed.')

  //     //store payment on database
  //     const payment = {
  //       pname: name,
  //       qt: mOrder,
  //       email: user.email,
  //       transactionId: paymentIntent.id
  //     }
  //     fetch(`http://localhost:5000/order/${_id}`, {
  //       method: 'POST',
  //       headers: {
  //         'content-type': 'application/json',
  //         // 'authorization': `Bearer ${localStorage.getItem('accessToken')}`
  //       },
  //       body: JSON.stringify(payment)
  //     }).then(res => res.json())
  //       .then(data => {
  //         setProcessing(false);
  //         console.log(data);
  //       })

  //   }
  // };


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {

      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });
    console.log(clientSecret);
    // confirm card payment
    // const {paymentIntent, error1} = await stripe.confirmCardPayment(
    //   clientSecret,
    //   {
    //     payment_method: {
    //       card: card,
    //       billing_details: {
    //         email: user.email,
    //       },
    //     },
    //   },
    // );
    if (error) {
      console.log('[error]', error);
      return toast.error(`${error.message} ${error.code}`)
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      if (paymentMethod.id) {
        const payment = {
          pname: name,
          qt: mOrder,
          price: price,
          email: user.email,
          transactionId: paymentMethod.id
        }
        fetch(`http://localhost:5000/order/${_id}`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            // 'authorization': `Bearer ${localStorage.getItem('accessToken')}`
          },
          body: JSON.stringify(payment)
        }).then(res => res.json())
          .then(data => {
            console.log(data);
          })
      }
      toast.success('Payment Success')

    }
  };
  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className='btn mt-5' type="submit" disabled={!stripe}>
          Pay Now
        </button>
      </form>
      {/*  {
        cardError && <p className='text-red-500'>{cardError}</p>
      }
      {
        success && <div className='text-green-500'>
          <p>{success}  </p>
          <p>Your transaction Id: <span className="text-orange-500 font-bold">{transactionId}</span> </p>
        </div>
      } */}
    </div>
  );
};

export default CheckOut;