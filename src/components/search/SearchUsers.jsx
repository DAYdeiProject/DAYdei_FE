import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import _ from "lodash";

import UserLists from "./UserLists";
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
      </WholeWrapper>
    </>
  );
}

export const WholeWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  height: calc(1080px - 4rem - 0.0625rem);
  max-height: calc(100vh - 4rem - 0.0625rem);

  padding: 0 40px;
  @media screen and (max-width: 1890px) {
    padding: 0 30px;
  }
  @media screen and (max-width: 1518px) {
    padding: 0 40px;
    margin-left: 25px;
  }
  @media screen and (max-width: 1290px) {
    padding-left: 30px;
  }
  @media screen and (max-width: 1040px) {
    padding-left: 20px;
  }
`;

export const WholeAreaWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 1878px) {
    width: 1380px;
  }
  @media screen and (max-width: 1780px) {
    width: 1280px;
  }
  @media screen and (max-width: 1680px) {
    width: 1100px;
  }
  @media screen and (max-width: 1518px) {
    width: 100%;
  }
`;

const HeaderText = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  gap: 1rem;
  margin-top: 3rem;
  margin-bottom: 2.25rem;
`;

const HeaderTextMain = styled.div`
  font-weight: 600;
  font-size: 1.75rem;
  line-height: 140%;
  color: ${(props) => props.theme.Bg.color1};
  min-width: 280px;
  @media screen and (max-width: 810px) {
    font-size: 23px;
    min-width: 260px;
  }
`;

const HeaderTextSub = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  width: 31.25rem;
  font-weight: 400;
  font-size: 1.125rem;
  line-height: 1.3125rem;
  color: ${(props) => props.theme.Bg.color1};
`;

const SearchHeader = styled.div`
  ${(props) => props.theme.FlexRowBetween}
  padding: 0px;
  margin-bottom: 1.75rem;

  @media screen and (max-width: 1152px) {
    width: 100%;
  }

  @media screen and (max-width: 1111.5px) {
  }
`;

const IconWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  height: 100%;
  padding: 0rem;
  gap: 0.75rem;
`;

const Icon = styled.div`
  ${(props) => props.theme.FlexRow}
  width: 6.25rem;
  height: 2.25rem;
  border: 0.0625rem solid #121212;
  border-radius: 6.1875rem;
  background-color: ${(props) => (props.className === "selected" ? props.theme.Bg.color2 : props.theme.Bg.color6)};
  color: ${(props) => (props.className === "selected" ? props.theme.Bg.color6 : props.theme.Bg.color1)};
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 140%;
  :hover {
    cursor: pointer;
  }

  @media screen and (max-width: 1680px) {
    width: 80px;
  }
  @media screen and (max-width: 1518px) {
    width: 6.25rem;
  }
  @media screen and (max-width: 11550px) {
    width: 80px;
  }
  @media screen and (max-width: 950px) {
    width: 60px;
  }
`;

const SearchBarArea = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  gap: 0.75rem;
  width: 28.125rem;
  height: 2.5rem;
  padding: 1rem 1.5rem;
  border: 0.0625rem solid #ebebeb;
  border-radius: 0.5rem;

  @media screen and (max-width: 1680px) {
    width: 350px;
  }
  @media screen and (max-width: 1518px) {
    width: 28.125rem;
  }
  @media screen and (max-width: 1155px) {
    width: 350px;
  }
  @media screen and (max-width: 950px) {
    width: 260px;
  }
`;

const SearchIcon = styled.div`
  width: 1rem;
  height: 1rem;
`;

const SearchBar = styled.input`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  padding: 0rem;
  gap: 0.5rem;
  width: 18.75rem;
  height: 1.25rem;
`;

const SearchBody = styled.div`
  width: 100%;
  //max-height: 770px;
  height: 100%;
  padding: 0 3px;
  padding-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 1.125rem;
  grid-row-gap: 1.25rem;
  overflow: auto;
  justify-items: center;

  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 1878px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media screen and (max-width: 1680px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 1518px) {
    width: 100%;
    grid-column-gap: 0.8438rem;
    grid-row-gap: 0.9375rem;
    grid-template-columns: repeat(6, 1fr);
  }
  @media screen and (max-width: 1415px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media screen and (max-width: 1225px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 950px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default SearchUsers;
