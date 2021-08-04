package com.one.shade.domain;

import lombok.*;

import javax.persistence.*;
import java.util.Collection;

@Getter
@ToString(exclude = "genre")
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "genre")
@Builder
public class GenreName {

    @Id
    private Long genre_id;

    private String genre_name;

    @OneToOne(mappedBy = "genre_name", fetch = FetchType.LAZY)
    private Genre genre;
}
