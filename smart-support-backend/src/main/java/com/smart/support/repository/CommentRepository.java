
package com.smart.support.repository;

import com.smart.support.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    // Find all comments belonging to one ticket
    List<Comment> findByTicket_IdOrderByCreatedAtAsc(Long ticketId);
}
