import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ScreenLayout, ScreenWrapper, PreviewWrapper, LoginWrapper } from "../intro/IntroPage";
import useLogin from "../../hooks/useLogin";
import { __addUser, __emailCheck } from "../../redux/modules/usersSlice";
import Header from "../../layout/Header";

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
    isPwCheckMessage,
    handlePasswordCheckChange,
    nickName,
    handleNickNameChange,
    isNickNameMessage,
    birthday,
    handleBirthdayChange,
    reset,
    nicknameRegex,
  } = useLogin();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const message = useSelector((state) => state.users.users.data);
  // const isError = useSelector((state) => state.users.isError);
  // const isErrorMessage = useSelector((state) => state.users.isErrorMessage);
  const isCheck = useSelector((state) => state.users.isCheck);
  // console.log("ischeck의 값-->", isCheck.statusCode);

  const emailCheckHandler = (email) => {
    if (isEmail) {
      dispatch(__emailCheck(email)).then((data) => {
        // console.log("then에서 나오는 200-->", data.payload.statusCode);
        if (data.payload.statusCode !== 200) {
          alert(data.payload.data);
        } else {
          alert("사용 가능한 이메일입니다.");
        }
      });
    }
  };

  const joinHandler = () => {
    if (isEmail === true && isPw === true && password === passwordCheck && isCheck.statusCode === 200) {
      const newUser = { email, password, passwordCheck, nickName, birthday };
      dispatch(__addUser(newUser)).then((data) => {
        // console.log("then 데이터-->", data.payload.statusCode);
        if (data.payload.statusCode === 200) {
          alert("회원가입 완료!");
          navigate("/");
        } else {
          alert("오류 발생");
        }
      });
    }
    if (isCheck.data !== "사용 가능한 이메일입니다.") {
      alert("이메일 중복확인이 필요합니다!");
    }
    if (!isEmail || isPw !== true || password !== passwordCheck) {
      alert("양식에 맞게 작성해 주세요!");
    }
  };

  return (
    <ScreenLayout>
      <ScreenWrapper>
        <PreviewWrapper></PreviewWrapper>
        <LoginWrapper
          onSubmit={(e) => {
            e.preventDefault();

            joinHandler();
          }}>
          <JoinBox>
            <JoinText>회원가입</JoinText>

            <InputArea>
              <InputWrapper>
                <InputTitleText>이메일</InputTitleText>
                <InputFrame border={email === "" ? "#afb4bf" : isEmail ? "#58c179" : "#DF5445"}>
                  <InputInnerWrap>
                    <input type="text" value={email} onChange={handleEmailChange} />
                    <CheckButton onClick={() => emailCheckHandler(email)}>
                      <CheckText>중복확인</CheckText>
                    </CheckButton>
                  </InputInnerWrap>
                </InputFrame>
                {email && <MessageWrapper color={isEmail ? "#58c179" : "#DF5445"}>{isEmailMessage}</MessageWrapper>}
              </InputWrapper>

              <InputWrapper>
                <InputTitleText>비밀번호</InputTitleText>
                <InputFrame border={password === "" ? "#afb4bf" : isPw ? "#58c179" : "#DF5445"}>
                  <InputInnerWrap>
                    <input type="password" value={password} onChange={handlePasswordChange} />
                  </InputInnerWrap>
                </InputFrame>
                <MessageWrapper color={isPw ? "#58c179" : "#DF5445"}>{isPwMessage}</MessageWrapper>
              </InputWrapper>

              <InputWrapper>
                <InputTitleText>비밀번호 확인</InputTitleText>
                <InputFrame border={passwordCheck === "" ? "#afb4bf" : password === passwordCheck ? "#58c179" : "#DF5445"}>
                  <InputInnerWrap>
                    <input type="password" value={passwordCheck} onChange={handlePasswordCheckChange} />
                  </InputInnerWrap>
                </InputFrame>
                <MessageWrapper color={passwordCheck !== "" && password === passwordCheck ? "#58c179" : "#DF5445"}>{isPwCheckMessage}</MessageWrapper>
              </InputWrapper>

              <InputWrapper>
                <InputTitleText>닉네임</InputTitleText>
                {/* <InputFrame border={nickName === "" ? "#afb4bf" : nickName.length <= 6 ? "#58c179" : "#DF5445"}> */}
                <InputFrame>
                  <InputInnerWrap>
                    <input type="text" value={nickName} onChange={handleNickNameChange} maxLength="8" />
                  </InputInnerWrap>
                </InputFrame>
                <MessageWrapper color={nickName.length <= 6 ? "#58c179" : "#DF5445"}>{isNickNameMessage}</MessageWrapper>
              </InputWrapper>

              <InputWrapper>
                <InputTitleText>생일</InputTitleText>
                <InputFrame>
                  <InputInnerWrap>
                    <input type="text" placeholder="예시 : 0325" value={birthday} onChange={handleBirthdayChange} />
                  </InputInnerWrap>
                </InputFrame>
              </InputWrapper>
            </InputArea>

            <SignUpButtton disabled={!nicknameRegex}>
              <ButtonText>가입하기</ButtonText>
            </SignUpButtton>

            <BottomText>
              <BottomLeft>이미 가입된 계정이 있나요?</BottomLeft>
              <BottomRight>
                <Link to="/">로그인하기</Link>
              </BottomRight>
            </BottomText>
          </JoinBox>
        </LoginWrapper>
      </ScreenWrapper>
    </ScreenLayout>
  );
}

const JoinBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 386px;
  height: 697px;
  left: 1385px;
  top: 191px;
  /* background-color: yellow; */
`;

const JoinText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  font-weight: 600;
  font-size: ${(props) => props.theme.Fs.size24};
  line-height: 130%;

  text-align: center;

  color: ${(props) => props.theme.Bg.fontBlack};
  margin-top: 8px;
  margin-bottom: 24px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;

  width: 370px;
  /* height: 513px; */
  /* background-color: pink; */
  margin-bottom: 24px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  width: 370px;
  /* height: 93px; */

  flex: none;
  order: 0;
  flex-grow: 0;
  /* background-color: lightgray; */
`;

const InputTitleText = styled.div`
  font-weight: 500;
  font-size: ${(props) => props.theme.Fs.size16};
  line-height: 19px;

  color: #494d55;

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const InputFrame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 10px 8px 18px;
  gap: 18px;

  width: 370px;
  height: 46px;

  border: 1px solid ${(props) => props.border};
  border-radius: 8px;

  color: ${(props) => props.color};
  /* color: #58c179; // 조건 충족 
  color: #DF5445; // 조건 미충족 */

  flex: none;
  order: 1;
  flex-grow: 0;
`;

const InputInnerWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 1px;

  width: 342px;
  height: 28px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 1;
`;

const CheckButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 12px;
  gap: 8px;

  width: 50px;
  height: 28px;

  background: #f2f4f6;
  border-radius: 4px;

  flex: none;
  order: 1;
  flex-grow: 0;
  :hover {
    cursor: pointer;
  }
`;

const CheckText = styled.div`
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;

  color: #494d55;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 2px;
  gap: 8px;

  flex: none;
  order: 2;
  flex-grow: 0;

  font-weight: 500;
  font-size: 10px;
  line-height: 12px;

  color: ${(props) => props.color};
  /* 
  color: #58c179; // 조건 충족 
  color: #DF5445; // 조건 미충족 */

  /* background-color: yellow; */
`;

const SignUpButtton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 150px;

  width: 370px;
  height: 48px;

  background: ${(props) => (props.disabled ? "gray" : "#0eafe1")};

  border: 1.4px solid #121212;

  box-shadow: 2px 2px 0px #000000;
  border-radius: 4px;

  margin-bottom: 24px;
  cursor: pointer;
  // 아예 버튼 클릭 막기
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
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

  /* background-color: pink; */
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
