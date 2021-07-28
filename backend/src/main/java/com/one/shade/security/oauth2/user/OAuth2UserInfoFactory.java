package com.one.shade.security.oauth2.user;

import com.one.shade.domain.AuthProvider;
import com.one.shade.exception.OAuth2AuthenticationProcessingException;

import java.util.Map;

public class OAuth2UserInfoFactory {

    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if (registrationId.equalsIgnoreCase(AuthProvider.google.toString())) {
            System.out.println(AuthProvider.google.toString());
            return new GoogleUserInfo(attributes);

        } else {
            throw new OAuth2AuthenticationProcessingException("Sorry! Login with " + registrationId + " is not supported yet.");
        }
    }
}
