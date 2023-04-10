import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { liveNotiState } from "../redux/modules/headerReducer";
import { ReactComponent as Logo } from "../assets/main/logo.svg";

export default function SseMessageBox() {
  const dispatch = useDispatch();
  const { notiState, liveState } = useSelector((state) => state.header);

  useEffect(() => {
    if (liveState) {
      let timer;
      timer = setTimeout(() => {
        dispatch(liveNotiState(false));
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [notiState]);

  return (
    <>
      {liveState && (
        <MessageWrapper isState={liveState}>
          <MessageBox>
            <span>{notiState && notiState?.message.split("@")[0]}</span>
            <span>{notiState && notiState?.message.split("@")[1]}</span>
          </MessageBox>
          <LogoBox>
            <Logo className="logoIcon" />
          </LogoBox>
        </MessageWrapper>
      )}
    </>
  );
}

const MessageWrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 500;
  ${(props) => props.theme.FlexCol};
  justify-content: space-between;
  width: 15.625rem;
  height: 8.125rem;
  padding: 0.9375rem;
  border: 0.0625rem solid ${(props) => props.theme.Bg.color3};
  border-radius: 0.5rem 0.5rem 0 0;
  background-color: #ffffff;

  ${(props) =>
    props.isState
      ? css`
          animation: slideUp 0.1s ease-out forwards;
        `
      : css`
          animation: slideDown 0.3s ease-in forwards;
        `}
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

const MessageBox = styled.div`
  ${(props) => props.theme.FlexCol};
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5rem;
  span {
    font-size: 1rem;
  }
  span:nth-child(1) {
    font-weight: 600;
  }
`;
const LogoBox = styled.div`
  ${(props) => props.theme.FlexCol};
  align-items: flex-end;
  .logoIcon {
    width: 4.375rem;
  }
`;
