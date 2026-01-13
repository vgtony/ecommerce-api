package com.ecommerce.api.config;

import com.ecommerce.api.model.Category;
import com.ecommerce.api.model.Product;
import com.ecommerce.api.repository.CategoryRepository;
import com.ecommerce.api.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        Category generalCategory = categoryRepository.findByName("General");
        if (generalCategory == null) {
            generalCategory = Category.builder()
                .name("General")
                .description("Default category")
                .build();
            categoryRepository.save(generalCategory);
            System.out.println("Seeded 'General' category.");
        }
        
        // Seed Products if empty or partial
        if (productRepository.count() < 6) {
             productRepository.deleteAll(); // Clear old/partial data to ensure consistency for the demo
             
             List<Product> products = List.of(
                Product.builder()
                    .name("Classic Wristwatch")
                    .description("Elegant timepiece with leather strap.")
                    .price(new BigDecimal("129.99"))
                    .imageUrl("https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80")
                    .category(generalCategory)
                    .build(),
                Product.builder()
                    .name("Noise-Cancelling Headphones")
                    .description("Immersive sound quality with 30h battery life.")
                    .price(new BigDecimal("249.99"))
                    .imageUrl("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80")
                    .category(generalCategory)
                    .build(),
                Product.builder()
                    .name("Retro Camera")
                    .description("Capture memories with vintage style.")
                    .price(new BigDecimal("599.00"))
                    .imageUrl("https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80")
                    .category(generalCategory)
                    .build(),
                Product.builder()
                    .name("Canvas Sneakers")
                    .description("Comfortable everyday wear.")
                    .price(new BigDecimal("45.00"))
                    .imageUrl("https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80")
                    .category(generalCategory)
                    .build(),
                 Product.builder()
                    .name("VR Headset")
                    .description("Explore new worlds.")
                    .price(new BigDecimal("399.99"))
                    .imageUrl("https://images.unsplash.com/photo-1585298723682-7115561c51b7?auto=format&fit=crop&w=800&q=80")
                    .category(generalCategory)
                    .build(),
                 Product.builder()
                    .name("Designer Denim Jacket")
                    .description("A classic addition to any wardrobe.")
                    .price(new BigDecimal("89.95"))
                    .imageUrl("https://images.unsplash.com/photo-1572569028738-411a56106515?auto=format&fit=crop&w=800&q=80")
                    .category(generalCategory)
                    .build()
            );
            
            productRepository.saveAll(products);
            System.out.println("Seeded 6 Demo Products.");
        }
    }
}
