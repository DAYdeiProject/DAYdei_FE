import { React, useEffect, useState } from "react";
import styled from "styled-components";
import { CalendarWrapper } from "../home/calendar/CalendarMain";
import UserLists from "./UserLists";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { AiOutlineSearch } from "react-icons/ai";

function SearchUsers() {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  //유저정보 가져오기
  const myProfile = useSelector((state) => state.users.myProfile);

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
              <HeaderTextMain>{myProfile.nickName}님을 위한 추천</HeaderTextMain>
              <HeaderTextSub>회원님의 관심사에 따라 새로운 사람을 추천드려요</HeaderTextSub>
            </HeaderText>
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
  max-width:1570px;
  height: calc(100vh - 64px - 1px);
  padding-left: 10px;
  /* background: pink; */
`;

export const WholeAreaWrapper = styled.div`
  width: 1500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  height: 100vh;
  /* background-color: skyblue; */
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  margin-bottom: 36px;
  /* background-color: pink; */
`;

const HeaderTextMain = styled.div`
  font-weight: 500;
  font-size: 28px;
  line-height: 140%;
  color: ${(props) => props.theme.Bg.color1};
`;

const HeaderTextSub = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: ${(props) => props.theme.Bg.color1};
`;

const SearchHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start
  align-items: center;
  padding: 0px;
  gap: 200px;

  width: 1496px;
  margin-bottom: 28px;
   /* background-color: pink; */
`;

const IconWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 12px;
  /* background-color: green; */
`;

const Icon = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 36px;

  border: 1px solid ${(props) => props.theme.Bg.color1};
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
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 52px 16px 24px;
  gap: 12px;

  width: 450px;
  height: 40px;

  border: 1px solid #ebebeb;
  border-radius: 8px;
  margin-left: auto;
  /* background-color: skyblue; */
`;

const SearchIcon = styled.div`
  width: 16px;
  height: 16px;
`;

const SearchBar = styled.input`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  width: 261px;
  height: 20px;
`;

const SearchBody = styled.div`
  height: 700px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 18px;
  grid-row-gap: 20px;
  overflow: auto;
  justify-content: center;

  ::-webkit-scrollbar {
    display: none;
  }
  /* background-color: pink; */
`;

export default SearchUsers;
