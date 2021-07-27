package com.example.demo.repository;

import com.example.demo.entity.Reviews;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewsRepository extends JpaRepository<Reviews,Long> {
}
