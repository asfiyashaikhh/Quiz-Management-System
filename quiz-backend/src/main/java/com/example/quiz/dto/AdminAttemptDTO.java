
package com.example.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class AdminAttemptDTO {
    private Long id;
    private String studentName;
    private String quizTitle;
    private int score;
    private LocalDateTime completedAt;
}
