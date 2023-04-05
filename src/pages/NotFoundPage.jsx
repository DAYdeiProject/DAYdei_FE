import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/main/logo.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NotFoundPage() {
  const navigate = useNavigate();
  //const { data } = useSelector((state) => state.notFound);
  return (
    <>
      <NotFoundWrapper>
        <LogoContainer>
          <Logo width={200} height={50} />
          {/* {data ? <sapn>{data}</sapn> : <span>올바르지 않는 요청입니다.</span>} */}
          <span>올바르지 않는 요청입니다.</span>
        </LogoContainer>
        <BtnContainer>
          <button onClick={() => navigate("-1")}>뒤로가기</button>
          <button onClick={() => navigate("/")}>로그인</button>
        </BtnContainer>
      </NotFoundWrapper>
    </>
  );
}

const NotFoundWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.Bg.memoColor};
  gap: 50px;
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
  margin-bottom: 200px;
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
