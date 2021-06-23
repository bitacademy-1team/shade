package com.one.shade.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "contents_platform")
@Builder
public class Platform {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long con_plat_id;

    private Long contents_id;

    private Long platform_id;

    private String monetization_type;

    private Long retail_price;

    private String url;

    private String presentation_type;

}
