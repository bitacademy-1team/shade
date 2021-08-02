package com.one.shade.controller;

import com.one.shade.dto.ChatMessageDto;
import com.one.shade.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;


    @MessageMapping("/message")
    public void sendMessage(@Payload ChatMessageDto message){
        System.out.println("service 사용");
        chatService.publicMessage(message);
    }

}
