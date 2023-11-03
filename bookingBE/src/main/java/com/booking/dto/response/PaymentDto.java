package com.booking.dto.response;

import lombok.*;

import java.io.Serializable;
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class PaymentDto implements Serializable {
    private String status;
    private String message;
    private String url;
}
