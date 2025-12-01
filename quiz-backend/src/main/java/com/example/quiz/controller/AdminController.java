
package com.example.quiz.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.quiz.dto.AdminAttemptDTO;
import com.example.quiz.entity.Question;
import com.example.quiz.entity.Quiz;
import com.example.quiz.entity.User;
import com.example.quiz.repository.QuizRepository;
import com.example.quiz.repository.UserRepository;
import com.example.quiz.service.QuizService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final QuizRepository quizRepo;
    private final UserRepository userRepo;
    private final QuizService quizService;

    public AdminController(QuizRepository quizRepo,
                           UserRepository userRepo,
                           QuizService quizService) {
        this.quizRepo = quizRepo;
        this.userRepo = userRepo;
        this.quizService = quizService;
    }

    // Quizzes CRUD

    @GetMapping("/quizzes")
    public List<Quiz> allQuizzes() {
        return quizRepo.findAll();
    }

    @PostMapping("/quizzes")
    public Quiz createQuiz(@RequestBody Quiz quiz) {
        if (quiz.getQuestions() != null) {
            for (Question q : quiz.getQuestions()) {
                q.setQuiz(quiz);
            }
        }
        return quizRepo.save(quiz);
    }

    @PutMapping("/quizzes/{id}")
    public Quiz updateQuiz(@PathVariable Long id, @RequestBody Quiz quiz) {
        quiz.setId(id);
        if (quiz.getQuestions() != null) {
            for (Question q : quiz.getQuestions()) {
                q.setQuiz(quiz);
            }
        }
        return quizRepo.save(quiz);
    }

    @DeleteMapping("/quizzes/{id}")
    public ResponseEntity<Void>  deleteQuiz(@PathVariable Long id) {
    	 quizService.deleteQuiz(id);
        return ResponseEntity.noContent().build();
    }

    // Students management

    @GetMapping("/students")
    public List<User> students() {
        return userRepo.findAll();
    }

    @DeleteMapping("/students/{id}")
    public void deleteStudent(@PathVariable Long id) {
        userRepo.deleteById(id);
    }

    // Results for admin

    @GetMapping("/results")
    public List<AdminAttemptDTO> results() {
        return quizService.getAllAttemptsForAdmin();
    }
}
