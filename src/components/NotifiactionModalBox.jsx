import styled from "styled-components";
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { __getConnect } from "../redux/modules/connectSlice";
import { GetUserInfo } from "../utils/cookie/userInfo";
import { TimeCheck } from "../utils/calendar/CalendarBasic";
import { __allClearNotification } from "../redux/modules/calendarSlice";
import { setNotificationPostId, textState } from "../redux/modules/headerReducer";
import { ReactComponent as Alert } from "../assets/defaultIcons/alert2.svg";
import { otherIdState } from "../redux/modules/usersReducer";

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
      //console.log("userid-----", userId);
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
      navigate(`/home`);
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
  top: 40px;
  right: 45px;
  z-index: 50;
  width: 334px;
  min-height: 210px;
  max-height: 419px;
  padding: 16px 14px 40px 14px;
  border: solid 1.4px #121212;
  box-shadow: 1px 1px 0 0 #000;
  border-radius: 8px;
  background-color: #ffffff;
  span {
    font-weight: normal;
  }
`;

const NotiHeaderContainer = styled.div`
  ${(props) => props.theme.FlexRowBetween};
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
  padding-right: 5px;
  span {
    font-size: 12px !important;
    color: #121212;
  }
`;

const NofiMessageContainer = styled.div`
  ${(props) => props.theme.FlexCol}
  justify-content: flex-start;
  gap: 8px;
  height: 328px;
  margin-top: 12px;
  padding-right: 5px;
  overflow-y: auto;
`;

const NofiMessageBox = styled.div`
  ${(props) => props.theme.FlexCol};
  align-items: flex-start;
  gap: 3px;
  height: 83px;
  padding: 10px;
  border-radius: 4px;
  background-color: ${(props) => (props.isRead ? props.theme.Bg.color4 : props.theme.Bg.mainColor3)};
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
