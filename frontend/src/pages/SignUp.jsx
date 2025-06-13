import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const handleSignUp = (event) => {

    event.preventDefault();
    console.log("Login form submitted :", event);
    let userName = event.target[0].value;
    let password = event.target[1].value;
    let rePassword = event.target[2].value;
    if (password !== rePassword) {
        alert("Passwords do not match!");
        return;
    }
    console.log("Username:", userName, "Password:", password);

    //Send it to backend.
    // For now, just prevent the default form submission behavior
    
}

const SignUp = () => {
  return (
    <div className="flex flex-column justify-between vh-100">
        <div className='basis-[8vw]'>Header</div>
        <div className="basis-[92vw] flex justify-center align-items-center bg-amber-50">
            <div className="w-[40%] p-12 shadow-2xl bg-white rounded-5xl">
                <Form onSubmit={handleSignUp}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
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