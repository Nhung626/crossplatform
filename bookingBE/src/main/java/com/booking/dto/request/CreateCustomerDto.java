package com.booking.dto.request;
import lombok.*;
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class CreateCustomerDto {
    private String fullName;
    private String gender;
    private String code;
    private String phoneNumber;
    private String address;
}
