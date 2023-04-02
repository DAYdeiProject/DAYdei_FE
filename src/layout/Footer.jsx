import Cookies from "js-cookie";
import React, { useEffect } from "react";
import styled from "styled-components";

function Footer() {
  let token = "";
  useEffect(() => {
    token = Cookies.get("accessJWTToken");
  }, []);
  return (
    <>
      {token ? (
        <></>
      ) : (
        <FooterWarrper>
          <LeftTextContainer>
            <LogoText>Daydei</LogoText>
            <InfoText>
              <span>사업자등록번호 : 691-81-01027</span>
              <span>대표 : 정다정</span>
              <span>인성한우삼천포점</span>
              <span>주소 : 경남 사천시 벌리4길, 74, 1층</span>
            </InfoText>
          </LeftTextContainer>
          <RightTextContainer>
            <span>© 2023. Daydei. All rights reserved.</span>
          </RightTextContainer>
        </FooterWarrper>
      )}
    </>
  );
}

export default Footer;

const FooterWarrper = styled.div`
  ${(props) => props.theme.FlexRowBetween}
  height: 37px;
  padding: 0 20px;
  border-top: 1px solid ${(props) => props.theme.Bg.color4};
  color: ${(props) => props.theme.Bg.color2};
`;

const LeftTextContainer = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  gap: 200px;
`;
const LogoText = styled.span`
  font-size: 18px;
`;
const InfoText = styled.div`
  display: flex;
  gap: 10px;
  span {
    font-size: 12px;
    padding-right: 10px;
    border-right: 1px solid ${(props) => props.theme.Bg.color2};
  }
`;
const RightTextContainer = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: right;
  span {
    font-size: 12px;
  }
`;
