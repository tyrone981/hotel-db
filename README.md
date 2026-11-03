# Hotel Management Database

Individual project - MySQL 8 (InnoDB). Author: [SURNAME First name].

## Context

A relational database for a hotel: rooms and amenities, clients, reservations over one or several rooms, services with weekly opening hours and slot capacity, invoices and payments, and reviews. The 17 business rules (BR-01 to BR-17) of the brief are enforced by the schema where possible (keys, NOT NULL, UNIQUE, CHECK, ENUM, lookup tables) and by triggers and a procedure where a rule needs data from other rows.

## Repository structure

- docs/erd.png - entity-relationship diagram (L2)
- docs/data_dictionary.md - data dictionary (L1)
- sql/01_schema.sql - creates the database and all 15 tables (L3)
- sql/02_constraints.sql - triggers and stored procedures (L4)
- sql/03_test_data.sql - test data (L5)
- sql/04_queries.sql - the six analytical queries (L6)
- sql/05_tests.sql - violation tests, all expected to be rejected (L5)

## Execution order

Run the scripts in order from 01 to 05, on an empty server, with MySQL 8 or later. Script 01 drops and recreates the database hotel_db, so it must always run first. Script 05 prints one row per test, with the outcome PASS when the violation was rejected, and a final summary. The expected result is 17 PASS and 0 FAIL.

## Design choices

- Room status is a lookup table (room_status), because the hotel may add statuses. Fixed lists (reservation status, invoice status, payment method, line type) are ENUMs.
- Availability is never stored. It is derived from reservations (BR-03), so the status of a room only describes its current operational situation.
- A reservation and its rooms are linked by reservation_room. Check-in and check-out belong to the reservation because they are shared by all its rooms (BR-04), and the nightly price lives in the link so it is frozen at booking time (BR-08).
- Service slots have a fixed length per service. Slots are not stored: a booking stores a date and a start time, and a trigger checks the stay, the opening hours, the slot boundary and the capacity (BR-12).
- Opening hours are one row per service and weekday (day 1 is Monday). A missing row means closed.
- The tax rate is stored on each invoice line (BR-13).
- Reviews and invoices are linked to a reservation by a UNIQUE foreign key, which gives the one-to-one and one-to-zero-or-one relationships (BR-13, BR-16).

## Deliberate denormalizations

- reservation_room.nightly_price copies the room price at booking time (BR-08).
- invoice_line.unit_price and tax_rate are a snapshot of what was billed.
- invoice.status could be calculated from the payments, but BR-15 requires it, so it is stored and maintained by sp_record_payment.

## Business rules enforced by triggers and procedures

| Rule | Mechanism |
|---|---|
| BR-05 | trg_reservation_before_insert blocks creating a confirmed or completed reservation directly. trg_reservation_before_update checks the guest count against the total room capacity when a reservation becomes confirmed or completed |
| BR-07 | trg_reservation_room_before_insert checks overlapping nights. trg_reservation_before_update re-checks when dates change or a cancelled reservation is reactivated |
| BR-12 | sp_check_service_booking, called by an insert trigger and an update trigger on service_booking |
| BR-14, BR-15 | sp_record_payment inserts the payment and updates the invoice status in one transaction |
| BR-16, BR-17 | sp_check_review, called by an insert trigger and an update trigger on review |

## Workflow to create a reservation

1. Insert the reservation as pending.
2. Insert its rooms in reservation_room (overlaps are checked here).
3. Update the reservation to confirmed (the capacity is checked here).

Payments must be recorded with sp_record_payment. Inserting directly into payment would not update the invoice status.

## ON DELETE and ON UPDATE choices

- RESTRICT on delete where history must be kept: rooms, clients, services, invoices, payments, reviews.
- CASCADE on delete for rows that mean nothing without their parent: room_amenity, reservation_room, service_booking, service_opening_hours, invoice_line.
- CASCADE on update on most foreign keys. The keys are AUTO_INCREMENT surrogate keys that never change, so ON UPDATE never fires in practice. RESTRICT on invoice_line.service_booking_id is a conservative default for the same reason.

## Assumptions

- The check-out day counts as part of the stay for service bookings (BR-12).
- A payment larger than the outstanding balance is rejected.
- Invoice amounts are computed as quantity x unit price x (1 + tax rate / 100), rounded to two decimals per line.
- Room availability in the analytical queries ignores room status, following BR-03.
- Tax rate used in the test data: 19.25 percent.

## Test data

15 rooms (4 types, one out of service), 10 clients (one without reservation), 20 reservations (completed, confirmed, pending, cancelled, and two with several rooms), 4 services with varying hours, 10 invoices (5 paid, 3 partially paid, 2 due) and 6 reviews with ratings from 1 to 5.