package com.one.shade.security.oauth2.user;

import com.one.shade.domain.AuthProvider;

import java.util.Map;

public class NaverUserInfo extends OAuth2UserInfo{

    public NaverUserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return (String)attributes.get("id");
    }

    @Override
    public String getName() {
        return (String)attributes.get("name");
    }

    @Override
    public String getEmail() {
        return (String)attributes.get("email");
    }

    @Override
    public AuthProvider getProvider() {
        return AuthProvider.naver;
    }

    @Override
    public String getProviderId() {
        return (String) attributes.get("id");
    }

    @Override
    public String getUsername() {
        return "naver_" + (String)attributes.get("id");
    }

}