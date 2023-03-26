import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { __getConnect } from "../../../redux/modules/connectSlice";
import Loading from "../../../components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { __allClearNotification } from "../../../redux/modules/calendarSlice";

export default function NotificationModal({ ...props }) {
  const [notificationState, setNotificationState] = useState(false);
  const dispatch = useDispatch();
  const token = Cookies.get("accessJWTToken");
  const param = useParams();
  const navigate = useNavigate();

  const { isNotification, isMessage } = useSelector((state) => state.calendarReducer);
  const { data, isLoading } = useSelector((state) => state.connect);
  //console.log("useSelect =====> ", data);
  //console.log("isNotification =====> ", isNotification);
  useEffect(() => {
    dispatch(__getConnect(token));
  }, [isMessage, notificationState]);

  const notificationClick = (data) => {
    if (data.result === "user") {
      navigate(`/${data.returnId}`);
    } else {
      props.setNotificationPostId(data);
    }
  };

  const allClearClick = () => {
    dispatch(__allClearNotification({ token, userId: param.id })).then(() => {
      alert("모두 삭제되었습니다.");
      setNotificationState(!notificationState);
    });
  };

  return (
    <>
      {isLoading && <Loading />}
      <NotificationWrapper isShow={isNotification}>
        <NotificationTitle>
          <span>전체 알림</span>
          <button onClick={allClearClick}>모두 지우기</button>
        </NotificationTitle>
        <NotificationContainer>
          {data &&
            data?.map((list) => {
              const splitContent = list.content.split("@");
              let result = "";
              let id = "";
              let comment = "";
              if (splitContent[1].includes("일정 참여 요청이 도착") || splitContent[1].includes("수정")) {
                result = "requestPost";
                id = list.returnId;
              } else if (splitContent[1].includes("일정 참여 요청을 수락")) {
                result = "acceptPost";
                id = list.returnId;
                comment = list.content;
              } else if (splitContent[1].includes("일정 참여 요청을 거절")) {
                result = "rejectPost";
                id = list.returnId;
                comment = list.content;
              } else {
                result = "user";
                id = list.returnId;
              }
              return (
                <ContentBox key={list.id} onClick={() => notificationClick({ comment, result, notiId: list.id, returnId: list.returnId })}>
                  <div>{splitContent[0]}</div>
                  <div>{splitContent[1]}</div>
                </ContentBox>
              );
            })}
        </NotificationContainer>
      </NotificationWrapper>
    </>
  );
}

const NotificationWrapper = styled.div`
  position: absolute;
  top: 0;
  z-index: 500;
  right: -360px;
  width: 350px;
  height: 880px;
  padding: 5px;
  background-color: #ffffffff;
  box-shadow: 0px 0px 17px -5px rgba(0, 0, 0, 0.4);
  transform: ${(props) => props.isShow && "transLateX(-100%)"};
  transition: transform 0.5s;
`;

const NotificationTitle = styled.div`
  ${(props) => props.theme.FlexRowBetween}
  padding: 20px;
  padding-top: 30px;
  span:nth-child(2) {
    cursor: pointer;
  }
  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;
const NotificationContainer = styled.div`
  background-color: white;
  ${(props) => props.theme.FlexCol}
  justify-content: flex-start;
  gap: 5px;
  padding: 10px 20px;
  max-height: 720px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 20px;
`;

const ContentBox = styled.div`
  ${(props) => props.theme.FlexCol}
  align-items: flex-start;
  gap: 10px;
  min-height: 70px;
  border-radius: 10px;
  padding: 10px 20px;
  white-space: nowrap;
  font-size: ${(props) => props.theme.Fs.smallText};
  background-color: lightblue;
  &:hover {
    background-color: #bbe7bb;
    cursor: pointer;
  }
  div {
    min-width: 250px;
    overflow: hidden;
  }
`;
