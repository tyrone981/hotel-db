# Data Dictionary - hotel_db

MySQL 8, InnoDB, utf8mb4. 15 tables. All money amounts are DECIMAL, never FLOAT (BR-15).

## room_type

| Attribute | MySQL type | Constraints | Description | Rule |
|---|---|---|---|---|
| room_type_id | TINYINT UNSIGNED | PK, NOT NULL, AUTO_INCREMENT | Identifier of the room type | BR-01 |
| name | VARCHAR(50) | NOT NULL, UNIQUE | Type name (single, double, suite...) | BR-01 |
| description | VARCHAR(255) | NULL | Free description of the type | BR-01 |

## room_status

| Attribute | MySQL type | Constraints | Description | Rule |
|---|---|---|---|---|
| room_status_id | TINYINT UNSIGNED | PK, NOT NULL, AUTO_INCREMENT | Identifier of the status | BR-03 |
| name | VARCHAR(30) | NOT NULL, UNIQUE | available, occupied, being_cleaned, out_of_service | BR-03 |

## room

| Attribute | MySQL type | Constraints | Description | Rule |
|---|---|---|---|---|
| room_id | INT UNSIGNED | PK, NOT NULL, AUTO_INCREMENT | Identifier of the room | BR-01 |
| room_number | VARCHAR(10) | NOT NULL, UNIQUE | Unique room number | BR-01 |
| floor | TINYINT | NOT NULL | Floor where the room is located | BR-01 |
| room_type_id | TINYINT UNSIGNED | NOT NULL, FK to room_type, ON DELETE RESTRICT, ON UPDATE CASCADE | Type of the room | BR-01 |
| room_status_id | TINYINT UNSIGNED | NOT NULL, FK to room_status, ON DELETE RESTRICT, ON UPDATE CASCADE | Current operational status, not availability | BR-03 |
| max_capacity | TINYINT UNSIGNED | NOT NULL, CHECK (> 0) | Maximum number of guests | BR-01 |
| base_price_per_night | DECIMAL(10,2) | NOT NULL, CHECK (> 0) | Current base price per night | BR-01 |

## amenity

| Attribute | MySQL type | Constraints | Description | Rule |
|---|---|---|---|---|
| amenity_id | SMALLINT UNSIGNED | PK, NOT NULL, AUTO_INCREMENT | Identifier of the amenity | BR-02 |
| name | VARCHAR(60) | NOT NULL, UNIQUE | Sea view, balcony, bathtub... | BR-02 |

## room_amenity

| Attribute | MySQL type | Constraints | Description | Rule |
|---|---|---|---|---|
| room_id | INT UNSIGNED | PK (part), NOT NULL, FK to room, ON DELETE CASCADE, ON UPDATE CASCADE | Room that has the amenity | BR-02 |
| amenity_id | SMALLINT UNSIGNED | PK (part), NOT NULL, FK to amenity, ON DELETE CASCADE, ON UPDATE CASCADE | Amenity applied to the room | BR-02 |

## client

| Attribute | MySQL type | Constraints | Description | Rule |
|---|---|---|---|---|
| client_id | INT UNSIGNED | PK, NOT NULL, AUTO_INCREMENT | Identifier of the client | BR-09 |
| last_name | VARCHAR(60) | NOT NULL | Last name | BR-09 |
| first_name | VARCHAR(60) | NOT NULL | First name | BR-09 |
| phone | VARCHAR(20) | NOT NULL, UNIQUE | Phone number | BR-09 |
| email | VARCHAR(120) | NOT NULL, UNIQUE | Email address | BR-09 |

The reservation history is not stored here. It is obtained by query (BR-10).

## reservation

| Attribute | MySQL type | Constraints | Description | Rule |
|---|---|---|---|---|
| reservation_id | INT UNSIGNED | PK, NOT NULL, AUTO_INCREMENT | Identifier of the reservation | BR-04 |
| client_id | INT UNSIGNED | NOT NULL, FK to client, ON DELETE RESTRICT, ON UPDATE CASCADE | Single client who owns the reservation | BR-04 |
| check_in_date | DATE | NOT NULL | Shared check-in date of all rooms | BR-04 |
| check_out_date | DATE | NOT NULL, CHECK (> check_in_date) | Shared check-out date, strictly after check-in | BR-04, BR-05 |
| guest_count | TINYINT UNSIGNED | NOT NULL, CHECK (> 0), trigger against total room capacity | Number of guests | BR-05 |
| status | ENUM('pending','confirmed','cancelled','completed') | NOT NULL, DEFAULT 'pending' | Reservation status | BR-06 |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation date | BR-06 |
| cancelled_at | DATETIME | NULL, CHECK (set if and only if status is cancelled) | Cancellation date | BR-06 |

## reservation_room

| Attribute | MySQL type | Constraints | Description | Rule |
|---|---|---|---|---|
| reservation_id | INT UNSIGNED | PK (part), NOT NULL, FK to reservation, ON DELETE CASCADE, ON UPDATE CASCADE | Reservation | BR-04 |
| room_id | INT UNSIGNED | PK (part), NOT NULL, FK to room, ON DELETE RESTRICT, ON UPDATE CASCADE, trigger against overlaps | Reserved room | BR-04, BR-07 |
| nightly_price | DECIMAL(10,2) | NOT NULL, CHECK (> 0) | Price per night frozen at booking time | BR-08 |

## service

| Attribute | MySQL type | Constraints | Description | Rule |
|---|---|---|---|---|
| service_id | SMALLINT UNSIGNED | PK, NOT NULL, AUTO_INCREMENT | Identifier of the service | BR-11 |
| name | VARCHAR(80) | NOT NULL, UNIQUE | Spa, restaurant, gym... | BR-11 |
| description | VARCHAR(255) | NOT NULL | Description of the service | BR-11 |
| price | DECIMAL(10,2) | NOT NULL, CHECK (>= 0) | Price of the service | BR-11 |
| slot_duration_minutes | SMALLINT UNSIGNED | NOT NULL, CHECK (> 0) | Fixed length of a time slot | BR-11, BR-12 |
| slot_capacity | SMALLINT UNSIGNED | NOT NULL, CHECK (> 0) | Capacity per time slot | BR-11, BR-12 |

## service_opening_hours

| Attribute | MySQL type | Constraints | Description | Rule |
|---|---|---|---|---|
| service_id | SMALLINT UNSIGNED | PK (part), NOT NULL, FK to service, ON DELETE CASCADE, ON UPDATE CASCADE | Service | BR-11 |
| day_of_week | TINYINT UNSIGNED | PK (part), NOT NULL, CHECK (1 to 7) | 1 is Monday, 7 is Sunday. No row means closed | BR-11 |
| opening_time | TIME | NOT NULL | Opening time that day | BR-11 |
| closing_time | TIME | NOT NULL, CHECK (> opening_time) | Closing time that day | BR-11 |

## service_booking

| Attribute | MySQL type | Constraints | Description | Rule |
|---|---|---|---|---|
| service_booking_id | INT UNSIGNED | PK, NOT NULL, AUTO_INCREMENT | Identifier of the booking | BR-12 |
| reservation_id | INT UNSIGNED | NOT NULL, FK to reservation, ON DELETE CASCADE, ON UPDATE CASCADE | Stay during which the service is used | BR-12 |
| service_id | SMALLINT UNSIGNED | NOT NULL, FK to service, ON DELETE RESTRICT, ON UPDATE CASCADE | Booked service | BR-12 |
| booking_date | DATE | NOT NULL, trigger: within the stay | Day of the booking | BR-12 |
| start_time | TIME | NOT NULL, trigger: opening hours and slot boundary | Start of the slot | BR-12 |
| guests | SMALLINT UNSIGNED | NOT NULL, CHECK (> 0), trigger: slot capacity | Number of people booked | BR-12 |

## invoice

| Attribute | MySQL type | Constraints | Description | Rule |
|---|---|---|---|---|
| invoice_id | INT UNSIGNED | PK, NOT NULL, AUTO_INCREMENT | Identifier of the invoice | BR-13 |
| reservation_id | INT UNSIGNED | NOT NULL, UNIQUE, FK to reservation, ON DELETE RESTRICT, ON UPDATE CASCADE | Reservation that gave rise to the invoice | BR-13 |
| issue_date | DATE | NOT NULL | Date of issue | BR-13 |
| status | ENUM('due','partially_paid','paid') | NOT NULL, DEFAULT 'due' | Derived from the sum of payments, maintained by sp_record_payment | BR-15 |

## invoice_line

| Attribute | MySQL type | Constraints | Description | Rule |
|---|---|---|---|---|
| invoice_line_id | INT UNSIGNED | PK, NOT NULL, AUTO_INCREMENT | Identifier of the line | BR-13 |
| invoice_id | INT UNSIGNED | NOT NULL, FK to invoice, ON DELETE CASCADE, ON UPDATE CASCADE | Invoice of the line | BR-13 |
| line_type | ENUM('night','service','misc') | NOT NULL | Kind of line (nights, services, miscellaneous charges) | BR-13 |
| description | VARCHAR(255) | NOT NULL | Text shown on the invoice | BR-13 |
| service_booking_id | INT UNSIGNED | NULL, FK to service_booking, ON DELETE RESTRICT, ON UPDATE RESTRICT | Booking billed by a service line | BR-13 |
| quantity | INT UNSIGNED | NOT NULL, CHECK (> 0) | Quantity billed | BR-13 |
| unit_price | DECIMAL(10,2) | NOT NULL, CHECK (>= 0) | Unit price frozen at billing time | BR-13, BR-15 |
| tax_rate | DECIMAL(5,2) | NOT NULL, DEFAULT 0.00, CHECK (0 to 100) | Applicable tax rate in percent | BR-13 |

## payment

| Attribute | MySQL type | Constraints | Description | Rule |
|---|---|---|---|---|
| payment_id | INT UNSIGNED | PK, NOT NULL, AUTO_INCREMENT | Identifier of the payment | BR-14 |
| invoice_id | INT UNSIGNED | NOT NULL, FK to invoice, ON DELETE RESTRICT, ON UPDATE CASCADE | Invoice being settled | BR-14 |
| payment_date | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Date of the payment | BR-14 |
| amount | DECIMAL(12,2) | NOT NULL, CHECK (> 0) | Strictly positive amount | BR-14, BR-15 |
| method | ENUM('cash','card','mobile_money','bank_transfer') | NOT NULL | Payment method | BR-14 |

## review

| Attribute | MySQL type | Constraints | Description | Rule |
|---|---|---|---|---|
| review_id | INT UNSIGNED | PK, NOT NULL, AUTO_INCREMENT | Identifier of the review | BR-16 |
| reservation_id | INT UNSIGNED | NOT NULL, UNIQUE, FK to reservation, ON DELETE RESTRICT, ON UPDATE CASCADE, trigger: reservation completed | Single completed reservation reviewed | BR-16 |
| rating | TINYINT UNSIGNED | NOT NULL, CHECK (1 to 5) | Overall rating | BR-17 |
| comment | TEXT | NULL | Optional comment | BR-17 |
| review_date | DATE | NOT NULL, trigger: on or after check-out | Date of the review | BR-17 |