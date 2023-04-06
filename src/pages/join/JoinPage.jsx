import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { __addUser, __emailCheck } from "../../redux/modules/usersSlice";

import Footer from "../../layout/Footer";
import PreviewArea from "../intro/PreviewArea";
import useLogin from "../../hooks/useLogin";

import { PageWrapper, ScreenLayout, LoginWrapper } from "../intro/IntroPage";
import { ReactComponent as PwCheck } from "../../assets/sign/pwCheck.svg";
import { ReactComponent as Security } from "../../assets/sign/security.svg";
import { ReactComponent as Bcak } from "../../assets/sign/back.svg";

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
        console.log("then에서 나오는 200-->", data);
        if (data.payload.statusCode !== 200) {
          alert(data.payload.data);
        } else {
          alert("사용 가능한 이메일입니다.");
        }
      });
    }
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setBirthday(e.target.value + day);
  };

  console.log(day, month, birthday);

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
    <PageWrapper>
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
    </PageWrapper>
  );
}

const JoinBox = styled.div`
  ${(props) => props.theme.FlexCol};
  width: 386px;
`;
const BackPage = styled.div`
  ${(props) => props.theme.FlexRow};
  gap: 8px;
  justify-content: left;
  margin-top: 32px;
  padding-left: 32px;
  cursor: pointer;
  span {
    font-size: 14px;
  }
`;
const JoinText = styled.div`
  ${(props) => props.theme.FlexCol};
  margin-top: 70px;
  margin-bottom: 24px;
  font-size: 24px;
`;

const InputArea = styled.div`
  ${(props) => props.theme.FlexCol};
  justify-content: flex-start;
  margin-bottom: 24px;
`;

const InputWrapper = styled.div`
  ${(props) => props.theme.FlexCol};
  align-items: flex-start;
  justify-content: flex-start;
`;

const InputTitleText = styled.div`
  font-size: 16px;
  margin-bottom: 4px;
`;

const InputFrame = styled.div`
  ${(props) => props.theme.FlexCol};
  width: 100%;
  height: 46px;
  border: 1px solid ${(props) => (props.isBorder === "none" ? props.theme.Bg.color3 : props.isBorder ? "#58c179" : "#DF5445")};
  border-radius: 8px;
  margin-bottom: 4px;
`;

const InputInnerWrap = styled.div`
  ${(props) => props.theme.FlexRowBetween};
  padding: 8px 10px 8px 18px;
  .joinIcon {
    margin-right: 10px;
  }
`;

const InputFrameBirthday = styled(InputFrame)`
  border: none;
`;

const BirthdayWrap = styled(InputInnerWrap)`
  padding: 0px;
  display: flex;
  flex-direction: row;
  gap: 14px;
`;

const BirthdayInput = styled.select`
  width: 220px;
  height: 46px;
  border: 1px solid ${(props) => props.theme.Bg.border1};
  border-radius: 8px;
  text-align: center;
`;

const CheckButton = styled.div`
  ${(props) => props.theme.FlexCol};
  width: 50px;
  height: 28px;
  font-size: 10px;
  background: #f2f4f6;
  border-radius: 4px;
  :hover {
    cursor: pointer;
  }
`;

const MessageWrapper = styled.div`
  font-size: 10px;
  line-height: 15px;
  margin-bottom: 14px;
  color: ${(props) => (props.isTrue ? "#58c179" : "#DF5445")};
`;

const SignUpButtton = styled.button`
  width: 100%;
  height: 48px;
  ${(props) => props.theme.ButtonLarge}
  font-size: 16px;
  font-weight: 600;
  background: ${(props) => (props.disabled ? props.theme.Bg.mainColor4 : props.theme.Bg.mainColor5)};
  color: ${(props) => (props.disabled ? props.theme.Bg.color1 : "#ffffff")};
  // 아예 버튼 클릭 막기
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;

const BottomText = styled.div`
  ${(props) => props.theme.FlexRow};
  gap: 16px;
  margin-top: 24px;
  font-size: 14px;
`;

export default JoinPage;
