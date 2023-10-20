package com.booking.dto.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@Data
public class CreateReviewDto {
    private List<MultipartFile> imgReview;
    private int rate;
    private String description;
    private Long reservarId;
//    private Long customerId;
}
