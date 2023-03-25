import React from "react";
import styled from "styled-components";
import ModalWrap from "./ModalWrap";

function Modal({ height, children }) {
  return (
    <ModalWrap>
      <ModalBox height={height}>
        <div>{children}</div>
      </ModalBox>
    </ModalWrap>
  );
}

Modal.defaultProps = {
  height: "575px",
};

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 85px 42px 86px 41px;

  width: 540px;
  height: ${(props) => props.height};

  background: #ffffff;
  border-radius: 16px;
`;

export default Modal;
