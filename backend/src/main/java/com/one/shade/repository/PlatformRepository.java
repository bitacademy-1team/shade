package com.one.shade.repository;

import com.one.shade.domain.Platform;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlatformRepository extends JpaRepository<Platform,Long> {

    List<Platform> findByEpisodeId(Long episode_id);
}
