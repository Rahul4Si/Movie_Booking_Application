import React from "react";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import { Trash2, Edit3, Eye, Calendar, DollarSign } from "lucide-react";
import toast from "react-hot-toast";
import timeformatDuration from "../../lib/timeformatDuration";


const ListShows = () => {
  const [activeShows, setActiveShows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(null);
  const token = localStorage.getItem("token");
  
  if (!token) {
    window.location.href = "/login";
  }


  const getAllShows = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/admin/get-all-show`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setActiveShows(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch shows");
    } finally {
      setLoading(false);
    }
  };


  const handleDeleteShow = async (showId) => {
    if (!window.confirm("Are you sure you want to delete this show?")) {
      return;
    }


    setDeleteLoading(showId);
    try {
      const response = await axios.delete(`${BASE_URL}/admin/delete-show/${showId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.status === 200) {
        toast.success("Show deleted successfully");
        // Remove the deleted show from the state
        setActiveShows(activeShows.filter(show => show.id !== showId));
      }
    } catch (error) {
      toast.error("Failed to delete show");
    } finally {
      setDeleteLoading(null);
    }
  };


  React.useEffect(() => {
    getAllShows();
  }, []);


  console.log(activeShows);
  
  return (
    <div className="ml-[22%] my-[5%] w-[75%]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Manage Shows</h1>
        <p className="text-gray-400">View and manage all movie shows</p>
      </div>


      {/* Table Container */}
      <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          </div>
        ) : activeShows.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No shows found</div>
            <p className="text-gray-500">Add some shows to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead className="bg-gradient-to-r from-gray-700/50 to-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Movie
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Show Date & Time
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      Price
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Runtime
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>


              {/* Table Body */}
              <tbody className="divide-y divide-gray-700/50">
                {activeShows.map((show, index) => (
                  <tr
                    key={show.id || index}
                    className="hover:bg-gray-700/30 transition-all duration-300 group"
                  >
                    {/* Movie Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-16 h-24 rounded-lg overflow-hidden bg-gray-700">
                          {show?.imageUrl ? (
                            <img
                              src={show?.imageUrl}
                              alt={show.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <Eye className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                       
                      </div>
                    </td>


                    {/* Show Date & Time */}
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">
                        {show.showDateTime ? (
                          <>
                            <div>{new Date(show.showDateTime).toLocaleDateString()}</div>
                            <div className="text-sm text-gray-400">
                              {new Date(show.showDateTime).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </>
                        ) : (
                          <span className="text-gray-400">No date set</span>
                        )}
                      </div>
                    </td>


                    {/* Price */}
                    <td className="px-6 py-4">
                      <div className="text-white font-semibold text-lg">
                        ${show.price || "0"}
                      </div>
                    </td>


                    {/* Runtime */}
                    <td className="px-6 py-4">
                      <div className="text-gray-300">
                        {show.duration ? timeformatDuration(show.duration) : "N/A"}
                      </div>
                    </td>


                    {/* Rating */}
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-yellow-400 text-lg mr-1">★</span>
                        <span className="text-white font-medium">
                          {show.rating ? show.rating.toFixed(1) : "N/A"}
                        </span>
                      </div>
                    </td>


                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-3">
       


                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteShow(show.id)}
                          disabled={deleteLoading === show.id}
                          className="p-2 text-red-400 cursor-pointer hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete Show"
                        >
                          {deleteLoading === show.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-400"></div>
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>


      {/* Footer Stats */}
      <div className="mt-6 flex justify-between items-center text-sm text-gray-400">
        <div>Total Shows: {activeShows.length}</div>
        <div className="flex items-center space-x-4">
          <button
            onClick={getAllShows}
            className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-300"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
    );
};


export default ListShows;
