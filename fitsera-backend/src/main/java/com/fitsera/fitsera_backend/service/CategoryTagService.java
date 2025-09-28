package com.fitsera.fitsera_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fitsera.fitsera_backend.model.Category;
import com.fitsera.fitsera_backend.model.Tag;
import com.fitsera.fitsera_backend.repository.CategoryRepository;
import com.fitsera.fitsera_backend.repository.TagRepository;

@Service
public class CategoryTagService {
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;

    public CategoryTagService(CategoryRepository categoryRepository, TagRepository tagRepository) {
        this.categoryRepository = categoryRepository;
        this.tagRepository = tagRepository;
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    public Tag createTag(Tag tag) {
        return tagRepository.save(tag);
    }
}