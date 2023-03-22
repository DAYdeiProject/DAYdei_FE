import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import SidebarMyCalendar from "../components/SidebarMyCalendar";
import SidebarOtherCalendar from "../components/SidebarOtherCalendar";
import UserInfo from "../utils/localStorage/userInfo";

function Sidebar({ side, setIsCalendarMainVisible, handleShowFriendDetail }) {
  const [userInfo, setUserInfo] = useState("");
  const param = useParams();

  //const nickName = useSelector((state) => state.users);
  // 로컬 스토리지 userInfo
  useEffect(() => {
    const userInfo = UserInfo();
    setUserInfo(userInfo);
  }, []);

  return (
    <SideStyle>
      {param.id === String(userInfo.userId) ? (
        <SidebarMyCalendar nickName={userInfo.nickName} side={side} />
      ) : (
        <SidebarOtherCalendar handleShowFriendDetail={handleShowFriendDetail} setIsCalendarMainVisible={setIsCalendarMainVisible} userId={param.id} />
      )}
    </SideStyle>
  );
}

export default Sidebar;

const SideStyle = styled.div`
  background-color: ${(props) => props.theme.Bg.lightColor};
  min-width: 350px;
  max-width: 350px;
  height: 100%;
`;
