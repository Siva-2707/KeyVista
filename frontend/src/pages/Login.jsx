import React, {useContext, useState} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from '../api/axiosInstace';
import { useNavigate } from 'react-router';
import AppContext from '../context/AppContext';

const Login = () => {

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required')
    });

    const [invalid, setInvalid] = useState(false);
    const navigate = useNavigate();
    const {setIsLoggedIn} = useContext(AppContext);

    const handleLogin = async (values, {setSubmitting}) => {
        try{
            const response = await axios.post('/auth/login', {"username": values.email, "password": values.password}, {auth: true});
            //Check if valid token. 

            //Get role from token and set it in context.


            localStorage.setItem('token',response.data);
            localStorage.setItem('isLoggedIn', true);
            
            setIsLoggedIn(true);
            navigate(`/listings`);
        }
        catch(err){
            console.log(err);
            setInvalid(true);
        }
        finally{
            setSubmitting(false);
        }
       
    
    }



  return (
    <div className="flex flex-column justify-between vh-100">
        <div className="basis-[92vw] flex justify-center align-items-center bg-amber-50">
            <div className="w-[40%] p-12 shadow-2xl bg-white rounded-5xl">
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                >
                    {
                        (
                            {
                                handleSubmit,
                                handleChange,
                                values,
                                touched,
                                errors,
                                isSubmitting
                            }
                        ) => (
                             <Form onSubmit={handleSubmit}>
                            {invalid  && <Form.Text>Invalid Username or Password</Form.Text>}
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
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                 type="password" 
                                 name='password' 
                                 onChange={handleChange}
                                 value={values.password}
                                 placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Logging In..." : "Login"}
                            </Button>
                        </Form>
                        )
                    }
                </Formik>
               
            </div>
        </div>
    </div>
  )
}

export default Login