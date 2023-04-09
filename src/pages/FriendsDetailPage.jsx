import React from "react";
import styled from "styled-components";
import Sidebar from "../layout/Sidebar";
import DetailMain from "../components/friendsDetail/DetailMain";

export default function FriendsDetailPage() {
  return (
    <HomePageWrapper>
      <MainWrapper>
        <Sidebar />
        <DetailMain />
      </MainWrapper>
    </HomePageWrapper>
  );
}
const HomePageWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  margin: 0 auto;
`;
const MainWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  height: calc(100vh - 64px - 1px);
  min-width: 1350px;
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  border: 0.5px solid ${(props) => props.theme.Bg.border1};
  border-top: none;
  border-bottom: none;
`;
