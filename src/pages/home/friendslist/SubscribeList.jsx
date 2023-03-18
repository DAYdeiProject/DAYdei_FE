import React from "react";
import { NoListMessage, PostBox, ProfileArea, ProfilePhoto, TextArea, ButtonArea, Button } from "./FriendList";

function SubscribeList({ subscribeList }) {
  console.log(subscribeList);
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
            <Button>{user.userSubscribeCheck === true ? "구독 취소" : "구독 신청"}</Button>
          </ButtonArea>
        </PostBox>
      ))}
    </>
  );
}

export default SubscribeList;
