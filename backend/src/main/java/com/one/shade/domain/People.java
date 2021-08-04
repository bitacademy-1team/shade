package com.one.shade.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Setter
public class People {

    @Id
    private Long people_id;

    private String people_name;
}
