import React from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import SidebarMyCalendar from "../components/SidebarMyCalendar";
import SidebarOtherCalendar from "../components/SidebarOtherCalendar";
import { GetUserInfo } from "../utils/cookie/userInfo";

function Sidebar({ ...props }) {
  const param = useParams();
  const userInfo = GetUserInfo();

  return (
    <SideStyle>
      {param.id === String(userInfo.userId) ? (
        <SidebarMyCalendar side={props.side} isCalnedar={props.isCalendarMainVisible} />
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
  border-right: 0.5px solid ${(props) => props.theme.Bg.color1};
  background: ${(props) => props.theme.Bg.color5};
  position: relative;
`;
