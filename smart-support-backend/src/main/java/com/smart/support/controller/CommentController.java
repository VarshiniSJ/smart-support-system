
package com.smart.support.controller;

import com.smart.support.entity.Comment;
import com.smart.support.service.CommentService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets/{ticketId}/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    // Customer, Agent and Admin can add comments
    @PreAuthorize("hasAnyRole('CUSTOMER', 'AGENT', 'ADMIN')")
    @PostMapping
    public Comment addComment(
            @PathVariable Long ticketId,
            @RequestBody Comment comment,
            Authentication authentication) {

        String email = authentication.getName();

        String role = authentication.getAuthorities()
                .stream()
                .findFirst()
                .orElseThrow()
                .getAuthority();

        return commentService.addComment(
                ticketId,
                comment.getMessage(),
                email,
                role
        );
    }

    // Customer, Agent and Admin can view comments
    @PreAuthorize("hasAnyRole('CUSTOMER', 'AGENT', 'ADMIN')")
    @GetMapping
    public List<Comment> getComments(
            @PathVariable Long ticketId,
            Authentication authentication) {

        String email = authentication.getName();

        String role = authentication.getAuthorities()
                .stream()
                .findFirst()
                .orElseThrow()
                .getAuthority();

        return commentService.getComments(
                ticketId,
                email,
                role
        );
    }
}
