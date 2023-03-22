import React from "react";
import { PostBox, ProfileArea, ProfileWrap, PhotoFrame, TextArea, NickNameWrap, EmailWrap, IntroductionWrap } from "../friendslist/FriendList";

function DetailFriends(props) {
  return (
    <>
      {props.friendsList.map((user) => (
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
        </PostBox>
      ))}
    </>
  );
}

export default DetailFriends;
