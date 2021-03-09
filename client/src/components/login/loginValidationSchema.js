import * as yup from 'yup'

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required!')
    .trim()
    .email(),
  password: yup
    .string()
    .required('Password is required!')
    .trim()
    .min(
      8,
      'Password must be at least 8 characters'
    ),
})

export default loginValidationSchema
