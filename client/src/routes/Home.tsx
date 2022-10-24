import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";

const TempDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return (
    <Container>
      <TempDiv>
        <span>Welcome, {user ? user.email : "..."}</span>
        <Button variant="secondary" onClick={handleSignOut}>
          Logout
        </Button>
      </TempDiv>
    </Container>
  );
};

export default Home;
