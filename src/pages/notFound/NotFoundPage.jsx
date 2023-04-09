import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { otherIdState } from "../../redux/modules/usersReducer";
import { __getTotalPosts } from "../../redux/modules/calendarSlice";
import { ReactComponent as NotFoundImg } from "../../assets/defaultIcons/notFound.svg";

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
  gap: 50px;
  z-index: 999;
`;
const LogoContainer = styled.div`
  ${(props) => props.theme.FlexCol}
  gap: 40px;
  span {
    font-size: 50px;
  }
`;
const BtnContainer = styled.div`
  ${(props) => props.theme.FlexRow}
  gap : 20px;
  margin-bottom: 50px;
  button {
    width: 150px;
    height: 45px;
    font-size: 16px;
    ${(props) => props.theme.BoxCustom}
    ${(props) => props.theme.BtnHoverYellow}
  }
  button:nth-child(2) {
    background-color: ${(props) => props.theme.Bg.mainColor5};
    color: #ffffff;
    &:hover {
      background-color: #fbdf96;
      color: #121212;
    }
  }
`;
