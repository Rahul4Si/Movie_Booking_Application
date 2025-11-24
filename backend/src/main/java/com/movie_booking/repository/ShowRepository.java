package com.movie_booking.backend.repository;

import com.movie_booking.backend.entity.Show;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShowRepository extends JpaRepository<Show,Long> {
    List<Show> findByMovieId(int movieId);
}
