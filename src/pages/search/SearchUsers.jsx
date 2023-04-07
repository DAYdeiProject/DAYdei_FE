import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import _ from "lodash";

import UserLists from "./UserLists";
import { CalendarWrapper } from "../friendslist/FriendsListMain";
import { AiOutlineSearch } from "react-icons/ai";

function SearchUsers() {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  //버튼 선택여부상태
  const [selected, setSelected] = useState(false);

  const handleIconClick = () => {
    setSelected(!selected);
  };

  //유저정보 가져오기
  const headerProfile = useSelector((state) => state.users.headerProfile);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  useEffect(() => {
    const throttleSearch = _.throttle(() => {
      setSearchWord(searchWord);
    }, 100);
    throttleSearch();
    return () => {
      throttleSearch.cancel();
    };
  }, [searchWord]);

  const searchHandler = (e) => {
    const value = e.target.value;
    setSearchWord(value);
  };

  const handleCategoryClick = (category) => {
    let categories = [...selectedCategories];
    if (categories.includes(category)) {
      categories = categories.filter((c) => c !== category);
    } else {
      categories.push(category);
    }
    setSelectedCategories(categories);
  };

  return (
    <>
      <WholeWrapper>
        <CalendarWrapper>
          <WholeAreaWrapper>
            <HeaderText>
              <HeaderTextMain>{headerProfile.nickName}님을 위한 추천</HeaderTextMain>
              <HeaderTextSub>회원님의 관심사에 따라 새로운 사람을 추천드려요</HeaderTextSub>
            </HeaderText>
            <SearchHeader>
              <IconWrapper>
                <Icon
                  onClick={() => {
                    handleCategoryClick("sports");
                    handleIconClick();
                  }}
                  selected={selected}
                  className={selectedCategories.includes("sports") ? "selected" : ""}>
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
                <SearchIcon>
                  <AiOutlineSearch />
                </SearchIcon>
                <SearchBar type="text" placeholder="ID, 닉네임으로 검색해보세요" value={searchWord} onChange={searchHandler}></SearchBar>
              </SearchBarArea>
            </SearchHeader>
            <SearchBody>
              <UserLists searchWord={searchWord} selectedCategories={selectedCategories} />
            </SearchBody>
          </WholeAreaWrapper>
        </CalendarWrapper>
      </WholeWrapper>
    </>
  );
}

export const WholeWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  height: calc(100vh - 64px - 1px);
`;

export const WholeAreaWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

const HeaderText = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  gap: 16px;
  margin-top: 48px;
  margin-bottom: 36px;
`;

const HeaderTextMain = styled.div`
  font-weight: 600;
  font-size: 28px;
  line-height: 140%;
  color: ${(props) => props.theme.Bg.color1};
`;

const HeaderTextSub = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  width: 500px;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: ${(props) => props.theme.Bg.color1};
`;

const SearchHeader = styled.div`
  ${(props) => props.theme.FlexRowBetween}
  padding: 0px;
  gap: 200px;
  margin-bottom: 28px;
`;

const IconWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  height: 100%;
  padding: 0px;
  gap: 12px;
`;

const Icon = styled.div`
  ${(props) => props.theme.FlexRow}
  width: 100px;
  height: 36px;
  border: 1px solid #121212;
  border-radius: 99px;
  background-color: ${(props) => (props.className === "selected" ? props.theme.Bg.color2 : props.theme.Bg.color6)};
  color: ${(props) => (props.className === "selected" ? props.theme.Bg.color6 : props.theme.Bg.color1)};
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  :hover {
    cursor: pointer;
  }
`;

const SearchBarArea = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  gap: 12px;
  width: 450px;
  height: 40px;
  padding: 16px 24px;
  border: 1px solid #ebebeb;
  border-radius: 8px;
  margin-left: auto;
`;

const SearchIcon = styled.div`
  width: 16px;
  height: 16px;
`;

const SearchBar = styled.input`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  padding: 0px;
  gap: 8px;
  width: 300px;
  height: 20px;
`;

const SearchBody = styled.div`
  width: 100%;
  height: 700px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 18px;
  grid-row-gap: 20px;
  overflow: auto;
  justify-items: center;

  ::-webkit-scrollbar {
    display: none;
  }

  /* background-color: pink; */
`;

export default SearchUsers;
