package com.booking.service.interfaces;

import java.io.UnsupportedEncodingException;

public interface PaymentService {
    String getURLPayment(int total) throws UnsupportedEncodingException;
}
