import * as yup from 'yup'

const signupValidationSchema = yup
  .object()
  .shape({
    title: yup.string().trim(),
    firstName: yup
      .string()
      .required('First Name is required'),
    lastName: yup
      .string()
      .required('Last Name is required'),
    roomName: yup
      .string()
      .required('Room Name is required!'),
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

    isProvider: yup
      .boolean()
      .required(
        'Please confirm that you sign up as a healthcare provider!'
      )
      .oneOf(
        [true],
        'Please confirm that you sign up as a healthcare provider'
      ),
    termsOfService: yup
      .boolean()
      .required(
        'The terms and conditions must be accepted.'
      )
      .oneOf(
        [true],
        'The terms and conditions must be accepted.'
      ),
  })

export default signupValidationSchema
