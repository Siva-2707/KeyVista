import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from '../api/axiosInstace.js';
import { useNavigate } from 'react-router';


const SignUp = () => {

    const navigate = useNavigate();

    const handleSignUp = async (event) => {

        event.preventDefault();
        console.log("Login form submitted :", event);
        let userName = event.target[0].value;
        let firstName = event.target[1].value;
        let lastName = event.target[2].value;
        let password = event.target[3].value;
        let rePassword = event.target[4].value;
        let isAdmin = event.target[5].value;
        console.log("Event target: ", event.target);
        if (password !== rePassword) {
            alert("Passwords do not match!");
            return;
        }


        const response = await axios.post(
            `/auth/register`,
             {
                email : userName,
                password : password,
                firstName : firstName,
                lastName : lastName, 
                isAdmin : isAdmin == "Admin"
            }
        );

        navigate('/login');


        console.log(response);
        //Send it to backend.
        // For now, just prevent the default form submission behavior
    
    }

  return (
    <div className="flex flex-column justify-between vh-100">
        <div className="basis-[92vw] flex justify-center align-items-center bg-amber-50">
            <div className="w-[40%] p-12 shadow-2xl bg-white rounded-5xl">
                <Form onSubmit={handleSignUp}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="Enter First name" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last name" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicRePassword">
                        <Form.Label>Re-enter Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"/>
                    </Form.Group>
                     <Form.Group className="mb-3" controlId="formBasicAdmin">
                        <Form.Check type="checkbox" label="Admin" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        SignUp
                    </Button>
                </Form>
            </div>
        </div>
    </div>
  )
}

export default SignUp;