package com.booking.dto.response;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class RoomDto {
    private int roomNumber;
    private CategoryDto category;
}
