package com.booking.entity;

import jakarta.persistence.*;
import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "payment")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "provider_id")
    private Long paymentId;

    //Mã giao dịch
    @Column(name = "vnp_TxnRef")
    private String vnpTxnRef;

    @Column(name = "reservar_id")
    private Long reservarId;
}
