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
  width: "25rem",
  height: "25.875rem",
};

const ModalBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  display: flex;
  flex-direction: column;
  align-items: center;

  background: #ffffff;
  border-radius: 1rem;
  /* background-color: pink; */
`;

export default Modal;
