package com.booking.dto.request;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class CreateCategoryDto {
//    private MultipartFile imgCategory;
    private Long providerId;
    private String categoryName;
    private int person;
    private float area;
    private String bedType;
    private String description;
    private float price;
    private List<Integer> roomNumbers;
}
