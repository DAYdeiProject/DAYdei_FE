import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { __getOtherUser } from "../redux/modules/calendarSlice";
import Loading from "./Loading";
import { __requestFriend, __cancelRequest, __acceptNewFriend } from "../redux/modules/friendsSlice";
import { __addSubscribe, __cancelSubscribe } from "../redux/modules/subscribeSlice";
import defaultProfile from "../assets/defaultImage/profile.jpg";

export default function SidebarOtherCalendar({ userId }) {
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
  const navigate = useNavigate();
  const { otherUser } = useSelector((state) => state.calendar);

  useEffect(() => {
    dispatch(__getOtherUser({ userId: param.id, token }));
  }, [userId, statusCodeFriend, statusCodeSubscribe, acceptStatusCode]);

  // 친구신청요청, 요청 취소
  const requestHandler = (id) => {
    dispatch(__requestFriend(id));
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

  const ShowFriendDetailHandler = () => {
    navigate(`/friendsdetail/${userId}`);
  };

  return (
    <>
      {otherUser.id && (
        <ProfileWrapper>
          <BackImgWrapper isCover={otherUser?.backgroundImage}>{otherUser?.backgroundImage && <img src={otherUser?.backgroundImage} />}</BackImgWrapper>
          <ImgWrapper>
            <img src={otherUser?.profileImage ? otherUser.profileImage : defaultProfile} />
          </ImgWrapper>
          <NickNameBox>{otherUser?.nickName}</NickNameBox>
          <EmailBox>@{otherUser?.email && otherUser.email.split("@")[0]}</EmailBox>
          <CountBox onClick={buttonText === "친구" ? ShowFriendDetailHandler : () => alert("친구만 열람 가능합니다.")}>
            <div>
              <span>친구 {otherUser?.friendCount}</span>
              <span>구독 {otherUser?.subscribingCount}명</span>
              <span>구독자 {otherUser?.subscriberCount}명</span>
            </div>
          </CountBox>
          <TextareaBox>{otherUser?.introduction ? otherUser.introduction : `${otherUser.nickName}의 캘린더입니다.`}</TextareaBox>
          <ButtonBox>
            <div onClick={() => handleFriendButtonClick(otherUser)}>
              {otherUser?.friendCheck === false && otherUser?.isRequestFriend === null
                ? "친구신청"
                : otherUser?.friendCheck === false && otherUser?.isRequestFriend === false
                ? "친구신청 취소"
                : otherUser?.friendCheck === false && otherUser?.isRequestFriend === true
                ? "신청 승인"
                : otherUser?.friendCheck === true && otherUser?.isRequestFriend === null
                ? "친구 끊기"
                : null}
            </div>
            <div onClick={() => handleSubscribeButtonClick(otherUser)}>{otherUser.userSubscribeCheck === false ? "구독하기" : "구독취소"}</div>
          </ButtonBox>
          <TogetherWrapper>
            {otherUser?.mutualFriendsCount !== 0 && (
              <div>
                <span>함께 아는 친구 {otherUser?.mutualFriendsCount}</span>
              </div>
            )}
          </TogetherWrapper>
        </ProfileWrapper>
      )}
    </>
  );
}

const ProfileWrapper = styled.div`
  ${(props) => props.theme.FlexCol};
  justify-content: flex-start;
  background-color: #ffffff;
  height: 100%;
`;

const BackImgWrapper = styled.div`
  background-color: ${(props) => (props.isCover ? "#ffffff" : props.theme.Bg.mainColor3)};
  width: 100%;
  height: 370px;
  border: none;
  background-size: cover;
  img {
    width: 100%;
    height: 370px;
    border: none;
  }
`;

const ImgWrapper = styled.div`
  position: absolute;
  top: 300px;
  //z-index: 0;
  ${(props) => props.theme.FlexCol}
  margin-bottom: 20px;
  img {
    ${(props) => props.theme.BoxCustom};
    width: 130px;
    height: 130px;
    border-radius: 50%;
    background: fixed;
    cursor: auto;
  }
`;

const NickNameBox = styled.span`
  padding-top: 85px;
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.Bg.color1};
`;

const EmailBox = styled.span`
  margin-bottom: 20px;
  ${(props) => props.theme.DescriptionText};
  font-size: 14px;
`;

const CountBox = styled.div`
  ${(props) => props.theme.FlexCol}
  padding: 0 40px;
  margin-bottom: 20px;
  font-size: 16px;
  color: ${(props) => props.theme.Bg.color1};
  div {
    ${(props) => props.theme.FlexRowBetween}
    padding: 0 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid ${(props) => props.theme.Bg.color3};
  }
  :hover {
    cursor: pointer;
  }
`;
const TextareaBox = styled.div`
  width: 100%;
  height: 100px;
  text-align: center;
  padding: 5px 80px;
  ${(props) => props.theme.DescriptionText};
  font-size: 14px;
  white-space: pre-wrap;
`;

const ButtonBox = styled.div`
  ${(props) => props.theme.FlexRow}
  display: flex;
  gap: 10px;
  margin: 0 40px;
  margin-top: 20px;
  font-size: 14px;
  div {
    ${(props) => props.theme.FlexCol}
    ${(props) => props.theme.ButtonMedium};
    width: 130px;
    height: 48px;
    color: ${(props) => props.theme.Bg.color1};
  }
  div:nth-child(1) {
    background-color: ${(props) => props.theme.Bg.mainColor5};
    color: #ffffff;
  }
  div:nth-child(2) {
    ${(props) => props.theme.BtnClickYellow};
  }
`;

const TogetherWrapper = styled.div`
  width: 100%;
  padding: 0 40px;
  margin-top: 20px;
  ${(props) => props.theme.DescriptionText};
  div {
    ${(props) => props.theme.FlexCol};
    background-color: ${(props) => props.theme.Bg.color4};
    width: 100%;
    height: 20px;
    border-radius: 4px;
  }
`;
