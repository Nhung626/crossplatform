package com.booking.service.interfaces;

import java.io.UnsupportedEncodingException;

public interface PaymentService {
    String getURLPayment(Long reservarId, int total) throws UnsupportedEncodingException;
   void changeStatePayment(String vnpTxnRef,String state);
}
