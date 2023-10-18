package com.booking.service.interfaces;

import com.booking.dto.request.CreateReviewDto;
import com.booking.dto.response.ReviewDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ReviewService {
    void createReview(CreateReviewDto createReviewDto);
    List<ReviewDto> getCustomerReviews(Long customerId);
    List<ReviewDto> getProviderReviews(Long providerId);
}
