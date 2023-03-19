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
      <BackImgWrapper>
        <img src="" />
      </BackImgWrapper>
      <ImgWrapper>
        <img src={userInfo?.profileImage} />
      </ImgWrapper>
      <NickNameBox>{userInfo?.nickName}</NickNameBox>
      <EmailBox>@{email}</EmailBox>
      <CountBox>
        <span>친구 35</span>
        <span>구독자 250</span>
      </CountBox>
      <TextareaBox>
        {userInfo?.introduction ? userInfo.introduction : "팝업스토어와 오픈일정을 올리는 것을 즐겨해요."}
      </TextareaBox>
      <ButtonBox>
        <button>친구신청</button>
        <button>구독하기</button>
      </ButtonBox>
    </ProfileWrapper>
  );
}

const ProfileWrapper = styled.div`
  ${(props) => props.theme.FlexCol};
  position: relative;
`;

const BackImgWrapper = styled.div`
  background-color: #c79786;
  width: 100%;
  height: 350px;
`;

const ImgWrapper = styled.div`
  position: absolute;
  top: 270px;
  z-index: 50px;
  ${(props) => props.theme.FlexCol}
  margin-bottom: 20px;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: fixed;
  }
`;

const NickNameBox = styled.span`
  padding-top: 100px;
  margin-bottom: 10px;
  font-size: ${(props) => props.theme.Fs.mediumText};
`;

const EmailBox = styled.span`
  margin-bottom: 20px;
  font-size: ${(props) => props.theme.Fs.smallText};
`;

const CountBox = styled.div`
  ${(props) => props.theme.FlexRowBetween}
  padding: 0 50px;
  margin-bottom: 40px;
`;
const TextareaBox = styled.div`
  width: 100%;
  height: 100px;
  text-align: center;
  padding: 0 30px;
  white-space: pre-wrap;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  button {
    width: 100px;
    height: 40px;
    border: none;
    border-radius: 5px;
  }
`;
