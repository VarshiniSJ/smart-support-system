
package com.smart.support.service;

import com.smart.support.entity.Comment;
import com.smart.support.entity.Ticket;
import com.smart.support.entity.User;
import com.smart.support.repository.CommentRepository;
import com.smart.support.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final TicketService ticketService;

    public CommentService(
            CommentRepository commentRepository,
            UserRepository userRepository,
            TicketService ticketService) {

        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.ticketService = ticketService;
    }

    // Add a comment to a ticket
    public Comment addComment(
            Long ticketId,
            String message,
            String email,
            String role) {

        // Check whether this user can access the ticket
        Ticket ticket = ticketService.getTicketByIdForUser(
                ticketId, email, role
        );

        // Find the logged-in user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // Create a new comment
        Comment comment = new Comment();

        comment.setMessage(message);
        comment.setCreatedAt(LocalDateTime.now());
        comment.setTicket(ticket);
        comment.setUser(user);

        // Save comment in database
        return commentRepository.save(comment);
    }

    // Get all comments for a ticket
    public List<Comment> getComments(
            Long ticketId,
            String email,
            String role) {

        // Check whether this user can access the ticket
        ticketService.getTicketByIdForUser(
                ticketId, email, role
        );

        // Return comments from oldest to newest
        return commentRepository
                .findByTicket_IdOrderByCreatedAtAsc(ticketId);
    }
}
