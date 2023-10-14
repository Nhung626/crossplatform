package com.booking.dto.request;
import java.time.LocalDate;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class CreateReservarDto {
    private Long customerId;
    private String roomIds;
    private LocalDate startDate;
    private LocalDate endDate;
}
