package com.one.shade.service;

import com.one.shade.domain.User;
import com.one.shade.dto.MailDto;
import com.one.shade.repository.UserRepository;
import com.one.shade.util.MailUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserMailService {

    private final UserRepository userRepository;
    private final JavaMailSender javaMailSender;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private static final String FROM_ADDRESS = "wkaaks23@gmail.com";


    public void mailSend(MailDto mailDto){
        System.out.println("이메일 전송 완료");
        try {
            MailUtil mailUtil = new MailUtil(javaMailSender);

            // 받는 사람
            mailUtil.setTo(mailDto.getMailAddress());
            // 보내는 사람
            mailUtil.setFrom(FROM_ADDRESS);
            // 제목
            mailUtil.setSubject(mailDto.getMailTitle());
            // HTML Layout
            String htmlContent = mailDto.getMailMessage();
            mailUtil.setText(htmlContent, true);

            mailUtil.send();
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }



    public MailDto passwordMail(String email, String username){
        String str = getTempPassword();
        MailDto mailDto = MailDto.builder()
                .mailAddress(email)
                .mailTitle(username + "님의 임시비밀번호 안내 이메일 입니다")
                .mailMessage("임시비밀번호 안내 관련 이메일 입니다. [" + username + "] 님의 임시비밀번호는 [" + str + "]입니다.")
                .build();
        updatePassword(str,username);
        return mailDto;
    }

    @Transactional
    public Optional<User> findId(String email){
        Optional<User> findId = userRepository.findByEmail(email);
        return findId;
    }
    @Transactional
    public boolean findPw( String email, String username){
//        System.out.println("email : " + email);
//        System.out.println("username : " + username);
       return userRepository.existsByEmailAndUsername(email, username);
    }

    public void updatePassword(String str, String username){
        Optional<User> updateUser = userRepository.findByUsername(username);
//        System.out.println("updateUser: " + updateUser);
//        System.out.println("updateUser getUsername: " + updateUser.get().getUsername());
        updateUser.ifPresent(selectUser -> {
            selectUser.setPassword(bCryptPasswordEncoder.encode(str));
            userRepository.save(selectUser);
        });

    }



    public String getTempPassword(){
        char[] charSet = new char[] {
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F','G', 'H',
                'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        String str = "";
        int idx = 0;
        for(int i=0;i<10;i++){
            idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }
        return str;
    }
}
