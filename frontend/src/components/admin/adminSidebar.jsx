import { CopyPlus, LayoutDashboard, List, ListCheck, Film } from "lucide-react";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";


const AdminSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (!token || role !== "ROLE_ADMIN") {
    window.location.href = "/login";
  }
  const username = localStorage.getItem("username");


  // Define navigation items
  const navItems = [
    {
      path: "/admin",
      label: "Dashboard",
      icon: LayoutDashboard,
      isActive: pathname === "/admin",
    },
    {
      path: "/admin/add-shows",
      label: "Add Shows",
      icon: CopyPlus,
      isActive: pathname === "/admin/add-shows",
    },
    {
      path: "/admin/add-movies",
      label: "Add Movies",
      icon: Film,
      isActive: pathname === "/admin/add-movies",
    },
    {
      path: "/admin/list-shows",
      label: "List Shows",
      icon: List,
      isActive: pathname === "/admin/list-shows",
    },
    {
      path: "/admin/list-bookings",
      label: "List Bookings",
      icon: ListCheck,
      isActive: pathname === "/admin/list-bookings",
    },
  ];


  const handleNavigation = (path) => {
    navigate(path);
  };


  const handleLogout = () => { 
    localStorage.clear(); 
    window.location.href = "/"; 
  };


  return (
    <div className="w-[20%] fixed top-[10%] h-[88vh] bg-gradient-to-b from-gray-900 to-black border-r border-gray-700/50 flex flex-col">
      {/* Header */}
      <div class="relative text-center flex flex-col items-center justify-center gap-3 p-4">
        <img
          className="h-20 w-20 rounded-full"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
          alt="userImage1"
        />
        <h3>{username}</h3>
      </div>


      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.path}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group ${
                    item.isActive
                      ? "bg-gradient-to-r from-pink-500/20 to-purple-600/20 text-white border border-pink-500/30 shadow-lg shadow-pink-500/10"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/50 hover:transform hover:translate-x-1"
                  }`}
                >
                  <IconComponent
                    className={`w-5 h-5 transition-all duration-200 ${
                      item.isActive
                        ? "text-pink-400"
                        : "text-gray-400 group-hover:text-pink-400"
                    }`}
                  />
                  <span className="font-medium">{item.label}</span>
                  {item.isActive && (
                    <div className="ml-auto w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>


      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-all duration-200 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};


export default AdminSidebar;
