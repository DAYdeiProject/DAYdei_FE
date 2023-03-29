import React from "react";
import styled from "styled-components";
import ModalWrap from "./ModalWrap";

function Modal({ height, children, padding, width }) {
  return (
    <ModalWrap>
      <ModalBox height={height} padding={padding} width={width}>
        <div>{children}</div>
      </ModalBox>
    </ModalWrap>
  );
}

Modal.defaultProps = {
  width: "400px",
  height: "414px",
};

const ModalBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: 48px 38px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${(props) => props.padding};

  background: #ffffff;
  border-radius: 16px;
  /* background-color: pink; */
`;

export default Modal;
