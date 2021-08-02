package com.one.shade.vo;

import com.one.shade.domain.Contents;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
public class ContentSummaryVO extends Contents{

    private Long contents_id;

    private String summary;

    public ContentSummaryVO(Contents entity){
        this.contents_id = entity.getContents_id();
        this.summary = entity.getSummary();
    }
}
