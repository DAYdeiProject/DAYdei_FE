import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import SidebarMyCalendar from "../components/SidebarMyCalendar";
import SidebarOtherCalendar from "../components/SidebarOtherCalendar";
import UserInfo from "../utils/localStorage/userInfo";

function Sidebar({ ...props }) {
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
        <SidebarMyCalendar nickName={userInfo.nickName} side={props.side} isCalnedar={props.isCalendarMainVisible} />
      ) : (
        <SidebarOtherCalendar
          handleShowFriendDetail={props.handleShowFriendDetail}
          setIsCalendarMainVisible={props.setIsCalendarMainVisible}
          userId={param.id}
        />
      )}
    </SideStyle>
  );
}

export default Sidebar;

const SideStyle = styled.div`
  min-width: 350px;
  max-width: 350px;
  height: 100%;
  border-right: 0.5px solid ${(props) => props.theme.Bg.border1};
`;
