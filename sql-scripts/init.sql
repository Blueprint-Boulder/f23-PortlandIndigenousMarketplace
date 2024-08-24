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

CREATE VIEW vendor_full AS
    SELECT A.*, NULLIF(CONCAT(B.image_key, '.', B.file_ext), '.') AS image 
    FROM Vendors AS A  
    LEFT JOIN ProfilePictures AS B
    ON A.vendor_id = B.vendor_id;



-- Insert test vendor data
INSERT INTO Vendors (name, email, password, phone_number, website, instagram, facebook, twitter, tiktok, youtube, pinterest, is_public)
VALUES 
    ('Alice Johnson', 'alice.johnson@example.com', crypt('password1', gen_salt('bf')), '123-456-7890', 'www.alicejohnson.com', 'www.instagram.com/alicej', 'www.facebook.com/alicej', 'www.twitter.com/alicej', 'www.tiktok.com/@alicej', 'www.youtube.com/alicej', 'www.pinterest.com/alicej', TRUE),
    ('Bob Smith', 'bob.smith@example.com', crypt('password2', gen_salt('bf')), '234-567-8901', 'www.bobsmith.com', 'www.instagram.com/bobs', 'www.facebook.com/bobs', 'www.twitter.com/bobs', 'www.tiktok.com/@bobs', 'www.youtube.com/bobs', 'www.pinterest.com/bobs', TRUE),
    ('Charlie Davis', 'charlie.davis@example.com', crypt('password3', gen_salt('bf')), '345-678-9012', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE),
    ('Diana Green', 'diana.green@example.com', crypt('password4', gen_salt('bf')), '456-789-0123', 'www.dianagreen.com', 'www.instagram.com/dianag', 'www.facebook.com/dianag', 'www.twitter.com/dianag', 'www.tiktok.com/@dianag', 'www.youtube.com/dianag', 'www.pinterest.com/dianag', TRUE),
    ('Evan White', 'evan.white@example.com', crypt('password5', gen_salt('bf')), '567-890-1234', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE),
    ('Fiona Brown', 'fiona.brown@example.com', crypt('password6', gen_salt('bf')), '678-901-2345', 'www.fionabrown.com', 'www.instagram.com/fionab', 'www.facebook.com/fionab', 'www.twitter.com/fionab', 'www.tiktok.com/@fionab', 'www.youtube.com/fionab', 'www.pinterest.com/fionab', TRUE),
    ('George King', 'george.king@example.com', crypt('password7', gen_salt('bf')), '789-012-3456', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE),
    ('Hannah Lee', 'hannah.lee@example.com', crypt('password8', gen_salt('bf')), '890-123-4567', 'www.hannahlee.com', 'www.instagram.com/hannahl', 'www.facebook.com/hannahl', 'www.twitter.com/hannahl', 'www.tiktok.com/@hannahl', 'www.youtube.com/hannahl', 'www.pinterest.com/hannahl', TRUE),
    ('Isaac Moore', 'isaac.moore@example.com', crypt('password9', gen_salt('bf')), '901-234-5678', 'www.isaacmoore.com', 'www.instagram.com/isaacm', 'www.facebook.com/isaacm', 'www.twitter.com/isaacm', 'www.tiktok.com/@isaacm', 'www.youtube.com/isaacm', 'www.pinterest.com/isaacm', TRUE),
    ('Jade Wilson', 'jade.wilson@example.com', crypt('password10', gen_salt('bf')), '012-345-6789', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE),
    ('Kevin Baker', 'kevin.baker@example.com', crypt('password11', gen_salt('bf')), '112-233-4455', 'www.kevinbaker.com', 'www.instagram.com/kevinb', 'www.facebook.com/kevinb', 'www.twitter.com/kevinb', 'www.tiktok.com/@kevinb', 'www.youtube.com/kevinb', 'www.pinterest.com/kevinb', TRUE),
    ('Laura Hill', 'laura.hill@example.com', crypt('password12', gen_salt('bf')), '223-344-5566', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE),
    ('Michael Scott', 'michael.scott@example.com', crypt('password13', gen_salt('bf')), '334-455-6677', 'www.michaelscott.com', 'www.instagram.com/michaels', 'www.facebook.com/michaels', 'www.twitter.com/michaels', 'www.tiktok.com/@michaels', 'www.youtube.com/michaels', 'www.pinterest.com/michaels', TRUE),
    ('Natalie Young', 'natalie.young@example.com', crypt('password14', gen_salt('bf')), '445-566-7788', 'www.natalieyoung.com', 'www.instagram.com/nataliey', 'www.facebook.com/nataliey', 'www.twitter.com/nataliey', 'www.tiktok.com/@nataliey', 'www.youtube.com/nataliey', 'www.pinterest.com/nataliey', TRUE),
    ('Oliver Wright', 'oliver.wright@example.com', crypt('password15', gen_salt('bf')), '556-677-8899', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE),
    ('Paula Adams', 'paula.adams@example.com', crypt('password16', gen_salt('bf')), '667-788-9900', 'www.paulaadams.com', 'www.instagram.com/paulaa', 'www.facebook.com/paulaa', 'www.twitter.com/paulaa', 'www.tiktok.com/@paulaa', 'www.youtube.com/paulaa', 'www.pinterest.com/paulaa', TRUE),
    ('Quentin Brooks', 'quentin.brooks@example.com', crypt('password17', gen_salt('bf')), '778-899-0011', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE),
    ('Rachel Carter', 'rachel.carter@example.com', crypt('password18', gen_salt('bf')), '889-900-1122', 'www.rachelcarter.com', 'www.instagram.com/rachelc', 'www.facebook.com/rachelc', 'www.twitter.com/rachelc', 'www.tiktok.com/@rachelc', 'www.youtube.com/rachelc', 'www.pinterest.com/rachelc', TRUE),
    ('Samuel Turner', 'samuel.turner@example.com', crypt('password19', gen_salt('bf')), '900-011-2233', 'www.samuelturner.com', 'www.instagram.com/samuelt', 'www.facebook.com/samuelt', 'www.twitter.com/samuelt', 'www.tiktok.com/@samuelt', 'www.youtube.com/samuelt', 'www.pinterest.com/samuelt', TRUE),
    ('Tina West', 'tina.west@example.com', crypt('password20', gen_salt('bf')), '011-122-3344', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE),
    ('Uma Harris', 'uma.harris@example.com', crypt('password21', gen_salt('bf')), '122-233-4455', 'www.umaharris.com', 'www.instagram.com/umah', 'www.facebook.com/umah', 'www.twitter.com/umah', 'www.tiktok.com/@umah', 'www.youtube.com/umah', 'www.pinterest.com/umah', TRUE),
    ('Victor Evans', 'victor.evans@example.com', crypt('password22', gen_salt('bf')), '233-344-5566', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE),
    ('Wendy Roberts', 'wendy.roberts@example.com', crypt('password23', gen_salt('bf')), '344-455-6677', 'www.wendyroberts.com', 'www.instagram.com/wendyr', 'www.facebook.com/wendyr', 'www.twitter.com/wendyr', 'www.tiktok.com/@wendyr', 'www.youtube.com/wendyr', 'www.pinterest.com/wendyr', TRUE),
    ('Xavier Diaz', 'xavier.diaz@example.com', crypt('password24', gen_salt('bf')), '455-566-7788', 'www.xavierdiaz.com', 'www.instagram.com/xavierd', 'www.facebook.com/xavierd', 'www.twitter.com/xavierd', 'www.tiktok.com/@xavierd', 'www.youtube.com/xavierd', 'www.pinterest.com/xavierd', TRUE),
    ('Yvonne Grant', 'yvonne.grant@example.com', crypt('password25', gen_salt('bf')), '566-677-8899', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE),
    ('Zachary Scott', 'zachary.scott@example.com', crypt('password26', gen_salt('bf')), '677-788-9900', 'www.zacharyscott.com', 'www.instagram.com/zacharys', 'www.facebook.com/zacharys', 'www.twitter.com/zacharys', 'www.tiktok.com/@zacharys', 'www.youtube.com/zacharys', 'www.pinterest.com/zacharys', TRUE),
    ('Abigail Reed', 'abigail.reed@example.com', crypt('password27', gen_salt('bf')), '788-899-0011', 'www.abigailreed.com', 'www.instagram.com/abigailr', 'www.facebook.com/abigailr', 'www.twitter.com/abigailr', 'www.tiktok.com/@abigailr', 'www.youtube.com/abigailr', 'www.pinterest.com/abigailr', TRUE),
    ('Benjamin Cooper', 'benjamin.cooper@example.com', crypt('password28', gen_salt('bf')), '899-900-1122', 'www.benjamincooper.com', 'www.instagram.com/benjaminc', 'www.facebook.com/benjaminc', 'www.twitter.com/benjaminc', 'www.tiktok.com/@benjaminc', 'www.youtube.com/benjaminc', 'www.pinterest.com/benjaminc', TRUE),
    ('Chloe Baker', 'chloe.baker@example.com', crypt('password29', gen_salt('bf')), '900-011-2233', NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE),
    ('Daniel Brooks', 'daniel.brooks@example.com', crypt('password30', gen_salt('bf')), '011-122-3344', 'www.danielbrooks.com', 'www.instagram.com/danielb', 'www.facebook.com/danielb', 'www.twitter.com/danielb', 'www.tiktok.com/@danielb', 'www.youtube.com/danielb', 'www.pinterest.com/danielb', TRUE);


-- Insert test event data
INSERT INTO Events (name, location, starttime, endtime, description, vendorCapacity)
VALUES 
    ('Spring Fair', 'Central Park', '2024-04-01 09:00:00', '2024-04-01 18:00:00', 'A lively spring fair with various vendors.', 50),
    ('Summer Festival', 'Beachfront', '2024-06-15 10:00:00', '2024-06-15 22:00:00', 'An all-day summer festival by the beach.', 100),
    ('Autumn Market', 'Downtown', '2024-09-20 08:00:00', '2024-09-20 16:00:00', 'An autumn-themed market with seasonal goods.', 75),
    ('Winter Wonderland', 'City Square', '2024-12-05 11:00:00', '2024-12-05 20:00:00', 'A festive winter market with holiday treats.', 80),
    ('Night Bazaar', 'Riverside', '2024-07-10 18:00:00', '2024-07-10 23:00:00', 'A vibrant night bazaar with local vendors and food stalls.', 60);


-- Have each vendor request to attend events
-- Vendor 1 (Alice Johnson) - 3 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (1, 1, TRUE),
    (1, 2, NULL),
    (1, 3, FALSE);

-- Vendor 2 (Bob Smith) - 4 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (2, 2, TRUE),
    (2, 3, NULL),
    (2, 4, TRUE),
    (2, 5, FALSE);

-- Vendor 3 (Charlie Davis) - 3 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (3, 3, TRUE),
    (3, 4, NULL),
    (3, 5, TRUE);

-- Vendor 4 (Diana Green) - 4 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (4, 4, TRUE),
    (4, 5, NULL),
    (4, 1, TRUE),
    (4, 2, FALSE);

-- Vendor 5 (Evan White) - 3 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (5, 5, TRUE),
    (5, 1, NULL),
    (5, 3, TRUE);

-- Vendor 6 (Fiona Brown) - 4 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (6, 1, TRUE),
    (6, 2, NULL),
    (6, 3, TRUE),
    (6, 5, TRUE);

-- Vendor 7 (George King) - 3 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (7, 2, TRUE),
    (7, 3, NULL),
    (7, 4, TRUE);

-- Vendor 8 (Hannah Lee) - 3 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (8, 3, TRUE),
    (8, 4, NULL),
    (8, 5, TRUE);

-- Vendor 9 (Isaac Moore) - 4 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (9, 4, TRUE),
    (9, 5, NULL),
    (9, 1, TRUE),
    (9, 2, FALSE);

-- Vendor 10 (Jade Wilson) - 3 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (10, 5, TRUE),
    (10, 1, NULL),
    (10, 3, TRUE);

-- Vendor 11 (Kevin Baker) - 4 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (11, 1, TRUE),
    (11, 2, NULL),
    (11, 4, TRUE),
    (11, 5, TRUE);

-- Vendor 12 (Laura Hill) - 3 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (12, 2, TRUE),
    (12, 3, NULL),
    (12, 4, TRUE);

-- Vendor 13 (Michael Scott) - 3 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (13, 3, TRUE),
    (13, 4, NULL),
    (13, 5, TRUE);

-- Vendor 14 (Natalie Young) - 4 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (14, 4, TRUE),
    (14, 5, NULL),
    (14, 1, TRUE),
    (14, 3, FALSE);

-- Vendor 15 (Oliver Wright) - 3 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (15, 5, TRUE),
    (15, 1, NULL),
    (15, 2, TRUE);

-- Vendor 16 (Paula Adams) - 4 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (16, 1, TRUE),
    (16, 2, NULL),
    (16, 3, TRUE),
    (16, 4, FALSE);

-- Vendor 17 (Quentin Brooks) - 3 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (17, 2, TRUE),
    (17, 3, NULL),
    (17, 5, TRUE);

-- Vendor 18 (Rachel Carter) - 4 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (18, 3, TRUE),
    (18, 4, NULL),
    (18, 5, TRUE),
    (18, 1, TRUE);

-- Vendor 19 (Samuel Turner) - 3 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (19, 4, TRUE),
    (19, 5, NULL),
    (19, 2, TRUE);

-- Vendor 20 (Tina West) - 3 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (20, 5, TRUE),
    (20, 1, NULL),
    (20, 3, TRUE);

-- Vendor 21 (Uma Harris) - 4 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (21, 1, TRUE),
    (21, 2, NULL),
    (21, 4, TRUE),
    (21, 5, FALSE);

-- Vendor 22 (Victor Evans) - 3 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (22, 2, TRUE),
    (22, 3, NULL),
    (22, 4, TRUE);

-- Vendor 23 (Wendy Roberts) - 3 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (23, 3, TRUE),
    (23, 4, NULL),
    (23, 5, TRUE);

-- Vendor 24 (Xavier Diaz) - 4 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (24, 4, TRUE),
    (24, 5, NULL),
    (24, 1, TRUE),
    (24, 2, FALSE);

-- Vendor 25 (Yvonne Grant) - 3 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (25, 5, TRUE),
    (25, 1, NULL),
    (25, 3, TRUE);

-- Vendor 26 (Zachary Scott) - 4 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (26, 1, TRUE),
    (26, 2, NULL),
    (26, 3, TRUE),
    (26, 4, FALSE);

-- Vendor 27 (Abigail Reed) - 3 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (27, 2, TRUE),
    (27, 3, NULL),
    (27, 5, TRUE);

-- Vendor 28 (Benjamin Cooper) - 4 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (28, 3, TRUE),
    (28, 4, NULL),
    (28, 5, TRUE),
    (28, 1, TRUE);

-- Vendor 29 (Chloe Baker) - 3 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (29, 4, TRUE),
    (29, 5, NULL),
    (29, 2, TRUE);

-- Vendor 30 (Daniel Brooks) - 3 event requests
INSERT INTO EventRequests (vendor_id, event_id, approved)
VALUES 
    (30, 5, TRUE),
    (30, 1, NULL),
    (30, 3, TRUE);



-- Insert initial admin user - Uncomment and modify for initial setup
INSERT INTO Admins (name, email, password)
VALUES ('Admin', 'admin@pim.com', crypt('pim', gen_salt('bf')));

-- Default vendor account
INSERT INTO Vendors (name, email, password, phone_number, website, instagram, facebook, twitter, tiktok, youtube, pinterest, is_public)
VALUES ('Vendor', 'vendor@pim.com', crypt('pim', gen_salt('bf')), '111-222-3344', 'www.google.com', 'www.instagram.com', 'www.facebook.com', 'www.twitter.com', 'www.tiktok.com', 'www.youtube.com', 'www.pinterest.com', TRUE);
