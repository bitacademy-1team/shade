package com.one.shade.repository;

import com.one.shade.vo.ContentsListVO;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CustomizedContentsRepository  {
    List<ContentsListVO> movieList(Pageable pageable, List<Long> platform_ids, Long genre_id, String object_type, Long id);

}
