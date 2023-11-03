package com.booking.dto.response;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@EqualsAndHashCode
public class ReservarDto {
    private Long reservarId;
    private Long imgProvider;
    private Long imgCategory;
    private String providerName;
    private Long providerId;
    private Long categoryId;
    private String customerName;
    private String customerCode;
    private String customerPhone;
    private String rooms;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDateTime reservarDate;
    private long total;
    private String stateReservar;
    private String statePayment;
}
