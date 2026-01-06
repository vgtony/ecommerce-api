package com.ecommerce.api.dto;
import lombok.Data;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

@Data
public class OrderRequest {
    @NotEmpty(message = "Order must contain at least one item")
    private List<OrderItemRequest> items;
}
