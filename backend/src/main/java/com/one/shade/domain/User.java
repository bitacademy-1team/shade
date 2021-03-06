package com.one.shade.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(	name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username")
        })
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String username;
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;
    @Size(max = 120)
    private String password;

    private String nickname;
    private String gender;
    private String birthday;
    private LocalDate joinDate;

    @Enumerated(value = EnumType.STRING)
    private ERole roles;
    @Enumerated(value = EnumType.STRING)
    private AuthProvider provider;
    private String providerId;


    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }


}
