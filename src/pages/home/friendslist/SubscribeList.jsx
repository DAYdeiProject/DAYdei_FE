import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { __getFriendsList } from "../../../redux/modules/friendsSlice";
import { __cancelSubscribe } from "../../../redux/modules/subscribeSlice";
import { NoListMessage, PostBox, ProfileArea, ProfilePhoto, TextArea, ButtonArea, Button } from "./FriendList";

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
            <ProfilePhoto></ProfilePhoto>
            <TextArea>
              <div>닉네임 : {user.nickName} </div>
              <div>한줄 소개 : {user.email} </div>
            </TextArea>
          </ProfileArea>
          <ButtonArea>
            <Button
              onClick={() => {
                cancelSubscribeHandler(user.id);
              }}>
              {user.userSubscribeCheck === true ? "구독 취소" : "구독 신청"}
            </Button>
          </ButtonArea>
        </PostBox>
      ))}
    </>
  );
}

export default SubscribeList;
