import React from "react";
import styled from "styled-components";

function Header(props) {
  const { handleShowCalendarMain, handleShowFriendsListMain } = props;
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
          <div>
            <span>찾아보기</span>
          </div>
        </NavTabConatiner>
        <NavUserConatiner>
          <div>
            <span>종</span>
          </div>
          <div>
            <span>톱니</span>
          </div>
          <div>
            <img />
          </div>
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
  gap: 40px;
`;
