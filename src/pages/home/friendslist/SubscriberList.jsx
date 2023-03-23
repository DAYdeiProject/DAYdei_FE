import { React } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { __cancelSubscribe } from "../../../redux/modules/subscribeSlice";
import { useNavigate } from "react-router-dom";
import { PostBox, ProfileArea, ProfileWrap, PhotoFrame, TextArea, NickNameWrap, EmailWrap, IntroductionWrap, ButtonArea } from "./FriendList";

function SubscriberList({ SubscribersList, setIsCalendarMainVisible, setIsFriendListVisible, setIsSearchUsersvisible, setIsFriendDetailVisible }) {
  // console.log(subscribeList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cancelSubscribeHandler = (id) => {
    dispatch(__cancelSubscribe(id));
  };

  return (
    <>
      {SubscribersList?.map((user) => (
        <PostBox key={user.id}>
          <ProfileArea
            onClick={() => {
              navigate(`/${user.id}`);
              setIsCalendarMainVisible(true);
              setIsFriendListVisible(false);
              setIsSearchUsersvisible(false);
              setIsFriendDetailVisible(false);
            }}>
            <ProfileWrap>
              <PhotoFrame src={user.profileImage}></PhotoFrame>
              <TextArea>
                <NickNameWrap>{user.nickName} </NickNameWrap>
                <EmailWrap>@{user.email.split("@")[0]} </EmailWrap>
              </TextArea>
            </ProfileWrap>
            <IntroductionWrap></IntroductionWrap>
          </ProfileArea>
          <ButtonArea
            onClick={() => {
              cancelSubscribeHandler(user.id);
            }}>
            {user.userSubscribeCheck === true ? "구독취소" : "구독신청"}
          </ButtonArea>
        </PostBox>
      ))}
    </>
  );
}

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0px;
  gap: 16px;

  width: 100%;
  height: 40px;
`;

const RecommendButton = styled.div`
  display: flex;
  padding: 0px;
  gap: 16px;
  border-radius: 4px;

  /* width: 132px; */
  height: 100%;
  padding: 10px 14px;
  align-items: center;
  justify-content: center;
  text-align: center;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;

  color: #121212;
  background: #d9d9d9;
  :hover {
    cursor: pointer;
  }
`;

export default SubscriberList;
