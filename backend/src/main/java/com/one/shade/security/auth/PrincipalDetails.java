package com.one.shade.security.auth;
import com.one.shade.domain.User;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import java.util.*;
@Data
public class PrincipalDetails implements UserDetails, OAuth2User {
    private Long id;
    private String username;
    private String email;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;
    private Map<String, Object> attributes;
    public PrincipalDetails(Long id, String username,String email, String password, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }
    public static PrincipalDetails create(User user) {
        List<GrantedAuthority> authorities = Collections.
                singletonList(new SimpleGrantedAuthority("ROLE_USER"));
        return new PrincipalDetails(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                authorities
        );
    }
    public static PrincipalDetails create(User user, Map<String, Object> attributes) {
        PrincipalDetails userPrincipal = PrincipalDetails.create(user);
        userPrincipal.setAttributes(attributes);
        return userPrincipal;
    }
    public Long getId() {
        return id;
    }
    public String getEmail() {
        return email;
    }
    @Override
    public String getPassword() {
        return password;
    }
    @Override
    public String getUsername() {
        return username;
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    @Override
    public boolean isEnabled() {
        return true;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }
    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }
    @Override
    public String getName() {
        return String.valueOf(id);
    }
}
//    private User user;
//    private Map<String, Object> attributes;
//
//
//    // 일반 로그인
//    public PrincipalDetails(User user) {
//        this.user = user;
//    }
//    // Oauth2 로그인
//    public PrincipalDetails(User user, Map<String, Object> attributes) {
//        this.user = user;
//        this.attributes = attributes;
//    }
//    // 권한 리턴
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        Collection<GrantedAuthority> authorities = new ArrayList<>();
//        authorities.add(()->{ return String.valueOf(user.getRoles());});
//        return authorities;
//    }
//
//
//    public User getUser() {
//        return user;
//    }
//
//    public Long getId() {
//        return user.getId();
//    }
//    public String getEmail() {
//        return user.getEmail();
//    }
//    @Override
//    public String getPassword() {
//        return user.getPassword();
//    }
//    @Override
//    public String getUsername() {
//        return user.getUsername();
//    }
//
//
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//    @Override
//    public boolean isEnabled() {
//        return true;
//    }
//
//    // Oauth2 메서드 추가
//    @Override
//    public String getName() {
//        return null;
//    }
//    @Override
//    public Map<String, Object> getAttributes() {
//        return attributes;
//    }
//}