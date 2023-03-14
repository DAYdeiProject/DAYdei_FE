import { React, useState } from "react";
import Header from "../../layout/Header";
import Sidebar from "../../layout/Sidebar";
import CalendarMain from "./calendar/CalendarMain";
import FriendsListMain from "./friendslist/FriendsListMain";
import styled from "styled-components";
import getCookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { __kakaoLogin } from "../../redux/modules/kakaoSlice";
import { useEffect } from "react";

function HomePage() {
  const dispatch = useDispatch();
  let code = new URL(window.location.href).searchParams.get("code");
  console.log("홈화면 code : ", code);

  useEffect(() => {
    dispatch(__kakaoLogin(code));
  });

  const [isCalendarMainVisible, setIsCalendarMainVisible] = useState(true);

  const handleShowCalendarMain = () => {
    setIsCalendarMainVisible(true);
  };

  const handleShowFriendsListMain = () => {
    setIsCalendarMainVisible(false);
  };

  return (
    <HomePageWrapper>
      <Header handleShowCalendarMain={handleShowCalendarMain} handleShowFriendsListMain={handleShowFriendsListMain} />
      <MainWrapper>
        <Sidebar />
        {isCalendarMainVisible && <CalendarMain />}
        {!isCalendarMainVisible && <FriendsListMain />}
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
