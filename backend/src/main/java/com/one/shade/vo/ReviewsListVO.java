package com.one.shade.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@ToString
@AllArgsConstructor
@Getter
public class ReviewsListVO {

    private Long review_id;

    private Long id;

    private String nickName;

    private String comment;

    private String crete_date;

    private String modify_date;

}
