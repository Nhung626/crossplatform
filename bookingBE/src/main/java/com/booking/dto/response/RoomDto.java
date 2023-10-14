package com.booking.dto.response;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class RoomDto {
    private Long roomId;
    private int roomNumber;
    private CategoryDto category;
}
