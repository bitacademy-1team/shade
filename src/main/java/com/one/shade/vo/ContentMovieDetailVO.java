package com.one.shade.vo;

import com.one.shade.domain.Contents;
import com.one.shade.domain.Genre;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.Id;
import java.util.Collection;
import java.util.Set;

@Getter
@AllArgsConstructor
@ToString(exclude = "genre")
public class ContentMovieDetailVO {

    @Id
    private Long contents_id;

    private String title;

    private String opendate;

    private Long playtime;

    private String summary;

    private String poster;

    private Collection<Genre> genre;

    public ContentMovieDetailVO(Contents entity){
        this.contents_id =entity.getContents_id();
        this.title = entity.getTitle();
        this.opendate = entity.getOpendate();
        this.playtime = entity.getPlaytime();
        this.summary = entity.getSummary();
        this.poster = entity.getPoster();
        this.genre = entity.getContentGenreList();
    }

}
