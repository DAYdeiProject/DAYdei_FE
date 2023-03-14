import { React, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ScreenLayout, ScreenWrapper, PreviewWrapper, LoginWrapper, LoginBox, InputWrapper, LoginButtton } from "../intro/IntroPage";
import useLogin from "../../hooks/useLogin";
import { __addUser, __emailCheck } from "../../redux/modules/usersSlice";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  const emailCheckHandler = (email) => {
    if (isEmail) {
      dispatch(__emailCheck(email));
    }
  };

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
    <ScreenLayout>
      <ScreenWrapper>
        <PreviewWrapper></PreviewWrapper>
        <LoginWrapper
          onSubmit={(e) => {
            e.preventDefault();

            joinHandler();
          }}>
          <LoginBox>
            <JoinText>회원가입</JoinText>
            <StInput>
              <InputWrapper>
                <input type="text" placeholder="이름을 입력해주세요" value={nickName} onChange={handleNickNameChange} />
              </InputWrapper>
              <InputWrapper>
                <input type="text" placeholder="생일을 입력해주세요" value={birthday} onChange={handleBirthdayChange} />
              </InputWrapper>
              <InputWrapper>
                <FontAwesomeIcon icon={faEnvelope} />
                <input type="text" placeholder="이메일" value={email} onChange={handleEmailChange} />
                <CheckButton onClick={() => emailCheckHandler(email)}>
                  <CheckText>중복확인</CheckText>
                </CheckButton>
              </InputWrapper>
              <MessageWrapper>{isEmailMessage}</MessageWrapper>
              <InputWrapper>
                <FontAwesomeIcon icon={faKey} />
                <input type="password" placeholder="비밀번호" value={password} onChange={handlePasswordChange} />
              </InputWrapper>
              <MessageWrapper>{isPwMessage}</MessageWrapper>
              <InputWrapper>
                <FontAwesomeIcon icon={faKey} />
                <input type="password" placeholder="비밀번호 확인" value={passwordCheck} onChange={handlePasswordCheckChange} />
              </InputWrapper>
            </StInput>
            <LoginButtton marginTop="54px">
              <ButtonText>가입하기</ButtonText>
            </LoginButtton>
            <BottomText>
              <BottomLeft>이미 가입된 계정이 있나요?</BottomLeft>
              <BottomRight>
                <Link to="/">로그인하기</Link>
              </BottomRight>
            </BottomText>
          </LoginBox>
        </LoginWrapper>
      </ScreenWrapper>
    </ScreenLayout>
  );
}

const JoinText = styled.div`
  /* width: 104px; */
  height: 39px;
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
  height: 306px;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const CheckButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px 10px;
  gap: 8px;
  margin-left: 54px;
  width: 66px;
  height: 34px;
  background: #626262;
  border-radius: 4px;
  flex: none;
  order: 1;
  flex-grow: 0;
  :hover {
    cursor: pointer;
  }
`;

const CheckText = styled.div`
  /* width: 42px; */
  height: 14px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  color: #ffffff;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const MessageWrapper = styled.div`
  font-size: 10px;
  ${(props) => props.theme.FlexRow}
  justify-content: center;
  align-items: center;
  min-height: 5px;
  margin-left: 5px;
`;

const ButtonText = styled.div`
  width: 70px;
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

const BottomText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 16px;
  width: 240px;
  height: 17px;
  flex: none;
  order: 2;
  flex-grow: 0;
`;

const BottomLeft = styled.div`
  /* width: 151px; */
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

const BottomRight = styled.div`
  /* width: 61px; */
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

export default JoinPage;
