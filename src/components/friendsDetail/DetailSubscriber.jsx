import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __cancelSubscribe } from "../../redux/modules/subscribeSlice";
import { otherIdState } from "../../redux/modules/headerReducer";

import defaultProfile from "../../assets/defaultImage/profile.jpg";
import { ProfileImgNickname, ProfileNicknameContainer, IntroContainer, ProfileArea } from "../friendslist/SubscriberList";
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
} from "../friendslist/FriendList";

function DetailSubscriberList({ SubscribersList }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cancelSubscribeHandler = (id) => {
    dispatch(__cancelSubscribe(id));
  };
  const otherUser = useSelector((state) => state.calendar.otherUser);

  const [number, setNumber] = useState(0);
  const width1820 = useMediaQuery({ maxWidth: 1820 });
  const width1720 = useMediaQuery({ maxWidth: 1720 });
  const width1640 = useMediaQuery({ maxWidth: 1640 });
  const width1518 = useMediaQuery({ maxWidth: 1518 });
  const width1370 = useMediaQuery({ maxWidth: 1370 });
  const width1120 = useMediaQuery({ maxWidth: 1120 });
  const width980 = useMediaQuery({ maxWidth: 980 });

  useEffect(() => {
    if (width1820 && !width1720 && !width1640 && !width1518 && !width1370 && !width1120 && !width980) {
      setNumber(19);
    } else if (width1820 && width1720 && !width1640 && !width1518 && !width1370 && !width1120 && !width980) {
      setNumber(16);
    } else if (width1820 && width1720 && width1640 && !width1518 && !width1370 && !width1120 && !width980) {
      setNumber(13);
    } else if (width1820 && width1720 && width1640 && width1518 && !width1370 && !width1120 && !width980) {
      setNumber(22);
    } else if (width1820 && width1720 && width1640 && width1518 && width1370 && !width1120 && !width980) {
      setNumber(16);
    } else if (width1820 && width1720 && width1640 && width1518 && width1370 && width1120 && !width980) {
      setNumber(13);
    } else if (width1820 && width1720 && width1640 && width1518 && width1370 && width1120 && width980) {
      setNumber(7);
    } else {
      setNumber(22);
    }
  }, [width1820, width1720, width1640, width1518, width1370, width1120, width980]);

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

export default DetailSubscriberList;
