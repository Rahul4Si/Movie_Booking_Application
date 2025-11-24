import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import SeatLayout from "./pages/SeatLayout";
import Favourites from "./pages/Favourites";
import MyBookings from "./pages/MyBookings";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import LoginRegister from "./pages/LoginRegister";
import TermsAndConditions from "./pages/TermsAndConditions";
import Layout from "./pages/admin/Layout";
import DashBoard from "./pages/admin/DashBoard";
import AddShows from "./pages/admin/AddShows";
import ListShows from "./pages/admin/ListShows";
import ListBookings from "./pages/admin/ListBookings";
import PageNotFound from "./pages/PageNotFound";
import AddMovies from "./pages/admin/AddMovies";


function App() {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  return (
    <>
      <Toaster position="top-right" />
      {!isAdminRoute && <Navbar />}
      <div className="min-h-[83vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/movies/:id/:date" element={<SeatLayout />} />
          <Route path="/mybookings" element={<MyBookings />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/admin/*" element={<Layout />}>
            <Route index element={<DashBoard />} />
            <Route path="add-shows" element={<AddShows />} />
            <Route path="add-movies" element={<AddMovies />} />
            <Route path="list-shows" element={<ListShows />} />
            <Route path="list-bookings" element={<ListBookings />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      {!isAdminRoute && <Footer />}
    </>
  );
}


export default App;