package com.one.shade.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.PrePersist;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class ContentsUserDto {
    private Long id;

    private Long contents_id;

    private Long view_count;

    private LocalDateTime visit_last_date;

    private LocalDateTime last_check_date;

    private String check_like;

    private Float rating;

    @PrePersist
    public void LocalDateTime() {
        this.visit_last_date = LocalDateTime.now();
    }
}
