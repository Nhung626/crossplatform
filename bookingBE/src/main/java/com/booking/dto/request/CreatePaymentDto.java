package com.booking.dto.request;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class CreatePaymentDto {
    Long idService;
    int amount;
    String description;
    String bankCode;
}
