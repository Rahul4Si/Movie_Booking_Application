import React from 'react' 
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'
import { BASE_URL } from '../config/api';


const Movies = () => {


  const [shows,setShows] = React.useState([]);
  const [loading,setLoading] = React.useState(true);
  const [error,setError] = React.useState(false);


  React.useEffect(() => {
    const getAllShows = async () => {
      try {
        const response = await fetch(`${BASE_URL}/user/get-all-show`);
        const data = await response.json();
        if (response.status === 200) {
          setShows(data.data);
          setLoading(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    getAllShows();
  }, []);


  console.log(shows);


  return (
    shows.length > 0 ? (
      <div className='mt-32 relative'> 
        <BlurCircle top='50px' left='0px'/>
        <BlurCircle right='30px' bottom='50px'/>
        <h1 className='mx-5 md:mx-20 lg:mx-40 text-2xl mb-4'>Now Showing</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 md:px-16 lg:px-40">
          {
            shows.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          }
        </div>
      </div> 
    ) : (
      <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className='text-3xl font-bold text-center'>No movies available</h1>
      </div>
    )
  ) 
} 


export default Movies 