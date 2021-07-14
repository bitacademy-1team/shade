package com.one.shade.security.oauth2.user;

import com.one.shade.domain.AuthProvider;

import java.util.Map;

public class GoogleUserInfo extends OAuth2UserInfo{

    public GoogleUserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return (String)attributes.get("sub");
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
        return AuthProvider.google;
    }

    @Override
    public String getProviderId() {
        return (String) attributes.get("sub");
    }

    @Override
    public String getUsername() {
        return "google_" + (String)attributes.get("sub");
    }

}