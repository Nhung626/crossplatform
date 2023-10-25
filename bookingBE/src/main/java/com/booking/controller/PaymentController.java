package com.booking.controller;

import com.booking.dto.response.PaymentDto;
import com.booking.service.interfaces.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;


@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/payment")
public class PaymentController {
    private final PaymentService paymentService;
    @PostMapping("/create")
    public ResponseEntity<PaymentDto> payment(
            @RequestParam("reservarID") Long reservarId,
            @RequestParam("total") int total) throws UnsupportedEncodingException {
       String paymentURL = paymentService.getURLPayment(reservarId,total);
        return ResponseEntity.ok(PaymentDto.builder()
                .status("Ok")
                .message("Successfully")
                .url(paymentURL).build());
    }

    @GetMapping("/info")
    public String info(
            @RequestParam("vnp_TxnRef") String vnpTxnRef,
            @RequestParam("vnp_ResponseCode") String responseCode
    ) {
        if (responseCode.equals("00")) {
            paymentService.changeStatePayment(vnpTxnRef, "Success");
            return "success";
        }else {
            paymentService.changeStatePayment(vnpTxnRef, "Unsuccessful");
            return "unsuccess";
        }
    }
}

