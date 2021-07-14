package com.one.shade.security.oauth2;

import com.one.shade.domain.ERole;
import com.one.shade.domain.User;
import com.one.shade.security.auth.PrincipalDetails;
import com.one.shade.security.oauth2.user.*;
import com.one.shade.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;


    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("getAttribute: " + super.loadUser(userRequest).getAttributes());
        OAuth2User oAuth2User = super.loadUser(userRequest);        // 회원 프로필 조회
        return processOAuth2User(userRequest, oAuth2User);
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {

        OAuth2UserInfo oAuth2UserInfo = null;
        if(userRequest.getClientRegistration().getRegistrationId().equals("google")) {
            System.out.println("구글 로그인 요청");
            oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
        }if(userRequest.getClientRegistration().getRegistrationId().equals("facebook")) {
            System.out.println("페이스북 로그인 요청");
            oAuth2UserInfo = new FacebookUserInfo(oAuth2User.getAttributes());
        }if(userRequest.getClientRegistration().getRegistrationId().equals("naver")) {
            System.out.println("네이버 로그인 요청");
            oAuth2UserInfo = new NaverUserInfo((Map)oAuth2User.getAttributes().get("response"));
        }if(userRequest.getClientRegistration().getRegistrationId().equals("kakao")) {
            System.out.println("카카오 로그인 요청");
            oAuth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
        }else {
            System.out.println("허용하지 않는 로그인 접근입니다.");
        }

        System.out.println("Oauth2_username: " + oAuth2UserInfo.getUsername());

        Optional<User> userEntity = userRepository.findByUsername(oAuth2UserInfo.getUsername());

        User user;
        if (!userEntity.isPresent()) {
            System.out.println("최초 로그인 방문 입니다.");
            user = User.builder()
                    .username(oAuth2UserInfo.getUsername())
                    .email(oAuth2UserInfo.getEmail())
                    .roles(ERole.ROLE_USER)
                    .provider(oAuth2UserInfo.getProvider())
                    .providerId(oAuth2UserInfo.getProviderId())
                    .build();
            userRepository.save(user);
        } else {
            System.out.println("두번째 로그인 방문 입니다.");
            user = userEntity.get();
            user.setUsername(oAuth2UserInfo.getUsername());
        }
        return new PrincipalDetails(user, oAuth2User.getAttributes());
    }
}