import React from "react";
import styled from "styled-components";
import SearchUsers from "../components/search/SearchUsers";
import Sidebar from "../layout/Sidebar";
import DetailPostModal from "../components/home/calendar/DetailPostModal";

export default function SearchPage() {
  return (
    <HomePageWrapper>
      <Sidebar />
      <SearchUsers />
      <DetailPostModal />
    </HomePageWrapper>
  );
}
const HomePageWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  align-items: flex-start;
  position: relative;
  height: 100%;
`;
