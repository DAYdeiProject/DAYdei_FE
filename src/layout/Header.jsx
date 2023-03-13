import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <HeaderWrapper>
      <LogoContainer>
        <span>DAY DEI</span>
      </LogoContainer>
      <NavContainer>
        <NavTabConatiner>
          <div>
            <span>홈 캘린더</span>
          </div>
          <div>
            <span>친구 추천</span>
          </div>
          <div>
            <span>메뉴</span>
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
  width: 1920px;
  margin: 0 auto;

  span {
    font-size: 24px;
  }
`;

const LogoContainer = styled.section`
  background-color: aliceblue;
  ${(props) => props.theme.FlexCol}
  width: 350px;
  height: 6.25rem;
`;

const NavContainer = styled.section`
  background-color: #acc5db;
  ${(props) => props.theme.FlexRowBetween}
  width: 1570px;
  height: 6.25rem;
  padding: 34px 48px;
`;

const NavTabConatiner = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  gap: 40px;
`;

const NavUserConatiner = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: right;
  gap: 40px;
`;
