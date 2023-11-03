package com.booking.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ReservarPaymentDto {
    private ReservarDto reservarDto;
    private String paymentURL;
}
