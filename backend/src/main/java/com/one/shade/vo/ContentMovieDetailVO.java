package com.one.shade.vo;

import com.one.shade.domain.Contents;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Id;

@Getter
@AllArgsConstructor
@ToString
@NoArgsConstructor
public class ContentMovieDetailVO extends Contents{

    @Id
    private Long contents_id;

    private String video;

    private String poster;

    private String summary;

    private String genre_names;

    private String genre_ids;

    private String actor_names;

    private String actor_ids;

    private String character_names;

    private String director_name;

    private Long director_id;

    private String title;

    private Long playtime;

    private String opendate;

    private String platform_names;

    private String monetization_types;

    private String retail_prices;

    private String urls;

    private String presentation_types;

    private String check_like;

}
