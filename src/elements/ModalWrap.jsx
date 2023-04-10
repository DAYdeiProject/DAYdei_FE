import React from "react";
import styled from "styled-components";

const ModalWrap = ({ children }) => {
  //
  return (
    <ModalOverlay>
      <ModalWrapper>{children}</ModalWrapper>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 10;
  inset: 0rem;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 25%;
  transform: translate(-50%, -50%);
`;

export default ModalWrap;
