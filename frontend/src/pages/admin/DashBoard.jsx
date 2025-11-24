import React, { useEffect } from "react";
import Title from "../../components/Title";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import { dashBoardCards } from "../../components/DummyData";


const DashBoard = () => {
  const [activeShows, setActiveShows] = React.useState([]);
  const [dashboardData, setDashboardData] = React.useState(null);
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }
  React.useEffect(() => {
    const getAllShows = async () => {
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
      }
    };
    getAllShows(); 
  }, []);

  useEffect(() => {
    const getAdminDashboardData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/get-admin-dashboard-data`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          // Update your state with the dashboard data
          setDashboardData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching admin dashboard data:", error);
        
      }
    };
    getAdminDashboardData();
  }, []);

  console.log(dashboardData);

  return (
    <div className="ml-[22%] my-[5%] w-[75%]">
      <Title title="Admin" text="Dashboard" />
      
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 mt-8">
        {dashBoardCards.map((card) => (
          <div
            key={card.title}
            className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-pink-500/30 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-pink-500/10"
          >
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>


            {/* Content */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div className="text-gray-400 text-sm font-medium mb-2 group-hover:text-gray-300 transition-colors">
                  {card.title}
                </div>
                <div className="text-3xl font-bold text-white mb-1 group-hover:text-pink-100 transition-colors">
                  {card.value}
                </div>
                <div className="h-1 w-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2"></div>
              </div>


              {/* Icon Container */}
              <div className="relative ml-5">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-xl flex items-center justify-center ">
                  {card.icon}
                </div>
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active Movies */}
      <div className="mt-20">
        <h1 className="text-2xl font-bold text-white mb-4">Active Shows</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 mt-8">
          {activeShows.map((show) => (
            <div
              key={show._id}
              className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl hover:border-pink-500/30 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-pink-500/10 overflow-hidden"
            >
              {/* Background Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-600/10 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>


              <div className="relative z-10 space-y-4">
                {/* Movie Poster Section */}
                <div className="flex justify-center">
                  <div className="relative group/poster">
                    <img
                      src={show?.poster_path || show?.imageUrl}
                      alt={show.title}
                      className="w-72 h-60 object-cover rounded-lg shadow-lg border-2 border-gray-700/50 group-hover:border-pink-500/30 transition-all duration-300 transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>


                {/* Movie Title */}
                <div className="mx-2" >
                  <h3 className="text-lg font-bold text-white group-hover:text-pink-100 transition-colors duration-300 line-clamp-2">
                    {show.title}
                  </h3>
                  <div className="h-0.5 w-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </div>


                {/* Show Details */}
                <div className="space-y-3 mx-2">
                  {/* Price and Rating */}
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        ₹{show.price}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-lg font-semibold text-white ">
                        {show.rating || 'N/A'}
                      </span>
                    </div>
                  </div>


                  {/* Show Date & Time */}
                  <div className="text-gray-700 mb-2">
                    <div className="text-sm font-medium text-gray-300 group-hover:text-blue-100 transition-colors duration-300">
                      {new Date(show.showDateTime).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })} at {new Date(show.showDateTime).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default DashBoard;