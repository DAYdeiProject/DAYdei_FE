import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { otherIdState } from "../redux/modules/usersReducer";
import { __getTotalPosts } from "../redux/modules/calendarSlice";
import { ReactComponent as NotFoundImg } from "../assets/defaultIcons/notFound.svg";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const moveLoginClick = () => {
    navigate(`/home`);
    dispatch(otherIdState(""));
  };

  return (
    <>
      <NotFoundWrapper>
        <LogoContainer>
          <NotFoundImg />
        </LogoContainer>
        <BtnContainer>
          <button onClick={moveLoginClick}>홈으로 가기</button>
        </BtnContainer>
      </NotFoundWrapper>
    </>
  );
}

const NotFoundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  ${(props) => props.theme.FlexCol}
  width: 100vw;
  height: 100vh;
  gap: 3.125rem;
  z-index: 999;
`;
const LogoContainer = styled.div`
  ${(props) => props.theme.FlexCol}
  gap: 2.5rem;
  span {
    font-size: 3.125rem;
  }
`;
const BtnContainer = styled.div`
  ${(props) => props.theme.FlexRow}
  gap : 1.25rem;
  margin-bottom: 3.125rem;
  button {
    width: 9.375rem;
    height: 2.8125rem;
    font-size: 1rem;
    color: #ffffff;
    background-color: ${(props) => props.theme.Bg.color2};
    ${(props) => props.theme.BoxCustom}
    ${(props) => props.theme.BtnHoverYellow}
  }
`;
