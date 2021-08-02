package com.one.shade.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "contents_genre")
@Builder
public class Genre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long con_gen_id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contents_id",insertable = false,updatable = false)
    private Contents contents;

    private Long contents_id;

    private Long genre_id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "genre_id",insertable = false,updatable = false)
    private GenreName genre_name;

    @Override
    public String toString() {
        return "Genre{" +
                "con_gen_id=" + con_gen_id +
                ", contents_id=" + contents_id +
                ", genre_id=" + genre_id +
                ", genre_name=" + genre_name.getGenre_name() +
                '}';
    }
}
