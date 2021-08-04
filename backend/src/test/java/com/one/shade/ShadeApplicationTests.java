package com.one.shade;

import com.one.shade.domain.User;
import com.one.shade.repository.UserRepository;
import com.one.shade.service.UserMailService;
import com.one.shade.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

@SpringBootTest
class ShadeApplicationTests {

	@Autowired
	UserMailService userMailService;
	@Test
	void contextLoads() {
		System.out.println("tempPw: " +  Math.random());
//		System.out.println("tempPw: " +  Math.random().toString(36).slice(2));
		System.out.println("tempPw: " + userMailService.getTempPassword());
		System.out.println("tempPw: " + userMailService.getTempPassword());
		System.out.println("tempPw: " + userMailService.getTempPassword());
	}


}
