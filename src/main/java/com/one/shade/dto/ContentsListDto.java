package com.one.shade.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.Id;

@Getter
@Builder
@ToString
public class ContentsListDto {

    @Id
    private Long contents_id;

    private String poster;

    private String title;
}
