package com.movie_booking.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardDataDto {
    private long totalUsers;
    private long totalShows;
    private  long totalBookings;
    private double totalRevenue;

}
