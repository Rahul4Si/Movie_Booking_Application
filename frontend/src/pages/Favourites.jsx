import React from 'react' 
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'
import { BASE_URL } from '../config/api';
import axios from 'axios';


const Favourites = () => { 
  const [favourites,setFavourites] = React.useState([]);
  const [loading,setLoading] = React.useState(true);
  const [error,setError] = React.useState(false);


  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
    const getAllFavourites = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/user/get-favourites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setFavourites(response.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };
    getAllFavourites();
    }, []);


    if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-white">Loading your favourites...</h1>
        </div>
      </div>
    );
  } 


  return (
    favourites.length > 0 ? (
      <div className='mt-32 relative'> 
        <BlurCircle top='50px' left='0px'/>
        <BlurCircle right='30px' bottom='50px'/>
        <h1 className='mx-5 md:mx-20 lg:mx-40 text-2xl mb-4'>Your Favourite Movies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 md:px-16 lg:px-40">
          {
            favourites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          }
        </div>
      </div> 
    ) : (
      <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className='text-3xl font-bold text-center'>No favourite movies available</h1>
      </div>
    )
  ) 
} 


export default Favourites;