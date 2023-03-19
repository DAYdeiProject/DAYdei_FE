import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { __getOtherUser } from "../redux/modules/calendarSlice";

export default function SidebarOtherCalendar({ userId }) {
  const [userInfo, setUserInfo] = useState();
  const [email, setEmail] = useState();
  const dispatch = useDispatch();
  const token = Cookies.get("accessJWTToken");

  useEffect(() => {
    dispatch(__getOtherUser({ userId, token })).then((data) => {
      setUserInfo(data.payload);
      const newEmail = data.payload?.email.split("@")[0];
      setEmail(newEmail);
    });
  }, []);

  return (
    <ProfileWrapper>
      <ImgWrapper>
        <img src={userInfo?.profileImage} />
      </ImgWrapper>
      <NickNameBox>{userInfo?.nickName}</NickNameBox>
      <EmailBox>{email}</EmailBox>
      <TextareaBox
        readOnly
        value={userInfo?.introduction ? userInfo.introduction : "아직 작성된 자기소개가 없습니다."}></TextareaBox>
      <ButtonBox>
        <button></button>
        <button></button>
      </ButtonBox>
    </ProfileWrapper>
  );
}

const ProfileWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
`;

const ImgWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  margin-bottom: 20px;
  img {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background: fixed;
  }
`;

const NickNameBox = styled.span`
  margin-bottom: 10px;
  font-size: ${(props) => props.theme.Fs.title};
`;

const EmailBox = styled.span`
  margin-bottom: 20px;
`;

const TextareaBox = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 15px;
  border: 1px solid ${(props) => props.theme.Bg.borderColor};
  border-radius: 10px;
  font-size: ${(props) => props.theme.Fs.smallText};
  resize: none;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  button {
    width: 100px;
    height: 30px;
  }
`;
