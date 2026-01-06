package com.ecommerce.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/payment")
public class PaymentController {

    @PostMapping("/create-payment-intent")
    public ResponseEntity<Map<String, String>> createPaymentIntent() {
        // Mock Stripe response
        return ResponseEntity.ok(Map.of(
            "clientSecret", "pi_" + UUID.randomUUID().toString() + "_secret_" + UUID.randomUUID().toString()
        ));
    }
}
