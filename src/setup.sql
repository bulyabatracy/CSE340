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
        '2025-04-15',
        'Riverside Park'
    ),
    (
        2,
        'Homework Help Hotline',
        'Remote tutoring sessions for grades 3-8.',
        '2025-03-01',
        'Online'
    ),
    (
        3,
        'Weekend Food Drive',
        'Collecting shelf-stable meals for families.',
        '2025-05-10',
        'Community Center'
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
    (3, 4);