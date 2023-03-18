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
      <TextareaBox>{userInfo?.introduction}</TextareaBox>
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
  background-color: #e08868;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin-bottom: 20px;
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
  font-size: ${(props) => props.theme.Fs.day};
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
