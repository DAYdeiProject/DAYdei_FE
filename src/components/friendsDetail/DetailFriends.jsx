import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import React, { useState, useEffect } from "react";
import { GetUserInfo } from "../../utils/cookie/userInfo";
import { otherIdState } from "../../redux/modules/headerReducer";

import defaultProfile from "../../assets/defaultImage/profile.jpg";

import { ProfileImgNickname, ProfileNicknameContainer, IntroContainer, ProfileArea } from "../friendslist/SubscriberList";
import { PostBox, PhotoFrame, NickNameWrap, EmailWrap } from "../friendslist/FriendList";

function DetailFriends({ FriendsList }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = GetUserInfo();

  const [number, setNumber] = useState(0);
  const width1820 = useMediaQuery({ maxWidth: 1820 });
  const width1720 = useMediaQuery({ maxWidth: 1720 });
  const width1640 = useMediaQuery({ maxWidth: 1640 });
  const width1518 = useMediaQuery({ maxWidth: 1518 });

  useEffect(() => {
    if (width1820 && !width1720 && !width1640 && !width1518) {
      setNumber(19);
    } else if (width1820 && width1720 && !width1640 && !width1518) {
      setNumber(16);
    } else if (width1820 && width1720 && width1640 && !width1518) {
      setNumber(22);
    } else if (width1820 && width1720 && width1640 && width1518) {
      setNumber(16);
    } else {
      setNumber(22);
    }
  }, [width1820, width1720, width1640, width1518]);

  return (
    <>
      {FriendsList?.map((user) => {
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
                if (String(user.id) === String(userInfo.userId)) {
                  navigate("/home");
                  dispatch(otherIdState(""));
                } else {
                  navigate(`/other`);
                  dispatch(otherIdState(user.id));
                }
              }}>
              <ProfileImgNickname>
                <PhotoFrame>
                  <img src={user.profileImage ? user.profileImage : defaultProfile} />
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

export default DetailFriends;
