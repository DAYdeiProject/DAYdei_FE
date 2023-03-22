import React from "react";
import styled from "styled-components";

export default function CalendarSidebar() {
  return (
    <>
      <SidebarWrapper>
        <div>todo</div>
        <div>구독</div>
      </SidebarWrapper>
    </>
  );
}

const SidebarWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  justify-content: flex-start;
  //width: 500px;
  width: 50px;
  height: 100%;
  gap: 50px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.Bg.mainColor};
  cursor: pointer;
`;
