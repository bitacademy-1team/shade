package com.one.shade.security.oauth2.user;

import com.one.shade.domain.AuthProvider;

import java.util.Map;

public class FacebookUserInfo extends OAuth2UserInfo{

    public FacebookUserInfo(Map<String, Object> attributes) {
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
        return AuthProvider.facebook;
    }

    @Override
    public String getProviderId() {
        return (String) attributes.get("id");
    }

    @Override
    public String getUsername() {
        return "facebook_" + (String)attributes.get("id");
    }

}