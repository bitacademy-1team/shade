package com.one.shade.domain;


import lombok.*;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Contents {


    @Id
    private Long contents_id;

    @OneToMany(mappedBy = "contents", fetch = FetchType.LAZY)
    private Collection<Genre> contentGenreList;

    private String title;

    private String opendate;

    private Long playtime;

    private String summary;

    private String object_type;

    private String poster;

    private String video;

    private String keyword;

}
