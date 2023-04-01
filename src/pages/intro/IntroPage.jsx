import { React, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { __loginUser } from "../../redux/modules/usersSlice";
import { useSelector, useDispatch } from "react-redux";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { __kakaoLogin } from "../../redux/modules/kakaoSlice";
import Cookies from "js-cookie";
import { GetUserInfo } from "../../utils/cookie/userInfo";
import FindPasswordModal from "./FindPasswordModal";
import Header from "../../layout/Header";
import { ReactComponent as Mail } from "../../assets/lcon/sign/mail.svg";
import { ReactComponent as Key } from "../../assets/lcon/sign/key.svg";
import PreviewImg from "../../assets/defaultImage/preview.svg";

function IntroPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const [isKakao, setIsKakao] = useState(false);
  //비밀번호 찾기 모달
  const [isFindPasswordModalOpen, setIsFindPasswordModalOpen] = useState(false);

  const { email, handleEmailChange, password, handlePasswordChange, reset } = useLogin();
  //const isLogin = useSelector((state) => state.users.isLogin);

  const token = Cookies.get("accessJWTToken");
  useEffect(() => {
    if (token) {
      const userInfo = GetUserInfo();
      alert("이미 로그인하셨습니다!");
      navigate(`/${userInfo.userId}`);
    }
  }, []);

  const loginHandler = () => {
    if (email !== "" && password !== "") {
      const loginUser = { email, password };
      dispatch(__loginUser(loginUser)).then((data) => {
        if (data.payload.data.statusCode === 200) {
          alert("로그인 성공!");
          navigate(`/${data.payload.data.data.userId}`);
        }
      });
    } else {
      if (isKakao === false) {
        alert("이메일과 비밀번호를 입력해 주세요!");
      }
    }
  };

  const URI = "http://daydei.s3-website.ap-northeast-2.amazonaws.com/kakao";
  //const URI = "http://localhost:3000/kakao";
  const KAKAO = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_ID}&redirect_uri=${URI}&response_type=code`;

  const kakaologinClick = () => {
    setIsKakao(true);
    window.location.href = KAKAO;
  };

  const FindPasswordModalOpenHandler = () => {
    setIsFindPasswordModalOpen(true);
  };

  return (
    <ScreenLayout>
      <ScreenWrapper>
        <PreviewWrapper>{/* <img src={PreviewImg} /> */}</PreviewWrapper>
        <LoginWrapper
          onSubmit={(e) => {
            e.preventDefault();
            loginHandler();
          }}>
          <LoginBox>
            <TitleText>
              DayDei
              <br /> 공유하는 일상의 시작
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
            <LoginButtton>
              <LoginText>로그인하기</LoginText>
            </LoginButtton>
            <GapArea>또는</GapArea>
            <KakaoLogin onClick={kakaologinClick}>
              <KakaoText>카카오톡으로 로그인</KakaoText>
            </KakaoLogin>
            <BottomText>
              <JoinText>
                <Link to="/join">회원가입</Link>
              </JoinText>
              <FindPassword onClick={FindPasswordModalOpenHandler}>
                <FindPasswordText>비밀번호 찾기</FindPasswordText>
              </FindPassword>
              {isFindPasswordModalOpen && <FindPasswordModal setIsFindPasswordModalOpen={setIsFindPasswordModalOpen} />}
            </BottomText>
          </LoginBox>
        </LoginWrapper>
      </ScreenWrapper>
    </ScreenLayout>
  );
}

export const ScreenLayout = styled.div`
  height: 100%;
  margin: 0 auto;
  max-width: 1920px;
  ${(props) => props.theme.FlexCol};
`;

export const ScreenWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100vh - 64px - 1px);
  /* background-color: pink; */
`;

export const PreviewWrapper = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: #ebebeb;
`;

export const LoginWrapper = styled.form`
  ${(props) => props.theme.FlexCol}
  //justify-content: flex-start;
  min-width: 720px;
  max-width: 720px;
`;

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  position: absolute;

  /* background-color: pink; */
`;

const TitleText = styled.div`
  width: 371px;
  height: 78px;

  font-weight: 600;
  font-size: 30px;
  line-height: 130%;
  text-align: center;
  color: #000000;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin-bottom: 32px;
  /* background-color: pink; */
`;

const StInput = styled.div`
  width: 369px;
  height: 108px;
  flex-grow: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
  padding: 0;
  /* margin-bottom: 18px; */
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 52px 16px 24px;
  gap: 12px;

  width: 369px;
  height: 46px;

  background: #ffffff;
  border: 1px solid #121212;
  border-radius: 8px;

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const LoginButtton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 150px;
  gap: 12px;

  width: 370px;
  height: 48px;

  background: #0eafe1;

  border: 1.4px solid #121212;

  box-shadow: 2px 2px 0px #000000;
  border-radius: 4px;

  flex: none;
  order: 1;
  flex-grow: 0;
  margin-top: 18px;
  margin-bottom: 18px;
  :hover {
    cursor: pointer;
  }
`;

const LoginText = styled.div`
  /* width: 70px; */
  height: 19px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const GapArea = styled.div`
  /* width: 25px; */
  height: 17px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: ${(props) => props.theme.Bg.deepColor};
  flex: none;
  order: 2;
  flex-grow: 0;
`;

const KakaoLogin = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;

  width: 370px;
  height: 48px;

  background: #fcd90e;
  border: 1.4px solid #121212;
  box-shadow: 2px 2px 0px #000000;
  border-radius: 4px;

  flex: none;
  order: 3;
  flex-grow: 0;
  margin-top: 18px;
  margin-bottom: 18px;
  :hover {
    cursor: pointer;
  }
`;

const KakaoText = styled.div`
  height: 19px;

  /* body/2-3 bold */

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;

  text-align: center;
  color: #121212;

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const BottomText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px 6px;
  gap: 168px;

  width: 370px;
  height: 17px;

  flex: none;
  order: 4;
  align-self: stretch;
  flex-grow: 0;
`;

const JoinText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  height: 17px;

  flex: none;
  order: 0;
  flex-grow: 0;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #494d55;

  :hover {
    cursor: pointer;
  }
`;

const FindPassword = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  width: 77px;
  height: 17px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  color: #494d55;

  flex: none;
  order: 1;
  flex-grow: 0;

  :hover {
    cursor: pointer;
  }
`;

const FindPasswordText = styled.div`
  width: 77px;
  height: 17px;
`;

export default IntroPage;
