import React from "react";
import styled from "styled-components";
import SearchUsers from "../components/search/SearchUsers";
import Sidebar from "../layout/Sidebar";

export default function SearchPage() {
  return (
    <HomePageWrapper>
      <Sidebar />
      <SearchUsers />
    </HomePageWrapper>
  );
}
const HomePageWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  height: calc(100vh - 4rem - 0.0625rem);
  position: relative;
`;
