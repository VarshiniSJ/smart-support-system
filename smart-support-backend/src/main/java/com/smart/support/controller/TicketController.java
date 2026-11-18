
package com.smart.support.controller;

import com.smart.support.entity.Ticket;
import com.smart.support.service.TicketService;

import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    // Customer/Admin: Create ticket
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    @PostMapping
    public Ticket createTicket(
            @RequestBody Ticket ticket,
            Authentication authentication) {

        return ticketService.createTicket(
                ticket,
                authentication.getName()
        );
    }

    // Admin: View all tickets
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<Ticket> getAllTickets() {

        return ticketService.getAllTickets();
    }

    // Agent: View assigned tickets
    @PreAuthorize("hasRole('AGENT')")
    @GetMapping("/assigned")
    public List<Ticket> getAssignedTickets(
            Authentication authentication) {

        return ticketService.getAssignedTickets(
                authentication.getName()
        );
    }

    // Customer/Agent/Admin: View one ticket
    @PreAuthorize("hasAnyRole('CUSTOMER', 'AGENT', 'ADMIN')")
    @GetMapping("/{id}")
    public Ticket getTicketById(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        String role = authentication.getAuthorities()
                .stream()
                .findFirst()
                .orElseThrow()
                .getAuthority();

        return ticketService.getTicketByIdForUser(
                id, email, role
        );
    }

    // Admin: Assign ticket to agent
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{ticketId}/assign/{agentId}")
    public Ticket assignTicket(
            @PathVariable Long ticketId,
            @PathVariable Long agentId) {

        return ticketService.assignTicket(
                ticketId, agentId
        );
    }

    // Agent/Admin: Update ticket
    @PreAuthorize("hasAnyRole('AGENT', 'ADMIN')")
    @PutMapping("/{id}")
    public Ticket updateTicket(
            @PathVariable Long id,
            @RequestBody Ticket ticket,
            Authentication authentication) {

        String email = authentication.getName();

        String role = authentication.getAuthorities()
                .stream()
                .findFirst()
                .orElseThrow()
                .getAuthority();

        return ticketService.updateTicket(
                id, ticket, email, role
        );
    }

    // Admin: Delete ticket
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteTicket(@PathVariable Long id) {

        ticketService.deleteTicket(id);

        return "Ticket deleted successfully";
    }
}
