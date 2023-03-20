import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { __getFriendsList } from "../../../redux/modules/friendsSlice";
import { __cancelSubscribe } from "../../../redux/modules/subscribeSlice";
import {
  NoListMessage,
  PostBox,
  ProfileArea,
  ProfileWrap,
  PhotoFrame,
  TextArea,
  NickNameWrap,
  EmailWrap,
  IntroductionWrap,
  ButtonArea,
} from "./FriendList";

function SubscribeList({ subscribeList }) {
  // console.log(subscribeList);
  const dispatch = useDispatch();

  const cancelSubscribeHandler = (id) => {
    dispatch(__cancelSubscribe(id));
  };

  if (subscribeList.length === 0) {
    return (
      <NoListMessage>
        No subscription in the list
        <button>친구추천 받으러 가기</button>
      </NoListMessage>
    );
  }

  return (
    <>
      {subscribeList.map((user) => (
        <PostBox key={user.id}>
          <ProfileArea>
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

export default SubscribeList;
