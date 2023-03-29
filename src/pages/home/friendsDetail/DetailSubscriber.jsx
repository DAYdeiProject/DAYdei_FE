import { React } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
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
  PostLeft,
  PhotoFrame,
  TextArea,
  NickNameWrap,
  EmailWrap,
  IntroductionWrap,
  ButtonArea,
} from "../friendslist/FriendList";
import { ProfileWrapLong, IntroductionWrapLong } from "../friendslist/SubscriberList";
import defaultProfile from "../../../assets/defaultImage/profile.jpg";

function DetailSubscriberList({ SubscribersList, setIsCalendarMainVisible, setIsFriendListVisible, setIsSearchUsersvisible, setIsFriendDetailVisible }) {
  // console.log(subscribeList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cancelSubscribeHandler = (id) => {
    dispatch(__cancelSubscribe(id));
  };

  const otherUser = useSelector((state) => state.calendar.otherUser);
  // console.log("다른유저-->", otherUser.nickName);

  // console.log("자식에서-->", SubscribersList);

  if (SubscribersList?.length === 0) {
    return (
      <NoListMessageWrapper>
        <MessageBox>
          <ContentArea>
            <IconStyle />
            <TextWrap>
              <UpperText>{otherUser.nickName}님을 구독하는 사람</UpperText>
              <BottomText>{otherUser.nickName}님을 구독하는 사람들이 여기에 표시됩니다.</BottomText>
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
              <IntroductionWrapLong>
                {user.introduction
                  ? user.introduction
                  : user.categoryList.length !== 0
                  ? `주로 ${user.categoryList[0]} 일정을 공유합니다.`
                  : `${user.nickName}의 캘린더 입니다.`}
              </IntroductionWrapLong>
            </ProfileWrapLong>
            <IntroductionWrap></IntroductionWrap>
          </ProfileArea>
        </PostBox>
      ))}
    </>
  );
}

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0px;
  gap: 16px;

  width: 100%;
  height: 40px;
`;

const RecommendButton = styled.div`
  display: flex;
  padding: 0px;
  gap: 16px;
  border-radius: 4px;

  /* width: 132px; */
  height: 100%;
  padding: 10px 14px;
  align-items: center;
  justify-content: center;
  text-align: center;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;

  color: #121212;
  background: #d9d9d9;
  :hover {
    cursor: pointer;
  }
`;

export default DetailSubscriberList;
