import React from "react";
import styled from "styled-components";
import Modal from "../elements/Modal";
import ModalWrap from "../elements/ModalWrap";
import kakaoAgree from "../assets/defaultImage/kakaoAgree.png";
import { ReactComponent as LogoIcon } from "../assets/main/logo.svg";
import { useNavigate } from "react-router-dom";

function KakaoAlertModal({ setIsKakaoModalOpen, setIsKakao }) {
  const navigate = useNavigate();

  const URI = "http://localhost:3000/kakao";
  // const URI = "https://daydei.life/kakao";
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
              <img src={kakaoAgree} />
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
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: 37.5rem;
  border-radius: 1rem;
  padding: 0rem 1rem;
  /* background-color: pink; */
`;

const ImageWrapper = styled.div`
  /* background-color: pink; */

  img {
    margin-top: 20px;
    border-radius: 1rem;
    width: 320px;
    height: 550px;
  }
`;

const InnerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  background-color: ${(props) => props.theme.Bg.mainColor3};
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  /* border-left: 1px solid black; */

  width: 17.3rem;
  height: 37.5rem;
  gap: 3rem;
`;

const LogoWrapper = styled.div`
  margin-top: 100px;
  /* background-color: pink; */
  width: 220px;
`;

const AlertText = styled.div`
  font-size: 16px;
  text-align: center;

  width: 220px;
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 5px;
  /* background-color: skyblue; */
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
  width: 100%;
  height: 200px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  /* background-color: pink; */
`;

const Button = styled.div`
  width: 90%;
  height: 25%;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 5px;

  font-size: 16px;
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
