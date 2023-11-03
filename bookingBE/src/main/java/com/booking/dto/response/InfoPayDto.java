package com.booking.dto.response;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class InfoPayDto {
    private String status;
    private String message;
    private String data;
}
