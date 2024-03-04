import mongoose from 'mongoose';
import { body, param, validationResult, check } from 'express-validator';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../error/customError.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constant.js';
import Job from '../model/jobModel.js';
import User from '../model/UserModel.js';


const isValidMongoId = (value) => mongoose.Types.ObjectId.isValid(value);


const withValidationErrors = (validateJob) => {
  return [
    validateJob,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!isValidMongoId) {
        
        const errorMessages = errors.array().map((error) => error.msg);
        // Exclude validation error for MongoDB ObjectIDs
        if (!errorMessages.some(msg => msg.includes('job ID'))) {
          if (errorMessages[0].startsWith('no job')) {
            throw new NotFoundError(errorMessages);
          }
          throw new BadRequestError(errorMessages);
        }
      }
      next();
    },
  ];
};


// const withValidationErrors = ( validateValues) => {
//   return [
//     validateValues,
//     (req, res, next) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         const errorMessages = errors.array().map((error) => error.msg);
//         if (errorMessages[0].startsWith('no job')) {
//           throw new NotFoundError(errorMessages);
//         }
//         if (errorMessages[0].startsWith('not authorized')){
//           return next ( new UnauthorizedError("You don't have permission to access this resource"));
//         }
//         return next (new BadRequestError(errorMessages));
//       }
//       next();
//     },
//   ];
// };

export const validateJobInput = withValidationErrors([
  body('company').notEmpty().withMessage('company is required'),
  body('position').notEmpty().withMessage('position is required'),
  body('jobLocation').notEmpty().withMessage('jobLocation is required'),
  body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('invalid job status'),
  body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid job type')
]);

export const validateIdParam = withValidationErrors([
  param( 'id ').custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError('invalid MongoDB id');
    const job = await Job.findById(value);
    if (!job)
      throw new NotFoundError(`No job found for given id: ${value}`);
    console.log(req);
    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isOwner) 
    throw new UnauthorizedError("You don't have permission to access this resource");

  }),
]);

export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new BadRequestError("User already exists");
    }),
  body('password').notEmpty().withMessage('password is required').isLength({ min: 8 })
    .withMessage('password must be atleast 8 character'),
  body('location').notEmpty().withMessage('location is required'),
]);

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
  body('password').notEmpty().withMessage('password  is required'),
]);

export const validateUpdateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error('email already exists');
      }
    }),
  body('lastName').notEmpty().withMessage('last name is required'),
  body('location').notEmpty().withMessage('location is required'),
]);

