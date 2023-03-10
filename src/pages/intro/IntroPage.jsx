import { React, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { __loginUser } from "../../redux/modules/usersSlice";
import { useSelector, useDispatch } from "react-redux";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function IntroPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef(null);

  const { email, handleEmailChange, password, handlePasswordChange, reset } = useLogin();
  const isLogin = useSelector((state) => state.users.isLogin);

  useEffect(() => {
    if (isLogin === true) {
      alert("로그인 성공!");
      navigate("/home");
    }
  }, [isLogin, navigate]);

  const loginHandler = () => {
    if (email !== "" && password !== "") {
      const loginUser = { email, password };
      dispatch(__loginUser(loginUser));
      reset();
    } else {
      alert("이메일과 비밀번호를 입력해 주세요!");
    }
  };

  return (
    <ScreenLayout>
      <ScreenWrapper>
        <PreviewWrapper>프리뷰 영역입니다.</PreviewWrapper>
        <LoginWrapper
          onSubmit={(e) => {
            e.preventDefault();

            loginHandler();
          }}>
          <LoginBox>
            <TitleText>
              <p>DayDei</p>
              <p>공유하는 일상의 시작</p>
            </TitleText>
            <StInput>
              <InputWrapper>
                <FontAwesomeIcon icon={faEnvelope} />
                <input type="text" placeholder="이메일 주소" value={email} onChange={handleEmailChange} autoFocus ref={emailRef} />
              </InputWrapper>
              <InputWrapper>
                <FontAwesomeIcon icon={faKey} />
                <input type="password" placeholder="비밀번호" value={password} onChange={handlePasswordChange} />
              </InputWrapper>
            </StInput>
            <LoginButtton>
              <LoginText>로그인하기</LoginText>
            </LoginButtton>
            <GapArea>또는</GapArea>
            <KakaoLogin>카카오톡으로 로그인</KakaoLogin>
            <BottomText>
              <JoinText>
                <Link to="/join">회원가입</Link>
              </JoinText>
              <FindPassword>비밀번호 찾기</FindPassword>
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
`;

export const ScreenWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

export const PreviewWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: ${(props) => props.theme.Bg.lightColor};
  text-align: center;
`;

export const LoginWrapper = styled.form`
  ${(props) => props.theme.FlexCol}
  min-width: 720px;
  max-width: 720px;
`;

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  position: absolute;

  /* border: 1px solid black; */
`;

const TitleText = styled.div`
  width: 371px;
  height: 78px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 800;
  font-size: 30px;
  line-height: 130%;
  text-align: center;
  color: #000000;

  flex: none;
  order: 0;
  flex-grow: 0;
  margin-bottom: 32px;
`;

const StInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;

  width: 370px;
  height: 116px;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 240px 16px 24px;
  gap: 12px;

  width: 370px;
  height: 52px;

  background: #ffffff;

  border: 1px solid #bababa;
  border-radius: 4px;

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
  margin-top: ${(props) => props.marginTop || "18px"};
  margin-bottom: 18px;

  width: 370px;
  height: 51px;

  background: ${(props) => props.theme.Bg.deepColor};
  border-radius: 4px;

  flex: none;
  order: 1;
  flex-grow: 0;

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

  color: #626262;

  flex: none;
  order: 2;
  flex-grow: 0;
`;

const KakaoLogin = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 121px 16px 120px;
  gap: 12px;
  margin-top: 18px;
  margin-bottom: 18px;

  width: 370px;
  height: 51px;

  background: #bababa;
  border-radius: 4px;

  flex: none;
  order: 3;
  flex-grow: 0;

  :hover {
    cursor: pointer;
  }
`;

const BottomText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 6px;
  gap: 216px;

  width: 371px;
  height: 17px;

  flex: none;
  order: 4;
  flex-grow: 0;
`;

const JoinText = styled.div`
  /* width: 49px; */
  height: 17px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  color: #626262;

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const FindPassword = styled.div`
  /* width: 77px; */
  height: 17px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  color: #626262;

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export default IntroPage;
