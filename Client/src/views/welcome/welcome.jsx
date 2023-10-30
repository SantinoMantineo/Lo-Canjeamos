import React from 'react';
import styled, { keyframes } from "styled-components";

const sideToSide = keyframes`
  0% {
    background: black;
    box-shadow: 0 0 30px black;
    height: 0px;
    margin-left: 57.5rem;
  }
  50%{
    background: black;
    box-shadow: 0 0 30px black;
    height: 650px;
    margin-left: 57.5rem;
  }
  75%{
    background: black;
    box-shadow: 0 0 30px black;
    height: 650px;
    margin-left: 57.5rem;
  }
  100%{
    background: black;
    box-shadow: 0 0 30px black;
    height: 0px;
    margin-left: 57.5rem;
  }
`;

const WelcomeSliderWrapper = styled.div`
  width: 20px;
  height: 0px;
  background: black;
  position: absolute;
  box-shadow: 0 0 30px black;
  z-index: 5;
  animation: ${sideToSide} 5s ease-in-out;
  margin-left: 57.5rem;
`;

const Welcome = () => {
  return (
    <WelcomeSliderWrapper>
    </WelcomeSliderWrapper>
  );
};

export default Welcome;