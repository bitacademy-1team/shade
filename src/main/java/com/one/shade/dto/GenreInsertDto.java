package com.one.shade.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GenreInsertDto {

    private Long contents_id;

    private Long genre_id;

    private String genre_name;


}
