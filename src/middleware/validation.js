import { body } from 'express-validator';

const validateCategoryFields = [
    body('name')
        .trim()
        .notEmpty().withMessage('Category name is required.')
        .bail()
        .isLength({ min: 3, max: 100 }).withMessage('Category name must be between 3 and 100 characters.')
];

const validateOrganizationFields = [
    body('name')
        .trim()
        .notEmpty().withMessage('Organization name is required.')
        .bail()
        .isLength({ min: 3, max: 100 }).withMessage('Organization name must be between 3 and 100 characters.'),
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required.')
        .bail()
        .isLength({ max: 5000 }).withMessage('Description must be 5000 characters or fewer.'),
    body('contact_email')
        .trim()
        .notEmpty().withMessage('Contact email is required.')
        .bail()
        .isEmail().withMessage('Enter a valid contact email.')
        .isLength({ max: 254 }).withMessage('Contact email must be 254 characters or fewer.')
];

const validateOrganizationImage = [
    body('logo_filename')
        .trim()
        .notEmpty().withMessage('Logo filename is required.')
        .bail()
        .isLength({ max: 255 }).withMessage('Logo filename must be 255 characters or fewer.')
];

const validateRegistrationFields = [
    body('firstName')
        .trim()
        .notEmpty().withMessage('First name is required.')
        .bail()
        .isLength({ min: 1, max: 50 }).withMessage('First name must be 50 characters or fewer.'),
    body('lastName')
        .trim()
        .notEmpty().withMessage('Last name is required.')
        .bail()
        .isLength({ min: 1, max: 50 }).withMessage('Last name must be 50 characters or fewer.'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required.')
        .bail()
        .isEmail().withMessage('Enter a valid email address.')
        .isLength({ max: 254 }).withMessage('Email must be 254 characters or fewer.'),
    body('password')
        .notEmpty().withMessage('Password is required.')
        .bail()
        .isLength({ min: 8, max: 128 }).withMessage('Password must be at least 8 characters.')
];

const validateLoginFields = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required.')
        .bail()
        .isEmail().withMessage('Enter a valid email address.'),
    body('password')
        .notEmpty().withMessage('Password is required.')
];

const validateCategoryAssignment = [
    body('categoryIds')
        .custom((value) => {
            if (value === undefined) return true;
            const ids = Array.isArray(value) ? value : [value];
            return ids.every(id => /^\d+$/.test(String(id)));
        }).withMessage('Select valid categories.')
];

const validateAuthFields = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required.')
        .bail()
        .isEmail().withMessage('Enter a valid email address.')
        .isLength({ max: 254 }).withMessage('Email must be 254 characters or fewer.'),
    body('password')
        .trim()
        .notEmpty().withMessage('Password is required.')
        .bail()
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
];

const validateCategoryAssignmentFields = [
    body('category_id')
        .trim()
        .notEmpty().withMessage('Category is required.')
        .bail()
        .isInt({ min: 1 }).withMessage('Select a valid category.'),
    body('project_id')
        .trim()
        .notEmpty().withMessage('Project is required.')
        .bail()
        .isInt({ min: 1 }).withMessage('Select a valid project.')
];

const validateProjectFields = [
    body('organization_id')
        .trim()
        .notEmpty().withMessage('Organization is required.')
        .bail()
        .isInt({ min: 1 }).withMessage('Select a valid organization.'),
    body('name')
        .trim()
        .notEmpty().withMessage('Project name is required.')
        .bail()
        .isLength({ min: 3, max: 100 }).withMessage('Project name must be between 3 and 100 characters.'),
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required.')
        .bail()
        .isLength({ max: 5000 }).withMessage('Description must be 5000 characters or fewer.'),
    body('project_date')
        .trim()
        .notEmpty().withMessage('Project date is required.')
        .bail()
        .isISO8601({ strict: true }).withMessage('Enter a valid project date.'),
    body('location')
        .trim()
        .notEmpty().withMessage('Location is required.')
        .bail()
        .isLength({ max: 255 }).withMessage('Location must be 255 characters or fewer.')
];

export {
    validateCategoryFields,
    validateOrganizationFields,
    validateOrganizationImage,
    validateRegistrationFields,
    validateLoginFields,
    validateCategoryAssignment,
    validateAuthFields,
    validateCategoryAssignmentFields,
    validateProjectFields
};