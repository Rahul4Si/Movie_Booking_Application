import React from "react";


import BlurCircle from "./BlurCircle";
import MovieCard from "./MovieCard";
import { BASE_URL } from "../config/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const FeaturedSection = () => {
  const [shows, setShows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);


  const navigate = useNavigate();


  React.useEffect(() => {
    const getAllShows = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/get-all-show`);
        if (response.status === 200) {
          setShows(response.data.data);
          setLoading(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    getAllShows();
  }, []);


  return (
    <>
      <div className="relative flex items-center justify-between pt-20 pb-10 mx-4 md:mx-16 lg:mx-40">
        <BlurCircle top="0px" right="10px" />
        <p className="text-gray-300 font-medium text-lg">Now Showing</p>
        <button onClick={() => navigate("/movies")}
          className="group flex items-center gap-2 text-sm text-gray-300 cursor-pointer ">
          View All
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-right group-hover:translate-x-0.5 transition w-4.5 h-4.5"
            aria-hidden="true"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 md:px-16 lg:px-40">
        {shows.slice(0, 4).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="flex justify-center mt-20">
        <button onClick={() => navigate("/movies")}
          className="px-10 py-3 text-sm bg-red-400 hover:bg-red-500 transition rounded-md font-medium cursor-pointer">
          Show more
        </button>
      </div>
    </>
  );
};


export default FeaturedSection;
