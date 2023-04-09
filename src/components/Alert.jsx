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
      <AlertWrapper visible={visible}>
        <div>{props.isComment}</div>
      </AlertWrapper>
    </>
  );
}

const AlertWrapper = styled.div`
  position: fixed;
  bottom: 3.125rem;
  z-index: 999;
  ${(props) => props.theme.FlexCol}
  width: 21.875rem;
  height: 2.1875rem;
  color: #ffffff;
  border-radius: 0.25rem;
  background-color: ${(props) => props.theme.Bg.color2};
  box-shadow: 0rem 0rem 0.5rem 0rem rgba(0, 0, 0, 0.438);

  /* animation */
  animation-name: slideUp;
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;

  /* ${(props) =>
    props.visible
      ? css`
          animation: slideUp 0.1s ease-out forwards;
        `
      : css`
          animation: slideDown 0.3s ease-in forwards;
        `} */

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
