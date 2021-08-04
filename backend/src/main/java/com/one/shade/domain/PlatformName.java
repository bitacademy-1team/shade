package com.one.shade.domain;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Getter
@Entity(name="platform")
public class PlatformName {

    @Id
    private Long platform_id;

    private String platform_name;

    @OneToOne(mappedBy = "platform_name", fetch = FetchType.LAZY)
    private Platform platform;
}
