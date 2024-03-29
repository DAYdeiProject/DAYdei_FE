import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { otherIdState } from "../../redux/modules/headerReducer";
import { __cancelSubscribe } from "../../redux/modules/subscribeSlice";
import { useMediaQuery } from "react-responsive";
import { GetUserInfo } from "../../utils/cookie/userInfo";
import defaultProfile from "../../assets/defaultImage/profile.jpg";
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
  IntroductionDetailWrap,
  ButtonArea,
} from "./FriendList";

function SubscribeList({ SubscribesList }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = GetUserInfo();

  const cancelSubscribeHandler = (id) => {
    dispatch(__cancelSubscribe(id));
  };

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
      location.pathname === "/friendsdetail" ? setNumber(19) : setNumber(13);
    } else if (width1820 && width1720 && !width1640 && !width1518 && !width1370 && !width1280 && !width1120 && !width980) {
      location.pathname === "/friendsdetail" ? setNumber(16) : setNumber(9);
    } else if (width1820 && width1720 && width1640 && !width1518 && !width1370 && !width1280 && !width1120 && !width980) {
      location.pathname === "/friendsdetail" ? setNumber(13) : setNumber(7);
    } else if (width1820 && width1720 && width1640 && width1518 && !width1370 && !width1280 && !width1120 && !width980) {
      location.pathname === "/friendsdetail" ? setNumber(22) : setNumber(16);
    } else if (width1820 && width1720 && width1640 && width1518 && width1370 && !width1280 && !width1120 && !width980) {
      location.pathname === "/friendsdetail" ? setNumber(14) : setNumber(13);
    } else if (width1820 && width1720 && width1640 && width1518 && width1370 && width1280 && !width1120 && !width980) {
      location.pathname === "/friendsdetail" && setNumber(11);
    } else if (width1820 && width1720 && width1640 && width1518 && width1370 && width1280 && width1120 && !width980) {
      location.pathname === "/friendsdetail" && setNumber(9);
    } else if (width1820 && width1720 && width1640 && width1518 && width1370 && width1280 && width1120 && width980) {
      location.pathname === "/friendsdetail" && setNumber(6);
    } else {
      location.pathname === "/friendsdetail" ? setNumber(22) : setNumber(16);
    }
  }, [width1820, width1720, width1640, width1518, width1370, width1280, width1120, width980]);

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
                navigate(`/search`);
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
      {SubscribesList?.map((user) => {
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
              isWidth={location.pathname === "/friendsdetail"}
              onClick={() => {
                navigate(`/other`);
                dispatch(otherIdState(user.id));
              }}>
              <ProfileWrap>
                <PostLeft>
                  <PhotoFrame>
                    <img src={user.profileImage ? user.profileImage : defaultProfile} alt="profile" />
                  </PhotoFrame>
                  <TextArea>
                    <NickNameWrap>{user.nickName ? user.nickName : "이름 없음"}</NickNameWrap>
                    <EmailWrap>@{user.email.split("@")[0]} </EmailWrap>
                  </TextArea>
                </PostLeft>
                {!width1280 && location.pathname === "/mylist" ? (
                  <IntroductionWrap>
                    {user.introduction ? (user.introduction.length > number ? `${user.introduction.substr(0, number)}...` : user.introduction) : newDefault}
                  </IntroductionWrap>
                ) : (
                  location.pathname === "/friendsdetail" && (
                    <IntroductionDetailWrap>
                      {user.introduction ? (user.introduction.length > number ? `${user.introduction.substr(0, number)}...` : user.introduction) : newDefault}
                    </IntroductionDetailWrap>
                  )
                )}
              </ProfileWrap>
            </ProfileArea>
            {location.pathname === "/mylist" && (
              <ButtonArea
                onClick={() => {
                  cancelSubscribeHandler(user.id);
                }}>
                {user.userSubscribeCheck === true ? "구독취소" : "구독신청"}
              </ButtonArea>
            )}
          </PostBox>
        );
      })}
    </>
  );
}

export default SubscribeList;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0rem;
  gap: 1rem;

  width: 100%;
  height: 2.5rem;
`;

const RecommendButton = styled.div`
  ${(props) => props.theme.FlexCol}

  font-weight: 500;
  font-size: 0.875rem;

  background: #fbfeff;
  border: 0.0625rem solid black;
  box-shadow: 0.0625rem 0.0625rem 0rem #000000;
  border-radius: 0.25rem;

  :hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.Bg.mainColor2};
  }

  @media screen and (max-width: 1280px) {
    width: 120px;
    height: 30px;
    font-size: 12px;
  }
`;
