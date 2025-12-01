
package com.example.quiz.dto;

import lombok.Data;

import java.util.List;

@Data
public class SubmitQuizRequest {
    private Long quizId;
    private Long userId;
    private List<AnswerInput> answers;

    @Data
    public static class AnswerInput {
        private Long questionId;
        private Integer selectedOption;
    }
}
