import { React } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../../../assets/defaultImage/profile.jpg";

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
  PostLeft,
  PhotoFrame,
  TextArea,
  NickNameWrap,
  EmailWrap,
} from "../friendslist/FriendList";
import { ProfileWrapLong, IntroductionWrapLong } from "../friendslist/SubscriberList";

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

export default DetailSubscribe;
