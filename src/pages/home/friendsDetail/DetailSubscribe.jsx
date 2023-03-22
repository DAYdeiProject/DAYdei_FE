import { React } from "react";

import { PostBox, ProfileArea, ProfileWrap, PhotoFrame, TextArea, NickNameWrap, EmailWrap, IntroductionWrap } from "../friendslist/FriendList";

function DetailSubscribe(props) {
  return (
    <>
      {props.subscribeList.map((user) => (
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

export default DetailSubscribe;
