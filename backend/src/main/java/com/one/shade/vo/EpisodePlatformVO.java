package com.one.shade.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.Column;

@ToString
@AllArgsConstructor
@Getter
public class EpisodePlatformVO {

    private Long contents_id;

    private Long platform_id;

    private String monetization_type;

    private Long retail_price;

    private String url;

    private String presentation_type;

    @Column(name ="episode_id")
    private Long episodeId;
}
