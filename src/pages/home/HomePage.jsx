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

function HomePage() {
  // 토큰 있는지 체크 -> 없을시 로그아웃
  TokenCheck();

  const navigate = useNavigate();

  useEffect(() => {
    navigate(window.location.pathname, { replace: true });
  }, [navigate]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isCalendarMainVisible, setIsCalendarMainVisible] = useState(true);
  const [isSearchUsersListVisible, setIsSearchUsersvisible] = useState(false);

  const categoryList = useSelector((state) => state.users.categoryList);
  const token = useSelector((state) => state.users.token);
  const [side, setSide] = useState(false);
  const [movePage, setMovePage] = useState(false);

  const userInfo = UserInfo();
  const params = useParams();

  // console.log("로컬에서 갖고온 id값--->", userInfo.userId);
  // console.log("useParams로 갖고온 id값-->", params.id);

  const handleShowCalendarMain = () => {
    if (userInfo.userId !== params.id) {
      navigate(`/${userInfo.userId}`);
    }

    setIsCalendarMainVisible(true);
    setIsSearchUsersvisible(false);
  };

  const handleShowFriendsListMain = () => {
    setIsCalendarMainVisible(false);
    setIsSearchUsersvisible(false);
  };

  const handleShowSearchUsers = () => {
    setIsCalendarMainVisible(false);
    setIsSearchUsersvisible(true);
  };

  useEffect(() => {
    setIsModalVisible(true);
    if (token === "" || categoryList.length !== 0) {
      setIsModalVisible(false);
    }
  }, []);

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
        <Sidebar side={side} />
        {isModalVisible && <CategoryModal CategoryModalRef={CategoryModalRef} setIsModalVisible={setIsModalVisible} />}
        {isCalendarMainVisible && <CalendarMain setSide={setSide} />}
        {!isCalendarMainVisible && !isSearchUsersListVisible && (
          <FriendsListMain handleShowCalendarMain={handleShowCalendarMain} setIsCalendarMainVisible={setIsCalendarMainVisible} />
        )}
        {isSearchUsersListVisible && <SearchUsers />}
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
  min-width: 1250px;
  max-width: 1920px;
  margin: 0 auto;
`;
