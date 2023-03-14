import React from "react";
import styled from "styled-components";
import { CalendarWrapper } from "../calendar/CalendarMain";

function FriendsListMain() {
  return (
    <>
      <CalendarWrapper>
        <WholeAreaWrapper>
          <ListsHeader>리스트 헤더입니다.</ListsHeader>
          <ListsBody>
            <ListFrame>친구리스트</ListFrame>
            <ListFrame>구독리스트</ListFrame>
          </ListsBody>
        </WholeAreaWrapper>
      </CalendarWrapper>
      ;
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
  width: 49%;
`;

export default FriendsListMain;
