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
import PreviewArea from "./PreviewArea";

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

  const URI = "https://daydei.life/kakao";
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
          <KakaoLogin onClick={kakaologinClick}>카카오톡으로 로그인</KakaoLogin>
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

export const ScreenLayout = styled.div`
  ${(props) => props.theme.FlexRow};
  height: calc(100vh - 64px - 2px - 37px);
  overflow: hidden;
`;

export const LoginWrapper = styled.form`
  ${(props) => props.theme.FlexCol};
  justify-content: flex-start;
  min-width: 720px;
  max-width: 720px;
  height: 100%;
`;

export const LoginBox = styled.div`
  ${(props) => props.theme.FlexCol};
  width: 370px;
`;

const TitleText = styled.div`
  ${(props) => props.theme.FlexCol};
  height: 80px;
  margin-top: 200px;
  margin-bottom: 30px;
  span {
    font-size: 30px;
    font-weight: 600;
  }
`;

const StInput = styled.div`
  ${(props) => props.theme.FlexCol};
  gap: 16px;
`;

export const InputWrapper = styled.div`
  ${(props) => props.theme.FlexRow};
  justify-content: left;
  gap: 12px;
  height: 46px;
  padding: 16px 52px 16px 24px;
  background: #ffffff;
  border: 1px solid #121212;
  border-radius: 8px;
`;

export const LoginButtton = styled.button`
  width: 100%;
  height: 48px;
  margin-top: 18px;
  ${(props) => props.theme.ButtonLarge}
  background: ${(props) => props.theme.Bg.mainColor5};
  font-size: 16px;
  font-weight: 600;
`;

const GapArea = styled.div`
  margin: 18px 0;
  span {
    font-size: 14px;
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
  margin-top: 18px;
  color: ${(props) => props.theme.Bg.color1};
  font-size: 14px;
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
