insert into users(username, password, name, surname, phone, role)
values ('admin', '$2a$10$6QWINt6ZUjpZHvqsjaGnzOCjhjtd4A7V3MFSQt8hpWvz/eEmBRF.2', 'Bangimantas', 'Ūsas',
        '+370 68957488', 'ADMIN'),
       ('user1', '$2a$10$cmMYn5YOjVEtkPHdr6.RlufL1cQChqDhdmCBMcB0sgakalnZtnOki', 'Serbentautas', 'Bordiūras',
        '+372 546 58745', 'USER'),
       ('user2', '$2a$10$RgRWX4Aayah7kiXLkgyf6eNV70yRjyNLr8pELx8ugYCK9XLI1StBe', 'Juria', 'Valenta',
        '+475 622 48799', 'USER');

INSERT INTO orders (order_date, customer_id)
VALUES ('2022-01-01', 1),
       ('2022-01-02', 2),
       ('2022-01-03', 3);

INSERT INTO products (name, price)
VALUES ('Widget', 10.00),
       ('Gadget', 25.00),
       ('Thingamabob', 5.00),
       ('Doohickey', 12.50),
       ('Whatchamacallit', 8.00),
       ('Thingamajig', 6.50);

INSERT INTO order_items (order_id, product_id, quantity)
VALUES (1, 1, 2),
       (1, 2, 1),
       (2, 3, 3),
       (2, 4, 2),
       (3, 5, 1),
       (3, 6, 4);
