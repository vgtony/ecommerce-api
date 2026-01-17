package com.ecommerce.api.config;

import com.ecommerce.api.model.Category;
import com.ecommerce.api.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final com.ecommerce.api.repository.ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        if (categoryRepository.count() == 0 && productRepository.count() == 0) {
            String csvFile = "sample_products.csv";
            java.io.File file = new java.io.File(csvFile);
            if (!file.exists()) {
                System.out.println("sample_products.csv not found, skipping initialization.");
                return;
            }

            try (java.io.BufferedReader reader = new java.io.BufferedReader(new java.io.FileReader(file))) {
                String line;
                boolean isFirstLine = true;
                while ((line = reader.readLine()) != null) {
                    if (isFirstLine) { isFirstLine = false; continue; }
                    
                    String[] data = line.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");
                    if(data.length < 4) continue;

                    String name = cleanField(data[0]);
                    String desc = cleanField(data[1]);
                    java.math.BigDecimal price = new java.math.BigDecimal(cleanField(data[2]));
                    String catName = cleanField(data[3]);
                    String img = data.length > 4 ? cleanField(data[4]) : null;

                    Category category = categoryRepository.findByName(catName);
                    if (category == null) {
                        category = categoryRepository.save(Category.builder().name(catName).description(catName).build());
                    }

                    com.ecommerce.api.model.Product product = com.ecommerce.api.model.Product.builder()
                            .name(name)
                            .description(desc)
                            .price(price)
                            .category(category)
                            .imageUrl(img)
                            .stockQuantity(50)
                            .build();
                    productRepository.save(product);
                }
                System.out.println("Initialized database from sample_products.csv");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    private String cleanField(String field) {
        String trimmed = field.trim();
        if (trimmed.startsWith("\"") && trimmed.endsWith("\"")) {
            return trimmed.substring(1, trimmed.length() - 1);
        }
        return trimmed;
    }
}
