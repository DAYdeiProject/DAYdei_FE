import { React, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { BiBell } from "react-icons/bi";
import useOutSideClick from "../hooks/useOutsideClick";

function Header(props) {
  const navigate = useNavigate();
  const { handleShowCalendarMain, handleShowFriendsListMain, handleShowSearchUsers } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  const DropdownRef = useRef(null);
  useOutSideClick(DropdownRef, handleDropdownClose);

  const [userInfo, setUserInfo] = useState({ nickName: "", email: "" });

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    Cookies.remove("accessJWTToken");

    if (!Cookies.get("accessJWTToken")) {
      alert("로그아웃 되었습니다.");
      navigate("/");
    }
  };

  return (
    <HeaderWrapper>
      <LogoContainer>
        <span>DAY DEI</span>
      </LogoContainer>
      <NavContainer>
        <NavTabConatiner>
          <div onClick={handleShowCalendarMain}>
            <span>홈 캘린더</span>
          </div>
          <div onClick={handleShowFriendsListMain}>
            <span>친구/구독</span>
          </div>
          <div onClick={handleShowSearchUsers}>
            <span>찾아보기</span>
          </div>
        </NavTabConatiner>
        <NavUserConatiner>
          <IconWrapper>
            <BiBell size={31} />
          </IconWrapper>
          <IconWrapper ref={DropdownRef}>
            <Image onClick={handleDropdown} />
            {isDropdownOpen && (
              <DropdownFrame>
                <ContentWrapper>
                  <ShortProfile>
                    <PhotoWrap>
                      <ProfilePhoto />
                    </PhotoWrap>
                    <IntroductionWrap>
                      <IntroText>이름 : {userInfo.nickName} </IntroText>
                      <IntroText>이메일 : {userInfo.email}</IntroText>
                    </IntroductionWrap>
                  </ShortProfile>
                  <Buttons>
                    <Button>프로필 수정</Button>
                    <Button onClick={logoutHandler}>로그아웃</Button>
                  </Buttons>
                </ContentWrapper>
              </DropdownFrame>
            )}
          </IconWrapper>
        </NavUserConatiner>
      </NavContainer>
    </HeaderWrapper>
  );
}

export default Header;

const HeaderWrapper = styled.header`
  ${(props) => props.theme.FlexRow}
  min-width: 1250px;
  max-width: 1920px;
  margin: 0 auto;
`;

const LogoContainer = styled.section`
  ${(props) => props.theme.FlexCol}
  width: 0;
  min-width: 350px;
  height: 100px;
  span {
    min-width: 350px;
    font-size: ${(props) => props.theme.Fs.largeText};
    text-align: center;
  }
`;

const NavContainer = styled.section`
  background-color: ${(props) => props.theme.Bg.mainColor};
  ${(props) => props.theme.FlexRowBetween}
  width: 1570px;
  height: 100px;
  padding: 34px 48px;
  span {
    font-size: ${(props) => props.theme.Fs.mediumText};
  }
`;

const NavTabConatiner = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  gap: 40px;
  :hover {
    cursor: pointer;
  }
`;

const NavUserConatiner = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: right;
  /* background-color: lightgray; */
  gap: 40px;
  align-items: center;
`;

const IconWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  :hover {
    cursor: pointer;
  }
`;

const Image = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: gray;
`;

const DropdownFrame = styled.div`
  width: 300px;
  height: 350px;
  border-radius: 4px;
  background-color: white;
  border: 1px solid black;

  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  z-index: 100;
  padding: 0px 12px;
`;

const ContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  /* background-color: pink; */
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ShortProfile = styled.div`
  height: 45%;
  width: 100%;
  /* background-color: skyblue; */
  display: flex;
  flex-direction: row;
`;

const PhotoWrap = styled.div`
  width: 35%;
  /* background-color: yellow; */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfilePhoto = styled.div`
  height: 85px;
  width: 85px;
  border-radius: 50%;
  background-color: lightgray;
`;

const IntroductionWrap = styled.div`
  width: 65%;
  /* background-color: pink; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  gap: 10px;
`;

const IntroText = styled.div`
  font-size: ${(props) => props.theme.Fs.smallText};
`;

const Buttons = styled.div`
  height: 45%;
  width: 100%;
  /* background-color: lightgreen; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
  /* margin-bottom: -18px; */
`;

const Button = styled.button`
  height: 30%;
  width: 100%;
  border-radius: 10px;
  background-color: ${(props) => props.theme.Bg.lightColor};
  color: ${(props) => props.theme.Bg.deepColor};
  font-size: ${(props) => props.theme.Fs.smallText};
  :hover {
    cursor: pointer;
  }
`;
