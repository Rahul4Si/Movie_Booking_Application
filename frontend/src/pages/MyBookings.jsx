import React from 'react'
import axios from 'axios';
import { BASE_URL } from '../config/api';
import PaymentModal from '../components/PaymentModal';


const MyBookings = () => {
   const token = localStorage.getItem("token");
  const [bookings, setBookings] = React.useState([]);
  const [selectedBookingForPayment, setSelectedBookingForPayment] = React.useState(null);
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);


  React.useEffect(() => {
    const getBookings = async () => {
      try {
        if (!token) {
          window.location.href = "/login";
          return;
        }
        const response = await axios.get(`${BASE_URL}/user/get-all-bookings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setBookings(response.data.data);
        }
      } catch (error) {
      }
    };
    getBookings();
  }, [ showPaymentModal]);


  // Format date and time
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const options = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    return date.toLocaleDateString('en-US', options);
  };


  // Format seat numbers for display
  const formatSeatNumbers = (seats) => {
    return seats.join(', ');
  };


const handlePay = (amount, booking) => {
    setSelectedBookingForPayment(booking);
    setShowPaymentModal(true);
}


  // Handle successful payment
  const handlePaymentSuccess = (bookingId) => {
    // Update the specific booking's payment status
    setBookings(prevBookings => 
      prevBookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, isPaid: true }
          : booking
      )
    );
    
    // Close the modal
    setShowPaymentModal(false);
    setSelectedBookingForPayment(null);
  };


  // Handle modal close
  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedBookingForPayment(null);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">My Bookings</h1>
        </div>


        {/* Bookings List */}
        <div className="space-y-4">
          {bookings.map((booking, index) => (
            <div
              key={booking.id + index}
              className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-all duration-300"
            >
              <div className="flex items-center gap-6">
                {/* Movie Poster */}
                <div className="flex-shrink-0">
                  <img
                    src={booking?.poster_path}
                    alt={booking?.title}
                    className="w-24 h-36 object-cover rounded-lg shadow-lg"
                  />
                </div>


                {/* Movie Details */}
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white mb-1">
                    {booking?.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-3">
                    {booking?.duration}m
                  </p>
                  <p className="text-gray-300 text-sm">
                    {formatDateTime(booking?.showDateTime)}
                  </p>
                </div>


                {/* Booking Info */}
                <div className="text-right">
                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-white">
                      ₹{booking.amount}
                    </span>
                    {!booking.paid && (
                     <button 
                        onClick={() => handlePay(booking.amount, booking)} 
                        className="cursor-pointer ml-4 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 transform hover:scale-105 active:scale-95"
                      >
                        Pay Now
                      </button>
                    )}
                  </div>


                  {/* Ticket Info */}
                  <div className="space-y-1 text-sm">
                    <div className="text-gray-400">
                      Total Tickets: <span className="text-white font-medium">{booking.bookedSeats.length}</span>
                    </div>
                    <div className="text-gray-400">
                      Seat Number: <span className={`font-medium ${booking.isPaid ? 'text-blue-400' : 'text-white'}`}>
                        {formatSeatNumbers(booking.bookedSeats)}
                      </span>
                    </div>
                  </div>


                  {/* Payment Status */}
                  <div className="mt-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      booking.isPaid
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {booking.paid ? '✓ Paid' : '⏳ Pending Payment'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Empty State */}
        {bookings.length === 0 && (
          <div className="text-center py-16">
            <div className="mb-4">
              <svg className="w-16 h-16 text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No bookings yet</h3>
            <p className="text-gray-500">Your movie bookings will appear here once you make a reservation.</p>
          </div>
        )}
      </div>
      {showPaymentModal && (
        <PaymentModal
          amount={selectedBookingForPayment?.amount}
          booking={selectedBookingForPayment}
          onSuccess={handlePaymentSuccess}
          onClose={handleClosePaymentModal}
        />
      )}
    </div>
  )
}


export default MyBookings