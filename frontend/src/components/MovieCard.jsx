import React from 'react';
import { Star } from 'lucide-react';
import timeformatDuration from '../lib/timeformatDuration';
import { useNavigate } from 'react-router-dom';


const MovieCard = ({ movie }) => {
  // Extract year from releaseDate
  const year = movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : '2025';
  const navigate = useNavigate();  


  return (
    <div className="relative w-full max-w-sm mx-auto bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl hover:transform hover:scale-105 transition-all duration-300">
      {/* Movie Poster */}
      <div className="relative h-80 overflow-hidden">
        <img 
          src={movie?.imageUrl || movie?.poster_path} 
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      </div>
      
      {/* Movie Info */}
      <div className="p-6 text-white">
        <h3 className="text-xl font-bold mb-2 leading-tight">
          {movie.title}
        </h3>
        
        <p className="text-gray-300 text-sm mb-4">
          {year} • {movie.genre} • {timeformatDuration(parseInt(movie.duration)) || '2h 5m'}
        </p>
        
        {/* Bottom Section */}
        <div className="flex items-center justify-between">
          {/* Buy Tickets Button */}
          <button onClick={() => navigate(`/movies/${movie.id}`)} className="bg-red-400 hover:bg-red-500 text-white font-semibold px-6 py-2 rounded-full transition-all  duration-200">
            Buy Tickets
          </button>
          
          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-gray-300 font-medium">
              {movie.rating || '7.6'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};


export default MovieCard;