package com.booking.service.implement;

import com.booking.dto.Convert;
import com.booking.dto.request.CreateReviewDto;
import com.booking.dto.response.ReviewDto;
import com.booking.entity.Customer;
import com.booking.entity.EStateReservar;
import com.booking.entity.Reservar;
import com.booking.entity.Review;
import com.booking.exception.CustomException;
import com.booking.repository.CustomerRepository;
import com.booking.repository.ReservarRepository;
import com.booking.repository.ReviewRepository;
import com.booking.service.interfaces.ImageService;
import com.booking.service.interfaces.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.stream.Collectors;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImp implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final CustomerRepository customerRepository;
    private final ImageService imageService;
    private final ReservarRepository reservarRepository;

    public void createReview(CreateReviewDto createReviewDto) {
        Reservar reservar = reservarRepository.findByReservarId(createReviewDto.getReservarId());
        Customer customer = reservar.getCustomer();
        if (reservar.getStateReservar() == EStateReservar.CHECK_OUT) {
            Review review = new Review().builder()
                    .rate(createReviewDto.getRate())
                    .description(createReviewDto.getDescription())
                    .reservarId(createReviewDto.getReservarId())
                    .customer(customer).build();
            review.setImgReview(createReviewDto.getImgReview().stream().map(data -> {
                try {
                    return imageService.saveUploadedFile(data);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }).collect(Collectors.toSet()));
            reviewRepository.save(review);
        } else {
            throw new CustomException("Vui lòng trải nghiệm thêm, và quay lại đánh giá chúng tôi sau");
        }
    }

    public ReviewDto getReviewToReservar(Long reservarId){
        Review review = reviewRepository.findByReservarId(reservarId);
        Reservar reservar =reservarRepository.findByReservarId(reservarId);
        return Convert.convertToReviewDto(review,reservar);
    }
    public List<ReviewDto> getCustomerReviews(Long customerId) {
        Customer customer = customerRepository.findByCustomerId(customerId);
        return customer.getReviews().stream().map(data -> Convert.convertToReviewDto(data, reservarRepository.findByReservarId(data.getReservarId()))).toList();
    }

    public List<ReviewDto> getProviderReviews(Long providerId) {
        List<Review> reviews = reviewRepository.findAll().stream().filter(data-> reservarRepository.findByReservarId(data.getReservarId()).getProvider().getProviderId() == providerId).toList();
        return reviews.stream().map(data -> Convert.convertToReviewDto(data, reservarRepository.findByReservarId(data.getReservarId()))).toList();
    }

    public float rateAgs(Long providerId){
        List<Review> reviews = reviewRepository.findAll().stream().filter(data-> reservarRepository.findByReservarId(data.getReservarId()).getProvider().getProviderId() == providerId).toList();
        return reviews.stream().mapToInt(data->data.getRate()).sum()/(reviews.size());
    }
}
