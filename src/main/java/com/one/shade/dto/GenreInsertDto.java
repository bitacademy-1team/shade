package com.one.shade.dto;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GenreInsertDto {

    private Long contents_id;

    private Long genre_id;

    private String genre_name;

}
