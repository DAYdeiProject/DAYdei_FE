import React from "react";
import styled from "styled-components";
import ModalWrap from "./ModalWrap";

function Modal({ children }) {
  return (
    <ModalWrap>
      <ModalBox>
        <div>{children}</div>
      </ModalBox>
    </ModalWrap>
  );
}

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 85px 42px 86px 41px;

  width: 540px;
  height: 575px;

  background: #ffffff;
  border-radius: 16px;
`;

export default Modal;
