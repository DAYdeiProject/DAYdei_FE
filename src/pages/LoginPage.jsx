import React from "react";
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
  const token = useSelector((state) => state.users.token);

  const loginHandler = () => {
    if (email !== "" && password !== "") {
      const loginUser = { email, password };
      dispatch(__loginUser(loginUser));
      reset();
      if (token) {
        navigate("/");
      } else {
        alert("로그인에 실패했습니다.");
      }
    } else {
      alert("이메일과 비밀번호를 입력해 주세요!");
    }
  };

  return (
    <LoginWrapper>
      <LoginBox>
        <LoginText>로그인</LoginText>
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
`;

const LoginBox = styled.div`
  ${FlexCol}
  border: 1px solid black;
  width: 35%;
  min-height: 35rem;
  border-radius: 5px;
  & div {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
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

const LoginText = styled.div`
  font-size: 30px;
`;

const StInput = styled.div`
  margin-right: 4rem;
`;

export const InputWrapper = styled.div`
  text-align: right;
`;

export default LoginPage;
