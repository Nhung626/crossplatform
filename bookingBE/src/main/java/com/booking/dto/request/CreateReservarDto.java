package com.booking.dto.request;
import java.time.LocalDate;

import com.booking.dto.response.CategoryDto;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class CreateReservarDto {
    private Long customerId;
    private CategoryDto category;
    private int roomCount;
    private LocalDate startDate;
    private LocalDate endDate;
}
