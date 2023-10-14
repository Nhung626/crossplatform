package com.booking.dto.response;

import lombok.*;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class CategoryDto {
    private List<Long> imgIdCategories;
    private Long categoryId;
    private String categoryName;
    private int person;
    private float area;
    private String bedType;
    private String description;
    private int price;
    private List<Integer> roomNumbers;
    private int countRoom;
}
