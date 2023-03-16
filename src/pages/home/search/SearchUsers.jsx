import { React, useEffect, useState } from "react";
import styled from "styled-components";
import { CalendarWrapper } from "../calendar/CalendarMain";
import { WholeAreaWrapper } from "../friendslist/FriendsListMain";
import UserLists from "./UserLists";
import { useSelector, useDispatch } from "react-redux";
import { __getRecommend } from "../../../redux/modules/friendsSlice";

function SearchUsers() {
  const dispatch = useDispatch();

  useEffect(() => {
    const url = "?searchword=&category=";
    dispatch(__getRecommend(url));
  }, [dispatch]);

  const RecommendList = useSelector((state) => state.friends.RecommendList);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryClick = (category) => {
    let categories = [...selectedCategories];
    if (categories.includes(category)) {
      categories = categories.filter((c) => c !== category);
    } else {
      categories.push(category);
    }
    setSelectedCategories(categories);

    let url = "?searchword=";

    if (categories.length === 0) {
      url = "?searchword=&category=";
    }
    categories.forEach((c) => {
      url += `&category=${c}`;
    });

    console.log(url);

    dispatch(__getRecommend(url));
  };

  return (
    <>
      <CalendarWrapper>
        <WholeAreaWrapper>
          <SearchHeader>
            <IconWrapper>
              <Icon onClick={() => handleCategoryClick("sports")} className={selectedCategories.includes("sports") ? "selected" : ""}>
                스포츠
              </Icon>
              <Icon onClick={() => handleCategoryClick("education")} className={selectedCategories.includes("education") ? "selected" : ""}>
                교육
              </Icon>
              <Icon onClick={() => handleCategoryClick("game")} className={selectedCategories.includes("game") ? "selected" : ""}>
                게임
              </Icon>
              <Icon onClick={() => handleCategoryClick("economy")} className={selectedCategories.includes("economy") ? "selected" : ""}>
                경제
              </Icon>
              <Icon onClick={() => handleCategoryClick("entertainment")} className={selectedCategories.includes("entertainment") ? "selected" : ""}>
                연예
              </Icon>
              <Icon onClick={() => handleCategoryClick("ott")} className={selectedCategories.includes("ott") ? "selected" : ""}>
                OTT
              </Icon>
            </IconWrapper>
            <SearchBarArea>
              <SearchBar type="text" placeholder="닉네임 or 이메일을 입력해 주세요"></SearchBar>
            </SearchBarArea>
          </SearchHeader>
          <SearchBody>
            <UserLists RecommendList={RecommendList} />
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
  background-color: ${(props) => (props.className === "selected" ? props.theme.Bg.deepColor : props.theme.Bg.lightColor)};
  color: ${(props) => (props.className === "selected" ? props.theme.Bg.lightColor : props.theme.Bg.deepColor)};

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
