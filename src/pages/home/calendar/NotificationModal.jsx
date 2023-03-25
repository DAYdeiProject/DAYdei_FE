import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { __getConnect } from "../../../redux/modules/connectSlice";
import Loading from "../../../components/Loading";

export default function NotificationModal({ ...props }) {
  const dispatch = useDispatch();
  const token = Cookies.get("accessJWTToken");

  const { isNotification, isMessage } = useSelector((state) => state.calendarReducer);
  const { data, isLoading } = useSelector((state) => state.connect);
  //console.log("useSelect =====> ", data);
  //console.log("isNotification =====> ", isNotification);
  useEffect(() => {
    dispatch(__getConnect(token));
  }, [isMessage]);

  const notificationClick = (id) => {
    props.setNotificationPostId(id);
  };

  return (
    <>
      {isLoading && <Loading />}
      <NotificationWrapper isShow={isNotification}>
        <NotificationTitle>
          <span>전체 알림</span>
          <span>모두 지우기</span>
        </NotificationTitle>
        <NotificationContainer>
          {data &&
            data?.map((list) => {
              const splitContent = list.content.split("@");
              return (
                <ContentBox key={list.id} onClick={() => notificationClick({ notiId: list.id, returnId: list.returnId })}>
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
  gap: 5px;
  min-height: 60px;
  border-radius: 10px;
  padding: 15px;
  white-space: nowrap;
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
