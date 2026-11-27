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
    validateProjectFields
};