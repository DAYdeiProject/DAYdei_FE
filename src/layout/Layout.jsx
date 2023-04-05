import React, { useEffect, useState } from "react";
import styled from "styled-components";
//import CalendarMain from "../components/calendar/CalendarMain";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NotFoundPage from "../pages/NotFoundPage";
import { __getMyProfile } from "../redux/modules/usersSlice";
import Loading from "../components/Loading";

function Layout() {
  const { myProfile, isError } = useSelector((state) => state.users);

  return (
    <>
      {myProfile && (
        <CalendarWrapper>
          <Header />
          <Outlet />
        </CalendarWrapper>
      )}
    </>
  );
}

export default Layout;

const CalendarWrapper = styled.section`
  ${(props) => props.theme.FlexCol}
`;
