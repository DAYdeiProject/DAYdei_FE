import { React, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { __cancelSubscribe } from "../../redux/modules/subscribeSlice";
import { otherIdState } from "../../redux/modules/headerReducer";

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
import defaultProfile from "../../assets/defaultImage/profile.jpg";

function SubscriberList({ SubscribersList }) {
  // console.log(subscribeList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [number, setNumber] = useState(0);
  const width1880 = useMediaQuery({ maxWidth: 1880 });
  const width1440 = useMediaQuery({ maxWidth: 1440 });

  useEffect(() => {
    if (width1440) {
      setNumber(22);
    } else if (width1880) {
      setNumber(15);
    } else {
      setNumber(22);
    }
  }, [width1880]);

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
              navigate(`/other`);
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
                  ? user.introduction.length > number
                    ? `${user.introduction.substr(0, number)}...`
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

export default SubscriberList;

export const ProfileWrapLong = styled(ProfileWrap)`
  width: 26.25rem;

  @media screen and (max-width: 1880px) {
    width: 23rem;
  }
  @media screen and (max-width: 1440px) {
    width: 26.25rem;
  }
`;

export const IntroductionWrapLong = styled(IntroductionWrap)`
  width: 17.5rem;

  @media screen and (max-width: 1880px) {
    max-width: 16rem;
  }
  @media screen and (max-width: 1440px) {
    width: 17.5rem;
  }
`;
