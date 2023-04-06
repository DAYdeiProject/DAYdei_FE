import { React, useState, useEffect, useRef } from "react";
import useOutSideClick from "../../hooks/useOutsideClick";
import Sidebar from "../../layout/Sidebar";
import CalendarMain from "./calendar/CalendarMain";
import styled from "styled-components";
import { __kakaoLogin } from "../../redux/modules/kakaoSlice";
import CategoryModal from "./category/CategoryModal";
import { useDispatch, useSelector } from "react-redux";
import TokenCheck from "../../utils/cookie/tokenCheck";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GetUserInfo } from "../../utils/cookie/userInfo";
import { __getConnect } from "../../redux/modules/connectSlice";
import Cookies from "js-cookie";
import { EventSourcePolyfill } from "event-source-polyfill";
import { __getMyProfile } from "../../redux/modules/usersSlice";

const EventSource = EventSourcePolyfill;

function HomePage() {
  // 토큰 있는지 체크 -> 없을시 로그아웃
  TokenCheck();
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
      const categoryList = data.payload.categoryList;
      // console.log(data.payload.categoryList);
      if (categoryList.length !== 0) {
        setIsModalVisible(false);
      } else if (categoryList.length === 0) {
        setIsModalVisible(true);
      }
    });
  }, [token]);

  // 모달 바깥 영역을 누르면 카테고리 선택 모달 닫히게 설정
  const handleCategoryModalClose = () => {
    setIsModalVisible(false);
  };

  const CategoryModalRef = useRef(null);
  useOutSideClick(CategoryModalRef, handleCategoryModalClose);

  return (
    <>
      {myProfile && (
        <MainWrapper>
          <Sidebar side={side} setDetailPostId={setDetailPostId} />
          {isModalVisible && (
            <CategoryModal CategoryModalRef={CategoryModalRef} setIsModalVisible={setIsModalVisible} setIsButtonClicked={setIsButtonClicked} />
          )}
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
