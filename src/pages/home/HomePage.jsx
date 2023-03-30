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
import { GetUserInfo } from "../../utils/cookie/userInfo";
import DetailMain from "./friendsDetail/DetailMain";
import { __getConnect } from "../../redux/modules/connectSlice";
import Cookies from "js-cookie";
import { EventSourcePolyfill } from "event-source-polyfill";
import NotificationModal from "./calendar/NotificationModal";

const EventSource = EventSourcePolyfill;

function HomePage() {
  // 토큰 있는지 체크 -> 없을시 로그아웃
  TokenCheck();

  const navigate = useNavigate();

  useEffect(() => {
    navigate(window.location.pathname, { replace: true });
  }, [navigate]);

  // 알림 클릭시 알림id + returnId
  const [notificationPostId, setNotificationPostId] = useState("");
  // 알림창 오픈 여부
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  //각 탭의 상태(캘린더, 친구/구독, 찾아보기, 친구의 친구/구독)
  const [isCalendarMainVisible, setIsCalendarMainVisible] = useState(true);
  const [isFriendListVisible, setIsFriendListVisible] = useState(false);
  const [isSearchUsersListVisible, setIsSearchUsersvisible] = useState(false);
  const [isFriendDetailVisible, setIsFriendDetailVisible] = useState(false);

  const categoryList = useSelector((state) => state.users.categoryList);
  const token = useSelector((state) => state.users.token);
  const [side, setSide] = useState(false);
  const [isMessageState, setIsMessageState] = useState(false);

  const userInfo = GetUserInfo();
  const params = useParams();
  const connectToken = Cookies.get("accessJWTToken");
  const [sseData, setSseData] = useState("");
  // sse
  useEffect(() => {
    const eventConnect = new EventSource(`${process.env.REACT_APP_DAYDEI_URL}/api/connect`, {
      headers: {
        Authorization: connectToken,
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
      },
      heartbeatTimeout: 3600000,
    });

    eventConnect.onmessage = async (event) => {
      const result = await event.data;
      console.log("connect ==> ", result);

      if (!result.includes("EventStream")) {
        console.log("message", result.content);
        setSseData(result);
        setIsMessageState(true);
      }
    };
    return () => eventConnect.close();
  }, []);

  // 실시간 알림창
  useEffect(() => {
    let timer;
    if (isMessageState) {
      timer = setTimeout(() => {
        setIsMessageState(false);
      }, 3000); // 4초 후 모달이 자동으로 닫힘
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isMessageState]);

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
        isNotificationOpen={isNotificationOpen}
        setIsNotificationOpen={setIsNotificationOpen}
      />
      <MainWrapper>
        <Sidebar
          side={side}
          isCalendarMainVisible={isCalendarMainVisible}
          setIsCalendarMainVisible={setIsCalendarMainVisible}
          handleShowFriendDetail={handleShowFriendDetail}
        />
        {isModalVisible && <CategoryModal CategoryModalRef={CategoryModalRef} setIsModalVisible={setIsModalVisible} />}
        {isCalendarMainVisible && (
          <CalendarMain side={side} setSide={setSide} notificationPostId={notificationPostId} setNotificationPostId={setNotificationPostId} />
        )}
        {isFriendListVisible && (
          <FriendsListMain
            handleShowCalendarMain={handleShowCalendarMain}
            setIsCalendarMainVisible={setIsCalendarMainVisible}
            setIsFriendListVisible={setIsFriendListVisible}
            setIsSearchUsersvisible={setIsSearchUsersvisible}
            setIsFriendDetailVisible={setIsFriendDetailVisible}
          />
        )}
        {isSearchUsersListVisible && (
          <SearchUsers
            setIsCalendarMainVisible={setIsCalendarMainVisible}
            setIsFriendListVisible={setIsFriendListVisible}
            setIsSearchUsersvisible={setIsSearchUsersvisible}
            setIsFriendDetailVisible={setIsFriendDetailVisible}
          />
        )}
        {isFriendDetailVisible && (
          <DetailMain
            handleShowCalendarMain={handleShowCalendarMain}
            setIsCalendarMainVisible={setIsCalendarMainVisible}
            setIsFriendListVisible={setIsFriendListVisible}
            setIsSearchUsersvisible={setIsSearchUsersvisible}
            setIsFriendDetailVisible={setIsFriendDetailVisible}
          />
        )}
        <NotificationModal
          notificationPostId={notificationPostId}
          setNotificationPostId={setNotificationPostId}
          isNotificationOpen={isNotificationOpen}
          setIsNotificationOpen={setIsNotificationOpen}
        />
        {/* <MButton onClick={() => setIsMessageState(!isMessageState)}></MButton> */}
        <MessageBox isMessage={isMessageState}>{sseData && sseData.content}</MessageBox>
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

const MessageBox = styled.div`
  position: absolute;
  bottom: 0px;
  z-index: 500;
  right: 0;
  width: 300px;
  height: 150px;
  background-color: #ffffff;
  border: 1px solid black;
  padding: 20px;
  transform: ${(props) => !props.isMessage && "transLateY(100%)"};
  transition: transform 0.5s;
`;

const MButton = styled.button`
  width: 100px;
  height: 50px;
`;
