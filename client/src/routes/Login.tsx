import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";

// STYLED COMPONENTS --------------------------->

const FormDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const FormTitle = styled.h2`
  text-align: center;
`;

const FormSubTitle = styled.p`
  text-align: center;
  margin-bottom: 1rem;
`;

const LoginForm = styled(Form)`
  min-width: 25rem;
  max-width: 25rem;

  @media (max-width: 768px) {
    min-width: 15rem;
    max-width: 15rem;
  }

  @media (max-width: 431px) {
    min-width: 5rem;
    max-width: 5rem;
  }
`;

const FormGroup = styled(Form.Group)`
  display: flex;
  flex-direction: column;
`;

const ControlDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const ErrorDiv = styled.div`
  color: red;
  max-width: 100%;
  font-style: italic;
  text-align: center;
  font-size: 0.9rem;
`;

// FUNCTIONAL COMPONENT --------------------------->

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      await signIn(email, password);
      navigate("/");
    } catch (e: any) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <Container fluid>
      <FormDiv>
        <LoginForm onSubmit={handleSignIn}>
          <FormTitle>TheBoilerPlate</FormTitle>
          <FormSubTitle>Login</FormSubTitle>
          {error ? <ErrorDiv>{error}</ErrorDiv> : null}
          <FormGroup className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
          </FormGroup>

          <FormGroup className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </FormGroup>
          <ControlDiv>
            <Form.Text className="text-muted mb-3">
              Don't have an account? <Link to="/Signup">Sign Up</Link>
            </Form.Text>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </ControlDiv>
        </LoginForm>
      </FormDiv>
    </Container>
  );
};

export default Login;
