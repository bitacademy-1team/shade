package com.one.shade.domain;




import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.RequestBody;

import javax.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@Entity
public class Reviews extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private int contents_id;

    @Column
    private int score;

    @Column(columnDefinition = "TEXT",nullable = false)
    private String comment;


}
