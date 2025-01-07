
import { body } from 'express-validator';


export const validatePassword = () => {
  return [
    body('password')
      .isLength({ min: 8 }) // Ensure password is at least 8 characters long
      .withMessage('Password must be at least 8 characters long')
      .matches(/[A-Z]/) // Ensure password contains at least one uppercase letter
      .withMessage('Password must contain at least one uppercase letter')
      .matches(/[a-z]/) // Ensure password contains at least one lowercase letter
      .withMessage('Password must contain at least one lowercase letter')
      .matches(/[0-9]/) // Ensure password contains at least one number
      .withMessage('Password must contain at least one number')
      .matches(/[\W_]/) // Ensure password contains at least one special character (e.g., !@#$%^&*)
      .withMessage('Password must contain at least one special character')
  ];
};