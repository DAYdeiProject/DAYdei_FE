import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { textState } from "../../redux/modules/headerReducer";
import { otherIdState } from "../../redux/modules/usersReducer";

import defaultProfile from "../../assets/defaultImage/profile.jpg";
import { ProfileWrapLong, IntroductionWrapLong } from "../friendslist/SubscriberList";
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

function DetailSubscribe({ SubscribesList }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
              navigate(`/other`);
              dispatch(textState(""));
              dispatch(otherIdState(user.id));
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
                  ? user.introduction.length > 27
                    ? `${user.introduction.substr(0, 27)}...`
                    : user.introduction
                  : `${user.nickName}의 캘린더입니다.`}
              </IntroductionWrapLong>
            </ProfileWrapLong>
          </ProfileArea>
        </PostBox>
      ))}
    </>
  );
}

export default DetailSubscribe;
