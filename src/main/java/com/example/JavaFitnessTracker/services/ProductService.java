package com.example.JavaFitnessTracker.services;

import com.example.JavaFitnessTracker.dto.product.ProductRequest;
import com.example.JavaFitnessTracker.dto.product.ProductResponse;
import com.example.JavaFitnessTracker.entity.Image;
import com.example.JavaFitnessTracker.entity.Product;
import com.example.JavaFitnessTracker.repositories.ImageRepository;
import com.example.JavaFitnessTracker.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ImageRepository imageRepository;

    @Transactional
    public List<ProductResponse> list(String name) {
        List<Product> products = (name != null) ? productRepository.findByName(name) : productRepository.findAll();
        return products.stream().map(this::convertToProductResponse).collect(Collectors.toList());
    }

    private ProductResponse convertToProductResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .calories(product.getCalories())
                .fats(product.getFats())
                .carbohydrates(product.getCarbohydrates())
                .proteins(product.getProteins())
                .imageId(product.getImage().getId())
                .build();
    }


    public void save(ProductRequest request, MultipartFile file) throws IOException {
        Image image;
        Product product = Product.builder()
                .name(request.getName())
                .calories(Double.valueOf(request.getCalories()))
                .proteins(Double.valueOf(request.getProteins()))
                .fats(Double.valueOf(request.getFats()))
                .carbohydrates(Double.valueOf(request.getCarbohydrates()))
                .build();

        if (file.getSize() != 0) {
            image = toImageEntity(file);
            imageRepository.save(image);
            product.setImage(image);
        }
        productRepository.save(product);
        log.info("Saving new product. Name:{}", product.getName());
    }

    private Image toImageEntity(MultipartFile file) throws IOException {
        Image image = new Image();
        image.setName(file.getOriginalFilename());
        image.setOriginalFilename(file.getOriginalFilename());
        image.setContentType(file.getContentType());
        image.setSize(file.getSize());
        image.setBytes(file.getBytes());
        return image;
    }

    public void deleteProduct(Long id) {
        log.info("Deleting product {}", id);
        productRepository.deleteById(id);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }
}
