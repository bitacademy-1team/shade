package com.one.shade.controller;

import com.one.shade.domain.AuthProvider;
import com.one.shade.dto.MailDto;
import com.one.shade.security.auth.PrincipalDetails;
import com.one.shade.service.UserMailService;
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
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
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

@CrossOrigin(origins = "http://52.79.189.13")
//@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@RestController
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final UserService userService;
    private final UserMailService userMailService;
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
            throw new BadRequestException("?????? ???????????? ??????????????????.");
        }

        if(userRepository.existsByEmail(signupRequest.getEmail())) {
            return new ResponseEntity(new MessageResponse(false, "?????? ???????????? ??????????????????."),
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
        System.out.println("???????????? ??????");
        return ResponseEntity.ok(new MessageResponse(true,"??????????????? ?????????????????????."));
    }

    // ????????????
    @GetMapping("/check/{username}")
    public ResponseEntity<?> existId(@PathVariable String username){
        return ResponseEntity.ok (userService.existsByUsername(username));
    }
//    @GetMapping("/check/{nickname}")
//    public ResponseEntity<?> existNickname(@PathVariable String nickname){
//        return ResponseEntity.ok (userService.existsByNickname(nickname));
//    }


    //  ???????????????
    @GetMapping("/user/{username}")
    public ResponseEntity<?> findByUsername(@PathVariable String username){
        System.out.println("????????? GET ??????");
        return ResponseEntity.ok (userService.findByUsername(username));
    }

    @PutMapping("/user")
    public ResponseEntity<?> update(@RequestBody User user){
        System.out.println("????????? PUT ??????");

        return ResponseEntity.ok(userService.updateUser(user.getUsername(), user));
    }

    // Id,Pw ??????
    @GetMapping("/findId/{email}")
    public ResponseEntity<?> findId(@PathVariable String email){
        System.out.println("findId Controller: " + (userMailService.findId(email)).get().getUsername());
        return ResponseEntity.ok((userMailService.findId(email)).get().getUsername());
    }

    @GetMapping("/findPw/{username}/{email}")
    public ResponseEntity<?> findId(@PathVariable String email,@PathVariable String username){
        System.out.println("???????????? GET");
        return ResponseEntity.ok(userMailService.findPw(email,username));
    }
    @PostMapping("/findPw")
    public void findPw(@RequestBody String userInfo){
        JSONParser jsonParse = new JSONParser();
        try {
            JSONObject jsonObject = (JSONObject) jsonParse.parse(userInfo);
            String email = (String) jsonObject.get("email");
            String username = (String) jsonObject.get("username");
            MailDto dto = userMailService.passwordMail(email,username);
            userMailService.mailSend(dto);
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

}
