import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { __getOtherUser } from "../redux/modules/calendarSlice";
import Loading from "./Loading";

export default function SidebarOtherCalendar({ userId, handleShowFriendDetail }) {
  const dispatch = useDispatch();
  const token = Cookies.get("accessJWTToken");
  const param = useParams();

  const { otherUser, isLoading } = useSelector((state) => state.calendar);

  useEffect(() => {
    dispatch(__getOtherUser({ userId: param.id, token }));
  }, [userId]);

  return (
    <>
      {isLoading && <Loading />}
      <ProfileWrapper>
        <BackImgWrapper>
          <img src={otherUser?.backgroundImage} />
        </BackImgWrapper>
        <ImgWrapper>
          <img src={otherUser?.profileImage} />
        </ImgWrapper>
        <NickNameBox>{otherUser?.nickName}</NickNameBox>
        <EmailBox>@{otherUser?.email && otherUser.email.split("@")[0]}</EmailBox>
        <CountBox onClick={handleShowFriendDetail}>
          <span>친구 {otherUser?.friendCount}</span>
          <span>구독중 {otherUser?.subscriberCount}</span>
        </CountBox>
        <TextareaBox>{otherUser?.introduction ? otherUser.introduction : otherUser.categoryList + " 일정을 올리는 것을 즐겨해요."}</TextareaBox>
        <ButtonBox>
          <button>친구신청</button>
          <button>구독하기</button>
        </ButtonBox>
      </ProfileWrapper>
    </>
  );
}

const ProfileWrapper = styled.div`
  ${(props) => props.theme.FlexCol};
  position: relative;
`;

const BackImgWrapper = styled.div`
  background-color: #cfb3a9;
  width: 100%;
  height: 340px;
`;

const ImgWrapper = styled.div`
  position: absolute;
  top: 260px;
  z-index: 50px;
  ${(props) => props.theme.FlexCol}
  margin-bottom: 20px;
  img {
    border: 1px solid black;
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
  :hover {
    cursor: pointer;
  }
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
