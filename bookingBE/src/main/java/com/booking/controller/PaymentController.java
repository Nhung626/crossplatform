package com.booking.controller;

import com.booking.dto.response.PaymentDto;
import com.booking.entity.Payment;
import com.booking.entity.Reservar;
import com.booking.repository.PaymentRepository;
import com.booking.service.interfaces.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.io.UnsupportedEncodingException;


@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/payment")
public class PaymentController {
    private final PaymentService paymentService;
    private final PaymentRepository paymentRepository;

    @PostMapping("/create")
    public String payment(
            @RequestParam("reservarID") Long reservarId,
            @RequestParam("total") int total) throws UnsupportedEncodingException {
       String paymentURL = paymentService.getURLPayment(reservarId,total);
        return "redirect:/paymentURL";
    }

    @GetMapping("/info")
    public ModelAndView info(
            @RequestParam("vnp_TxnRef") String vnpTxnRef,
            @RequestParam("vnp_ResponseCode") String responseCode,
            @RequestParam("vnp_Amount") int amount
    ) {
        if (responseCode.equals("00")) {
            ModelAndView model = new ModelAndView("success");
            paymentService.changeStatePayment(vnpTxnRef, "Success");
            return model;
        }else {
            ModelAndView model = new ModelAndView("unsuccess");
            paymentService.changeStatePayment(vnpTxnRef, "Unsuccessful");
            Payment payment = paymentRepository.findByVnpTxnRef(vnpTxnRef);
            model.addObject("reservarId", payment.getReservarId());
            model.addObject("total",amount/100);
            return model;
        }
    }
}

