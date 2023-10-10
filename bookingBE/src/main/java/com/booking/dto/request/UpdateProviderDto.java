package com.booking.dto.request;
import lombok.*;
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProviderDto {
    private String providerName;
    private String providerPhone;
    private String address;
    private String description;
}
