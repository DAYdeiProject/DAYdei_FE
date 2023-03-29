import React from "react";
import { useNavigate } from "react-router-dom";
import { PostBox, ProfileArea, ProfileWrap, PostLeft, PhotoFrame, TextArea, NickNameWrap, EmailWrap, IntroductionWrap } from "../friendslist/FriendList";
import { ProfileWrapLong, IntroductionWrapLong } from "../friendslist/SubscriberList";
import defaultProfile from "../../../assets/defaultImage/profile.jpg";

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
            <ProfileWrapLong>
              <PostLeft>
                <PhotoFrame src={user.profileImage ? user.profileImage : defaultProfile}></PhotoFrame>
                <TextArea>
                  <NickNameWrap>{user.nickName ? user.nickName : "이름 없음"} </NickNameWrap>
                  <EmailWrap>@{user.email.split("@")[0]} </EmailWrap>
                </TextArea>
              </PostLeft>
              <IntroductionWrapLong>
                {user.introduction
                  ? user.introduction
                  : user.categoryList.length !== 0
                  ? `주로 ${user.categoryList[0]} 일정을 공유합니다.`
                  : `${user.nickName}의 캘린더 입니다.`}
              </IntroductionWrapLong>
            </ProfileWrapLong>
          </ProfileArea>
        </PostBox>
      ))}
    </>
  );
}

export default DetailFriends;
