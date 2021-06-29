package com.one.shade.domain;

import lombok.*;

import javax.persistence.*;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contents_id",insertable = false,updatable = false)
    private Contents contents;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "platform_id",insertable = false,updatable = false)
    private GenreName platform_name;

    private Long contents_id;

    private Long platform_id;

    private String monetization_type;

    private Long retail_price;

    private String url;

    private String presentation_type;

}
