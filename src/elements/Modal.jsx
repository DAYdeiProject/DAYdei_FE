import React from "react";
import styled from "styled-components";
import ModalWrap from "./ModalWrap";

function Modal({ height, children, padding }) {
  return (
    <ModalWrap>
      <ModalBox height={height} padding={padding}>
        <div>{children}</div>
      </ModalBox>
    </ModalWrap>
  );
}

Modal.defaultProps = {};

const ModalBox = styled.div`
  width: 400px;
  height: 414px;
  padding: 48px 38px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${(props) => props.padding};

  height: ${(props) => props.height};

  background: #ffffff;
  border-radius: 16px;
  /* background-color: pink; */
`;

export default Modal;
