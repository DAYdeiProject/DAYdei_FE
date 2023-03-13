import React from "react";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import CalendarMain from "../components/calendar/CalendarMain";
import styled from "styled-components";

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
  margin: 0 auto;
`;
