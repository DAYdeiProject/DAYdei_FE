import styled from "styled-components";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __addUser, __emailCheck } from "../redux/modules/usersSlice";
import { alertState } from "../redux/modules/alertReducer";
import useLogin from "../hooks/useLogin";
import PreviewArea from "../components/intro/PreviewArea";
import { PageWrapper, ScreenLayout, LoginWrapper } from "./IntroPage";
import { ReactComponent as Bcak } from "../assets/sign/back.svg";
import { ReactComponent as PwCheck } from "../assets/sign/pwCheck.svg";
import { ReactComponent as Security } from "../assets/sign/security.svg";

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
    reset,
    nicknameRegex,
  } = useLogin();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isCheck = useSelector((state) => state.users.isCheck);

  //Select box에서 선택한 월,일 값 추적
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [birthday, setBirthday] = useState("");

  //이메일 중복검사
  const emailCheckHandler = (email) => {
    if (isEmail) {
      dispatch(__emailCheck(email)).then((data) => {
        // console.log("then에서 나오는 200-->", data);
        if (data.payload.statusCode !== 200) {
          dispatch(alertState({ state: true, comment: "중복된 이메일입니다" }));
        } else {
          dispatch(alertState({ state: true, comment: "사용 가능한 이메일입니다" }));
        }
      });
    }
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setBirthday(e.target.value + day);
  };

  const handleDayChange = (e) => {
    setDay(e.target.value);
    setBirthday(month + e.target.value);
  };

  const joinHandler = () => {
    if (isEmail === true && isPw === true && password === passwordCheck && isCheck.statusCode === 200) {
      const newUser = { email, password, passwordCheck, nickName, birthday };
      dispatch(__addUser(newUser)).then((data) => {
        // console.log("then 데이터-->", data.payload.statusCode);
        if (data.payload.statusCode === 200) {
          dispatch(alertState({ state: true, comment: "회원 가입 완료!" }));
          navigate("/");
        } else {
          dispatch(alertState({ state: true, comment: "회원 가입 실패" }));
        }
      });
    }
    if (isCheck.data !== "사용 가능한 이메일입니다.") {
      dispatch(alertState({ state: true, comment: "이메일 중복확인이 필요합니다" }));
    }
    if (!isEmail || isPw !== true || password !== passwordCheck) {
      dispatch(alertState({ state: true, comment: "양식에 맞게 작성해 주세요!" }));
    }
  };

  return (
    <ScreenLayout>
      <PreviewArea />
      <LoginWrapper
        onSubmit={(e) => {
          e.preventDefault();

          joinHandler();
        }}>
        <BackPage onClick={() => navigate("/")}>
          <Bcak />
          <span>뒤로가기</span>
        </BackPage>
        <JoinBox>
          <JoinText>회원가입</JoinText>
          <InputArea>
            <InputWrapper>
              <InputTitleText>이메일</InputTitleText>
              <InputFrame isBorder={email === "" ? "none" : isEmail}>
                <InputInnerWrap>
                  <input type="text" value={email} onChange={handleEmailChange} />
                  <CheckButton onClick={() => emailCheckHandler(email)}>중복확인</CheckButton>
                </InputInnerWrap>
              </InputFrame>
              <MessageWrapper isTrue={isEmail}>{isEmailMessage}</MessageWrapper>
            </InputWrapper>

            <InputWrapper>
              <InputTitleText>비밀번호</InputTitleText>
              <InputFrame isBorder={password === "" ? "none" : isPw}>
                <InputInnerWrap>
                  <input type="password" value={password} onChange={handlePasswordChange} />
                  {isPw ? <PwCheck className="joinIcon" /> : <Security className="joinIcon" />}
                </InputInnerWrap>
              </InputFrame>
              <MessageWrapper isTrue={isPw}>{isPwMessage}</MessageWrapper>
            </InputWrapper>

            <InputWrapper>
              <InputTitleText>비밀번호 확인</InputTitleText>
              <InputFrame isBorder={passwordCheck === "" ? "none" : password === passwordCheck}>
                <InputInnerWrap>
                  <input type="password" value={passwordCheck} onChange={handlePasswordCheckChange} />
                  {passwordCheck !== "" && password === passwordCheck ? <PwCheck className="joinIcon" /> : <Security className="joinIcon" />}
                </InputInnerWrap>
              </InputFrame>
              <MessageWrapper isTrue={passwordCheck !== "" && password === passwordCheck}>{isPwCheckMessage}</MessageWrapper>
            </InputWrapper>

            <InputWrapper>
              <InputTitleText>닉네임</InputTitleText>
              <InputFrame isBorder={nickName === "" ? "none" : nicknameRegex}>
                <InputInnerWrap>
                  <input type="text" value={nickName} onChange={handleNickNameChange} maxLength="8" />
                  {nicknameRegex && <PwCheck className="joinIcon" />}
                </InputInnerWrap>
              </InputFrame>
              <MessageWrapper isTrue={nicknameRegex}>{isNickNameMessage}</MessageWrapper>
            </InputWrapper>

            <InputWrapper>
              <InputTitleText>생일</InputTitleText>
              <InputFrameBirthday isBorder={birthday === "" ? "none" : true}>
                <BirthdayWrap>
                  <BirthdayInput onChange={handleMonthChange}>
                    <option value="">월</option>
                    {Array.from({ length: 12 }, (_, index) => {
                      const monthValue = (index + 1).toString().padStart(2, "0");
                      return <option value={monthValue}>{monthValue}</option>;
                    })}
                  </BirthdayInput>
                  <BirthdayInput onChange={handleDayChange}>
                    <option value="">일</option>
                    {Array.from({ length: 31 }, (_, index) => {
                      const dayValue = (index + 1).toString().padStart(2, "0");
                      return <option value={dayValue}>{dayValue}</option>;
                    })}
                  </BirthdayInput>
                </BirthdayWrap>
              </InputFrameBirthday>
            </InputWrapper>
          </InputArea>

          <SignUpButtton disabled={!nicknameRegex}>가입하기</SignUpButtton>

          <BottomText>
            <div>이미 가입된 계정이 있나요?</div>
            <div>
              <Link to="/">로그인하기</Link>
            </div>
          </BottomText>
        </JoinBox>
      </LoginWrapper>
    </ScreenLayout>
  );
}

const JoinBox = styled.div`
  ${(props) => props.theme.FlexCol};
  width: 24.125rem;
`;
const BackPage = styled.div`
  ${(props) => props.theme.FlexRow};
  gap: 0.5rem;
  justify-content: left;
  margin-top: 25px;
  padding-left: 2rem;
  cursor: pointer;
  span {
    font-size: 0.875rem;
  }
`;
const JoinText = styled.div`
  ${(props) => props.theme.FlexCol};
  margin-top: 40px;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const InputArea = styled.div`
  ${(props) => props.theme.FlexCol};
  justify-content: flex-start;
  margin-bottom: 1.5rem;
`;

const InputWrapper = styled.div`
  ${(props) => props.theme.FlexCol};
  align-items: flex-start;
  justify-content: flex-start;
`;

const InputTitleText = styled.div`
  font-size: 1rem;
  margin-bottom: 0.25rem;
`;

const InputFrame = styled.div`
  ${(props) => props.theme.FlexCol};
  width: 100%;
  height: 2.875rem;
  border: 0.0625rem solid ${(props) => (props.isBorder === "none" ? props.theme.Bg.color3 : props.isBorder ? "#58c179" : "#DF5445")};
  border-radius: 0.5rem;
  margin-bottom: 0.25rem;
`;

export const InputInnerWrap = styled.div`
  ${(props) => props.theme.FlexRowBetween};
  padding: 0.5rem 0.625rem 0.5rem 1.125rem;
  .joinIcon {
    margin-right: 0.625rem;
  }
`;

const InputFrameBirthday = styled(InputFrame)`
  border: none;
`;

export const BirthdayWrap = styled(InputInnerWrap)`
  padding: 0rem;
  display: flex;
  flex-direction: row;
  gap: 0.875rem;
`;

export const BirthdayInput = styled.select`
  width: 13.75rem;
  height: 2.875rem;
  border: 0.0625rem solid ${(props) => props.theme.Bg.color3};
  border-radius: 0.5rem;
  text-align: center;
`;

const CheckButton = styled.div`
  ${(props) => props.theme.FlexCol};
  width: 3.125rem;
  height: 1.75rem;
  font-size: 0.625rem;
  background: #f2f4f6;
  border-radius: 0.25rem;
  :hover {
    cursor: pointer;
  }
`;

const MessageWrapper = styled.div`
  font-size: 0.625rem;
  line-height: 0.9375rem;
  margin-bottom: 0.875rem;
  color: ${(props) => (props.isTrue ? props.theme.Bg.greenColor : props.theme.Bg.redColor)};
`;

const SignUpButtton = styled.button`
  width: 100%;
  height: 3rem;
  ${(props) => props.theme.ButtonLarge}
  font-size: 1rem;
  font-weight: 600;
  background: ${(props) => (props.disabled ? props.theme.Bg.color4 : props.theme.Bg.mainColor5)};
  color: ${(props) => (props.disabled ? props.theme.Bg.color1 : "#ffffff")};
  // 아예 버튼 클릭 막기
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;

const BottomText = styled.div`
  ${(props) => props.theme.FlexRow};
  gap: 1rem;
  margin-top: 1.5rem;
  font-size: 0.875rem;
`;

export default JoinPage;
