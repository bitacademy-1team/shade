package com.one.shade.domain;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Episode {
    @Id
    private Long episode_id;

    @Column(name = "season_id")
    private Long seasonId;

    private Long epi_times;

    private String epi_title;

    private Long epi_num;

    private String epi_summary;
}
