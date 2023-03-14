import React from "react";
import Header from "../../layout/Header";
import Sidebar from "../../layout/Sidebar";
import CalendarMain from "./calendar/CalendarMain";
import styled from "styled-components";
import getCookie from "js-cookie";

function HomePage() {
  return (
    <HomePageWrapper>
      <Header />
      <MainWrapper>
        <Sidebar />
        <CalendarMain />
      </MainWrapper>
    </HomePageWrapper>
  );
}

export default HomePage;

const HomePageWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  margin: 0 auto;
`;

const MainWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  height: calc(100vh - 100px);
  min-width: 1250px;
  max-width: 1920px;
  margin: 0 auto;
`;
