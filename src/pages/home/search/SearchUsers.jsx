import React from "react";
import styled from "styled-components";
import { CalendarWrapper } from "../calendar/CalendarMain";
import { WholeAreaWrapper } from "../friendslist/FriendsListMain";
import UserLists from "./UserLists";

function SearchUsers() {
  return (
    <>
      <CalendarWrapper>
        <WholeAreaWrapper>
          <SearchHeader>
            <IconWrapper>
              <Icon>스포츠</Icon>
              <Icon>교육</Icon>
              <Icon>게임</Icon>
              <Icon>경제</Icon>
              <Icon>연예</Icon>
              <Icon>OTT</Icon>
            </IconWrapper>
            <SearchBarArea>
              <SearchBar type="text" placeholder="닉네임 or 이메일을 입력해 주세요"></SearchBar>
            </SearchBarArea>
          </SearchHeader>
          <SearchBody>
            <UserLists />
          </SearchBody>
        </WholeAreaWrapper>
      </CalendarWrapper>
    </>
  );
}

const SearchHeader = styled.div`
  height: 53px;
  margin-bottom: 20px !important;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* background-color: skyblue; */
`;

const IconWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
`;
const Icon = styled.button`
  width: 130px;
  height: 100%;
  margin-left: 10px;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.Bg.lightColor};
  :hover {
    background-color: ${(props) => props.theme.Bg.deepColor};
    color: ${(props) => props.theme.Bg.lightColor};
    cursor: pointer;
  }
`;

const SearchBarArea = styled.div`
  height: 100%;
  margin-left: auto;
  margin-right: 10px;
`;

const SearchBar = styled.input`
  width: 500px;
  height: 100%;
  margin-right: 0px;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.Bg.deepColor};
  padding: 0px 20px;
`;

const SearchBody = styled.div`
  max-height: 720px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  /* background-color: lightgray; */
  overflow: auto;
`;

export default SearchUsers;
