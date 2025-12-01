
package com.example.quiz.dto;

import lombok.Data;

import java.util.List;

@Data
public class QuizDTO {
    private Long id;
    private String title;
    private String description;
    private int durationMinutes;
    private Boolean alreadyAttempted; // null when not needed
    private List<QuestionDTO> questions;

    @Data
    public static class QuestionDTO {
        private Long id;
        private String text;
        private List<String> options;
    }
}
