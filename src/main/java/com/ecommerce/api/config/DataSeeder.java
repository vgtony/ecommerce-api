package com.ecommerce.api.config;

import com.ecommerce.api.model.Category;
import com.ecommerce.api.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {
        if (categoryRepository.count() == 0) {
            Category generalCategory = Category.builder()
                .name("General")
                .description("Default category")
                .build();
            
            categoryRepository.save(generalCategory);
            System.out.println("Seeded 'General' category.");
        }
    }
}
