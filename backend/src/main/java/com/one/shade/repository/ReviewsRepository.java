package com.one.shade.repository;

import com.one.shade.domain.Reviews;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewsRepository extends JpaRepository<Reviews,Long> {
}