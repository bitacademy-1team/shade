package com.one.shade.security.oauth2.user;

import com.one.shade.domain.AuthProvider;

import java.util.Map;

public class KakaoUserInfo extends OAuth2UserInfo{

    public KakaoUserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return attributes.get("id").toString();
    }

    @Override
    public String getName() {
        Map<String, Object> temp = (Map)attributes.get("properties");
        return (String)temp.get("nickname");
    }

    @Override
    public String getEmail() {
        Map<String, Object> temp = (Map)attributes.get("kakao_account");
        return (String)temp.get("email");
    }

    @Override
    public AuthProvider getProvider() {
        return AuthProvider.kakao;
    }

    @Override
    public String getProviderId() {
        return attributes.get("id").toString();
    }

    @Override
    public String getUsername() {
        return "kakao_" + attributes.get("id").toString();
    }

}