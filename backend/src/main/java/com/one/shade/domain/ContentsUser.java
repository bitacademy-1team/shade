package com.one.shade.domain;


import com.one.shade.dto.ContentsUserDto;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "contents_user")
@Getter
@ToString
@Setter
public class ContentsUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long con_user_id;

    private Long id;

    private Long contents_id;

    private String check_like;

    private Long view_count;

    private LocalDateTime visit_last_date;

    private LocalDateTime last_check_date;

    private Float rating;

    @Builder
    private ContentsUser(ContentsUserDto contentsUserDto){
        this.id = contentsUserDto.getId();
        this.contents_id = contentsUserDto.getContents_id();
        this.view_count = contentsUserDto.getView_count();
        this.visit_last_date = contentsUserDto.getVisit_last_date();
        this.last_check_date = contentsUserDto.getLast_check_date();
        this.check_like = contentsUserDto.getCheck_like();
        this.rating = contentsUserDto.getRating();
    }

    @PreUpdate
    public void LocalDateTime() {
        this.visit_last_date = LocalDateTime.now();
    }
}
