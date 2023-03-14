import React from "react";
import styled from "styled-components";

function Sidebar() {
  return <SidebarWrapper>Sidebar</SidebarWrapper>;
}

export default Sidebar;

const SidebarWrapper = styled.div`
  background-color: ${(props) => props.theme.Bg.lightColor};
  width: 350px;
  height: 100%;
`;
