//
//package com.example.quiz.repository;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Modifying;
//import org.springframework.transaction.annotation.Transactional;
//import com.example.quiz.entity.QuizAttempt;
//import com.example.quiz.entity.User;
//import com.example.quiz.entity.Quiz;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.List;
//import java.util.Optional;
//
//public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {
//	@Modifying
//    @Transactional
//    void deleteByQuizId(Long quizId);
//	
//	Optional<QuizAttempt> findByUserAndQuiz(User user, Quiz quiz);
//    List<QuizAttempt> findByUser(User user);
//}
package com.example.quiz.repository;

import com.example.quiz.entity.QuizAttempt;
import com.example.quiz.entity.User;
import com.example.quiz.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {

    @Modifying
    @Transactional
    @Query("DELETE FROM QuizAttempt qa WHERE qa.quiz.id = :quizId")
    void deleteByQuizId(@Param("quizId") Long quizId);

    Optional<QuizAttempt> findByUserAndQuiz(User user, Quiz quiz);

    List<QuizAttempt> findByUser(User user);
}
