import { React, useEffect, useState } from "react";
import styled from "styled-components";
import { CalendarWrapper } from "../calendar/CalendarMain";
// import { WholeAreaWrapper } from "../friendslist/FriendsListMain";
import UserLists from "./UserLists";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { AiOutlineSearch } from "react-icons/ai";

function SearchUsers() {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

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
      <CalendarWrapper>
        <WholeAreaWrapper>
          <HeaderText>
            <HeaderTextMain>{userInfo.nickName}님을 위한 추천</HeaderTextMain>
            <HeaderTextSub>회원님의 관심사에 따라 새로운 사람을 추천드려요</HeaderTextSub>
          </HeaderText>
          <SearchHeader>
            <IconWrapper>
              <Icon>전체보기</Icon>
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
            <UserLists searchWord={searchWord} selectedCategories={selectedCategories} dispatch={dispatch} />
          </SearchBody>
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

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  /* background-color: pink; */

  /* position: absolute; */
  /* width: 354px; */
  height: 68px;
  left: 399px;
  top: 152.5px;
  margin-bottom: 56px;
`;

const HeaderTextMain = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;
  /* background-color: pink; */

  /* width: 256px; */
  height: 39px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 140%;

  color: #121212;
`;

const HeaderTextSub = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;

  height: 21px;
  /* background-color: skyblue; */

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;

  color: #121212;
`;

const SearchHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 165px;

  /* position: absolute; */
  width: 1476px;
  height: 40px;
  left: 399px;
  top: 276.5px;
  /* background-color: skyblue; */
  margin-bottom: 32px;
`;

const IconWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  /* background-color: green; */

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 7.97px;

  width: 673.81px;
  height: 36px;
`;
const Icon = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px 25px;
  /* width: 99px; */
  height: 36px;
  text-align: center;

  border: 0.689005px solid #626262;
  border-radius: 99px;

  border: 1px solid ${(props) => props.theme.Bg.lightColor};
  background-color: ${(props) => (props.className === "selected" ? props.theme.Bg.deepColor : props.theme.Bg.lightColor)};
  color: ${(props) => (props.className === "selected" ? props.theme.Bg.lightColor : props.theme.Bg.deepColor)};
  :hover {
    cursor: pointer;
  }

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
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
  max-height: 720px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 14px;
  grid-row-gap: 24px;
  overflow: auto;
  margin-top: 10px;

  padding: 0px;

  /* position: absolute; */
  width: 1460px;
  height: 936px;
  left: 401px;
  top: 348.5px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default SearchUsers;
