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
import { EventSourcePolyfill } from "event-source-polyfill";

const EventSource = EventSourcePolyfill;

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
