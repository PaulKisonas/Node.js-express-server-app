import * as yup from 'yup';
import { RegistrationBody } from '../types';

const registrationBodyValidationSchema: yup.ObjectSchema<RegistrationBody> = yup.object({
  username: yup.string()
    .required('username is required'),

  password: yup.string()
    .required('password is required')
    .min(8, 'password must have at least 8 symbols')
    .max(32, 'password can\'t have more than 32 symbols')
    .matches(/[A-Z]{1}/, 'password must have at least one upper case letter')
    .matches(/[a-z]{1}/, 'password must have at least one lower case letter')
    .matches(/[0-9]{1}/, 'password must have at least one number')
    .matches(/[#?!@$%^&*-]{1}/, 'password must have at least special character'),

  passwordConfirmation: yup.string()
    .required('password is required')
    .oneOf([yup.ref('password')], 'passwords do not match'),

  name: yup.string()
    .required('name is required')
    .min(2, 'name must have at least 2 letters')
    .max(32, 'name can\'t have more than 32 letters'),

  surname: yup.string()
    .required('surname is required')
    .min(2, 'surname must have at least 2 letters')
    .max(32, 'surname can\'t have more than 32 letters'),

  phone: yup.string()
    .required('mobile is required')
    .min(9, 'mobile must have at least 9 letters')
    .max(32, 'mobile can\'t have more than 32 letters'),

}).strict(true);

export default registrationBodyValidationSchema;
