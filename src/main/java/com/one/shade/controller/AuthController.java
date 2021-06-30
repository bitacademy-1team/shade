package com.one.shade.controller;

import com.one.shade.config.auth.PrincipalDetails;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("/api/auth")
@RequiredArgsConstructor
@RestController
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JWTUtil JWTUtil;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

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
                roles));
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

        User user = new User();
        user.setUsername(signupRequest.getUsername());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(signupRequest.getPassword()));
        user.setRoles(ERole.ROLE_USER);

        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse(true,"회원가입에 성고하셨습니다."));
    }
}
