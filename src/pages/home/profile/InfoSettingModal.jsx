import React from "react";
import { useSelector } from "react-redux";
import { TextWrap, TextMain, SmallTextBox, CheckMessage } from "./ProfileSettingModal";

function InfoSettingModal({ ...props }) {
  //const myProfile = useSelector((state) => state.users.myProfile);
  const headerProfile = useSelector((state) => state.users.getHeaderProfile);
  const myBirthday = headerProfile.birthday.toString().split("");
  const myMonth = myBirthday[0] + myBirthday[1];
  const myDay = myBirthday[2] + myBirthday[3];

  return (
    <>
      <TextWrap>
        <SmallTextBox>이메일 :</SmallTextBox>
        <TextMain>
          <div>{headerProfile.email}</div>
        </TextMain>
      </TextWrap>
      <TextWrap>
        <SmallTextBox>생일 :</SmallTextBox>
        <TextMain>
          <div>
            {myMonth}월 {myDay}일
          </div>
        </TextMain>
      </TextWrap>
      <TextWrap>
        <SmallTextBox>새 비밀번호 :</SmallTextBox>
        <TextMain>
          <input type="password" value={props.password} onChange={props.handlePasswordChange} />
        </TextMain>
        <CheckMessage>{props.isPwMessage}</CheckMessage>
      </TextWrap>
      <TextWrap>
        <SmallTextBox>비밀번호 확인 :</SmallTextBox>
        <TextMain>
          <input type="password" value={props.passwordCheck} onChange={props.handlePasswordCheckChange} />
        </TextMain>
        <CheckMessage>{props.isPwCheckMessage}</CheckMessage>
      </TextWrap>
    </>
  );
}

export default InfoSettingModal;
