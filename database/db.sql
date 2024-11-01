CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
-- insert some data
INSERT INTO users (name, email) VALUES ('Alice Smith', 'alice@example.com');
INSERT INTO users (name, email) VALUES ('Bob Johnson', 'bob@example.com');
INSERT INTO users (name, email) VALUES ('Charlie Brown', 'charlie@example.com');
INSERT INTO users (name, email) VALUES ('David Wilson', 'david@example.com');
INSERT INTO users (name, email) VALUES ('Eva Green', 'eva@example.com');
INSERT INTO users (name, email) VALUES ('Frank White', 'frank@example.com');
INSERT INTO users (name, email) VALUES ('Grace Black', 'grace@example.com');
INSERT INTO users (name, email) VALUES ('Hank Blue', 'hank@example.com');
INSERT INTO users (name, email) VALUES ('Ivy Red', 'ivy@example.com');
INSERT INTO users (name, email) VALUES ('Jack Grey', 'jack@example.com');
