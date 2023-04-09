import React from "react";
import styled from "styled-components";
import Sidebar from "../layout/Sidebar";
import FriendsListMain from "../components/friendslist/FriendsListMain";

export default function MyListPage() {
  return (
    <HomePageWrapper>
      <Sidebar />
      <FriendsListMain />
    </HomePageWrapper>
  );
}
const HomePageWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  align-items: flex-start;
  height: calc(100vh - 64px - 1px);
  position: relative;
`;
