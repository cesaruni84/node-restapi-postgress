CREATE TABLE IF NOT EXISTS users (
    ID serial PRIMARY KEY,
    NAME VARCHAR(100) NOT NULL,
    EMAIL VARCHAR(50) NOT NULL UNIQUE,
    PASSWORD VARCHAR(60) NOT NULL,
    AGE INT,
    ADDRESS VARCHAR(255),
    PHONE_NUMBER VARCHAR(20),
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- insert some data
INSERT INTO users (NAME, EMAIL, PASSWORD, AGE, ADDRESS, PHONE_NUMBER) 
VALUES
('John Doe', 'john.doe@example.com', 'password123', 30, '123 Main St', '555-1234'),
('Jane Smith', 'jane.smith@example.com', 'password456', 25, '456 Elm St', '555-5678'),
('Alice Johnson', 'alice.johnson@example.com', 'password789', 28, '789 Oak St', '555-8765'),
('Bob Brown', 'bob.brown@example.com', 'password321', 35, '321 Pine St', '555-4321'),
('Charlie Davis', 'charlie.davis@example.com', 'password654', 22, '654 Maple St', '555-6789'),
('Diana Evans', 'diana.evans@example.com', 'password987', 27, '987 Birch St', '555-9876'),
('Eve Foster', 'eve.foster@example.com', 'password111', 32, '111 Cedar St', '555-1111'),
('Frank Green', 'frank.green@example.com', 'password222', 29, '222 Spruce St', '555-2222'),
('Grace Harris', 'grace.harris@example.com', 'password333', 31, '333 Willow St', '555-3333'),
('Henry Irving', 'henry.irving@example.com', 'password444', 26, '444 Ash St', '555-4444');
