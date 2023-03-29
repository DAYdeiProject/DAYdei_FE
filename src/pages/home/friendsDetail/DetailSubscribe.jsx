import { React } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  NoListMessageWrapper,
  MessageBox,
  ContentArea,
  IconStyle,
  TextWrap,
  UpperText,
  BottomText,
  PostBox,
  ProfileArea,
  ProfileWrap,
  PostLeft,
  PhotoFrame,
  TextArea,
  NickNameWrap,
  EmailWrap,
  IntroductionWrap,
} from "../friendslist/FriendList";

function DetailSubscribe({ SubscribesList, setIsCalendarMainVisible, setIsFriendListVisible, setIsSearchUsersvisible, setIsFriendDetailVisible }) {
  const navigate = useNavigate();

  const otherUser = useSelector((state) => state.calendar.otherUser);

  if (SubscribesList?.length === 0) {
    return (
      <NoListMessageWrapper>
        <MessageBox>
          <ContentArea>
            <IconStyle />
            <TextWrap>
              <UpperText>{otherUser.nickName}님이 구독하는 사람</UpperText>
              <BottomText>{otherUser.nickName}님이 구독하는 사람들이 여기에 표시됩니다.</BottomText>
            </TextWrap>
          </ContentArea>
        </MessageBox>
      </NoListMessageWrapper>
    );
  }

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
