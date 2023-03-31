import { React, useState, useEffect, useRef } from "react";
import useOutSideClick from "../../hooks/useOutsideClick";
import Sidebar from "../../layout/Sidebar";
import CalendarMain from "./calendar/CalendarMain";
import styled from "styled-components";
import { __kakaoLogin } from "../../redux/modules/kakaoSlice";
import CategoryModal from "./category/CategoryModal";
import { useSelector } from "react-redux";
import TokenCheck from "../../utils/cookie/tokenCheck";
import { useNavigate, useParams } from "react-router-dom";
import { GetUserInfo } from "../../utils/cookie/userInfo";
import { __getConnect } from "../../redux/modules/connectSlice";
import Cookies from "js-cookie";

function HomePage() {
  // 토큰 있는지 체크 -> 없을시 로그아웃
  TokenCheck();

  const navigate = useNavigate();

  useEffect(() => {
    navigate(window.location.pathname, { replace: true });
  }, [navigate]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  // 오늘의 일정 postId
  const [detailPostId, setDetailPostId] = useState("");

  const categoryList = useSelector((state) => state.users.categoryList);
  const token = useSelector((state) => state.users.token);
  const [side, setSide] = useState(false);
  const [isMessageState, setIsMessageState] = useState(false);

  const connectToken = Cookies.get("accessJWTToken");

  //카테고리 선택 모달이 뜨는 기준을 제시
  useEffect(() => {
    setIsModalVisible(true);
    if (token === "" || categoryList.length !== 0) {
      setIsModalVisible(false);
    }
  }, []);

  // 모달 바깥 영역을 누르면 카테고리 선택 모달 닫히게 설정
  const handleCategoryModalClose = () => {
    setIsModalVisible(false);
  };

  const CategoryModalRef = useRef(null);
  useOutSideClick(CategoryModalRef, handleCategoryModalClose);

  return (
    <HomePageWrapper>
      <MainWrapper>
        <Sidebar side={side} setDetailPostId={setDetailPostId} />
        {isModalVisible && <CategoryModal CategoryModalRef={CategoryModalRef} setIsModalVisible={setIsModalVisible} />}
        <CalendarMain side={side} setSide={setSide} detailPostId={detailPostId} setDetailPostId={setDetailPostId} />
        {/* <MButton onClick={() => setIsMessageState(!isMessageState)}></MButton> */}
      </MainWrapper>
    </HomePageWrapper>
  );
}

export default HomePage;

const HomePageWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  margin: 0 auto;
`;

const MainWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  height: calc(100vh - 64px - 1px);
  min-width: 1350px;
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  border: 0.5px solid ${(props) => props.theme.Bg.border1};
  border-top: none;
  border-bottom: none;
`;

const MButton = styled.button`
  width: 100px;
  height: 50px;
`;
