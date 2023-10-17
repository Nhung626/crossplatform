package com.booking.dto.response;

import com.booking.entity.EStateReservar;

import java.time.LocalDateTime;

public class ReservarCustomerDto {
    private Long reservarId;
    private String customerName;
    private String customerCode;
    private String customerPhone;
    private String rooms;
    private String addressProvider;
    private LocalDateTime checkin;
    private LocalDateTime checkout;
    private LocalDateTime reservarDate;
    private EStateReservar stateReservar;
}
