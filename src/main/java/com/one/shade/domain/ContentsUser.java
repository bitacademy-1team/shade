package com.one.shade.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class ContentsUser {

    @Id
    private Long con_user_id;

    private Long id;

    private Long contents_id;

    private String check_like;

    private Long view_count;

    private String visit_last_date;
}
