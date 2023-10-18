package com.booking.dto.response;

import lombok.*;

import java.util.List;
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@EqualsAndHashCode
public class ReviewDto {
    private List<Long> imgReview;
    private int rate;
    private String description;
    private ReservarDto reservar;
}
