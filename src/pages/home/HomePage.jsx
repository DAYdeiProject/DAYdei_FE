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

function HomePage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCalendarMainVisible, setIsCalendarMainVisible] = useState(true);
  const [isSearchUsersListVisible, setIsSearchUsersvisible] = useState(false);
  const categoryList = useSelector((state) => state.users.categoryList);

  const handleShowCalendarMain = () => {
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
    if (categoryList.length !== 0) {
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
        <Sidebar />
        {isModalVisible && <CategoryModal CategoryModalRef={CategoryModalRef} />}
        {isCalendarMainVisible && <CalendarMain />}
        {!isCalendarMainVisible && !isSearchUsersListVisible && <FriendsListMain />}
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
