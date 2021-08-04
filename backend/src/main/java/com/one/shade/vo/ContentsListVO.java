package com.one.shade.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
public class ContentsListVO {

    private Long contents_id;

    private String title;

    private String poster;

    private String check_like;

    public ContentsListVO(Long contents_id, String title, String poster) {
        this.contents_id = contents_id;
        this.title = title;
        this.poster = poster;
    }
}
