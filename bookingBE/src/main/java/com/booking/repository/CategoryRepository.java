package com.booking.repository;
import com.booking.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long>  {
    Category findByCategoryId(Long categoryId);
//    List<Category> findByProviderId(Long providerId);


}
