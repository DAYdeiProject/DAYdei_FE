import React from "react";
import styled from "styled-components";
import { CalendarWrapper } from "../calendar/CalendarMain";
import FriendList from "./FriendList";
import SubscribeList from "./SubscribeList";

function FriendsListMain() {
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
              <FriendList />
            </ListFrame>
            <ListFrame>
              <SubscribeList />
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
