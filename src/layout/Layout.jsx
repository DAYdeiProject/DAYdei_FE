import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import { __getMyProfile } from "../redux/modules/usersSlice";

import Header from "./Header";

function Layout() {
  const { myProfile } = useSelector((state) => state.users);
  const param = useParams();
  const token = Cookies.get("accessJWTToken");
  const navigate = useNavigate();

  const errorPage = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_DAYDEI_URL}/api/home/profile/${param.id}`, {
        headers: {
          Authorization: token,
        },
      });

      if (res.data.statusCode === 400) {
        navigate(`/notfound`);
      }
    } catch (error) {
      if (error.response.data.statusCode === 404) {
        navigate(`/notfound`);
      }
    }
  };
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const isJoinPage = location.pathname === "/join";

  useEffect(() => {
    if (!isLoginPage && !isJoinPage && param.id) {
      errorPage();
    }
  }, [param, isLoginPage, isJoinPage]);

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
  width: 100vw;
  margin: 0 auto;
`;
