import { Menu, Search, X } from "lucide-react"; 
import React from "react"; 
import { Link, useNavigate } from "react-router-dom"; 
import AccountMenu from "./AccountMenu"; 


const Navbar = () => { 
  const [isMenuOpen, setIsMenuOpen] = React.useState(false); 
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role") === 'ROLE_ADMIN' ? 'admin' : 'user'; 
  const navigate = useNavigate();


  return ( 
    <div> 
      {/* Sidebar Menu */}
      {
        role === 'user' &&  (
          <div 
        className={`fixed top-0 left-0 h-full w-[50%] bg-gray-900 text-white z-50 transform transition-transform duration-300 ease-in-out ${ 
          isMenuOpen ? "translate-x-0" : "-translate-x-full" 
        }`} 
        style={{ boxShadow: isMenuOpen ? "2px 0 8px rgba(0,0,0,0.2)" : "none" }} 
      > 
        <div className="flex  items-center p-4 border-b border-gray-700"> 
          <span className="font-bold text-lg">Menu</span> 
        </div> 
        <nav className="flex flex-col gap-4 p-4"> 
          <Link to="/" onClick={() => setIsMenuOpen(false)}> 
            Home 
          </Link> 
          <Link to="/movies" onClick={() => setIsMenuOpen(false)}> 
            Movies 
          </Link> 
          <Link to="/mybookings" onClick={() => setIsMenuOpen(false)}> 
            My Bookings 
          </Link> 
          <Link to="/favourites" onClick={() => setIsMenuOpen(false)}> 
            Favourites 
          </Link> 
        </nav> 
      </div> 
        )
      } 
      


      {/* Overlay */} 
      {isMenuOpen && ( 
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsMenuOpen(false)} 
        ></div> 
      )} 
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between md:justify-around items-center "> 
        <div className="col-span-1 "> 
          <Link to="/" data-discover="true"> 
            <img 
              src="https://cinemaity.com/images/logo.png" 
              alt="logo" 
              className="top-0 bottom-0 right-0 left-0 h-20 object-contain" 
            /> 
          </Link> 
        </div> 
        <div> 
          <nav className=" gap-4 px-4 py-2 hidden md:flex bg-gray-800 rounded-full"> 
            <Link className="px-3" to="/"> 
              Home 
            </Link> 
            <Link className="px-3" to="/movies"> 
              Movies 
            </Link> 
            <Link className="px-3" to="/mybookings"> 
              My Bookings 
            </Link> 
            <Link className="px-3" to="/favourites"> 
              Favourites 
            </Link> 
          </nav> 
        </div> 


        <div className="flex gap-4 items-center "> 
          <Search className="w-6 h-6 mr-10 hidden md:block" /> 
          {token ? ( 
            <AccountMenu /> 
          ) : ( 
            <Link 
              to="/login" 
              className="bg-red-500 text-white px-4 py-1 rounded-full" 
            > 
              Login 
            </Link> 
          )} 



          {/* Hamburger Menu for Mobile */} 
          <button className="md:hidden" onClick={() => setIsMenuOpen(true)}> 
            {isMenuOpen ? ( 
              <X className="w-6 h-6" /> 
            ) : ( 
              <Menu className="w-6 h-6" /> 
            )} 
          </button> 
        </div> 
      </div> 
    </div> 
  ); 
}; 


export default Navbar;