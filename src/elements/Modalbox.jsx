import React from "react";
import styled from "styled-components";
import ModalWrapper from "./Modalwrapper";

function ModalBox({ children }) {
  return (
    <ModalWrapper>
      <Modal>
        <div>{children}</div>
      </Modal>
    </ModalWrapper>
  );
}

const Modal = styled.div`
  text-align: center;
  margin: 0 auto;
  padding: 20px;
  border-radius: 20px;
  background-color: white;
`;

export default ModalBox;
