import React from "react";
import { useNavigate } from "react-router-dom";
import { PostBox, ProfileArea, ProfileWrap, PhotoFrame, TextArea, NickNameWrap, EmailWrap, IntroductionWrap } from "../friendslist/FriendList";

function DetailFriends({ FriendsList, setIsCalendarMainVisible, setIsFriendListVisible, setIsSearchUsersvisible, setIsFriendDetailVisible }) {
  const navigate = useNavigate();
  return (
    <>
      {FriendsList?.map((user) => (
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
        </PostBox>
      ))}
    </>
  );
}

export default DetailFriends;
