import Cookies from "js-cookie";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { React, useState, useEffect, useRef } from "react";
import { alertState } from "../redux/modules/alertReducer";
import { __loginUser } from "../redux/modules/usersSlice";
import { __kakaoLogin } from "../redux/modules/kakaoSlice";
import PreviewArea from "../components/intro/PreviewArea";
import useLogin from "../hooks/useLogin";
import FindPasswordModal from "../components/intro/FindPasswordModal";
import { GetUserInfo } from "../utils/cookie/userInfo";
import { ReactComponent as Key } from "../assets/sign/key.svg";
import { ReactComponent as Mail } from "../assets/sign/mail.svg";
import KakaoAlertModal from "../components/KakaoAlertModal";
import { truncate } from "lodash";

function IntroPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const [isKakao, setIsKakao] = useState(false);
  //비밀번호 찾기 모달
  const [isFindPasswordModalOpen, setIsFindPasswordModalOpen] = useState(false);

  const { email, handleEmailChange, password, handlePasswordChange, reset } = useLogin();
  //카카오 경고 모달
  const [isKakaoModalOpen, setIsKakaoModalOpen] = useState(false);

  const token = Cookies.get("accessJWTToken");
  useEffect(() => {
    if (token) {
      const userInfo = GetUserInfo();
      navigate(`/home`);
    }
  }, []);

  const loginHandler = () => {
    if (email !== "" && password !== "") {
      const loginUser = { email, password };
      dispatch(__loginUser(loginUser)).then((data) => {
        if (data.payload.data.statusCode === 200) {
          // alert("로그인 성공!");
          navigate(`/home`);
        } else {
          dispatch(alertState({ state: true, comment: "로그인 실패" }));
        }
      });
    } else {
      // if (isKakao === false) {
      //   alert("이메일과 비밀번호를 입력해 주세요!");
      // }
    }
  };

  const kakaoAlertHandler = () => {
    setIsKakaoModalOpen(true);
  };

  // const URI = "http://localhost:3000/kakao";
  // // const URI = "https://daydei.life/kakao";
  // const KAKAO = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_ID}&redirect_uri=${URI}&response_type=code`;

  // const kakaologinClick = () => {
  //   setIsKakaoModalOpen(false)
  //   setIsKakao(true);
  //   window.location.href = KAKAO;
  // };

  const FindPasswordModalOpenHandler = () => {
    setIsFindPasswordModalOpen(true);
  };

  return (
    <ScreenLayout>
      <PreviewArea />

      <LoginWrapper
        onSubmit={(e) => {
          e.preventDefault();
          loginHandler();
        }}>
        <LoginBox>
          <TitleText>
            <span>Daydei</span>
            <span>공유하는 일상의 시작</span>
          </TitleText>
          <StInput>
            <InputWrapper>
              <Mail />
              <input type="text" placeholder="이메일 주소" value={email} onChange={handleEmailChange} autoFocus ref={emailRef} />
            </InputWrapper>
            <InputWrapper>
              <Key />
              <input type="password" placeholder="비밀번호" value={password} onChange={handlePasswordChange} />
            </InputWrapper>
          </StInput>
          <LoginButtton>로그인하기</LoginButtton>
          <GapArea>
            <span>또는</span>
          </GapArea>
          <KakaoLogin onClick={kakaoAlertHandler}>카카오톡으로 로그인</KakaoLogin>
          {isKakaoModalOpen && <KakaoAlertModal setIsKakao={setIsKakao} setIsKakaoModalOpen={setIsKakaoModalOpen} />}
          <BottomText>
            <JoinText>
              <Link to="/join">회원가입</Link>
            </JoinText>
            <FindPassword onClick={FindPasswordModalOpenHandler}>
              <div>비밀번호 찾기</div>
            </FindPassword>
            {isFindPasswordModalOpen && <FindPasswordModal setIsFindPasswordModalOpen={setIsFindPasswordModalOpen} />}
          </BottomText>
        </LoginBox>
      </LoginWrapper>
    </ScreenLayout>
  );
}

export const PageWrapper = styled.div``;

export const ScreenLayout = styled.div`
  ${(props) => props.theme.FlexRow};
  height: calc(100vh - 4rem - 0.0625rem);
  overflow: hidden;
`;

export const LoginWrapper = styled.form`
  ${(props) => props.theme.FlexCol};
  justify-content: flex-start;
  flex: 1.4;
  height: 100%;
`;

export const LoginBox = styled.div`
  ${(props) => props.theme.FlexCol};
  width: 23.125rem;

  @media screen and (max-width: 1440px) {
    max-width: 70%;
    min-width: 70%;
  }
`;

const TitleText = styled.div`
  ${(props) => props.theme.FlexCol};
  height: 5rem;
  margin-top: 13.125rem;
  margin-bottom: 1.875rem;
  span {
    font-size: 1.875rem;
    font-weight: 600;
  }

  @media screen and (max-width: 1440px) {
    margin-top: 12rem;
  }

  @media screen and (max-height: 1032.22px) {
    margin-top: 16rem;
  }
  @media screen and (max-height: 929px) {
    margin-top: 14rem;
  }
  @media screen and (max-height: 844.55px) {
    margin-top: 12.5rem;
  }
  @media screen and (max-height: 743.2px) {
    margin-top: 9rem;
    span {
      font-size: 1.7rem;
      font-weight: 600;
    }
  }
  @media screen and (max-height: 619.33px) {
    margin-top: 8rem;
    span {
      font-size: 1.6rem;
      font-weight: 600;
    }
  }
`;

const StInput = styled.div`
  ${(props) => props.theme.FlexCol};
  gap: 1rem;
`;

export const InputWrapper = styled.div`
  ${(props) => props.theme.FlexRow};
  justify-content: left;
  gap: 0.75rem;
  height: 2.875rem;
  padding: 1rem 3.25rem 1rem 1.5rem;
  background: #ffffff;
  border: 0.0625rem solid #121212;
  border-radius: 0.5rem;

  @media screen and (max-height: 619.33px) {
    height: 2.7rem;
  }
`;

export const LoginButtton = styled.button`
  width: 100%;
  height: 3rem;
  margin-top: 1.125rem;
  ${(props) => props.theme.ButtonLarge}
  background: ${(props) => props.theme.Bg.mainColor5};
  font-size: 1rem;
  font-weight: 600;

  @media screen and (max-height: 743.2px) {
    font-size: 0.9rem;
  }
  @media screen and (max-height: 619.33px) {
    height: 2.8rem;
  }
`;

const GapArea = styled.div`
  margin: 1.125rem 0;
  span {
    font-size: 0.875rem;
    color: ${(props) => props.theme.Bg.color2};
  }
`;

const KakaoLogin = styled(LoginButtton)`
  background: #fcd90e;
  color: ${(props) => props.theme.Bg.color1};
  margin: 0;
`;

const BottomText = styled.div`
  ${(props) => props.theme.FlexRowBetween};
  margin-top: 1.125rem;
  color: ${(props) => props.theme.Bg.color1};
  font-size: 0.875rem;
`;

const JoinText = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const FindPassword = styled.div`
  :hover {
    cursor: pointer;
  }
`;

export default IntroPage;
