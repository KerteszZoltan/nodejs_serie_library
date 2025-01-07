import { body } from 'express-validator';
export const validateEmail = () => {
  return [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address')
  ];
};
