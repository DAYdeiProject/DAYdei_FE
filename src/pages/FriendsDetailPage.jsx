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
  height: calc(100vh - 4rem - .0625rem);
  min-width: 84.375rem;
  max-width: 120rem;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  border: 0.0313rem solid ${(props) => props.theme.Bg.border1};
  border-top: none;
  border-bottom: none;
`;
