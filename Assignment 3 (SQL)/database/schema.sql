CREATE TABLE Person (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255),
    location VARCHAR(255)
);

CREATE TABLE Company (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255)
);

CREATE TABLE Position (
    id BIGINT PRIMARY KEY,
    person_fk BIGINT,
    company_fk BIGINT,
    title VARCHAR(255),
    FOREIGN KEY (person_fk) REFERENCES Person(id),
    FOREIGN KEY (company_fk) REFERENCES Company(id)
);

CREATE TABLE Phone (
    id BIGINT PRIMARY KEY,
    position_fk BIGINT,
    value VARCHAR(255),
    FOREIGN KEY (position_fk) REFERENCES Position(id)
);
