package com.one.shade.service;

import com.one.shade.vo.ContentMovieDetailVO;
import com.one.shade.vo.ContentSummaryVO;
import com.one.shade.vo.ContentsListVO;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ContentsService {

    List<ContentsListVO> movieList(Pageable pageable, List<Long> platform_ids, Long genre_id, String object_type, Long id);

    ContentMovieDetailVO movieDetail(Long contents_id);

    List<ContentSummaryVO> listSummary();

    void updateKeyword(String keyword,Long contents_id);

    List<ContentsListVO> findTitle(String title);
}
