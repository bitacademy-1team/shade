package com.one.shade.repository;

import com.one.shade.domain.Contents;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CustomizedContentsRepository  {
    List<Contents> movieList(Pageable pageable, List<Long> platform_ids, Long genre_id);

}
