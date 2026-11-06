DROP TABLE IF EXISTS project_category;
DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS organization;
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES (
        'Green Roots Alliance',
        'Community-led reforestation and urban gardening.',
        'info@greenroots.org',
        'green-roots.png'
    ),
    (
        'Bright Futures Tutoring',
        'Free after-school tutoring for at-risk youth.',
        'hello@brightfutures.org',
        'bright-futures.png'
    ),
    (
        'Open Pantry Network',
        'Food security and nutrition education.',
        'contact@openpantry.org',
        'open-pantry.png'
    );
CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES organization(organization_id),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    project_date DATE NOT NULL,
    location VARCHAR(255) NOT NULL
);
INSERT INTO project (
        organization_id,
        name,
        description,
        project_date,
        location
    )
VALUES (
        1,
        'Spring Tree Planting',
        'Planting 500 native saplings across the city.',
        '2027-04-15',
        'Riverside Park'
    ),
    (
        2,
        'Homework Help Hotline',
        'Remote tutoring sessions for grades 3-8.',
        '2027-03-01',
        'Online'
    ),
    (
        3,
        'Weekend Food Drive',
        'Collecting shelf-stable meals for families.',
        '2027-05-10',
        'Community Center'
    ),
    (
        1,
        'Neighborhood Garden Build',
        'Building raised garden beds and teaching residents how to grow vegetables.',
        '2027-05-20',
        'Eastside Community Garden'
    ),
    (
        1,
        'Riverbank Cleanup',
        'Removing litter and restoring native plants along the riverbank.',
        '2027-06-12',
        'Riverside Trail'
    ),
    (
        1,
        'Seedling Distribution Day',
        'Distributing native seedlings and care guides to local families.',
        '2027-09-18',
        'Civic Plaza'
    ),
    (
        1,
        'Community Orchard Care',
        'Pruning young fruit trees and preparing the community orchard for winter.',
        '2027-10-09',
        'Northside Orchard'
    ),
    (
        2,
        'Reading Buddies',
        'Pairing volunteer tutors with elementary students for weekly reading practice.',
        '2027-03-15',
        'Bright Futures Learning Center'
    ),
    (
        2,
        'Math Skills Workshop',
        'Small-group math coaching for middle school students.',
        '2027-04-10',
        'Bright Futures Learning Center'
    ),
    (
        2,
        'High School Study Night',
        'Providing supervised study space and volunteer help with core subjects.',
        '2027-06-05',
        'Downtown Library'
    ),
    (
        2,
        'Back-to-School Learning Fair',
        'Connecting families with tutoring resources and free learning materials.',
        '2027-08-14',
        'Civic Center'
    ),
    (
        3,
        'Fresh Produce Market',
        'Offering donated seasonal produce and nutrition information to families.',
        '2027-03-20',
        'Open Pantry Market'
    ),
    (
        3,
        'Community Meal Preparation',
        'Preparing and packaging balanced meals for neighborhood distribution.',
        '2027-04-24',
        'Community Kitchen'
    ),
    (
        3,
        'Food Access Resource Fair',
        'Helping residents connect with local food assistance and wellness services.',
        '2027-07-17',
        'Westside Community Center'
    ),
    (
        3,
        'Holiday Grocery Box Packing',
        'Packing grocery boxes with pantry staples for local households.',
        '2027-11-13',
        'Open Pantry Warehouse'
    );
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);
INSERT INTO category (name)
VALUES ('Environmental'),
    ('Educational'),
    ('Community Service'),
    ('Health and Wellness');
CREATE TABLE project_category (
    project_id INTEGER NOT NULL REFERENCES project(project_id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES category(category_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);
INSERT INTO project_category (project_id, category_id)
VALUES (1, 1),
    (1, 3),
    (2, 2),
    (3, 3),
    (3, 4),
    (4, 1),
    (4, 3),
    (5, 1),
    (5, 3),
    (6, 1),
    (6, 3),
    (7, 1),
    (7, 3),
    (8, 2),
    (8, 3),
    (9, 2),
    (9, 3),
    (10, 2),
    (10, 3),
    (11, 2),
    (11, 3),
    (12, 3),
    (12, 4),
    (13, 3),
    (13, 4),
    (14, 3),
    (14, 4),
    (15, 3),
    (15, 4);