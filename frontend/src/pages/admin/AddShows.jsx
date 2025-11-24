import React, { useEffect } from "react";
import { BASE_URL } from "../../config/api";
import axios from "axios";
import Title from "../../components/Title";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



const AddShows = () => {
  const [movies, setMovies] = React.useState([]);
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [formData, setFormData] = React.useState({
    movieId: "",
    showDate: "",
    showTime: "",
    price: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }


  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/get-all-movies`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setMovies(response.data.data);
        }
      } catch (error) {
      }
    };
    getAllMovies();
  }, []);


  const handleCancel = () => {
    setFormData({
      movieId: "",
      showDate: "",
      showTime: "",
      price: "",
    });
  };


  const handleAddShow = async (e) => {
    // If called from a form submit event, prevent default behaviour.
    if (e && e.preventDefault) e.preventDefault();
    if (isSubmitting) return; // avoid duplicate submissions
    if (!formData.showDate || !formData.showTime || !formData.price || formData.showDate.trim().length === 0 || formData.showTime.trim().length === 0 || formData.price.trim().length === 0) {
      toast.error("Please fill all the fields");
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = { ...formData, movieId: selectedMovie?.id };
      const response = await axios.post(`${BASE_URL}/admin/add-show`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success("Show added successfully");
        setFormData({
          movieId: "",
          showDate: "",
          showTime: "",
          price: "",
        });
        setSelectedMovie(null);
      } else {
        toast.error("Error adding show");
      }
    } catch (error) {
      toast.error("Error adding show");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="ml-[22%] my-[15%] md:my-[10%] lg:my-[5%] w-[75%]">
      <Title title="Add" text="Shows" />
      <div className="mt-8 bg-linear-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
        <h1 className="text-2xl font-bold text-white mb-4">Latest Movies</h1>
        <div className="flex flex-row gap-4 overflow-x-auto pb-4">
          {/* Movie List */}
          {movies.map((movie) => (
            <div key={movie.id} className="shrink-0 group ">
              <div className="relative rounded-xl shadow-lg transform transition-all duration-300">
                <div className="absolute top-3 z-10 right-3 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{movie.rating || "N/A"}</span>
                </div>


                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="w-[180px] h-[240px] object-cover transition-transform duration-300 group-hover:scale-110 rounded-xl"
                />


                <div className="absolute z-10 bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button onClick={() => setSelectedMovie(movie)} className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center justify-center space-x-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span>Add Shows</span>
                  </button>
                </div>


              </div>
              <h2 className="text-sm font-medium mt-2 w-[150px] truncate">
                {movie.title}
              </h2>
              <h2 className="text-xs text-gray-600 w-[150px]">
                {movie.release_date}
              </h2>
            </div>
          ))}
        </div>
        {selectedMovie && (
          <div className="mt-8">
            <h1 className="text-2xl font-bold text-white mb-4">
              Add Shows for {selectedMovie.title}
            </h1>
            <form className="space-y-6" onSubmit={handleAddShow}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Date Selection */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Show Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    name="showDate"
                    value={formData.showDate}
                    onChange={(e) =>
                      setFormData({ ...formData, showDate: e.target.value })
                    }
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
                    required
                  />
                </div>


                {/* Time Selection */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Show Time <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="time"
                    name="showTime"
                    value={formData.showTime}
                    onChange={(e) =>
                      setFormData({ ...formData, showTime: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
                    required
                  />
                </div>


                {/* Price */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Ticket Price <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="Enter ticket price"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
                    required
                  />
                </div>
              </div>


              {/* Action Buttons */}
              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  {isSubmitting ? "Adding..." : "Add Show"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};


export default AddShows;