package com.movie_booking.backend.controller;

import com.movie_booking.backend.dto.UpdateBookingStatus;
import com.movie_booking.backend.entity.BookingDetails;
import com.movie_booking.backend.entity.Show;
import com.movie_booking.backend.repository.BookingRepository;
import com.movie_booking.backend.repository.ShowRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user-payment")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@EnableScheduling
public class PaymentController {


    private final BookingRepository bookingRepository;
    private final ShowRepository showRepository;


    @Value("${stripe.api.key}")
    private String stripeApiKey;


    @PostConstruct
    public void init() {
        // Trim whitespace and validate the API key
        if (stripeApiKey != null) {
            stripeApiKey = stripeApiKey.trim();
            if (stripeApiKey.isEmpty()) {
                throw new IllegalStateException("Stripe API key is empty");
            }
            Stripe.apiKey = stripeApiKey;
            System.out.println("Stripe API key configured successfully");
        } else {
            throw new IllegalStateException("Stripe API key not found in configuration");
        }
    }


    @PostMapping("/create-intent")
    public Map<String, String> createPaymentIntent(@RequestBody Map<String, Object> data) throws StripeException {
        Long amount = Long.valueOf(data.get("amount").toString());


        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amount)
                .setCurrency("inr")
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods
                                .builder()
                                .setEnabled(true)
                                .build()
                )
                .build();


        PaymentIntent intent = PaymentIntent.create(params);


        Map<String, String> responseData = new HashMap<>();
        responseData.put("clientSecret", intent.getClientSecret());


        return responseData;
    }


    @PostMapping("/update-booking-status")
    public String updateBookingStatus(@RequestBody UpdateBookingStatus request) {

        BookingDetails bookingDetails = bookingRepository.findById(request.getBookingId()).orElse(null);
        bookingDetails.setPaid(true);
        bookingRepository.save(bookingDetails);
        return "success";
    }


    @Scheduled(fixedRate = 60000)
    public void  unlockExpiredSeats() {
        Timestamp fiveMinutesAgo = Timestamp.from(Instant.now().minus(5, ChronoUnit.MINUTES));
        List<BookingDetails> bookings = bookingRepository.findByPaid(false);
        bookings.forEach(booking -> {
            if (booking.getBookedDateTime().before(fiveMinutesAgo)) {
                Show show = showRepository.findById(booking.getShowId()).orElse(null);
                show.getOccupiedSeats().removeAll(booking.getBookedSeats());
                showRepository.save(show);
                bookingRepository.delete(booking);
            }
        });
    }
}
