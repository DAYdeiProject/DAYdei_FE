import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { EventSourcePolyfill } from "event-source-polyfill";

import { __kakaoLogin } from "../../redux/modules/kakaoSlice";
import { __getConnect } from "../../redux/modules/connectSlice";
import { __getMyProfile } from "../../redux/modules/usersSlice";

import Sidebar from "../../layout/Sidebar";
import CalendarMain from "./calendar/CalendarMain";
import CategoryModal from "./category/CategoryModal";
import TokenCheck from "../../utils/cookie/tokenCheck";

const EventSource = EventSourcePolyfill;

function HomePage() {
  // 토큰 있는지 체크 -> 없을시 로그아웃
  TokenCheck();
  const navigate = useNavigate();

  //첫 로그인시 카테고리모달 보여주기 상태
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 오늘의 일정 postId
  const [detailPostId, setDetailPostId] = useState("");
  //추천 캘린더 > 시작하기 버튼 눌림 상태
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const token = useSelector((state) => state.users.token);
  const [side, setSide] = useState(false);

  const params = useParams();
  const dispatch = useDispatch();
  const id = params.id;

  const { myProfile, isError, isLoading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(__getMyProfile(id)).then((data) => {
      console.log("로그인하면서 갖고오는 내 프로필 카테고리 정보", data);
      if (data.payload.categoryList.length === 0) {
        setIsModalVisible(true);
      }
    });
  }, []);

  //console.log(isModalVisible);

  return (
    <>
      {myProfile && (
        <MainWrapper>
          <Sidebar side={side} setDetailPostId={setDetailPostId} />
          {isModalVisible && <CategoryModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} setIsButtonClicked={setIsButtonClicked} />}
          <CalendarMain side={side} setSide={setSide} detailPostId={detailPostId} setDetailPostId={setDetailPostId} />
        </MainWrapper>
      )}
    </>
  );
}

export default HomePage;

const MainWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  height: calc(100vh - 64px - 1px);
  position: relative;
  overflow: hidden;
  border: 0.5px solid ${(props) => props.theme.Bg.border1};
  border-top: none;
  border-bottom: none;
`;
