package com.one.shade.repository;

import com.one.shade.domain.Contents;
import com.one.shade.vo.ContentsListVO;
import com.one.shade.vo.ReviewsListVO;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CustomizedRepository  {
    List<ContentsListVO> movieList(Pageable pageable, List<Long> platform_ids, Long genre_id, String object_type, Long id);

    List<ReviewsListVO> reviewList(Long contents_id);

    List<Contents> likeList(Long id, String like);

}
