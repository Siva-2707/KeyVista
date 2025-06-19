import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from '../api/axiosInstace.js';
import { useNavigate } from 'react-router';

const SignUp = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Re-enter password'),
    isAdmin: Yup.boolean(),
  });

  const handleSignUp = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('/auth/register', {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        isAdmin: values.isAdmin,
      });
      console.log("Registration successful", response);
      navigate('/login');
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-column justify-between vh-100">
      <div className="basis-[92vw] flex justify-center align-items-center bg-amber-50">
        <div className="w-[40%] p-12 shadow-2xl bg-white rounded-5xl">
          <Formik
            initialValues={{
              email: '',
              firstName: '',
              lastName: '',
              password: '',
              rePassword: '',
              isAdmin: false,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSignUp}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              errors,
              isSubmitting,
              setFieldValue,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={touched.email && errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="Enter First name"
                    value={values.firstName}
                    onChange={handleChange}
                    isInvalid={touched.firstName && errors.firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Enter Last name"
                    value={values.lastName}
                    onChange={handleChange}
                    isInvalid={touched.lastName && errors.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={touched.password && errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicRePassword">
                  <Form.Label>Re-enter Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="rePassword"
                    placeholder="Password"
                    value={values.rePassword}
                    onChange={handleChange}
                    isInvalid={touched.rePassword && errors.rePassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.rePassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicAdmin">
                  <Form.Check
                    type="checkbox"
                    name="isAdmin"
                    label="Admin"
                    checked={values.isAdmin}
                    onChange={(e) => setFieldValue("isAdmin", e.target.checked)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Signing Up..." : "Sign Up"}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
