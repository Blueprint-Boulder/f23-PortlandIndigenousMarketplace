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
    password VARCHAR(255) NOT NULL,  -- Remember to hash the passwords before storing
    instagram VARCHAR(255),
    facebook VARCHAR(255),
    twitter VARCHAR(255),
    tiktok VARCHAR(255),
    youtube VARCHAR(255),
    pinterest VARCHAR(255),
    is_public BOOLEAN DEFAULT FALSE
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
CREATE TABLE IF NOT EXISTS Violations (
    violation_id SERIAL PRIMARY KEY,
    type INT NOT NULL,
    description TEXT,
    vendor_id INT NOT NULL REFERENCES Vendors(vendor_id)
);

-- Event_Requests table
CREATE TABLE IF NOT EXISTS EventRequests (
    request_id SERIAL PRIMARY KEY,
    vendor_id INT REFERENCES Vendors(vendor_id),
    event_id INT REFERENCES Events(event_id),
    approved BOOLEAN DEFAULT NULL,
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMP,
    UNIQUE(vendor_id, event_id)
);

-- Indexes (as per the diagram)
CREATE INDEX idx_admin_email ON Admins(email);
CREATE INDEX idx_vendor_email ON Vendors(email);

-- Insert initial admin user - Uncomment and modify for initial setup
INSERT INTO Admins (name, email, password)

VALUES ('Admin', 'admin@pim.com', crypt('pim', gen_salt('bf')));

INSERT INTO Vendors (name, email, password, instagram, facebook, twitter, tiktok, youtube, pinterest)
VALUES ('Vendor', 'vendor@pim.com', crypt('pim', gen_salt('bf')), 'www.instagram.com', 'www.facebook.com', 'www.twitter.com', 'www.tiktok.com', 'www.youtube.com', 'www.pinterest.com');

CREATE VIEW vendor_full AS
    SELECT A.*, NULLIF(CONCAT(B.image_key, '.', B.file_ext), '.') AS image 
    FROM Vendors AS A  
    LEFT JOIN ProfilePictures AS B
    ON A.vendor_id = B.vendor_id;

