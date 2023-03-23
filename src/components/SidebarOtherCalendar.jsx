import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { __getOtherUser } from "../redux/modules/calendarSlice";
import Loading from "./Loading";
import { __requestFriend, __cancelRequest, __acceptNewFriend } from "../redux/modules/friendsSlice";
import { __addSubscribe, __cancelSubscribe } from "../redux/modules/subscribeSlice";

export default function SidebarOtherCalendar({ userId, handleShowFriendDetail }) {
  const dispatch = useDispatch();
  const token = Cookies.get("accessJWTToken");
  const param = useParams();
  //친구 관계, 구독상태에 따라 변하는 버튼 텍스트의 상태
  const [buttonText, setButtonText] = useState("");
  const [subscribeButtontext, setSubscribeButtonText] = useState("");
  //통신이 잘 되었음을 알려주는 statusCode -> useEffect의 의존성배열로 사용
  const statusCodeFriend = useSelector((state) => state.friends.statusCode);
  const statusCodeSubscribe = useSelector((state) => state.subscribe.statusCode);
  const acceptStatusCode = useSelector((state) => state.friends.acceptStatusCode);

  const { otherUser, isLoading } = useSelector((state) => state.calendar);

  useEffect(() => {
    dispatch(__getOtherUser({ userId: param.id, token }));
  }, [userId, statusCodeFriend, statusCodeSubscribe, acceptStatusCode]);

  // 친구신청요청, 요청 취소
  const requestHandler = (id) => {
    dispatch(__requestFriend(id));
    console.log("친구 신청 함~~~");
  };

  const cancelRequestHandler = (id) => {
    dispatch(__cancelRequest(id));
  };

  //구독하기, 구독취소
  const subscribeHandler = (id) => {
    dispatch(__addSubscribe(id));
  };

  const cancelSubscribeHandler = (id) => {
    dispatch(__cancelSubscribe(id));
  };

  //친구 신청 승인
  const ApproveRequestHandler = (id) => {
    dispatch(__acceptNewFriend(id));
  };

  //친구 버튼을 눌렀을 때 호출되는 함수 (현재 친구관계를 추적하여 그에 맞는 요청을 보낸다)
  const handleFriendButtonClick = async (user) => {
    if (user.friendCheck === false && user.isRequestFriend === null) {
      requestHandler(user.id);
    } else if ((user.friendCheck === false && user.isRequestFriend === false) || (user.friendCheck === true && user.isRequestFriend === null)) {
      cancelRequestHandler(user.id);
    } else if (user.friendCheck === false && user.isRequestFriend === true) {
      ApproveRequestHandler(user.id);
    }
  };

  //구독 버튼을 눌렀을 때 호출되는 함수 (현재 구독상태를 추적하여 그에 맞는 요청을 보낸다)
  const handleSubscribeButtonClick = async (user) => {
    if (user.userSubscribeCheck === false) {
      subscribeHandler(user.id);
    } else {
      cancelSubscribeHandler(user.id);
    }
  };

  //처음 상대방 프로필 진입 시 친구 관계/ 구독상태에 따라 버튼 텍스트를 다르게 세팅
  useEffect(() => {
    if (otherUser.friendCheck === false && otherUser.isRequestFriend === null) {
      setButtonText("친구신청");
    } else if (otherUser.friendCheck === false && otherUser.isRequestFriend === false) {
      setButtonText("친구신청 취소");
    } else if (otherUser.friendCheck === false && otherUser.isRequestFriend === true) {
      setButtonText("신청 승인");
    } else if (otherUser.friendCheck === true && otherUser.isRequestFriend === null) {
      setButtonText("친구");
    }

    otherUser.userSubscribeCheck === false ? setSubscribeButtonText("구독하기") : setSubscribeButtonText("구독취소");
  }, [otherUser]);

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
          <span>구독자 {otherUser?.subscriberCount}명</span>
          <span>구독 {otherUser?.subscribingCount}명</span>
        </CountBox>
        <TextareaBox>{otherUser?.introduction ? otherUser.introduction : otherUser.categoryList + " 일정을 올리는 것을 즐겨해요."}</TextareaBox>
        <ButtonBox>
          <button onClick={() => handleFriendButtonClick(otherUser)}>
            {otherUser?.friendCheck === false && otherUser?.isRequestFriend === null
              ? "친구신청"
              : otherUser?.friendCheck === false && otherUser?.isRequestFriend === false
              ? "친구신청 취소"
              : otherUser?.friendCheck === false && otherUser?.isRequestFriend === true
              ? "신청 승인"
              : otherUser?.friendCheck === true && otherUser?.isRequestFriend === null
              ? "친구"
              : null}
          </button>
          <button onClick={() => handleSubscribeButtonClick(otherUser)}>{otherUser.userSubscribeCheck === false ? "구독하기" : "구독취소"}</button>
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
