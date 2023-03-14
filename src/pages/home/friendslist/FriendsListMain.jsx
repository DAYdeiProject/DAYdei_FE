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
          <ListsHeader>리스트 헤더입니다.</ListsHeader>
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

const WholeAreaWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ListsHeader = styled.div`
  height: 43px;
  margin-bottom: 30px !important;
`;

const ListsBody = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ListFrame = styled.div`
  height: 100%;
  max-height: 520px;
  overflow: auto;
  width: 49%;
  border: 1px solid ${(props) => props.theme.Bg.middleColor};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default FriendsListMain;
