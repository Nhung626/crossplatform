package com.booking.entity;

public enum EStateRoom {
    //phòng trống, sẵn sàng phục vụ
    AVAILABLE,
    NOT_AVAILABLE,
    //phòng đang chờ xác nhận, hoặc chờ thanh toán
    ON_HOLD,
    //phòng đã đặt
    BOOKED,
    CHECKIN,
    CHECKOUT,
}
