package com.example.JavaFitnessTracker.controllers;

import com.example.JavaFitnessTracker.dto.product.ProductRequest;
import com.example.JavaFitnessTracker.dto.product.ProductResponse;
import com.example.JavaFitnessTracker.entity.Product;
import com.example.JavaFitnessTracker.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("api/v1/pages/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("/all")
    public ResponseEntity<List<Product>> products(@RequestParam(name = "name", required = false) String name) {
        return ResponseEntity.ok(productService.list(name));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> productInfo(@PathVariable Long id) {
        return ResponseEntity.ok(new ProductResponse(productService.getProductById(id)));
    }

//    @PostMapping("/{id}/upload")
//    public String productUpload(@PathVariable Long id, @RequestParam("file") MultipartFile file) throws IOException {
//        productService.saveUser(productService.getProductById(id), file);
//        return "redirect:/product";
//    }

    @PostMapping("/create")
    public ResponseEntity<String> createProduct(@RequestPart ProductRequest request, @RequestParam MultipartFile image) throws IOException {
        productService.save(request, image);
        return ResponseEntity.ok("Product created");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok("Product deleted");
    }
}
