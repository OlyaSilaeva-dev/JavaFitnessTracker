package com.example.JavaFitnessTracker.controllers;

import com.example.JavaFitnessTracker.entity.Product;
import com.example.JavaFitnessTracker.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("/product")
    public String products(@RequestParam(name = "name", required = false) String name, Model model) {
        model.addAttribute("products", productService.list(name));
        return "products";
    }

    @GetMapping("/product/{id}")
    public String productInfo(@PathVariable Long id, Model model) {
        model.addAttribute("product", productService.getProductById(id));
        model.addAttribute("image", productService.getProductById(id).getImage());
        return "product-info";
    }

    @PostMapping("/product/{id}/upload")
    public String productUpload(@PathVariable Long id, @RequestParam("file") MultipartFile file) throws IOException {
        productService.save(productService.getProductById(id), file);
        return "redirect:/product";
    }

    @PostMapping("/product/create")
    public String createProduct(@RequestParam("file") MultipartFile file, Product product) throws IOException {
        productService.save(product, file);
        return "redirect:/product";
    }

    @PostMapping("/product/delete/{id}")
    public String deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return "redirect:/product";
    }
}
