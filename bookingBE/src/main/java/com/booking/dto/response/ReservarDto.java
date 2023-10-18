package com.booking.dto.response;

import com.booking.entity.EStateReservar;
import lombok.*;

import java.time.LocalDateTime;
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@EqualsAndHashCode
public class ReservarDto {
    private Long reservarId;
    private String customerName;
    private String customerCode;
    private String customerPhone;
    private String rooms;
    private LocalDateTime checkin;
    private LocalDateTime checkout;
    private LocalDateTime reservarDate;
    private String stateReservar;

}
