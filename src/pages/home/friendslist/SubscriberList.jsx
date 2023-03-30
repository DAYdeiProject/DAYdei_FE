import { React } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { __cancelSubscribe } from "../../../redux/modules/subscribeSlice";
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
  PhotoFrame,
  PostLeft,
  TextArea,
  NickNameWrap,
  EmailWrap,
  IntroductionWrap,
} from "./FriendList";
import defaultProfile from "../../../assets/defaultImage/profile.jpg";

function SubscriberList({ SubscribersList, setIsCalendarMainVisible, setIsFriendListVisible, setIsSearchUsersvisible, setIsFriendDetailVisible }) {
  // console.log(subscribeList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (SubscribersList?.length === 0) {
    return (
      <NoListMessageWrapper>
        <MessageBox>
          <ContentArea>
            <IconStyle />
            <TextWrap>
              <UpperText>나를 구독하는 사람</UpperText>
              <BottomText>회원님을 구독하는 사람들이 여기에 표시됩니다.</BottomText>
            </TextWrap>
          </ContentArea>
        </MessageBox>
      </NoListMessageWrapper>
    );
  }

  return (
    <>
      {SubscribersList?.map((user) => (
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
              <IntroductionWrapLong>{user.introduction ? user.introduction : `${user.nickName}의 캘린더 입니다.`}</IntroductionWrapLong>
            </ProfileWrapLong>
          </ProfileArea>
        </PostBox>
      ))}
    </>
  );
}

export default SubscriberList;

export const ProfileWrapLong = styled(ProfileWrap)`
  width: 420px;
`;

export const IntroductionWrapLong = styled(IntroductionWrap)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  width: 280px;
  height: 20px;
  /* background-color: lightblue; */

  font-weight: 400;
  font-size: 14px;
  line-height: 140%;

  color: #494d55;
`;
