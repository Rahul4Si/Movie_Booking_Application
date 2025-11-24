import React, { useState } from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { BASE_URL } from '../config/api';
import { toast } from 'react-hot-toast';


// Initialize Stripe
const stripePromise = loadStripe("pk_test_51SJf3KHw9sVElisskm3b1xR0BVpGKwRpP18V87CxCfxAKXHMCccS0HCsqM6Fju3zHlS0xfhBz34QIXchXExmj4gu00RGkTpKxW");


const CheckoutForm = ({ booking, onPaymentSuccess, onClose }) => {
    console.log(booking);
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);


  const handleSubmit = async (event) => {
    event.preventDefault();


    if (!stripe || !elements) {
      return;
    }


    setIsProcessing(true);
    setPaymentError(null);


    try {
      const token = localStorage.getItem('token');
      
       // 1. Ask backend to create PaymentIntent
      const response = await axios.post(
        `${BASE_URL}/user-payment/create-intent`,
        {
          amount: booking.amount*100,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      const { clientSecret } = response.data;


       // 2. Confirm payment with Stripe (Card details entered in CardElement)
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement), // gets card details securely
      },
    });


    if (result.error) {
      setPaymentError(result.error.message);
      toast.error(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      // 3. Call backend to confirm payment and update booking status
      await axios.post(
        `${BASE_URL}/user-payment/update-booking-status`,
        {
          bookingId: booking.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      toast.success("Payment successful!");
      
      // Clear the card element after successful payment
      elements.getElement(CardElement).clear();
      onClose();
    }


    } catch (error) {
      console.error('Payment error:', error);
      const errorMessage = error.response?.data?.message || 'Payment failed. Please try again.';
      setPaymentError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };


  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-gray-700 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Complete Payment</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>


        {/* Booking Summary */}
        <div className="mb-6 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
          <h3 className="text-white font-semibold mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
            {booking.title}
          </h3>
          <div className="space-y-1 text-sm">
            <p className="text-gray-300 flex justify-between">
              <span>Seats:</span> 
              <span className="font-medium">{booking.bookedSeats.join(', ')}</span>
            </p>
            <p className="text-gray-300 flex justify-between">
              <span>Tickets:</span> 
              <span className="font-medium">{booking.bookedSeats.length}</span>
            </p>
            <p className="text-gray-300 flex justify-between">
              <span>Show Time:</span>
              <span className="font-medium">{new Date(booking.showDateTime).toLocaleDateString()}</span>
            </p>
            <div className="pt-2 mt-2 border-t border-gray-600">
              <p className="text-pink-400 font-bold text-xl flex justify-between">
                <span>Total Amount:</span>
                <span>₹{booking.amount}</span>
              </p>
            </div>
          </div>
        </div>


        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white text-sm font-medium mb-3">
              Card Details
            </label>
            <div className="p-4 border border-gray-600 rounded-lg bg-gray-800/50 focus-within:border-pink-500 transition-colors">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#ffffff',
                      fontFamily: '"Inter", system-ui, sans-serif',
                      '::placeholder': {
                        color: '#9ca3af',
                      },
                      iconColor: '#ffffff',
                    },
                    invalid: {
                      color: '#ef4444',
                      iconColor: '#ef4444',
                    },
                    complete: {
                      color: '#10b981',
                      iconColor: '#10b981',
                    },
                  },
                }}
              />
            </div>
          </div>


          {paymentError && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm">{paymentError}</p>
            </div>
          )}


          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!stripe || isProcessing}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:from-pink-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg shadow-pink-500/25"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                `Pay ₹${booking.amount}`
              )}
            </button>
          </div>
        </form>


        {/* Test Card Info */}
        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-blue-400 text-xs">
            <strong>Test Card:</strong> 4242 4242 4242 4242 | Any future date | Any 3 digits
          </p>
        </div>
      </div>
    </div>
  );
};


const PaymentModal = ({ booking, onPaymentSuccess, onClose }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm 
        booking={booking} 
        onPaymentSuccess={onPaymentSuccess} 
        onClose={onClose} 
      />
    </Elements>
  );
};


export default PaymentModal;
