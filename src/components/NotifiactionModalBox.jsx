import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { __getConnect } from "../redux/modules/connectSlice";
import Loading from "./Loading";
import { ReactComponent as Alert } from "../assets/lcon/alert2.svg";
import { TimeCheck } from "../pages/home/calendar/CalendarBasic";
import { useNavigate } from "react-router-dom";
import { setNotificationPostId } from "../redux/modules/headerReducer";

export default function NotifiactionModalBox({ ...props }) {
  const token = Cookies.get("accessJWTToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading } = useSelector((state) => state.connect);

  useEffect(() => {
    dispatch(__getConnect(token));
  }, [props.isNotificationOpen]);

  //console.log("알림리스트 ", data);
  // 알림에 data.notificationDtos.isRead : true/false 로 안읽은 알림이 있는지 체크

  const notiClickHandler = (postId, userId, content, notiState) => {
    if (postId === null) {
      navigate(`/${userId}`);
      props.setIsNotificationOpen(false);
    } else {
      dispatch(setNotificationPostId({ postId, content, notiState }));
      props.setIsNotificationOpen(false);
    }
    //console.log("post", postId);
    //console.log("user", userId);
  };

  return (
    <>
      {isLoading && <Loading />}
      <NotificationWrapper>
        <NotiHeaderContainer>
          <div>
            <span>읽지 않은 알림</span>
            <span>{data.count}</span>
          </div>
          <AllClearBox>
            <span>모두 지우기</span>
          </AllClearBox>
        </NotiHeaderContainer>
        {data.notificationDtos && data?.notificationDtos.lenght !== 0 ? (
          <NofiMessageContainer>
            {data.notificationDtos.map((list) => {
              let splitContent = list.content.split("@");
              let timer = TimeCheck(list.createdAt);
              let state = "";
              //let contentHtml = `${splitContent[0]}${splitContent[1]}`;

              if (splitContent[1].includes("일정 참여 요청이 도착") || splitContent[1].includes("수정")) {
                state = "requestPost";
              } else if (splitContent[1].includes("일정 참여 요청을 수락")) {
                state = "acceptPost";
              } else if (splitContent[1].includes("일정 참여 요청을 거절")) {
                state = "rejectPost";
              }
              return (
                <NofiMessageBox key={list.id} onClick={() => notiClickHandler(list.postId, list.userId, list.content, state)}>
                  <span>구독알림</span>
                  <span>{splitContent[0]}</span>
                  <span>{splitContent[1]}</span>
                  <span>{timer}</span>
                </NofiMessageBox>
              );
            })}
          </NofiMessageContainer>
        ) : (
          <div>
            <Alert />
            <span>새로운 알림이 없습니다.</span>
          </div>
        )}
      </NotificationWrapper>
    </>
  );
}

const NotificationWrapper = styled.div`
  position: absolute;
  top: 40px;
  right: 45px;
  z-index: 50;
  width: 334px;
  min-height: 210px;
  max-height: 419px;
  padding: 16px 14px 40px 14px;
  border: solid 1.4px #121212;
  box-shadow: 2px 2px 0 0 #000;
  border-radius: 8px;
  background-color: #ffffff;
  span {
    font-weight: normal;
  }
`;

const NotiHeaderContainer = styled.div`
  ${(props) => props.theme.FlexRowBetween};
  justify-content: left;
  gap: 5px;
  padding-top: 5px;
  padding-bottom: 15px;
  border-bottom: 1px solid ${(props) => props.theme.Bg.color3};
  span:nth-child(1) {
    font-size: 16px;
    font-weight: 600;
    padding-left: 5px;
    color: #121212;
  }
  span:nth-child(2) {
    font-size: 16px;
    font-weight: 600;
    color: ${(props) => props.theme.Bg.mainColor5};
  }
`;

const AllClearBox = styled.div`
  span {
    font-size: 12px !important;
    color: #121212;
  }
`;

const NofiMessageContainer = styled.div`
  ${(props) => props.theme.FlexCol}
  justify-content: flex-start;
  gap: 12px;
  height: 328px;
  margin-top: 12px;
  overflow-y: auto;
`;

const NofiMessageBox = styled.div`
  ${(props) => props.theme.FlexCol};
  align-items: flex-start;
  gap: 3px;
  height: 72px;
  padding: 10px;
  border-radius: 4px;
  &:hover {
    background-color: ${(props) => props.theme.Bg.hoverColor};
  }
  span:nth-child(1) {
    font-size: 10px;
    color: ${(props) => props.theme.Bg.mainColor5};
  }
  span:nth-child(2) {
    font-size: 14px;
    font-weight: 600;
    color: #121212;
  }
  span:nth-child(3) {
    font-size: 14px;
    color: #121212;
  }
  span:nth-child(4) {
    font-size: 10px;
    color: ${(props) => props.theme.Bg.color2};
  }
`;
