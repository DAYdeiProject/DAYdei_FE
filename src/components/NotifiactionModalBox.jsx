import styled from "styled-components";
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { __getConnect } from "../redux/modules/connectSlice";
import { GetUserInfo } from "../utils/cookie/userInfo";
import { TimeCheck } from "../utils/calendar/CalendarBasic";
import { __allClearNotification } from "../redux/modules/calendarSlice";
import { setNotificationPostId, textState, otherIdState } from "../redux/modules/headerReducer";
import { ReactComponent as Alert } from "../assets/defaultIcons/alert2.svg";

export default function NotifiactionModalBox({ ...props }) {
  const [deleteState, setDeleteState] = useState(false);
  const userInfo = GetUserInfo();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.connect);

  useEffect(() => {
    dispatch(__getConnect());
  }, [props.isNotificationOpen, deleteState]);

  console.log("알림리스트 ", data);
  // 알림에 data.notificationDtos.isRead : true/false 로 안읽은 알림이 있는지 체크
  const notiClickHandler = (postId, userId, content, notiState, isRead) => {
    if (postId === null) {
      navigate(`/other`);
      dispatch(textState(""));
      dispatch(otherIdState(userId));
      props.setIsNotificationOpen(false);
    } else if (userId === null) {
      const notiInfo = {
        postId,
        content,
        notiState,
        isRead,
      };
      //navigate(`/home`);

      dispatch(textState(""));
      dispatch(setNotificationPostId(notiInfo));
      props.setIsNotificationOpen(false);
    }
  };

  // 알림 모두 지우기
  const allClearClick = () => {
    dispatch(__allClearNotification({ userId: userInfo.userId })).then(() => {
      alert("모두 삭제되었습니다.");
      setDeleteState(true);
      //props.setIsNotificationOpen(false);
    });
  };

  return (
    <>
      <NotificationWrapper>
        <NotiHeaderContainer>
          <div>
            <span>읽지 않은 알림 </span>
            <span>{data.count}</span>
          </div>
          <AllClearBox onClick={allClearClick}>
            <span>모두 지우기</span>
          </AllClearBox>
        </NotiHeaderContainer>
        {data.notificationDtos && data?.notificationDtos.lenght !== 0 ? (
          <NofiMessageContainer>
            {data.notificationDtos.map((list) => {
              let splitContent = list.content.split("@");
              let timer = TimeCheck(list.createdAt);
              let state = "";

              if (splitContent[1].includes("일정 참여 요청이 도착") || splitContent[1].includes("수정")) {
                state = "requestPost";
              } else if (splitContent[1].includes("일정 참여 요청을 수락")) {
                state = "acceptPost";
              } else if (splitContent[1].includes("일정 참여 요청을 거절")) {
                state = "rejectPost";
              }

              return (
                <NofiMessageBox isRead={list.isRead} key={list.id} onClick={() => notiClickHandler(list.postId, list.userId, list.content, state, list.isRead)}>
                  <span>{list.notificationType}</span>
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
  top: 1.5625rem;
  right: 2.8125rem;
  z-index: 50;
  width: 20.875rem;
  min-height: 13.125rem;
  max-height: 26.1875rem;
  padding: 1rem 0.875rem 2.5rem 0.875rem;
  border: solid 0.0875rem #121212;
  box-shadow: 0.0625rem 0.0625rem 0 0 #000;
  border-radius: 0.5rem;
  background-color: #ffffff;
  span {
    font-weight: normal;
  }
`;

const NotiHeaderContainer = styled.div`
  ${(props) => props.theme.FlexRowBetween};
  padding-top: 0.3125rem;
  padding-bottom: 0.9375rem;
  border-bottom: 0.0625rem solid ${(props) => props.theme.Bg.color3};
  span:nth-child(1) {
    font-size: 1rem;
    font-weight: 600;
    padding-left: 0.3125rem;
    color: #121212;
  }
  span:nth-child(2) {
    font-size: 1rem;
    font-weight: 600;
    color: ${(props) => props.theme.Bg.mainColor5};
  }
`;

const AllClearBox = styled.div`
  padding-right: 0.3125rem;
  span {
    font-size: 0.75rem !important;
    color: #121212;
  }
`;

const NofiMessageContainer = styled.div`
  ${(props) => props.theme.FlexCol}
  justify-content: flex-start;
  gap: 0.5rem;
  height: 20.5rem;
  margin-top: 0.75rem;
  padding-right: 0.3125rem;
  overflow-y: auto;
`;

const NofiMessageBox = styled.div`
  ${(props) => props.theme.FlexCol};
  align-items: flex-start;
  gap: 0.1875rem;
  height: 5.1875rem;
  padding: 0.625rem;
  border-radius: 0.25rem;
  background-color: ${(props) => (props.isRead ? props.theme.Bg.color4 : props.theme.Bg.mainColor3)};
  &:hover {
    background-color: ${(props) => props.theme.Bg.hoverColor};
  }
  span:nth-child(1) {
    font-size: 0.625rem;
    color: ${(props) => props.theme.Bg.mainColor5};
  }
  span:nth-child(2) {
    font-size: 0.875rem;
    font-weight: 600;
    color: #121212;
  }
  span:nth-child(3) {
    font-size: 0.875rem;
    color: #121212;
  }
  span:nth-child(4) {
    font-size: 0.625rem;
    color: ${(props) => props.theme.Bg.color2};
  }
`;
