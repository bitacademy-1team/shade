package com.one.shade.vo;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.ToString;

import java.math.BigDecimal;

@Getter
@ToString
public class GenreRatingVO {

    BigDecimal total_score;

    @QueryProjection
    public GenreRatingVO(BigDecimal total_score){
        this.total_score = total_score;
    }
}
