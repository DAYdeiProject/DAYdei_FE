import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { GetUserInfo } from "../../utils/cookie/userInfo";
import { otherIdState } from "../../redux/modules/headerReducer";

import defaultProfile from "../../assets/defaultImage/profile.jpg";

import { ProfileWrapLong, IntroductionWrapLong } from "../friendslist/SubscriberList";
import { PostBox, ProfileArea, PostLeft, PhotoFrame, TextArea, NickNameWrap, EmailWrap } from "../friendslist/FriendList";

function DetailFriends({ FriendsList }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = GetUserInfo();

  return (
    <>
      {FriendsList?.map((user) => (
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

export default DetailFriends;
