import React from "react";
import styled from "styled-components";
import Sidebar from "../layout/Sidebar";
import { useSelector } from "react-redux";
import CalendarMain from "../components/home/calendar/CalendarMain";
import FriendsListMain from "../components/friendslist/FriendsListMain";

export default function MyListPage() {
  const { otherId } = useSelector((state) => state.usersInfo);

  return (
    <HomePageWrapper>
      <Sidebar />
      {!otherId ? <FriendsListMain /> : <CalendarMain />}
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
