package com.one.shade.domain;


import com.one.shade.vo.ContentMovieDetailVO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Collection;

@NamedNativeQuery(
        name = "ContentMovieDetailVO",
        query = "SELECT " +
                "   check_like,c.poster,c.title,c.contents_id,c.summary,c.video,genre_names,genre_ids,actor_names,actor_ids,character_names,director_name,director_id,c.title,c.playtime,c.opendate,platform_names,monetization_types,retail_prices,urls,presentation_types " +
                "FROM " +
                "   contents c " +
                "LEFT join " +
                "   (SELECT " +
                "       contents_id,GROUP_CONCAT(genre_name SEPARATOR ',') AS genre_names,GROUP_CONCAT(cg.genre_id SEPARATOR ',') AS genre_ids " +
                "   FROM " +
                "       contents_genre cg " +
                "   LEFT JOIN " +
                "       genre g " +
                "   ON " +
                "       cg.genre_id = g.genre_id " +
                "   WHERE " +
                "       cg.contents_id = :contents_id) AS genre " +
                "ON " +
                "   c.contents_id = genre.contents_id " +
                "LEFT JOIN " +
                "   (SELECT " +
                "       contents_id,GROUP_CONCAT(people_name SEPARATOR ',') AS actor_names,GROUP_CONCAT(ca.people_id SEPARATOR ',') AS actor_ids,GROUP_CONCAT(ca.character_name SEPARATOR ',') AS character_names " +
                "   FROM " +
                "       casting ca " +
                "   LEFT JOIN " +
                "       people p " +
                "   ON " +
                "       ca.people_id=p.people_id " +
                "   WHERE " +
                "       ca.contents_id=:contents_id " +
                "   AND " +
                "       ca.character_name IS NOT NULL " +
                "   AND ca.role = 'ACTOR') AS actor " +
                "ON " +
                "   c.contents_id = actor.contents_id " +
                "LEFT JOIN " +
                "   (SELECT " +
                "       contents_id,people_name AS director_name,ca.people_id AS director_id FROM casting ca " +
                "   LEFT JOIN " +
                "       people p " +
                "   ON " +
                "       ca.people_id=p.people_id " +
                "   WHERE " +
                "       ca.contents_id=:contents_id AND role='DIRECTOR') AS director " +
                "ON " +
                "   c.contents_id = director.contents_id " +
                "LEFT JOIN " +
                "   (SELECT " +
                "       contents_id,GROUP_CONCAT(platform_name SEPARATOR ',') AS platform_names,GROUP_CONCAT(monetization_type SEPARATOR ',') AS monetization_types,GROUP_CONCAT(retail_price SEPARATOR ',') AS retail_prices,GROUP_CONCAT(url SEPARATOR ',') AS urls,GROUP_CONCAT(presentation_type SEPARATOR ',') AS presentation_types" +
                "   FROM " +
                "       contents_platform cp" +
                "   LEFT JOIN" +
                "       platform p" +
                "   ON" +
                "       cp.platform_id = p.platform_id" +
                "   WHERE " +
                "       contents_id = :contents_id) AS pf " +
                "ON " +
                "   c.contents_id = pf.contents_id " +
                "LEFT JOIN " +
                "   (SELECT * FROM contents_user WHERE id = :id) cu " +
                "ON c.contents_id = cu.contents_id "+
                "WHERE " +
                "   c.contents_id = :contents_id",
        resultSetMapping = "ContentsMovieDetailVO2"
)
@SqlResultSetMapping(
        name = "ContentsMovieDetailVO2",
        classes = @ConstructorResult(
                targetClass = ContentMovieDetailVO.class,
                columns = {
                        @ColumnResult(name = "contents_id",type = Long.class),
                        @ColumnResult(name = "poster",type = String.class),
                        @ColumnResult(name = "summary",type = String.class),
                        @ColumnResult(name = "video",type = String.class),
                        @ColumnResult(name = "genre_names",type = String.class),
                        @ColumnResult(name = "genre_ids",type = String.class),
                        @ColumnResult(name = "actor_names",type = String.class),
                        @ColumnResult(name = "actor_ids",type = String.class),
                        @ColumnResult(name = "character_names",type = String.class),
                        @ColumnResult(name = "director_name",type = String.class),
                        @ColumnResult(name = "director_id",type = Long.class),
                        @ColumnResult(name = "title",type = String.class),
                        @ColumnResult(name = "playtime",type = Long.class),
                        @ColumnResult(name = "opendate",type = String.class),
                        @ColumnResult(name = "platform_names",type = String.class),
                        @ColumnResult(name = "monetization_types",type = String.class),
                        @ColumnResult(name = "retail_prices",type = String.class),
                        @ColumnResult(name = "urls",type = String.class),
                        @ColumnResult(name = "presentation_types",type = String.class),
                        @ColumnResult(name = "check_like",type = String.class)

                }
        )
)

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

    @OneToMany(mappedBy = "contents", fetch = FetchType.LAZY)
    private Collection<Platform> contentPlatformList;

    private String title;

    private String opendate;

    private Long playtime;

    private String summary;

    private String object_type;

    private String poster;

    private String video;

    private String keyword;

    private Long view_count;

}
