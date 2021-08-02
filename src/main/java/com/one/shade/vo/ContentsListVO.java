package com.one.shade.vo;

import com.one.shade.domain.Contents;
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


}
