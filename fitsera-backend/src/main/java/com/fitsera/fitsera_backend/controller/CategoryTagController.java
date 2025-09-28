package com.fitsera.fitsera_backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitsera.fitsera_backend.model.Category;
import com.fitsera.fitsera_backend.model.Tag;
import com.fitsera.fitsera_backend.service.CategoryTagService;

@RestController
@RequestMapping("/api/v1")
public class CategoryTagController {

    private final CategoryTagService categoryTagService;

    public CategoryTagController(CategoryTagService categoryTagService) {
        this.categoryTagService = categoryTagService;
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getCategories() {
        return ResponseEntity.ok(categoryTagService.getAllCategories());
    }

    @PostMapping("/categories")
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        return ResponseEntity.ok(categoryTagService.createCategory(category));
    }

    
    @GetMapping("/tags")
    public ResponseEntity<List<Tag>> getTags() {
        return ResponseEntity.ok(categoryTagService.getAllTags());
    }

    @PostMapping("/tags")
    public ResponseEntity<Tag> createTag(@RequestBody Tag tag) {
        return ResponseEntity.ok(categoryTagService.createTag(tag));
    }
}