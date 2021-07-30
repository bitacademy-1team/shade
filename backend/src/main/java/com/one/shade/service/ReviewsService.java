package com.one.shade.service;

import com.one.shade.vo.ReviewsListVO;

import java.util.List;

public interface ReviewsService {

    List<ReviewsListVO> reviewsByContentsId(Long contents_id);

    int reviewCreate(Long id, Long contents_id, String comment);

    int reviewModify(Long review_id, Long id,String comment);

    int reviewDelete(Long review_id, Long id);
}
