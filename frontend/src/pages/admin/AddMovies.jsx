import React from "react";
import Title from "../../components/Title";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../../config/api";


const AddMovies = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  const [formData, setFormData] = React.useState({
    title: "",
    overview: "",
    poster_path: "",
    backdrop_path: "",
    release_date: "",
    original_language: "",
    tagline: "",
    genres: "",
    cast: "",
    rating: "",
    runtime: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your API call here to submit the movie data
    if(formData.title.trim().length === 0 || formData.overview.trim().length === 0 || 
        formData.poster_path.trim().length === 0 || formData.release_date.trim().length === 0 || 
        formData.original_language.trim().length === 0 || formData.genres.trim().length === 0 || 
        formData.cast.trim().length === 0 || formData.rating.trim().length === 0 || 
        formData.runtime.trim().length === 0){
      toast.error("Please fill all the fields");
      return;
    }


    if(formData.rating>10 || formData.rating<0){
      toast.error("Rating should be between 0 and 10");
      return;
    }
    if(formData.runtime<0 || formData.runtime>300){
      toast.error("Runtime should be greater than 0");
      return;
    }
    if(formData.release_date<new Date().toISOString().split('T')[0]){
      toast.error("Release date should be greater than today");
      return;
    }


    try{
        const token = localStorage.getItem("token");
      const response = await axios.post(`${BASE_URL}/admin/add-movie`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.status === 200){
        toast.success("Movie added successfully");
        setFormData({
          title: "",
          overview: "",
          poster_path: "",
          backdrop_path: "",
          release_date: "",
          original_language: "",
          tagline: "",
          genres: "",
          cast: "",
          rating: "",
          runtime: "",
        });
      }else{
        toast.error("Error adding movie");
      } 
    }catch(error){
      toast.error("Error adding movie");
        }
  };


  const handleClose = (e) => {
    e.preventDefault();
    setFormData({
      title: "",
      overview: "",
      poster_path: "",
      backdrop_path: "",
      release_date: "",
      original_language: "",
      tagline: "",
      genres: "",
      cast: "",
      rating: "",
      runtime: "",
    });
    window.location.href = "/admin";
  };


  return (
    <div className="ml-[22%] my-[5%] w-[75%]">
      <Title title="Add" text="Movies" />
      <form className="mt-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-white text-sm font-semibold mb-2">
              Movie Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter movie title"
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
              required
            />
          </div>


          {/* Overview */}
          <div className="md:col-span-2">
            <label className="block text-white text-sm font-semibold mb-2">
              Overview <span className="text-red-400">*</span>
            </label>
            <textarea
              name="overview"
              value={formData.overview}
              onChange={handleChange}
              rows="2"
              placeholder="Enter movie overview/description"
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors resize-none"
              required
            />
          </div>


          {/* Poster Path */}
          <div className="flex flex-col">
            <label className="block text-white text-sm font-semibold mb-2">
              Poster Path (URL) <span className="text-red-400">*</span>
            </label>
            <input
              type="url"
              name="poster_path"
              value={formData.poster_path}
              onChange={handleChange}
              placeholder="https://example.com/poster.jpg"
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
              required
            />
            <div>
              {formData.poster_path ? (
                <div>
                  <img src={formData.poster_path} alt="Movie Poster" />
                </div>
              ) : null}
            </div>
          </div>


          {/* Backdrop Path */}
          <div className="flex flex-col">
            <label className="block text-white text-sm font-semibold mb-2">
              Backdrop Path (URL)
            </label>
            <input
              type="url"
              name="backdrop_path"
              value={formData.backdrop_path}
              onChange={handleChange}
              placeholder="https://example.com/backdrop.jpg"
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
            />
            <div>
              {formData.backdrop_path ? (
                <div>
                  <img src={formData.backdrop_path} alt="Movie Backdrop" />
                </div>
              ) : null}
            </div>
          </div>


          {/* Release Date */}
          <div>
            <label className="block text-white text-sm font-semibold mb-2">
              Release Date <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              name="release_date"
              value={formData.release_date}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500 transition-colors"
              required
            />
          </div>


          {/* Original Language */}
          <div>
            <label className="block text-white text-sm font-semibold mb-2">
              Original Language <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="original_language"
              value={formData.original_language}
              onChange={handleChange}
              placeholder="e.g., English, Hindi, Tamil"
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
              required
            />
          </div>


          {/* Tagline */}
          <div className="md:col-span-2">
            <label className="block text-white text-sm font-semibold mb-2">
              Tagline
            </label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              placeholder="Enter movie tagline"
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
            />
          </div>


          {/* Genres */}
          <div>
            <label className="block text-white text-sm font-semibold mb-2">
              Genres <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="genres"
              value={formData.genres}
              onChange={handleChange}
              placeholder="e.g., Action, Drama, Thriller"
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
              required
            />
            {formData.genres.trim().length > 0 && (
              <p className="text-gray-400 text-xs mt-1">
                Separate multiple genres with commas
              </p>
            )}
          </div>


          {/* Cast */}
          <div>
            <label className="block text-white text-sm font-semibold mb-2">
              Cast <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="cast"
              value={formData.cast}
              onChange={handleChange}
              placeholder="e.g., Actor 1, Actor 2, Actor 3"
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
              required
            />
            {formData.cast.trim().length > 0 && (
              <p className="text-gray-400 text-xs mt-1">
                Separate cast members with commas
              </p>
            )}
          </div>


          {/* Rating */}
          <div>
            <label className="block text-white text-sm font-semibold mb-2">
              Rating <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="10"
              step="0.1"
              placeholder="e.g., 8.5"
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
              required
            />
            <p className="text-gray-400 text-xs mt-1">Rating out of 10</p>
          </div>


          {/* Runtime */}
          <div>
            <label className="block text-white text-sm font-semibold mb-2">
              Runtime (in minutes) <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              name="runtime"
              value={formData.runtime}
              onChange={handleChange}
              min="1"
              placeholder="e.g., 120"
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
              required
            />
          </div>
        </div>


        {/* Submit Button */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-pink-500/50"
          >
            Add Movie
          </button>
        </div>
      </form>
    </div>
  );
};


export default AddMovies;
