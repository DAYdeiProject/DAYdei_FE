import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import { alertState } from "../redux/modules/alertReducer";

export default function Alert({ ...props }) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(alertState({ state: false }));
      setVisible(false);
    }, 3000); //

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <AlertWrapper visible={visible} isMax={props.isMax}>
        <div>{props.isComment}</div>
      </AlertWrapper>
    </>
  );
}

const AlertWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  position: fixed;
  bottom: 3.125rem;
  left: 0;
  right: 0;
  z-index: 999;
  div {
    width: ${(props) => (props.isMax ? "28.125rem" : "21.875rem")};
    line-height: 2.1875rem;
    text-align: center;
    color: #ffffff;
    margin: 0 auto;
    border-radius: 0.25rem;
    background-color: ${(props) => props.theme.Bg.color2};
    box-shadow: 0rem 0rem 0.5rem 0rem rgba(0, 0, 0, 0.438);
  }

  /* animation */
  animation-name: slideUp;
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
  @keyframes slideDown {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }
  }
`;
