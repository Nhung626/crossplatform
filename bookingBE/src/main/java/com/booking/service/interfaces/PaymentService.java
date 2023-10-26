package com.booking.service.interfaces;

import java.io.UnsupportedEncodingException;

public interface PaymentService {
    String getURLPayment(Long reservarId, long total) throws UnsupportedEncodingException;
   void changeStatePayment(String vnpTxnRef,String state);
}
