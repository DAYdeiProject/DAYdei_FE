import { React, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
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
  PhotoFrame,
  NickNameWrap,
  EmailWrap,
} from "./FriendList";
import defaultProfile from "../../assets/defaultImage/profile.jpg";

function SubscriberList({ SubscribersList }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [number, setNumber] = useState(0);
  const width1820 = useMediaQuery({ maxWidth: 1820 });
  const width1720 = useMediaQuery({ maxWidth: 1720 });
  const width1640 = useMediaQuery({ maxWidth: 1640 });
  const width1518 = useMediaQuery({ maxWidth: 1518 });
  const width1370 = useMediaQuery({ maxWidth: 1370 });
  const width1280 = useMediaQuery({ maxWidth: 1280 });
  const width1120 = useMediaQuery({ maxWidth: 1120 });
  const width980 = useMediaQuery({ maxWidth: 980 });

  useEffect(() => {
    if (width1820 && !width1720 && !width1640 && !width1518 && !width1370 && !width1280 && !width1120 && !width980) {
      setNumber(19);
    } else if (width1820 && width1720 && !width1640 && !width1518 && !width1370 && !width1280 && !width1120 && !width980) {
      setNumber(16);
    } else if (width1820 && width1720 && width1640 && !width1518 && !width1370 && !width1280 && !width1120 && !width980) {
      setNumber(13);
    } else if (width1820 && width1720 && width1640 && width1518 && !width1370 && !width1280 && !width1120 && !width980) {
      setNumber(22);
    } else if (width1820 && width1720 && width1640 && width1518 && width1370 && !width1280 && !width1120 && !width980) {
      setNumber(14);
    } else if (width1820 && width1720 && width1640 && width1518 && width1370 && width1280 && !width1120 && !width980) {
      setNumber(11);
    } else if (width1820 && width1720 && width1640 && width1518 && width1370 && width1280 && width1120 && !width980) {
      setNumber(9);
    } else if (width1820 && width1720 && width1640 && width1518 && width1370 && width1280 && width1120 && width980) {
      setNumber(6);
    } else {
      setNumber(22);
    }
  }, [width1820, width1720, width1640, width1518, width1370, width1280, width1120, width980]);

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
      {SubscribersList?.map((user) => {
        const defualtIntro = `${user.nickName}의 캘린더입니다.`;
        let newDefault = "";

        if (defualtIntro.length > number) {
          newDefault = defualtIntro.substr(0, number) + "...";
        } else {
          newDefault = defualtIntro;
        }

        return (
          <PostBox key={user.id}>
            <ProfileArea
              onClick={() => {
                navigate(`/other`);
                dispatch(otherIdState(user.id));
              }}>
              <ProfileImgNickname>
                <PhotoFrame>
                  <img src={user.profileImage ? user.profileImage : defaultProfile} alt="profile" />
                </PhotoFrame>
                <ProfileNicknameContainer>
                  <NickNameWrap>{user.nickName ? user.nickName : "이름 없음"} </NickNameWrap>
                  <EmailWrap>@{user.email.split("@")[0]} </EmailWrap>
                </ProfileNicknameContainer>
              </ProfileImgNickname>
              <IntroContainer>
                {user.introduction ? (user.introduction.length > number ? `${user.introduction.substr(0, number)}...` : user.introduction) : newDefault}
              </IntroContainer>
            </ProfileArea>
          </PostBox>
        );
      })}
    </>
  );
}

export default SubscriberList;

export const ProfileArea = styled.div`
  ${(props) => props.theme.FlexRow};
  justify-content: left;
  gap: 5px;

  @media screen and (max-width: 1518px) {
    height: 35px;
  }
`;

export const ProfileImgNickname = styled.div`
  ${(props) => props.theme.FlexRow};
  justify-content: left;
  gap: 5px;
  width: 180px;
  @media screen and (max-width: 1280px) {
    width: 60%;
  }
  @media screen and (max-width: 1115px) {
    width: 70%;
  }
`;
// friendsDetail-> DetailFriends / DetailSubscribe / DetailSubscriber
export const ProfileNicknameContainer = styled.div`
  ${(props) => props.theme.FlexCol};
  align-items: flex-start;
  width: 70px;
`;

export const IntroContainer = styled.div`
  width: 100%;
  font-weight: 400;
  font-size: 0.875rem;
`;
