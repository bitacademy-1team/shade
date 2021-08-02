package com.one.shade.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Seasons {
    @Id
    private Long season_id;

    private Long contents_id;

    private String sea_poster;

    private Long sea_num;

    private String sea_title;

    private String sea_video;

    private String sea_summary;

    private String sea_opendate;

    private Long ex_contents_id;

}
