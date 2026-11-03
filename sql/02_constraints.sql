USE hotel_db;

INSERT INTO room_type (room_type_id, name, description) VALUES
    (1, 'Single', 'One person, compact room'),
    (2, 'Double', 'Double bed for two guests'),
    (3, 'Family', 'Large room with several beds'),
    (4, 'Suite', 'Premium suite with living area');

INSERT INTO room (room_id, room_number, `floor`, room_type_id, room_status_id, max_capacity, base_price_per_night) VALUES
    (1, '101', 1, 1, 1, 1, 25000.00),
    (2, '102', 1, 1, 1, 1, 25000.00),
    (3, '103', 1, 1, 3, 1, 25000.00),
    (4, '104', 1, 1, 1, 1, 27000.00),
    (5, '201', 2, 2, 2, 2, 40000.00),
    (6, '202', 2, 2, 1, 2, 40000.00),
    (7, '203', 2, 2, 1, 3, 45000.00),
    (8, '204', 2, 2, 1, 2, 42000.00),
    (9, '205', 2, 2, 4, 2, 42000.00),
    (10, '206', 2, 2, 1, 3, 45000.00),
    (11, '301', 3, 3, 1, 4, 60000.00),
    (12, '302', 3, 3, 1, 5, 65000.00),
    (13, '303', 3, 3, 1, 4, 60000.00),
    (14, '401', 4, 4, 1, 3, 100000.00),
    (15, '402', 4, 4, 1, 4, 120000.00);

INSERT INTO amenity (amenity_id, name) VALUES
    (1, 'Sea view'),
    (2, 'Balcony'),
    (3, 'Bathtub'),
    (4, 'Air conditioning'),
    (5, 'Minibar'),
    (6, 'Wi-Fi');

INSERT INTO room_amenity (room_id, amenity_id) VALUES
    (1, 4), (1, 6),
    (2, 4), (2, 6),
    (3, 4), (3, 6),
    (4, 4), (4, 6), (4, 2),
    (5, 4), (5, 6), (5, 2),
    (6, 4), (6, 6),
    (7, 4), (7, 6), (7, 2),
    (8, 4), (8, 6), (8, 1),
    (9, 4), (9, 6),
    (10, 4), (10, 6), (10, 2),
    (11, 4), (11, 6), (11, 2), (11, 3),
    (12, 4), (12, 6), (12, 2), (12, 3),
    (13, 4), (13, 6), (13, 3),
    (14, 1), (14, 2), (14, 3), (14, 4), (14, 5), (14, 6),
    (15, 1), (15, 2), (15, 3), (15, 4), (15, 5), (15, 6);

INSERT INTO client (client_id, last_name, first_name, phone, email) VALUES
    (1, 'Nkeng', 'Paul', '+237670000001', 'paul.nkeng@example.com'),
    (2, 'Mballa', 'Grace', '+237670000002', 'grace.mballa@example.com'),
    (3, 'Tchoupo', 'Armand', '+237670000003', 'armand.tchoupo@example.com'),
    (4, 'Ewane', 'Sandrine', '+237670000004', 'sandrine.ewane@example.com'),
    (5, 'Fotso', 'Clarisse', '+237670000005', 'clarisse.fotso@example.com'),
    (6, 'Essomba', 'Jean', '+237670000006', 'jean.essomba@example.com'),
    (7, 'Ngono', 'Marie', '+237670000007', 'marie.ngono@example.com'),
    (8, 'Kamga', 'Bertrand', '+237670000008', 'bertrand.kamga@example.com'),
    (9, 'Atangana', 'Odile', '+237670000009', 'odile.atangana@example.com'),
    (10, 'Biyong', 'Carine', '+237670000010', 'carine.biyong@example.com');

INSERT INTO reservation (reservation_id, client_id, check_in_date, check_out_date, guest_count, status, created_at, cancelled_at) VALUES
    (1, 1, '2026-07-03', '2026-07-06', 2, 'pending', '2026-06-10 09:15:00', NULL),
    (2, 2, '2026-07-10', '2026-07-12', 1, 'pending', '2026-06-25 14:30:00', NULL),
    (3, 3, '2026-07-15', '2026-07-20', 5, 'pending', '2026-06-30 11:00:00', NULL),
    (4, 4, '2026-08-02', '2026-08-05', 2, 'pending', '2026-07-12 16:45:00', NULL),
    (5, 5, '2026-08-08', '2026-08-10', 3, 'pending', '2026-07-20 10:20:00', NULL),
    (6, 6, '2026-08-15', '2026-08-18', 2, 'pending', '2026-07-28 08:50:00', NULL),
    (7, 1, '2026-09-01', '2026-09-04', 4, 'pending', '2026-08-10 13:05:00', NULL),
    (8, 7, '2026-09-10', '2026-09-12', 1, 'pending', '2026-08-25 17:40:00', NULL),
    (9, 2, '2026-09-20', '2026-09-23', 3, 'pending', '2026-08-30 12:10:00', NULL),
    (10, 8, '2026-06-12', '2026-06-14', 2, 'pending', '2026-05-28 09:00:00', NULL),
    (11, 3, '2026-07-03', '2026-07-06', 2, 'cancelled', '2026-06-05 15:00:00', '2026-06-20 10:00:00'),
    (12, 9, '2026-08-20', '2026-08-22', 2, 'cancelled', '2026-08-01 11:30:00', '2026-08-12 09:45:00'),
    (13, 4, '2026-11-05', '2026-11-08', 2, 'pending', '2026-10-05 10:00:00', NULL),
    (14, 9, '2026-11-20', '2026-11-22', 1, 'pending', '2026-10-08 18:20:00', NULL),
    (15, 6, '2026-10-13', '2026-10-17', 2, 'pending', '2026-09-25 09:30:00', NULL),
    (16, 5, '2026-12-20', '2026-12-27', 6, 'pending', '2026-10-01 14:00:00', NULL),
    (17, 7, '2026-12-24', '2026-12-28', 2, 'pending', '2026-10-02 16:10:00', NULL),
    (18, 2, '2026-10-20', '2026-10-23', 2, 'pending', '2026-10-03 12:00:00', NULL),
    (19, 8, '2026-10-25', '2026-10-28', 3, 'pending', '2026-10-10 15:30:00', NULL),
    (20, 1, '2026-11-10', '2026-11-12', 4, 'pending', '2026-10-12 09:05:00', NULL);

INSERT INTO reservation_room (reservation_id, room_id, nightly_price) VALUES
    (1, 5, 40000.00),
    (2, 1, 25000.00),
    (3, 11, 60000.00),
    (3, 6, 40000.00),
    (4, 14, 100000.00),
    (5, 7, 45000.00),
    (6, 8, 42000.00),
    (7, 12, 65000.00),
    (8, 2, 25000.00),
    (9, 15, 120000.00),
    (10, 6, 40000.00),
    (11, 5, 40000.00),
    (12, 4, 27000.00),
    (13, 5, 40000.00),
    (14, 3, 25000.00),
    (15, 5, 40000.00),
    (16, 14, 100000.00),
    (16, 15, 120000.00),
    (17, 6, 40000.00),
    (18, 8, 42000.00),
    (19, 10, 45000.00),
    (20, 13, 60000.00);

UPDATE reservation SET status = 'completed' WHERE reservation_id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
UPDATE reservation SET status = 'confirmed' WHERE reservation_id IN (15, 16, 17, 18, 20);

INSERT INTO service (service_id, name, description, price, slot_duration_minutes, slot_capacity) VALUES
    (1, 'Spa', 'Relaxation and massage sessions', 15000.00, 60, 4),
    (2, 'Restaurant', 'Table booking for lunch or dinner', 12000.00, 120, 20),
    (3, 'Gym', 'Fitness room with equipment', 3000.00, 60, 8),
    (4, 'Swimming pool', 'Outdoor pool access', 2000.00, 60, 15);

INSERT INTO service_opening_hours (service_id, day_of_week, opening_time, closing_time) VALUES
    (1, 2, '10:00:00', '18:00:00'),
    (1, 3, '10:00:00', '18:00:00'),
    (1, 4, '10:00:00', '18:00:00'),
    (1, 5, '10:00:00', '18:00:00'),
    (1, 6, '09:00:00', '19:00:00'),
    (1, 7, '10:00:00', '16:00:00'),
    (2, 1, '12:00:00', '22:00:00'),
    (2, 2, '12:00:00', '22:00:00'),
    (2, 3, '12:00:00', '22:00:00'),
    (2, 4, '12:00:00', '22:00:00'),
    (2, 5, '12:00:00', '22:00:00'),
    (2, 6, '08:00:00', '22:00:00'),
    (2, 7, '08:00:00', '22:00:00'),
    (3, 1, '06:00:00', '21:00:00'),
    (3, 2, '06:00:00', '21:00:00'),
    (3, 3, '06:00:00', '21:00:00'),
    (3, 4, '06:00:00', '21:00:00'),
    (3, 5, '06:00:00', '21:00:00'),
    (3, 6, '08:00:00', '18:00:00'),
    (3, 7, '08:00:00', '18:00:00'),
    (4, 2, '08:00:00', '18:00:00'),
    (4, 3, '08:00:00', '18:00:00'),
    (4, 4, '08:00:00', '18:00:00'),
    (4, 5, '08:00:00', '18:00:00'),
    (4, 6, '08:00:00', '18:00:00'),
    (4, 7, '08:00:00', '18:00:00');

INSERT INTO service_booking (service_booking_id, reservation_id, service_id, booking_date, start_time, guests) VALUES
    (1, 1, 1, '2026-07-04', '09:00:00', 2),
    (2, 1, 2, '2026-07-05', '12:00:00', 2),
    (3, 4, 1, '2026-08-04', '10:00:00', 2),
    (4, 4, 3, '2026-08-03', '06:00:00', 2),
    (5, 7, 4, '2026-09-02', '10:00:00', 4),
    (6, 9, 2, '2026-09-21', '18:00:00', 3),
    (7, 9, 1, '2026-09-22', '14:00:00', 3),
    (8, 15, 3, '2026-10-14', '07:00:00', 2),
    (9, 15, 1, '2026-10-16', '10:00:00', 2);

INSERT INTO invoice (invoice_id, reservation_id, issue_date) VALUES
    (1, 1, '2026-07-06'),
    (2, 2, '2026-07-12'),
    (3, 3, '2026-07-20'),
    (4, 4, '2026-08-05'),
    (5, 5, '2026-08-10'),
    (6, 6, '2026-08-18'),
    (7, 7, '2026-09-04'),
    (8, 8, '2026-09-12'),
    (9, 9, '2026-09-23'),
    (10, 10, '2026-06-14');

INSERT INTO invoice_line (invoice_id, line_type, description, service_booking_id, quantity, unit_price, tax_rate) VALUES
    (1, 'night', 'Accommodation - room 201', NULL, 3, 40000.00, 19.25),
    (1, 'service', 'Spa', 1, 2, 15000.00, 19.25),
    (1, 'service', 'Restaurant', 2, 2, 12000.00, 19.25),
    (2, 'night', 'Accommodation - room 101', NULL, 2, 25000.00, 19.25),
    (2, 'misc', 'Minibar consumption', NULL, 1, 5000.00, 19.25),
    (3, 'night', 'Accommodation - room 301', NULL, 5, 60000.00, 19.25),
    (3, 'night', 'Accommodation - room 202', NULL, 5, 40000.00, 19.25),
    (4, 'night', 'Accommodation - room 401', NULL, 3, 100000.00, 19.25),
    (4, 'service', 'Spa', 3, 2, 15000.00, 19.25),
    (4, 'service', 'Gym', 4, 2, 3000.00, 19.25),
    (5, 'night', 'Accommodation - room 203', NULL, 2, 45000.00, 19.25),
    (6, 'night', 'Accommodation - room 204', NULL, 3, 42000.00, 19.25),
    (7, 'night', 'Accommodation - room 302', NULL, 3, 65000.00, 19.25),
    (7, 'service', 'Swimming pool', 5, 4, 2000.00, 19.25),
    (8, 'night', 'Accommodation - room 102', NULL, 2, 25000.00, 19.25),
    (9, 'night', 'Accommodation - room 402', NULL, 3, 120000.00, 19.25),
    (9, 'service', 'Restaurant', 6, 3, 12000.00, 19.25),
    (9, 'service', 'Spa', 7, 3, 15000.00, 19.25),
    (10, 'night', 'Accommodation - room 202', NULL, 2, 40000.00, 19.25);

CALL sp_record_payment(1, 100000.00, 'cash');
CALL sp_record_payment(1, 107495.00, 'card');
CALL sp_record_payment(2, 65587.50, 'mobile_money');
CALL sp_record_payment(3, 300000.00, 'bank_transfer');
CALL sp_record_payment(4, 400680.00, 'card');
CALL sp_record_payment(6, 50000.00, 'cash');
CALL sp_record_payment(7, 242077.50, 'mobile_money');
CALL sp_record_payment(9, 525892.50, 'bank_transfer');
CALL sp_record_payment(10, 40000.00, 'mobile_money');

UPDATE payment
SET payment_date = TIMESTAMP(
    (SELECT i.issue_date FROM invoice i WHERE i.invoice_id = payment.invoice_id),
    '12:00:00'
)
WHERE payment_id > 0;
INSERT INTO review (reservation_id, rating, `comment`, review_date) VALUES
    (1, 5, 'Excellent stay, very clean room and friendly staff.', '2026-07-07'),
    (2, 4, 'Good value for a short stay.', '2026-07-13'),
    (4, 3, 'Nice suite but the air conditioning was noisy.', '2026-08-06'),
    (5, 2, 'Room was ready late and the corridor was noisy.', '2026-08-11'),
    (7, 1, 'Pool was closed during half of our stay.', '2026-09-05'),
    (9, 5, NULL, '2026-09-24');