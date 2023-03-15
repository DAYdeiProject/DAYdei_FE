import React from "react";
import styled from "styled-components";
import ModalWrapper from "./ModalWrapper";

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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 85px 42px 86px 41px;

  width: 540px;
  height: 575px;

  background: #ffffff;
  border-radius: 16px;
`;

export default ModalBox;
