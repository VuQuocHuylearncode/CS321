package com.fitsera.fitsera_backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.fitsera.fitsera_backend.dto.ProductRequest;
import com.fitsera.fitsera_backend.dto.ProductResponse;
import com.fitsera.fitsera_backend.model.Category;
import com.fitsera.fitsera_backend.model.Product;
import com.fitsera.fitsera_backend.model.Tag;
import com.fitsera.fitsera_backend.repository.CategoryRepository;
import com.fitsera.fitsera_backend.repository.ProductRepository;
import com.fitsera.fitsera_backend.repository.TagRepository;

import jakarta.persistence.criteria.Predicate;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;

    public ProductService(ProductRepository productRepository,
                          CategoryRepository categoryRepository,
                          TagRepository tagRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.tagRepository = tagRepository;
    }

    // CREATE
    public ProductResponse createProduct(ProductRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        List<Tag> tags = tagRepository.findAllById(request.getTagIds());

        Product product = Product.builder()
                .slug(request.getSlug())
                .title(request.getTitle())
                .description(request.getDescription())
                .brand(request.getBrand())
                .category(category)
                .tags(tags)
                .images(request.getImages())
                .attributes(request.getAttributes())
                .build();

        Product saved = productRepository.save(product);
        return mapToResponse(saved);
    }

    public Page<ProductResponse> getProducts(int page, int size, String sort,
                                             String q, Long categoryId,
                                             Double priceMin, Double priceMax) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sort).ascending());

        Specification<Product> spec = (root, query, cb) -> {
            Predicate p = cb.conjunction();

            if (q != null && !q.isEmpty()) {
                p = cb.and(p, cb.like(cb.lower(root.get("title")), "%" + q.toLowerCase() + "%"));
            }

            if (categoryId != null) {
                p = cb.and(p, cb.equal(root.get("category").get("id"), categoryId));
            }

            if (priceMin != null) {
                p = cb.and(p, cb.greaterThanOrEqualTo(root.get("id"), priceMin.longValue()));
            }

            if (priceMax != null) {
                p = cb.and(p, cb.lessThanOrEqualTo(root.get("id"), priceMax.longValue()));
            }

            return p;
        };

        Page<Product> products = productRepository.findAll(spec, pageable);
        return products.map(this::mapToResponse);
    }

    public ProductResponse getProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return mapToResponse(product);
    }

    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        List<Tag> tags = tagRepository.findAllById(request.getTagIds());

        product.setSlug(request.getSlug());
        product.setTitle(request.getTitle());
        product.setDescription(request.getDescription());
        product.setBrand(request.getBrand());
        product.setCategory(category);
        product.setTags(tags);
        product.setImages(request.getImages());
        product.setAttributes(request.getAttributes());

        Product updated = productRepository.save(product);
        return mapToResponse(updated);
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found");
        }
        productRepository.deleteById(id);
    }

    private ProductResponse mapToResponse(Product product) {
        ProductResponse res = new ProductResponse();
        res.setId(product.getId());
        res.setSlug(product.getSlug());
        res.setTitle(product.getTitle());
        res.setDescription(product.getDescription());
        res.setBrand(product.getBrand());
        res.setCategoryName(product.getCategory().getName());
        res.setTags(product.getTags().stream().map(Tag::getName).collect(Collectors.toList()));
        res.setImages(product.getImages());
        res.setAttributes(product.getAttributes());
        return res;
    }
}