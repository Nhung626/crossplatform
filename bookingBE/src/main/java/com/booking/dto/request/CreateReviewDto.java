package com.booking.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@Setter
@Getter
@Builder
public class CreateReviewDto {
    private List<MultipartFile> imgReview;
    private int rate;
    private String description;
    private Long reservarId;
//    private Long customerId;
}
