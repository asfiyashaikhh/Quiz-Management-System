
package com.example.quiz.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {

    public enum Role {
        STUDENT, ADMIN
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    @Column(name = "prn_no")
    private String prnNo;

    @Enumerated(EnumType.STRING)
    private Role role;
}
