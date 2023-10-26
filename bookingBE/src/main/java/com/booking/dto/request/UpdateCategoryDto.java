package com.booking.dto.request;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCategoryDto {
    private Long categoryId;
    private List<MultipartFile> imgCategories;
    private String categoryName;
    private int person;
    private float area;
    private String bedType;
    private String description;
    private int price;
    private List<Integer> roomNumbers;
}
