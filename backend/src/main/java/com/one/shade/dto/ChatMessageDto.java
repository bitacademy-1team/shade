
package com.one.shade.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatMessageDto {

    private String id;
    private String nickname;
    private String msg;
    private String roomid;
    private Long userCount;
    private String currentTime;
}