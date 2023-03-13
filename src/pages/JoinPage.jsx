import { React, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { FlexRow, FlexCol } from "../shared/style/Theme";
import { InputWrapper } from "./IntroPage";

import useLogin from "../hooks/useLogin";
import { __addUser } from "../redux/modules/usersSlice";

function JoinPage() {
  const {
    email,
    isEmail,
    isEmailMessage,
    handleEmailChange,
    password,
    isPw,
    isPwMessage,
    handlePasswordChange,
    passwordCheck,
    handlePasswordCheckChange,
    nickName,
    handleNickNameChange,
    birthday,
    handleBirthdayChange,
    reset,
  } = useLogin();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const message = useSelector((state) => state.users.users.data);
  const isError = useSelector((state) => state.users.isError);
  const isErrorMessage = useSelector((state) => state.users.isErrorMessage);
  console.log(isError);

  const joinHandler = () => {
    if (isEmail === true && isPw === true && password === passwordCheck) {
      const newUser = { email, password, passwordCheck, nickName, birthday };

      dispatch(__addUser(newUser));
    } else {
      alert("양식에 맞게 입력란을 작성해 주세요!");
    }
  };

  useEffect(() => {
    if (message === "회원가입 완료") {
      alert("회원가입 완료!");
      navigate("/");
      window.location.reload();
    } else if (isError) {
      alert(JSON.stringify(isErrorMessage));
      reset();
    }
  }, [message, isError, navigate]);

  return (
    <LoginWrapper>
      <LoginBox>
        <JoinText>회원가입</JoinText>
        <StInput>
          <InputWrapper>
            이메일 : <input type="text" value={email} onChange={handleEmailChange} />
          </InputWrapper>
          <MessageWrapper>{isEmailMessage}</MessageWrapper>
          <InputWrapper>
            비밀번호 : <input type="password" value={password} onChange={handlePasswordChange} />
          </InputWrapper>
          <MessageWrapper>{isPwMessage}</MessageWrapper>
          <InputWrapper>
            비밀번호 확인 : <input type="password" value={passwordCheck} onChange={handlePasswordCheckChange} />
          </InputWrapper>
          <InputWrapper>
            이름 : <input type="text" value={nickName} onChange={handleNickNameChange} />
          </InputWrapper>
          <InputWrapper>
            생년월일 : <input type="text" value={birthday} onChange={handleBirthdayChange} />
          </InputWrapper>
        </StInput>
        <button
          onClick={() => {
            joinHandler();
          }}>
          회원가입
        </button>
        <Link to="/login">
          <button>취소 </button>
        </Link>
      </LoginBox>
    </LoginWrapper>
  );
}

export const LoginWrapper = styled.div`
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
    margin-bottom: 0.6rem;
  }
  & input[type="text"],
  & input[type="password"] {
    width: 15rem;
    border: 1px solid black;
    border-radius: 3px;
    padding: 0.5rem;
  }
  & button {
    margin-bottom: 1rem;
    border-radius: 5px;
    width: 10rem;
    height: 2rem;
    cursor: pointer;
  }
`;

const JoinText = styled.div`
  font-size: 30px;
`;

const StInput = styled.div`
  margin-right: 5rem;
`;

const MessageWrapper = styled.div`
  font-size: 10px;
  ${FlexRow}
  justify-content: center;
  align-items: center;
  min-height: 5px;
  margin-left: 5px;
`;

export default JoinPage;
