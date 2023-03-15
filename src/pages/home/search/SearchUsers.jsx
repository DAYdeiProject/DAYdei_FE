import { React, useState } from "react";
import styled from "styled-components";
import { CalendarWrapper } from "../calendar/CalendarMain";
import { WholeAreaWrapper } from "../friendslist/FriendsListMain";
import UserLists from "./UserLists";
import { useSelector } from "react-redux";

function SearchUsers() {
  const [category, setCategory] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const RecommendList = useSelector((state) => state.friends.RecommendList);

  const filterUsers = (category) => {
    setActiveCategory(category);
    setCategory(category);
  };

  const filteredList = RecommendList.filter((item) => {
    if (category === null) {
      return true;
    }
    return item.categoryList.includes(category);
  });

  return (
    <>
      <CalendarWrapper>
        <WholeAreaWrapper>
          <SearchHeader>
            <IconWrapper>
              <Icon onClick={() => filterUsers("SPORTS")} active={activeCategory === "SPORTS"}>
                스포츠
              </Icon>
              <Icon onClick={() => filterUsers("EDUCATION")} active={activeCategory === "EDUCATION"}>
                교육
              </Icon>
              <Icon onClick={() => filterUsers("GAME")} active={activeCategory === "GAME"}>
                게임
              </Icon>
              <Icon onClick={() => filterUsers("ECONOMY")} active={activeCategory === "ECONOMY"}>
                경제
              </Icon>
              <Icon onClick={() => filterUsers("ENTERTAINMENT")} active={activeCategory === "ENTERTAINMENT"}>
                연예
              </Icon>
              <Icon onClick={() => filterUsers("OTT")} active={activeCategory === "OTT"}>
                OTT
              </Icon>
            </IconWrapper>
            <SearchBarArea>
              <SearchBar type="text" placeholder="닉네임 or 이메일을 입력해 주세요"></SearchBar>
            </SearchBarArea>
          </SearchHeader>
          <SearchBody>
            <UserLists filteredList={filteredList} />
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
  background-color: ${(props) => (props.active ? props.theme.Bg.deepColor : props.theme.Bg.lightColor)};
  color: ${(props) => (props.active ? props.theme.Bg.lightColor : props.theme.Bg.deepColor)};
  :hover {
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
  margin-top: 10px;
`;

export default SearchUsers;
