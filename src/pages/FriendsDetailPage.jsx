import React from "react";
import styled from "styled-components";
import Sidebar from "../layout/Sidebar";
import FriendsListMain from "../components/friendslist/FriendsListMain";

export default function FriendsDetailPage() {
  return (
    <HomePageWrapper>
      <MainWrapper>
        <Sidebar />
        <FriendsListMain />
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
  height: calc(1080px - 4rem - 0.0625rem);
  justify-content: left;
  align-items: flex-start;
  position: relative;
`;
