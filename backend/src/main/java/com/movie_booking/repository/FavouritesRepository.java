package com.movie_booking.backend.repository;

import com.movie_booking.backend.entity.Favourites;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavouritesRepository extends JpaRepository<Favourites,Long> {

}
