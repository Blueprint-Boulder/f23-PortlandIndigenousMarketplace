-- Enable pgcrypto extension for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create the tables
-- Admins table
CREATE TABLE IF NOT EXISTS Admins (
    admin_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(320) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL  -- Remember to hash the passwords before storing
);

-- Vendors table
CREATE TABLE IF NOT EXISTS Vendors (
    vendor_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(31),
    website VARCHAR(2083),
    email VARCHAR(320) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL  -- Remember to hash the passwords before storing
);

-- Vendor Profile Picutres table
-- Admins do not have profile pic. 1 pic per vendor, and keys need to be unique.
-- File should be stored as image_key.file_ext in the filesystem.
CREATE TABLE IF NOT EXISTS ProfilePictures (
    vendor_id INT REFERENCES Vendors(vendor_id) NOT NULL UNIQUE,
    image_key VARCHAR(60) NOT NULL UNIQUE,
    file_ext VARCHAR(10) NOT NULL
);

-- Events table
CREATE TABLE IF NOT EXISTS Events (
    event_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(255),
    starttime TIMESTAMP NOT NULL,
    endtime TIMESTAMP NOT NULL,
    description TEXT,
    vendorCapacity INT NOT NULL
);

-- Violations table
CREATE TABLE IF NOT EXISTS Violation (
    violation_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT
);

-- Violations_to_Vendors table
CREATE TABLE IF NOT EXISTS VendorViolations (
    violation_id INT REFERENCES Violation(violation_id),
    vendor_id INT REFERENCES Vendors(vendor_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (violation_id, vendor_id)
);

-- Event_Requests table
CREATE TABLE IF NOT EXISTS EventRequests (
    request_id SERIAL PRIMARY KEY,
    vendor_id INT REFERENCES Vendors(vendor_id),
    event_id INT REFERENCES Events(event_id),
    approved BOOLEAN DEFAULT NULL,
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMP
);

-- Indexes (as per the diagram)
CREATE INDEX idx_admin_email ON Admins(email);
CREATE INDEX idx_vendor_email ON Vendors(email);

-- Insert initial admin user - Uncomment and modify for initial setup
INSERT INTO Admins (name, email, password)
VALUES ('Admin', 'admin@pim.com', crypt('pim', gen_salt('bf')));

CREATE VIEW vendor_full AS
    SELECT A.*, B.image_key, B.file_ext 
    FROM Vendors AS A 
    LEFT JOIN ProfilePictures AS B
    ON A.vendor_id = B.vendor_id;