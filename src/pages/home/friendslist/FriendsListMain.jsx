import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { CalendarWrapper } from "../calendar/CalendarMain";
import FriendList from "./FriendList";
import SubscribeList from "./SubscribeList";
import { __getFriendsList } from "../../../redux/modules/friendsSlice";

function FriendsListMain() {
  const dispatch = useDispatch();

  const statusCodeSubscribe = useSelector((state) => state.subscribe.statusCode);

  useEffect(() => {
    dispatch(__getFriendsList());
  }, [dispatch, statusCodeSubscribe]);

  const { FriendsList, isLoading } = useSelector((state) => state.friends);
  // console.log("로딩중 위-->", FriendsList);
  if (isLoading) {
    return <div>로딩중...</div>;
  }
  // console.log("로딩아래 -->", FriendsList);
  const friendsList = FriendsList?.friendResponseList || [];
  const subscribeList = FriendsList?.userSubscribeResponseList || [];

  return (
    <>
      <CalendarWrapper>
        <WholeAreaWrapper>
          <ListsHeader>
            <TitleText>친구 List</TitleText>
            <TitleText>구독 List</TitleText>
          </ListsHeader>
          <ListsBody>
            <ListFrame>
              <FriendList friendsList={friendsList} />
            </ListFrame>
            <ListFrame>
              <SubscribeList subscribeList={subscribeList} />
            </ListFrame>
          </ListsBody>
        </WholeAreaWrapper>
      </CalendarWrapper>
    </>
  );
}

export const WholeAreaWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ListsHeader = styled.div`
  height: 43px;
  margin-bottom: 30px !important;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const TitleText = styled.div`
  font-size: ${(props) => props.theme.Fs.mediumText};
`;

const ListsBody = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ListFrame = styled.div`
  height: 100%;
  max-height: 720px;
  overflow: auto;
  width: 49%;
  border: 1px solid ${(props) => props.theme.Bg.middleColor};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default FriendsListMain;
