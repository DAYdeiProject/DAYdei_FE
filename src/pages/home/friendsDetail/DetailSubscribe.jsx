import { React } from "react";
import { useNavigate } from "react-router-dom";

import { PostBox, ProfileArea, ProfileWrap, PostLeft, PhotoFrame, TextArea, NickNameWrap, EmailWrap, IntroductionWrap } from "../friendslist/FriendList";

function DetailSubscribe({ SubscribesList, setIsCalendarMainVisible, setIsFriendListVisible, setIsSearchUsersvisible, setIsFriendDetailVisible }) {
  const navigate = useNavigate();

  return (
    <>
      {SubscribesList?.map((user) => (
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
              <PostLeft>
                <PhotoFrame src={user.profileImage}></PhotoFrame>
                <TextArea>
                  <NickNameWrap>{user.nickName} </NickNameWrap>
                  <EmailWrap>@{user.email.split("@")[0]} </EmailWrap>
                </TextArea>
              </PostLeft>
              <IntroductionWrap>{user.introduction === null ? "일정을 기록합니다." : user.introduction}</IntroductionWrap>
            </ProfileWrap>
          </ProfileArea>
        </PostBox>
      ))}
    </>
  );
}

export default DetailSubscribe;
