package com.movie_booking.backend.service;

import com.movie_booking.backend.dto.*;
import com.movie_booking.backend.entity.*;
import com.movie_booking.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MovieServiceImpl implements MovieService {


    private final MovieRepository movieRepository;
    private final ShowRepository showRepository;
    private final BookingRepository bookingRepository;
    private final FavouritesRepository favouritesRepository;
    private final UserRepository userRepository;


    public ResponseEntity<?> addMovies(MovieDto movieDto) {
        try {
            Movie movie = new Movie();
            movie.setTitle(movieDto.getTitle());
            movie.setOverview(movieDto.getOverview());
            movie.setPoster_path(movieDto.getPoster_path());
            movie.setBackdrop_path(movieDto.getBackdrop_path());
            movie.setRelease_date(movieDto.getRelease_date());
            movie.setOriginal_language(movieDto.getOriginal_language());
            movie.setTagline(movieDto.getTagline());

            // Handle null genres safely
            if (movieDto.getGenres() != null && !movieDto.getGenres().trim().isEmpty()) {
                movie.setGenres(List.of(movieDto.getGenres().split(",")));
            } else {
                movie.setGenres(List.of()); // Empty list if null or empty
            }

            // Handle null cast safely
            if (movieDto.getCast() != null && !movieDto.getCast().trim().isEmpty()) {
                movie.setCast(List.of(movieDto.getCast().split(",")));
            } else {
                movie.setCast(List.of()); // Empty list if null or empty
            }

            movie.setRating(movieDto.getRating());
            movie.setRuntime(movieDto.getRuntime());
            movieRepository.save(movie);
            return ResponseEntity.ok().body(new ApiResponse<>("Movie added successfully", true, null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<String>("Error adding movie: " + e.getMessage(), false, e.getMessage()));
        }

    }


    public ResponseEntity<?> getAllMovies() {
        try {
            List<Movie> movies = movieRepository.findAll();
            return ResponseEntity.ok().body(new ApiResponse<List<Movie>>("Movies fetched successfully", true, movies));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<String>("Error fetching movies: " + e.getMessage(), false, e.getMessage()));
        }
    }


    public ResponseEntity<?> addShow(ShowDto showDto) {
        try {
            Show show = new Show();
            show.setMovieId( (long) showDto.getMovieId().intValue());
            show.setShowDateTime(showDto.getShowDate() + " " + showDto.getShowTime());
            show.setPrice(showDto.getPrice());
            show.setOccupiedSeats(List.of());
            showRepository.save(show);
            return ResponseEntity.ok().body(new ApiResponse<>("Show added successfully", true, null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<String>("Error adding show: " + e.getMessage(), false, e.getMessage()));
        }
    }


    public ResponseEntity<?> getAllShows() {
        try {
            Set<Long> movieIds = new HashSet<>();
            List<Show> shows = showRepository.findAll();
            List<ShowResponse> showResponses = shows.stream()
                    .filter(show -> !movieIds.contains((long) show.getMovieId())) // Filter first
                    .map(show -> {
                        movieIds.add((long) show.getMovieId());
                        Movie movie = movieRepository.findById((long) show.getMovieId()).orElse(null);

                        // Handle null movie case
                        if (movie == null) {
                            return new ShowResponse(show.getId(), "Unknown Movie", "No description",
                                    List.of(), "0", "Unknown", show.getShowDateTime(),
                                    show.getPrice(), "", 0.0);
                        }

                        return new ShowResponse(show.getId(), movie.getTitle(), movie.getOverview(),
                                movie.getGenres(), String.valueOf(movie.getRuntime()), movie.getRelease_date(),
                                show.getShowDateTime(), show.getPrice(), movie.getPoster_path(), movie.getRating());
                    })
                    .collect(Collectors.toList());

            return ResponseEntity.ok().body(new ApiResponse<List<ShowResponse>>("Shows fetched successfully", true, showResponses));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<String>("Error fetching shows: " + e.getMessage(), false, e.getMessage()));
        }
    }

    @Override
    public ResponseEntity<?> getAdminAllShows() {
        try {
            Set<Long> movieIds = new HashSet<>();
            List<Show> shows = showRepository.findAll();
            List<ShowResponse> showResponses = shows.stream()
                    .map(show -> {
                        Movie movie = movieRepository.findById((long) show.getMovieId()).orElse(null);

                        // Handle null movie case
                        if (movie == null) {
                            return new ShowResponse(show.getId(), "Unknown Movie", "No description",
                                    List.of(), "0", "Unknown", show.getShowDateTime(),
                                    show.getPrice(), "", 0.0);
                        }

                        return new ShowResponse(show.getId(), movie.getTitle(), movie.getOverview(),
                                movie.getGenres(), String.valueOf(movie.getRuntime()), movie.getRelease_date(),
                                show.getShowDateTime(), show.getPrice(), movie.getPoster_path(), movie.getRating());
                    })
                    .collect(Collectors.toList());

            return ResponseEntity.ok().body(new ApiResponse<List<ShowResponse>>("Shows fetched successfully", true, showResponses));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<String>("Error fetching shows: " + e.getMessage(), false, e.getMessage()));
        }
    }


    public ResponseEntity<?> getShowById(Long id) {
        try {
            Show show = showRepository.findById(id).orElse(null);
            Movie movie = movieRepository.findById((long) show.getMovieId()).orElse(null);
            List<Date> showDates = showRepository.findAll().stream().filter(show1 -> show1.getMovieId() == movie.getId()).map(show1 -> {
                try {
                    return new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm").parse(show1.getShowDateTime());
                } catch (java.text.ParseException e) {
                    return null;
                }
            }).collect(Collectors.toList());
            return ResponseEntity.ok().body(new ApiResponse<MovieResponseDto>("Show fetched successfully", true, new MovieResponseDto(
                    movie.getTitle(),
                    movie.getOverview(),
                    movie.getGenres(),
                    movie.getCast(),
                    String.valueOf(movie.getRuntime()),
                    movie.getRelease_date(),
                    movie.getRating(),
                    movie.getPoster_path(),
                    showDates
            )));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<String>("Error fetching show: " + e.getMessage(), false, e.getMessage()));
        }
    }


    public ResponseEntity<?> getShowByIdAndDate(Long id, String date) {
        try {
            Show show = showRepository.findById(id).orElse(null);
            long movieID = show.getMovieId();
            List<Show> shows = showRepository.findAll().stream().filter(show1 -> show1.getMovieId() == movieID && show1.getShowDateTime().contains(date)).collect(Collectors.toList());
            return ResponseEntity.ok().body(new ApiResponse<List<Show>>("Show fetched successfully", true, shows));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<String>("Error fetching show: " + e.getMessage(), false, e.getMessage()));
        }
    }


    @Override
    public ResponseEntity<?> bookShow(BookingRequestDto bookingRequestDto) {
        try {


            String username = SecurityContextHolder.getContext().getAuthentication().getName();

            Show show = showRepository.findById(bookingRequestDto.getShowId()).orElse(null);
            if (show == null) {
                return ResponseEntity.badRequest().body(new ApiResponse<String>("Show not found", false, "Show not found"));
            }


            show.getOccupiedSeats().addAll(List.of(bookingRequestDto.getSeats()));


            BookingDetails bookingDetails = new BookingDetails();
            bookingDetails.setShowId(bookingRequestDto.getShowId());
            bookingDetails.setAmount(bookingRequestDto.getPrice() * bookingRequestDto.getSeats().length);
            bookingDetails.setBookedSeats(List.of(bookingRequestDto.getSeats()));
            bookingDetails.setUsername(username);
            bookingRepository.save(bookingDetails);


            showRepository.save(show);
            bookingRepository.save(bookingDetails);
            return null;
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<String>("Error booking show: " + e.getMessage(), false, e.getMessage()));
        }
    }


    @Override
    public ResponseEntity<?> getAllBookings() {
        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            List<BookingDetails> bookings = bookingRepository.findAll().stream().filter(booking -> booking.getUsername().equals(username)).collect(Collectors.toList());
            List<BookingResponseDto> bookingResponses = bookings.stream().map(booking -> {
                Show show = showRepository.findById(booking.getShowId()).orElse(null);
                Movie movie = movieRepository.findById((long) show.getMovieId()).orElse(null);
                try {
                    return new BookingResponseDto(
                            booking.getId(),
                            booking.getShowId(),
                            movie.getTitle(),
                            movie.getPoster_path(),
                            movie.getRuntime(),
                            (int) booking.getAmount(),
                            booking.getBookedSeats().toArray(new String[0]),
                            booking.isPaid(),
                            new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm").parse(show.getShowDateTime())
                    );
                } catch (java.text.ParseException e) {
                    return null;
                }
            }).collect(Collectors.toList());
            return ResponseEntity.ok().body(new ApiResponse<List<BookingResponseDto>>("Bookings fetched successfully", true, bookingResponses));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<String>("Error fetching bookings: " + e.getMessage(), false, e.getMessage()));
        }
    }


    public ResponseEntity<?> addToFavourites(Long movieId) {
        User user = userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName()).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body(new ApiResponse<String>("User not found", false, "User not found"));
        }
        try {
            Favourites favourites = new Favourites();
            favourites.setUserId(user.getId());
            favourites.setMovieId(movieId);
            favouritesRepository.save(favourites);
            return ResponseEntity.ok().body(new ApiResponse<String>("Movie added to favourites", true, null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<String>("Error adding movie to favourites: " + e.getMessage(), false, e.getMessage()));
        }
    }


    public ResponseEntity<?> getFavourites() {
        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userRepository.findByUsername(username).orElse(null);
            if (user == null) {
                return ResponseEntity.badRequest().body(new ApiResponse<String>("User not found", false, "User not found"));
            }
            List<Favourites> favourites = favouritesRepository.findAll().stream().filter(favourite -> favourite.getUserId() == user.getId()).collect(Collectors.toList());
            List<Movie> movies = favourites.stream().map(favourite -> movieRepository.findById(favourite.getMovieId()).orElse(null)).collect(Collectors.toList());
            return ResponseEntity.ok().body(new ApiResponse<List<Movie>>("Favourites fetched successfully", true, movies));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<String>("Error fetching favourites: " + e.getMessage(), false, e.getMessage()));
        }
    }


    public ResponseEntity<?> deleteShow(Long showId) {
        try {
            Show show = showRepository.findById(showId).orElse(null);
            if (show == null) {
                return ResponseEntity.badRequest().body(new ApiResponse<String>("Show not found", false, "Show not found"));
            }
            showRepository.deleteById(showId);
            return ResponseEntity.ok().body(new ApiResponse<String>("Show deleted successfully", true, null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<String>("Error deleting show: " + e.getMessage(), false, e.getMessage()));
        }
    }

    public ResponseEntity<?> checkFavourite(Long movieId) {
        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userRepository.findByUsername(username).orElse(null);
            if (user == null) {
                return ResponseEntity.badRequest().body(new ApiResponse<String>("User not found", false, "User not found"));
            }
            boolean isFavourite = favouritesRepository.findAll().stream()
                    .anyMatch(favourite -> Objects.equals(favourite.getUserId(), user.getId()) && favourite.getMovieId().equals(movieId));
            return ResponseEntity.ok().body(new ApiResponse<Boolean>("Favourite status fetched successfully", true, isFavourite));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<String>("Error checking favourite status: " + e.getMessage(), false, e.getMessage()));
        }
    }

    public ResponseEntity<?> removeFromFavourites(Long movieId) {
        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userRepository.findByUsername(username).orElse(null);
            if (user == null) {
                return ResponseEntity.badRequest().body(new ApiResponse<String>("User not found", false, "User not found"));
            }
            Favourites favourite = favouritesRepository.findAll().stream()
                    .filter(fav -> Objects.equals(fav.getUserId(), user.getId()) && fav.getMovieId().equals(movieId))
                    .findFirst()
                    .orElse(null);
            if (favourite == null) {
                return ResponseEntity.badRequest().body(new ApiResponse<String>("Favourite not found", false, "Favourite not found"));
            }
            favouritesRepository.deleteById(favourite.getId());
            return ResponseEntity.ok().body(new ApiResponse<String>("Movie removed from favourites", true, "Favourite removed successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<String>("Error removing movie from favourites: " + e.getMessage(), false, e.getMessage()));
        }
    }

    public ResponseEntity<?> getAdminDashboardData(){
        try {
            long totalUsers = userRepository.count();
            long totalShows = showRepository.count();
            long totalBookings = bookingRepository.count();
            double totalRevenue =  bookingRepository.findAll().stream().filter(BookingDetails::isPaid)
                    .mapToDouble(BookingDetails::getAmount)
                    .sum();;

            AdminDashboardDataDto dashboardData = new AdminDashboardDataDto(totalUsers, totalShows, totalBookings, totalRevenue);

            return ResponseEntity.ok().body(new ApiResponse<AdminDashboardDataDto>("Admin dashboard data fetched successfully", true, dashboardData));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<String>("Error fetching admin dashboard data: " + e.getMessage(), false, e.getMessage()));
        }
    }

}

