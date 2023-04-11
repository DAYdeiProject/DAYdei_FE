import React from "react";
import styled from "styled-components";
import SearchUsers from "../components/search/SearchUsers";
import Sidebar from "../layout/Sidebar";
import DetailPostModal from "../components/home/calendar/DetailPostModal";
import { useSelector } from "react-redux";

export default function SearchPage() {
  const { notiInfo } = useSelector((state) => state.header);
  return (
    <HomePageWrapper>
      <Sidebar />
      <SearchUsers />
      {notiInfo && <DetailPostModal />}
    </HomePageWrapper>
  );
}
const HomePageWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  height: calc(100vh - 4rem - 0.0625rem);
  position: relative;
`;
