import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BlurCircle from "../components/BlurCircle";
import { Star, Play, Heart, Clock, Calendar } from "lucide-react";
import Marquee from "react-fast-marquee";
import DateSelect from "../components/DateSelect";
import MovieCard from "../components/MovieCard";
import { BASE_URL } from "../config/api";
import axios from "axios";
import timeformatDuration from "../lib/timeformatDuration";
import { transformDatesForDateSelect } from "../utils/dateUtils";
import { toast } from "react-hot-toast";


const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const [movieDetails, setMovieDetails] = React.useState(null);
  const [isMovieFavourite, setIsMovieFavourite] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);


  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        
        const response = await axios.get(
          `${BASE_URL}/user/get-show-by-id/${id}`
        );
        
        if (response.status === 200) {
          setMovieDetails(response.data);
          setLoading(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    
    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  useEffect(() => {
    const checkIfFavourite = async () => {
      try {
        const token = localStorage.getItem("token");  
        if (!token) {
          return;
        }

        const response = await axios.get(
          `${BASE_URL}/user/check-favourite/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setIsMovieFavourite(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkIfFavourite();
  }, [id]);

  const getMovieDetails = movieDetails?.data;


  // Transform dates for DateSelect component
  const movieDetailsWithFormattedDates = React.useMemo(() => {
    if (!getMovieDetails?.showDates) return getMovieDetails;
    
    return {
      ...getMovieDetails,
      showDates: transformDatesForDateSelect(getMovieDetails.showDates)
    };
  }, [getMovieDetails]);


  const addToFavourites = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }
      const response = await axios.post(
        `${BASE_URL}/user/add-to-favourites/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Movie added to favourites");
        setIsMovieFavourite(true);
      } else {
        toast.error("Error adding movie to favourites");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error adding movie to favourites");
    }
  };

  const removeFromFavourites = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      const response = await axios.get(
        `${BASE_URL}/user/remove-from-favourites/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      if (response.status === 200) {
        toast.success("Movie removed from favourites");
        setIsMovieFavourite(false);
      } else {
        toast.error("Error removing movie from favourites");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error removing movie from favourites");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-white">Loading movie details...</h1>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !movieDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Movie not found
          </h1>
          <p className="text-gray-400 text-lg">
            The movie you're looking for doesn't exist or failed to load.
          </p>
          <Link
            to="/movies"
            className="inline-block mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            Back to Movies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Background blur effects */}
      <BlurCircle top="10%" left="-10%" />
      <BlurCircle right="-10%" bottom="20%" />


      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Movie Poster */}
            <div className="shrink-0 mx-auto lg:mx-0">
              <div className="relative group">
                <img
                  alt={getMovieDetails.title}
                  className="w-80 h-[480px] rounded-2xl object-cover shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                  src={getMovieDetails.imageUrl}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>


            {/* Movie Details */}
            <div className="flex-1 space-y-6">
              {/* Language badge */}
              <span className="inline-block px-4 py-2 bg-red-500/20 text-red-400 rounded-full text-sm font-medium border border-red-500/30">
                ENGLISH
              </span>


              {/* Title */}
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {getMovieDetails.title}
              </h1>


              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-full border border-yellow-500/30">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-yellow-300 font-semibold">
                    {getMovieDetails.rating || "8.3"}
                  </span>
                </div>
                <span className="text-gray-400">User Rating</span>
              </div>


              {/* Description */}
              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                {getMovieDetails.description || "No description available."}
              </p>


              {/* Movie Info */}
              <div className="flex flex-wrap items-center gap-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-red-400" />
                  <span>{timeformatDuration(parseInt(getMovieDetails.duration)) || "1h 45m"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-red-400" />
                  <span>
                    {new Date(getMovieDetails.releaseDate).getFullYear() ||
                      "2025"}
                  </span>
                </div>
                <div className="px-3 py-1 bg-gray-700/50 rounded-full text-sm">
                  {getMovieDetails.genre || "Drama"}
                </div>
              </div>


              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button className="flex items-center gap-3 px-8 py-4 bg-gray-800/80 hover:bg-gray-700 transition-all duration-300 rounded-xl font-semibold backdrop-blur-sm border border-gray-700/50 hover:border-gray-600 transform hover:scale-105">
                  <Play className="w-6 h-6" />
                  Watch Trailer
                </button>


                <button
                  onClick={() => {
                    const element = document.getElementById("dateSelect");
                    if (element) {
                      element.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                  className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 rounded-xl font-semibold transform hover:scale-105 shadow-lg shadow-red-500/25"
                >
                  Buy Tickets
                </button>


                <button onClick={isMovieFavourite ? removeFromFavourites : addToFavourites} className="p-4 bg-gray-800/80 hover:bg-red-500/20 transition-all duration-300 rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-red-500/50 group">
                  <Heart className={`w-6 h-6 group-hover:text-red-400 transition-colors ${isMovieFavourite ? "fill-red-400" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Cast Section */}
      <div className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Meet the Cast
          </h2>


          <Marquee
            speed={50}
            pauseOnHover={true}
            gradient={false}
            className="py-4"
          >
            {getMovieDetails.cast.map((actor) => (
              <div
                key={actor.id}
                className="group text-center mx-6 min-w-[120px]"
              >
                <div className="relative mb-4">
                  <img
                    src={actor.imageUrl || "https://m.media-amazon.com/images/I/51G42e8l1ML._UF894,1000_QL80_.jpg"}
                    alt={actor.name}
                    className="w-28 h-28 rounded-full object-cover mx-auto shadow-2xl border-4 border-gray-700/50 group-hover:border-red-500/70 transition-all duration-500 transform group-hover:scale-110 group-hover:shadow-red-500/25"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-red-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-red-500/30 to-yellow-500/30 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 -z-10"></div>
                </div>
                <h3 className="font-bold text-white group-hover:text-red-400 transition-colors duration-300 text-sm mb-1">
                  {actor}
                </h3>
                <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {actor.character || "Actor"}
                </p>
              </div>
            ))}
          </Marquee>
        </div>
      </div>


      {/* Date Selection */}
      <DateSelect id="dateSelect" getMovieDetails={movieDetailsWithFormattedDates} showId={id}/>


      {/* Similar movie Selection */}
      <div className="py-20">
        <h2 className="text-4xl lg:mx-36 font-bold mb-12 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 md:px-16 lg:px-40">
          {/* {MovieData.slice(0, 4).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))} */}
        </div>
        <div className="flex justify-center mt-20">
          <button onClick={()=>navigate('/movies')} className="px-10 py-3 text-sm bg-red-400 hover:bg-red-500 transition rounded-md font-medium cursor-pointer">
            Show more
          </button>
        </div>
      </div>
    </div>
  );
};


export default MovieDetails;