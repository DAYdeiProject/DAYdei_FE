import React from "react";
import styled from "styled-components";
import Sidebar from "../layout/Sidebar";
import FriendsListMain from "../components/friendslist/FriendsListMain";
import DetailPostModal from "../components/home/calendar/DetailPostModal";

export default function MyListPage() {
  return (
    <HomePageWrapper>
      <Sidebar />
      <FriendsListMain />
      <DetailPostModal />
    </HomePageWrapper>
  );
}
const HomePageWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  align-items: flex-start;
  height: calc(100vh - 4rem - 0.0625rem);
  position: relative;
`;
