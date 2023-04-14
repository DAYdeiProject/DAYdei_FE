import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { __getMyProfile } from "../redux/modules/usersSlice";
import Header from "./Header";
import SseMessageBox from "../components/SseMessageBox";

function Layout() {
  return (
    <>
      <Wrapper>
        <MainWarpper>
          <Header />
          <Outlet />
        </MainWarpper>
        <SseMessageBox />
      </Wrapper>
    </>
  );
}

export default Layout;

const Wrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  align-items:flex-start;
  justify-content: flex-start;
  width: 100vw;
  height: 100vh;
`;

const MainWarpper = styled.div`
  ${(props) => props.theme.FlexCol}
  align-items:flex-start;
  justify-content: flex-start;
  max-width: 1920px;
  max-height: 1080px;
  margin: 0 auto;
  overflow: hidden;
`;
