create table users
(
    userId    INT primary key auto_increment,
    username     varchar(64) not null unique,
    password  varchar(64) not null,
    name      varchar(64) not null,
    surname   varchar(64) not null,
    phone     varchar(16) not null,
    role      enum ('USER', 'ADMIN') default 'USER',
    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE orders
(
    order_id    INT AUTO_INCREMENT PRIMARY KEY,
    order_date  DATE NOT NULL,
    customer_id INT  NOT NULL,
    createdAt   timestamp default current_timestamp,
    updatedAt   timestamp default current_timestamp on update current_timestamp,
    FOREIGN KEY (customer_id) REFERENCES users (userId)
);

CREATE TABLE products
(
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(64)    NOT NULL,
    price      DECIMAL(10, 2) NOT NULL,
    createdAt  timestamp default current_timestamp,
    updatedAt  timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE order_items
(
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id      INT NOT NULL,
    product_id    INT NOT NULL,
    quantity      INT NOT NULL,
    createdAt     timestamp default current_timestamp,
    updatedAt     timestamp default current_timestamp on update current_timestamp,
    FOREIGN KEY (order_id) REFERENCES orders (order_id),
    FOREIGN KEY (product_id) REFERENCES products (product_id)
);

