package com.one.shade.repository;

import com.one.shade.domain.Episode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EpisodeRepository extends JpaRepository<Episode,Long> {

    List<Episode> findBySeasonId(Long seasonId);
}
