import React from 'react';
import styled, { keyframes } from "styled-components";

const sideToSide = keyframes`
  0% {
    background: #ffe66d;
    box-shadow: 0 0 30px #ffe66d;
    heigth: 0px;
    opacity: 0%;
  }
  50%{
    background: white;
    box-shadow: 0 0 30px white;
    height: 67px;
    opacity: 50%;
  }
  75%{
    background: white;
    box-shadow: 0 0 30px white;
    height: 67px;
    opacity: 75%;
  }
  100%{
    background: #ffe66d;
    box-shadow: 0 0 30px #ffe66d;
    opacity: 100%;
  }
`;

const WelcomeSliderWrapper = styled.div`
  width: 250px;
  height: 0px;
  background: #ffe66d;
  position: absolute;
  box-shadow: 0 0 30px #ffe66d;
  z-index: 1000;
  animation: ${sideToSide} 2s ease-in-out;
  top: 0;
`;

const Welcome = ({userData}) => {
  return (
    <WelcomeSliderWrapper>
      <h2>{userData && userData.username}</h2>
    </WelcomeSliderWrapper>
  );
};

export default Welcome;