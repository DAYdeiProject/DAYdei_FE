import { React, useEffect } from "react";
import styled from "styled-components";
import { FlexRow, FlexCol } from "../shared/style/Theme";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { __loginUser } from "../redux/modules/usersSlice";
import { useSelector, useDispatch } from "react-redux";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <LoginWrapper>
      <PreviewWrapper>프리뷰 영역입니다.</PreviewWrapper>
      <LoginBox>
        <TitleText>DayDei</TitleText>
        <SubText>공유하는 일상의 시작</SubText>
        <StInput>
          <InputWrapper>
            이메일 : <input type="text" value={email} onChange={handleEmailChange} />
          </InputWrapper>
          <InputWrapper>
            비밀번호 : <input type="password" value={password} onChange={handlePasswordChange} />
          </InputWrapper>
        </StInput>
        <button
          onClick={() => {
            loginHandler();
          }}>
          로그인
        </button>
        <button>카카오톡 로그인</button>
        <Link to="/join">회원가입 페이지로</Link>
      </LoginBox>
    </LoginWrapper>
  );
}

const LoginWrapper = styled.div`
  ${FlexRow}
  min-height: 100vh;
  justify-content: center;
  margin: 0 auto;
`;

const PreviewWrapper = styled.div`
  ${FlexRow}
  min-height: 100vh;
  width: 1220px;
  background-color: #f5f5f5;
`;

const LoginBox = styled.div`
  ${FlexCol}
  width: 700px;
  min-height: 100vh;
  & input[type="text"],
  & input[type="password"] {
    width: 15rem;
    border: 1px solid black;
    border-radius: 3px;
    padding: 0.5rem;
    margin-bottom: 1rem;
  }
  & button {
    margin-bottom: 1rem;
    border-radius: 5px;
    width: 10rem;
    height: 2rem;
    cursor: pointer;
  }
`;

const TitleText = styled.div`
  font-family: "Pretendard";
  font-weight: 800;
  font-size: 30px;
  line-height: 39px;
  text-align: center;
`;

const SubText = styled.div`
  font-family: "Pretendard";
  font-weight: 800;
  font-size: 30px;
  line-height: 39px;
  text-align: center;
  margin-bottom: 32px;
`;

const StInput = styled.div`
  margin-right: 4rem;
`;

export const InputWrapper = styled.div`
  text-align: right;
`;

export default LoginPage;
