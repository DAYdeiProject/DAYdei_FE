import { React, useState } from "react";
import Header from "../../layout/Header";
import Sidebar from "../../layout/Sidebar";
import CalendarMain from "./calendar/CalendarMain";
import FriendsListMain from "./friendslist/FriendsListMain";
import styled from "styled-components";
import { __kakaoLogin } from "../../redux/modules/kakaoSlice";
import { useEffect } from "react";
import SearchUsers from "./search/SearchUsers";

function HomePage() {
  const [isCalendarMainVisible, setIsCalendarMainVisible] = useState(true);
  const [isSearchUsersListVisible, setIsSearchUsersvisible] = useState(false);

  const handleShowCalendarMain = () => {
    setIsCalendarMainVisible(true);
    setIsSearchUsersvisible(false);
  };

  const handleShowFriendsListMain = () => {
    setIsCalendarMainVisible(false);
    setIsSearchUsersvisible(false);
  };

  const handleShowSearchUsers = () => {
    setIsCalendarMainVisible(false);
    setIsSearchUsersvisible(true);
  };

  return (
    <HomePageWrapper>
      <Header
        handleShowCalendarMain={handleShowCalendarMain}
        handleShowFriendsListMain={handleShowFriendsListMain}
        handleShowSearchUsers={handleShowSearchUsers}
      />
      <MainWrapper>
        <Sidebar />
        {isCalendarMainVisible && <CalendarMain />}
        {!isCalendarMainVisible && !isSearchUsersListVisible && <FriendsListMain />}
        {isSearchUsersListVisible && <SearchUsers />}
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
