
package com.smart.support.repository;

import com.smart.support.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    // Find a ticket belonging to a particular customer
    Optional<Ticket> findByIdAndCustomer_Email(
            Long id, String email);

    // Find a ticket assigned to a particular agent
    Optional<Ticket> findByIdAndAssignedAgent_Email(
            Long id, String email);

    // Find all tickets assigned to a particular agent
    List<Ticket> findByAssignedAgent_Email(String email);
}
