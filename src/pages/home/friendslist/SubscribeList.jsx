import React from "react";
import { NoListMessage, PostBox, ProfileArea, ProfilePhoto, TextArea, ButtonArea, Button } from "./FriendList";

function SubscribeList() {
  const data = [
    {
      nickName: "user8",
      introduction: "user8의 캘린더입니다!",
      profileImage: null,
      friendCheck: true,
    },
    {
      nickName: "user10",
      introduction: "바쁘다 바빠.",
      profileImage: null,
      friendCheck: true,
    },
    {
      nickName: "user7",
      introduction: "콘서트 예매 일정.",
      profileImage: null,
      friendCheck: true,
    },
  ];

  if (data.length === 3) {
    return (
      <NoListMessage>
        No subscription in the list
        <button>친구추천 받으러 가기</button>
      </NoListMessage>
    );
  }

  return (
    <>
      {data.map((user) => (
        <PostBox>
          <ProfileArea>
            <ProfilePhoto></ProfilePhoto>
            <TextArea>
              <div>닉네임 : {user.nickName} </div>
              <div>한줄 소개 : {user.introduction} </div>
            </TextArea>
          </ProfileArea>
          <ButtonArea>
            <Button>{user.friendCheck === true ? "구독 취소" : "구독 신청"}</Button>
          </ButtonArea>
        </PostBox>
      ))}
    </>
  );
}

export default SubscribeList;
