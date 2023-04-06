import { React } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { textState } from "../../redux/modules/headerReducer";
import { __cancelSubscribe } from "../../redux/modules/subscribeSlice";

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
  ButtonArea,
} from "./FriendList";
import defaultProfile from "../../assets/defaultImage/profile.jpg";
import { GetUserInfo } from "../../utils/cookie/userInfo";

function SubscribeList({ SubscribesList }) {
  // console.log(subscribeList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = GetUserInfo();
  // const SubscribeList = useSelector((state) => state.subscribe.SubscribeList);
  // console.log("자식에서 찍은 구독-->", SubscribesList);

  const cancelSubscribeHandler = (id) => {
    dispatch(__cancelSubscribe(id));
  };

  if (SubscribesList?.length === 0) {
    return (
      <NoListMessageWrapper>
        <MessageBox>
          <ContentArea>
            <IconStyle />
            <TextWrap>
              <UpperText>내가 구독하는 사람</UpperText>
              <BottomText>회원님이 구독하는 사람들이 여기에 표시됩니다.</BottomText>
            </TextWrap>
          </ContentArea>
          <ButtonWrap>
            <RecommendButton
              onClick={() => {
                navigate(`/search/${userInfo.userId}`);
              }}>
              회원님을 위한 추천
            </RecommendButton>
          </ButtonWrap>
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
              dispatch(textState(""));
            }}>
            <ProfileWrap>
              <PostLeft>
                <PhotoFrame src={user.profileImage ? user.profileImage : defaultProfile}></PhotoFrame>
                <TextArea>
                  <NickNameWrap>{user.nickName ? user.nickName : "이름 없음"}</NickNameWrap>
                  <EmailWrap>@{user.email.split("@")[0]} </EmailWrap>
                </TextArea>
              </PostLeft>
              <IntroductionWrap>
                {user.introduction
                  ? user.introduction.length > 16
                    ? `${user.introduction.substr(0, 16)}...`
                    : user.introduction
                  : `${user.nickName}의 캘린더입니다.`}
              </IntroductionWrap>
            </ProfileWrap>
          </ProfileArea>
          <ButtonArea
            onClick={() => {
              cancelSubscribeHandler(user.id);
            }}>
            {user.userSubscribeCheck === true ? "구독취소" : "구독신청"}
          </ButtonArea>
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

  font-weight: 500;
  font-size: 14px;
  line-height: 140%;

  background: #fbfeff;
  border: 1px solid black;
  box-shadow: 1px 1px 0px #000000;
  border-radius: 4px;

  :hover {
    cursor: pointer;
  }
`;

export default SubscribeList;
