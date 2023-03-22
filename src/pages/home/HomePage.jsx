import { React, useState, useEffect, useRef } from "react";
import useOutSideClick from "../../hooks/useOutsideClick";
import Header from "../../layout/Header";
import Sidebar from "../../layout/Sidebar";
import CalendarMain from "./calendar/CalendarMain";
import FriendsListMain from "./friendslist/FriendsListMain";
import styled from "styled-components";
import { __kakaoLogin } from "../../redux/modules/kakaoSlice";
import SearchUsers from "./search/SearchUsers";
import CategoryModal from "./category/CategoryModal";
import { useSelector } from "react-redux";
import TokenCheck from "../../utils/cookie/tokenCheck";
import { useNavigate, useParams } from "react-router-dom";
import UserInfo from "../../utils/localStorage/userInfo";
import DetailMain from "./friendsDetail/DetailMain";

function HomePage() {
  // 토큰 있는지 체크 -> 없을시 로그아웃
  TokenCheck();

  const navigate = useNavigate();

  useEffect(() => {
    navigate(window.location.pathname, { replace: true });
  }, [navigate]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  //각 탭의 상태(캘린더, 친구/구독, 찾아보기, 친구의 친구/구독)
  const [isCalendarMainVisible, setIsCalendarMainVisible] = useState(true);
  const [isFriendListVisible, setIsFriendListVisible] = useState(false);
  const [isSearchUsersListVisible, setIsSearchUsersvisible] = useState(false);
  const [isFriendDetailVisible, setIsFriendDetailVisible] = useState(false);

  const categoryList = useSelector((state) => state.users.categoryList);
  const token = useSelector((state) => state.users.token);
  const [side, setSide] = useState(false);
  const [movePage, setMovePage] = useState(false);

  const userInfo = UserInfo();
  const params = useParams();

  // 홈 캘린더를 누르면 항상 로그인한 아이디의 캘린더가 나오게하기
  const handleShowCalendarMain = () => {
    if (userInfo.userId !== params.id) {
      navigate(`/${userInfo.userId}`);
    }
    setIsCalendarMainVisible(true);
    setIsFriendListVisible(false);
    setIsSearchUsersvisible(false);
    setIsFriendDetailVisible(false);
  };

  // 친구/구독 누르면 항상 로그인한 아이디의 친구/구독이 나오게하기
  const handleShowFriendsListMain = () => {
    if (userInfo.userId !== params.id) {
      navigate(`/${userInfo.userId}`);
    }
    setIsCalendarMainVisible(false);
    setIsFriendListVisible(true);
    setIsSearchUsersvisible(false);
    setIsFriendDetailVisible(false);
  };

  // 찾아보기 누르면 항상 로그인한 아이디 기준 추천목록 나오게하기
  const handleShowSearchUsers = () => {
    if (userInfo.userId !== params.id) {
      navigate(`/${userInfo.userId}`);
    }
    setIsCalendarMainVisible(false);
    setIsFriendListVisible(false);
    setIsSearchUsersvisible(true);
    setIsFriendDetailVisible(false);
  };

  // 사이드바의 친구, 구독자 누르면 친구의 친구/구독 목록이 나오게하기
  const handleShowFriendDetail = () => {
    setIsCalendarMainVisible(false);
    setIsFriendListVisible(false);
    setIsSearchUsersvisible(false);
    setIsFriendDetailVisible(true);
  };

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
      <Header
        handleShowCalendarMain={handleShowCalendarMain}
        handleShowFriendsListMain={handleShowFriendsListMain}
        handleShowSearchUsers={handleShowSearchUsers}
      />
      <MainWrapper>
        <Sidebar side={side} setIsCalendarMainVisible={setIsCalendarMainVisible} handleShowFriendDetail={handleShowFriendDetail} />
        {isModalVisible && <CategoryModal CategoryModalRef={CategoryModalRef} setIsModalVisible={setIsModalVisible} />}
        {isCalendarMainVisible && <CalendarMain side={side} setSide={setSide} />}
        {isFriendListVisible && (
          <FriendsListMain
            handleShowCalendarMain={handleShowCalendarMain}
            setIsCalendarMainVisible={setIsCalendarMainVisible}
            setIsFriendListVisible={setIsFriendListVisible}
            setIsSearchUsersvisible={setIsSearchUsersvisible}
            setIsFriendDetailVisible={setIsFriendDetailVisible}
          />
        )}
        {isSearchUsersListVisible && <SearchUsers />}
        {isFriendDetailVisible && <DetailMain />}
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
  height: calc(100vh - 100px);
  min-width: 1100px;
  max-width: 1920px;
  margin: 0 auto;
`;
