package com.one.shade.domain;


import lombok.*;

import javax.persistence.*;

@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Setter
public class Reviews {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="review_id")
    private Long reviewId;

    private Long id;

    @Column(name="contents_id")
    private Long contentsId;

    @Column(name="delete_check")
    private String deleteCheck;

    private String comment;

    private String modify_date;

    @Column(name="create_date")
    private String createDate;
}
