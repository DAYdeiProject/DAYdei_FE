import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Sidebar from "../layout/Sidebar";
import CalendarMain from "../components/home/calendar/CalendarMain";

export default function OtherUserPage() {
  // event 클릭시 postId
  const [detailPostId, setDetailPostId] = useState("");

  return (
    <HomePageWrapper>
      <Sidebar setDetailPostId={setDetailPostId} />
      <CalendarMain detailPostId={detailPostId} setDetailPostId={setDetailPostId} />
    </HomePageWrapper>
  );
}
const HomePageWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  height: calc(100vh - 4rem - 0.0625rem);
  position: relative;
`;
