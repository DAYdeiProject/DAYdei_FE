import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";

import { __getConnect } from "../redux/modules/connectSlice";
import { __getMyProfile } from "../redux/modules/usersSlice";

import Sidebar from "../layout/Sidebar";
import CalendarMain from "../components/home/calendar/CalendarMain";
import CategoryModal from "../components/home/category/CategoryModal";
import TokenCheck from "../utils/cookie/tokenCheck";
import { GetUserInfo } from "../utils/cookie/userInfo";

function HomePage() {
  // 토큰 있는지 체크 -> 없을시 로그아웃
  TokenCheck();
  //첫 로그인시 카테고리모달 보여주기 상태
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 오늘의 일정 postId
  const [detailPostId, setDetailPostId] = useState("");
  //추천 캘린더 > 시작하기 버튼 눌림 상태
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [side, setSide] = useState(false);
  const dispatch = useDispatch();
  const userInfo = GetUserInfo();

  useEffect(() => {
    dispatch(__getMyProfile(userInfo.userId)).then((data) => {
      if (data.payload.categoryList.length === 0) {
        setIsModalVisible(true);
      }
    });
  }, []);

  return (
    <>
      <MainWrapper>
        <Sidebar side={side} setDetailPostId={setDetailPostId} />
        {isModalVisible && <CategoryModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} setIsButtonClicked={setIsButtonClicked} />}
        <CalendarMain side={side} setSide={setSide} detailPostId={detailPostId} setDetailPostId={setDetailPostId} />
      </MainWrapper>
    </>
  );
}

export default HomePage;

const MainWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  height: calc(100vh - 4rem - 0.0625rem);
  position: relative;
`;
