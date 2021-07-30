package com.one.shade.vo;

import lombok.*;

import javax.persistence.Id;
import java.sql.Date;

@Getter
@AllArgsConstructor
@ToString
@NoArgsConstructor
@Data
public class ContentsShowDetailVO {
    @Id
    private Integer contents_id;

    private String title;

    private Date opendate;

    private Integer playtime;

    private String video;

    private String summary;

    private String poster;

    private String sea_video;

    private String sea_poster;

    private String genre_names;

    private String actor_names;

    private String sea_list;

    private String sea_id_list;

    private String check_like;
}
