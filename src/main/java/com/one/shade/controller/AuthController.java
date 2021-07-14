package com.one.shade.controller;

import com.one.shade.domain.AuthProvider;
import com.one.shade.security.auth.PrincipalDetails;
import com.one.shade.service.UserService;
import com.one.shade.util.JWTUtil;
import com.one.shade.exception.BadRequestException;
import com.one.shade.domain.ERole;
import com.one.shade.domain.User;
import com.one.shade.payload.LoginRequest;
import com.one.shade.payload.SignupRequest;
import com.one.shade.payload.JwtResponse;
import com.one.shade.payload.MessageResponse;
import com.one.shade.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("/api/auth")
@RequiredArgsConstructor
@RestController
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final UserService userService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JWTUtil JWTUtil;


    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = JWTUtil.generateToken(authentication);

        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        List<String> roles = principalDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                principalDetails.getId(),
                principalDetails.getUsername(),
                principalDetails.getEmail(),
                roles)
        );
    }

    @PostMapping("/join")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest){

        if(userRepository.existsByUsername(signupRequest.getUsername())) {
            throw new BadRequestException("현재 사용중인 아이디입니다.");
        }

        if(userRepository.existsByEmail(signupRequest.getEmail())) {
            return new ResponseEntity(new MessageResponse(false, "현재 사용중인 이메일입니다."),
                    HttpStatus.BAD_REQUEST);
        }
        User user = User.builder()
                .username(signupRequest.getUsername())
                .email(signupRequest.getEmail())
                .password(bCryptPasswordEncoder.encode(signupRequest.getPassword()))
                .roles(ERole.ROLE_USER)
                .provider(AuthProvider.local)
                .nickname(signupRequest.getNickname())
                .gender(signupRequest.getGender())
                .birthday(signupRequest.getBirthday())
                .joinDate(LocalDate.now())
                .build();

        userRepository.save(user);
        System.out.println("회원가입 완료");
        return ResponseEntity.ok(new MessageResponse(true,"회원가입에 성공하셨습니다."));
    }

    // 중복체크
    @GetMapping("/check/{username}")
    public ResponseEntity<?> existId(@PathVariable String username){
        return ResponseEntity.ok (userService.existsByUsername(username));
    }
//    @GetMapping("/check/{nickname}")
//    public ResponseEntity<?> existNickname(@PathVariable String nickname){
//        return ResponseEntity.ok (userService.existsByNickname(nickname));
//    }


    //  마이페이지
    @GetMapping("/user/{username}")
    public ResponseEntity<?> findByUsername(@PathVariable String username){
        System.out.println("사용자 GET 매핑");
        return ResponseEntity.ok (userService.findByUsername(username));
    }

    @PutMapping("/user")
    public ResponseEntity<?> update(@RequestBody User user){
        System.out.println("사용자 PUT 매핑");

        return ResponseEntity.ok(userService.updateUser(user.getUsername(), user));
    }


}
