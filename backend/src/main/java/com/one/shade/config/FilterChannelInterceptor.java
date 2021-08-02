package com.one.shade.config;

import com.one.shade.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@Order(Ordered.HIGHEST_PRECEDENCE + 99)
@RequiredArgsConstructor
@Component
public class FilterChannelInterceptor implements ChannelInterceptor {

    private final JWTUtil jwtUtil;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);
        System.out.println("full message: " + message);
        System.out.println("auth:" + headerAccessor.getNativeHeader("Authorization"));

        if (StompCommand.CONNECT == headerAccessor.getCommand()) {
            System.out.println("FilterChannelInterceptor >> CONNECT");
            jwtUtil.validateToken(headerAccessor.getFirstNativeHeader("Authorization"));
            System.out.println("WebSocket TEST: " + jwtUtil.validateToken(headerAccessor.getFirstNativeHeader("Authorization")));

            String authToken = headerAccessor.getFirstNativeHeader("Authorization");
            headerAccessor.setUser(() -> authToken);

        }else if(StompCommand.SUBSCRIBE == headerAccessor.getCommand()){
            System.out.println("FilterChannelInterceptor >> SUBSCRIBE");
        }else if(StompCommand.DISCONNECT == headerAccessor.getCommand()){
            System.out.println("FilterChannelInterceptor >> DISCONNECT");
        }else if(StompCommand.SEND == headerAccessor.getCommand()){
            System.out.println("FilterChannelInterceptor >> SEND");
        }
        return message;
    }
}
