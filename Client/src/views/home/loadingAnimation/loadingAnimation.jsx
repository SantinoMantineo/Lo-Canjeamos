import React from 'react';
import styled, { keyframes } from "styled-components";

const animation = keyframes`
  0% {
    background: yellow;
    box-shadow: 0 0 30px black;
    height: 100vh;
  }
  50%{
    background: yellow;
    box-shadow: 0 0 30px black;
    height: 100vh;
  }
  75%{
    background: black;
    box-shadow: 0 0 30px black;
    height: 100vh;
  }
  100%{
    background: black;
    box-shadow: 0 0 30px black;
    height: 0px;
  }
`;

const LoadingSliderWrapper = styled.div`
  width: 300px;
  height: 100px;
  background: black;
  position: absolute;
  box-shadow: 0 0 30px black;
  z-index: 5;
  animation: ${animation} 3s ease-in-out;
`;

const loadingAnimation = () => {
  return (
    <LoadingSliderWrapper>
    </LoadingSliderWrapper>
  );
};

export default loadingAnimation;