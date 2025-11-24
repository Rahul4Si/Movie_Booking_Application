import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/api";
import timeformatDuration from "../lib/timeformatDuration";
import toast from "react-hot-toast";


const SeatLayout = () => {
  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const [shows, setShows] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [price, setPrice] = useState(0);
  const [currentSelectedShow, setCurrentSelectedShow] = useState(null);


  const formatDate = (date) => {
    const newDate = new Date(date);
    return `${newDate.getFullYear()}-${
      newDate.getMonth() + 1
    }-${newDate.getDate()}`;
  };


  const getTime = (time) => {
    const newTime = new Date(time);
    const hours = newTime.getHours() % 12 || 0;
    const minutes = newTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    return `${hours}:${minutes} ${ampm}`;
  };


  useEffect(() => {
    const getShowDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/user/get-show-by-id-and-date/${id}/${formatDate(date)}`
        );
        if (response.status === 200) {
          setShows(response.data.data);
        }
      } catch (error) {
        toast.error("Error fetching show details");
      }
    };
    getShowDetails();
  }, [id, date]);


  useEffect(() => {
    const getShow = async () => {
      const response = await axios.get(`${BASE_URL}/user/get-show-by-id/${id}`);
      if (response.status === 200) {
        setShow(response.data.data);
      }
    };
    getShow();
  }, [id]);


  // Set initial selected time when shows are loaded
  useEffect(() => {
    if (shows.length > 0 && !selectedTime) {
      const firstShow = shows[0];
      setSelectedTime(firstShow.showDateTime);
      setBookedSeats(firstShow.occupiedSeats || []);
      setCurrentSelectedShow(firstShow);
      setPrice(firstShow.price || 0);
    }
  }, [shows, selectedTime]);


  const navigate = useNavigate();


  const getShowTimings = () => {
    const showTimes = shows.map((show) => show.showDateTime);
    return showTimes;
  };


  const availableTimins = shows.length > 0 ? getShowTimings() : [];


  // Generate seat layout data
  const generateSeats = () => {
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const seats = [];


    rows.forEach((row) => {
      const rowSeats = [];
      for (let i = 1; i <= 10; i++) {
        const seatId = `${row}${i}`;
        rowSeats.push({
          id: seatId,
          row: row,
          number: seatId,
          isBooked: (bookedSeats || []).includes(seatId),
          isSelected: false,
        });
      }
      seats.push(rowSeats);
    });


    return seats;
  };


  const [seats, setSeats] = useState([]);


  // Update seats when bookedSeats changes
  useEffect(() => {
    setSeats(generateSeats());
  }, [bookedSeats]);


  const handleSeatClick = (seatId) => {
    const seatRow = seats.find((row) => row.some((seat) => seat.id === seatId));
    const seat = seatRow.find((seat) => seat.id === seatId);


    if (seat.isBooked) return;


    setSeats((prevSeats) =>
      prevSeats.map((row) =>
        row.map((seat) =>
          seat.id === seatId ? { ...seat, isSelected: !seat.isSelected } : seat
        )
      )
    );


    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };


  const handleProceedToCheckout = async (selectedSeats, price) => {
    const token = localStorage.getItem("token");
    const showID = currentSelectedShow?.id;
    if (!token) {
      window.location.href = "/login";
    }
    if (!selectedTime) {
      toast.error("Please select a timing");
      return;
    }
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_URL}/user/book-show`,
        {
          showId: showID,
          price: price,
          seats: selectedSeats,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Seats booked successfully");
        setSelectedSeats([]);
        setBookedSeats([...bookedSeats, ...selectedSeats]);
        setSelectedTime(null);
        navigate("/mybookings");
      } else {
        toast.error("Error booking seats");
      }
    } catch (error) {
      toast.error("Error booking seats");
    }
  };


  const handleTimingSelect = (time) => () => {
    if (selectedTime === time) return;
    if (selectedTime != time) {
      setSelectedSeats([]);
      setSelectedTime(time);
      const selectedShow = shows.find((show) => show.showDateTime === time);


      setCurrentSelectedShow(selectedShow || null);
      setBookedSeats(selectedShow?.occupiedSeats || []);
      setPrice(selectedShow?.price || 0);
    }
  };


  return show ? (
    <div className="min-h-screen my-40 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Movie Header */}
      <div className="border-b border-gray-700 mx-44">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-6">
            <img
              src={show.imageUrl}
              alt={show.title}
              className="w-20 h-28 object-cover rounded-lg shadow-lg"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">
                {show.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-300 mb-2">
                <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                  {show.genre}
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {timeformatDuration(show.duration)}
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {show.rating}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {date}
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {selectedTime || "Select a time"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Available Timings Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-sm border border-amber-700/30 rounded-xl p-6 sticky top-28">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">
                Available Timings
              </h3>
              <div className="space-y-3">
                {availableTimins.map((time) => (
                  <button
                    key={time}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 flex items-center justify-center gap-2 font-medium ${
                      selectedTime === time
                        ? "bg-pink-500 border-pink-500 text-white shadow-lg shadow-pink-500/25 transform -translate-y-0.5"
                        : "bg-transparent border-gray-600 text-gray-300 hover:border-white hover:bg-white/10 hover:transform hover:-translate-y-0.5"
                    }`}
                    onClick={handleTimingSelect(time)}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {getTime(time)}
                  </button>
                ))}
              </div>
            </div>
          </div>


          {/* Seat Selection Area */}
          <div className="flex-1">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Select your seat
              </h2>
              {selectedSeats.length > 0 && (
                <p className="text-pink-400 font-medium">
                  {selectedSeats.length} seat
                  {selectedSeats.length > 1 ? "s" : ""} selected
                </p>
              )}
            </div>


            {/* Seat Legend */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border-2 border-gray-600 rounded bg-transparent"></div>
                <span className="text-gray-300 text-sm">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-pink-500 rounded shadow-lg"></div>
                <span className="text-gray-300 text-sm">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-600 rounded"></div>
                <span className="text-gray-300 text-sm">Booked</span>
              </div>
            </div>


            {/* Seat Grid */}
            <div className="space-y-2 mb-8">
              {seats.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex items-center justify-center gap-20"
                >
                  <div className="flex gap-1">
                    {row.slice(0, 5).map((seat) => (
                      <button
                        key={seat.id}
                        className={`w-8 h-8 rounded text-xs font-medium transition-all duration-200 ${
                          seat.isBooked
                            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                            : seat.isSelected
                            ? "bg-pink-500 text-white shadow-lg shadow-pink-500/50 transform scale-110"
                            : "bg-transparent border-2 border-gray-600 text-gray-300 hover:border-white hover:bg-white/10 hover:scale-105"
                        }`}
                        onClick={() => handleSeatClick(seat.id)}
                        disabled={seat.isBooked}
                        title={`Seat ${seat.id} - ${
                          seat.isBooked
                            ? "Booked"
                            : seat.isSelected
                            ? "Selected"
                            : "Available"
                        }`}
                      >
                        {seat.number}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-1">
                    {row.slice(5, 11).map((seat) => (
                      <button
                        key={seat.id}
                        className={`w-8 h-8 rounded text-xs font-medium transition-all duration-200 ${
                          seat.isBooked
                            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                            : seat.isSelected
                            ? "bg-pink-500 text-white shadow-lg shadow-pink-500/50 transform scale-110"
                            : "bg-transparent border-2 border-gray-600 text-gray-300 hover:border-white hover:bg-white/10 hover:scale-105"
                        }`}
                        onClick={() => handleSeatClick(seat.id)}
                        disabled={seat.isBooked}
                        title={`Seat ${seat.id} - ${
                          seat.isBooked
                            ? "Booked"
                            : seat.isSelected
                            ? "Selected"
                            : "Available"
                        }`}
                      >
                        {seat.number}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>


            {/* Selected Seats Summary */}
            {selectedSeats.length > 0 && currentSelectedShow && (
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-8">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">
                    Selected Seats:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSeats.map((seatId) => (
                      <span
                        key={seatId}
                        className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {seatId}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-white mb-3">
                    Total Price:
                  </h4>
                  <p className="text-pink-400 font-medium">
                    {selectedSeats.length * (currentSelectedShow?.price || 0)}{" "}
                    INR
                  </p>
                </div>
              </div>
            )}


            {/* Proceed Button */}
            <div className="text-center">
              <button
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-3 mx-auto ${
                  selectedSeats.length === 0
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/40 transform hover:-translate-y-1"
                }`}
                onClick={() =>
                  handleProceedToCheckout(
                    selectedSeats,
                    currentSelectedShow?.price || 0
                  )
                }
                disabled={selectedSeats.length === 0}
              >
                <span>Proceed to Checkout</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Show not found</h1>
        <p className="text-gray-400 text-lg">
          The show you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate("/movies")}
          className="inline-block mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
        >
          Back to Movies
        </button>
      </div>
    </div>
  );
};


export default SeatLayout;
