
package com.smart.support.service;

import com.smart.support.entity.Ticket;
import com.smart.support.entity.User;
import com.smart.support.enums.Role;
import com.smart.support.repository.TicketRepository;
import com.smart.support.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;

    public TicketService(
            TicketRepository ticketRepository,
            UserRepository userRepository) {

        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
    }

    // Create ticket for logged-in customer
    public Ticket createTicket(Ticket ticket, String email) {

        User customer = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Customer not found"
                        ));

        ticket.setCustomer(customer);

        return ticketRepository.save(ticket);
    }

    // Admin: Get all tickets
    public List<Ticket> getAllTickets() {

        return ticketRepository.findAll();
    }

    // Get ticket by ID
    public Ticket getTicketById(Long id) {

        return ticketRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Ticket not found"
                        ));
    }

    // Get ticket based on user role
    public Ticket getTicketByIdForUser(
            Long id, String email, String role) {

        // Admin can view any ticket
        if (role.equals("ROLE_ADMIN")) {
            return getTicketById(id);
        }

        // Customer can view only their own tickets
        if (role.equals("ROLE_CUSTOMER")) {

            return ticketRepository
                    .findByIdAndCustomer_Email(id, email)
                    .orElseThrow(() ->
                            new ResponseStatusException(
                                    HttpStatus.NOT_FOUND,
                                    "Ticket not found"
                            ));
        }

        // Agent can view only assigned tickets
        if (role.equals("ROLE_AGENT")) {

            return ticketRepository
                    .findByIdAndAssignedAgent_Email(id, email)
                    .orElseThrow(() ->
                            new ResponseStatusException(
                                    HttpStatus.NOT_FOUND,
                                    "Ticket not found"
                            ));
        }

        throw new ResponseStatusException(
                HttpStatus.FORBIDDEN,
                "Access denied"
        );
    }

    // Admin: Assign ticket to agent
    public Ticket assignTicket(Long ticketId, Long agentId) {

        Ticket ticket = getTicketById(ticketId);

        User agent = userRepository.findById(agentId)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Agent not found"
                        ));

        if (agent.getRole() != Role.AGENT) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Selected user is not an agent"
            );
        }

        ticket.setAssignedAgent(agent);

        return ticketRepository.save(ticket);
    }

    // Agent: Get all assigned tickets
    public List<Ticket> getAssignedTickets(String email) {

        return ticketRepository.findByAssignedAgent_Email(email);
    }

    // Agent/Admin: Update ticket
    public Ticket updateTicket(
            Long id,
            Ticket updatedTicket,
            String email,
            String role) {

        Ticket existingTicket =
                getTicketByIdForUser(id, email, role);

        existingTicket.setTitle(updatedTicket.getTitle());
        existingTicket.setDescription(updatedTicket.getDescription());
        existingTicket.setStatus(updatedTicket.getStatus());
        existingTicket.setPriority(updatedTicket.getPriority());

        return ticketRepository.save(existingTicket);
    }

    // Admin: Delete ticket
    public void deleteTicket(Long id) {

        Ticket ticket = getTicketById(id);

        ticketRepository.delete(ticket);
    }
}
