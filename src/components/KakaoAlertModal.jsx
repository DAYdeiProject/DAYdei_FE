import React from "react";
import Modal from "../elements/Modal";
import styled from "styled-components";
import ModalWrap from "../elements/ModalWrap";
import kakaoAgree from "../assets/defaultImage/kakaoAgree.png";
import { ReactComponent as LogoIcon } from "../assets/main/logo.svg";

function KakaoAlertModal({ setIsKakaoModalOpen, setIsKakao }) {
  //const URI = "http://localhost:3000/kakao";
  const URI = "https://daydei.life/kakao";
  const KAKAO = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_ID}&redirect_uri=${URI}&response_type=code`;

  const kakaologinClick = () => {
    setIsKakaoModalOpen(false);
    setIsKakao(true);
    window.location.href = KAKAO;
  };

  return (
    <>
      <ModalWrap>
        <Modal width="600px" height="600px">
          <WholeWrap>
            <ImageWrapper>
              <img src={kakaoAgree} alt="kakao" />
            </ImageWrapper>
            <InnerBox>
              <LogoWrapper>
                <LogoIcon />
              </LogoWrapper>
              <AlertText>
                <div>카카오톡 로그인 시</div>
                <OneLine>
                  다음과 같이 <BoldText>꼭!!!</BoldText>
                </OneLine>
                <OneLine>
                  <BoldText>전체 동의</BoldText>가 필요합니다.
                </OneLine>
                <div>카카오톡 로그인 하시겠습니까?</div>
              </AlertText>
              <ButtonWrap>
                <KakaoButton onClick={kakaologinClick}>카카오톡 로그인 계속</KakaoButton>
                <BackButton onClick={() => setIsKakaoModalOpen(false)}>되돌아가기</BackButton>
              </ButtonWrap>
            </InnerBox>
          </WholeWrap>
        </Modal>
      </ModalWrap>
    </>
  );
}

export default KakaoAlertModal;

const WholeWrap = styled.div`
  ${(props) => props.theme.FlexRow};
  width: 600px;
  height: 600px;
  border-radius: 1rem;
`;

const ImageWrapper = styled.div`
  width: 56%;
  height: 100%;
  border-radius: 1rem 0 0 1rem;
  padding-top: 15px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 1rem 0 0 1rem;
  }
`;

const InnerBox = styled.div`
  ${(props) => props.theme.FlexCol};
  background-color: ${(props) => props.theme.Bg.mainColor3};
  width: 44%;
  height: 100%;
  border-radius: 0 1rem 1rem 0;
  padding: 0 20px;
`;

const LogoWrapper = styled.div`
  ${(props) => props.theme.FlexCol};
  align-items: flex-start;
  margin-bottom: 40px;
`;

const AlertText = styled.div`
  ${(props) => props.theme.FlexCol};
  align-items: flex-start;
  gap: 5px;
  font-size: 16px;
  margin-bottom: 40px;
`;

const OneLine = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

const BoldText = styled.div`
  font-weight: 800;
  color: ${(props) => props.theme.Bg.redColor};
`;

const ButtonWrap = styled.div`
  ${(props) => props.theme.FlexCol};
  gap: 15px;
`;

const Button = styled.div`
  ${(props) => props.theme.FlexCol};
  height: 40px;
  border: solid 1.2px #121212;
  box-shadow: 1px 1px 0 0 #000;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  :hover {
    cursor: pointer;
  }
`;

const KakaoButton = styled(Button)`
  background: #fcd90e;
  color: ${(props) => props.theme.Bg.color1};
`;

const BackButton = styled(Button)`
  background: ${(props) => props.theme.Bg.mainColor5};
  color: ${(props) => props.theme.Bg.color6};
`;
