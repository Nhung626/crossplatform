package com.booking.dto.request;
import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCustomerDto {
    private String fullName;
    private String gender;
    private String phoneNumber;
    private String address;
    private String customerCode;

}
