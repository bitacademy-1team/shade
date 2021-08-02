package com.one.shade.service;

import com.one.shade.dto.ChatMessageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final SimpMessageSendingOperations messagingTemplate;

    public void publicMessage(@Payload ChatMessageDto message){
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm");
        String nowString = LocalDateTime.now().format(dateTimeFormatter);
        message.setCurrentTime(nowString);

        messagingTemplate.convertAndSend("/topic/" + message.getRoomid(), message);
    }
}
