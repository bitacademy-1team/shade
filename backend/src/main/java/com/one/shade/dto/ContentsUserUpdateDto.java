package com.one.shade.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.PrePersist;
import java.time.LocalDate;

@Getter
@Setter
@Builder
public class ContentsUserUpdateDto {
    private Long view_count;

    private LocalDate visit_last_date;

    @PrePersist
    public void LocalDate() {
        this.visit_last_date = LocalDate.now();
    }
}
