import { React, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { __getHeaderProfile } from "../../../redux/modules/usersSlice";

import ModalBox from "../../../elements/ModalBox";
import useOutSideClick from "../../../hooks/useOutsideClick";
import Loading from "../../../components/Loading";

import { GetUserInfo } from "../../../utils/cookie/userInfo";
import defaultProfile from "../../../assets/defaultImage/profile.jpg";
import { ReactComponent as WhiteDismiss } from "../../../assets/defaultIcons/whiteDismiss.svg";
import { ReactComponent as WhiteMoreY } from "../../../assets/defaultIcons/whiteMoreY.svg";

export default function ProfileDetailModal({ ...props }) {
  const outside = useRef();
  const headerProfile = useSelector((state) => state.users.headerProfile);

  // 수정하기 이동
  const editProfileClick = () => {
    props.setIsProfileDetail(false);
    props.setIsProfileSettingModalOpen(true);
  };

  // 모달창 닫기
  const closeModal = () => {
    props.setIsProfileDetail(false);
  };

  useOutSideClick(outside, closeModal);

  //모달 바깥쪽을 누르면 프로필 수정 모달이 닫힘

  // const handleProfileSettingModalClose = () => {
  //   setIsProfileSettingModalOpen(false);
  // };
  // const ProfileSettingModalRef = useRef(null);
  // useOutSideClick(ProfileSettingModalRef, handleProfileSettingModalClose);

  return (
    <>
      <ModalBox isOpen={props.isProfileDetail} width={"363px"} height={"648px"}>
        <ProfileDetailWrapper ref={outside}>
          <IconContainer>
            <WhiteMoreY onClick={editProfileClick} className="moreIcon" />
            <WhiteDismiss onClick={closeModal} />
          </IconContainer>
          <ProfileBackground>{headerProfile && headerProfile?.backgroundImage && <img src={headerProfile.backgroundImage} />}</ProfileBackground>
          <ProfileImageBox>
            <img src={headerProfile && headerProfile.profileImage ? headerProfile.profileImage : defaultProfile} />
          </ProfileImageBox>
          <ProfileNickNameBox>
            <span>{headerProfile && headerProfile.nickName}</span>
            <span>@{headerProfile?.email && headerProfile.email.split("@")[0]}</span>
          </ProfileNickNameBox>
          <ProfileCount>
            <ProfileBox>
              <span>친구 {headerProfile && headerProfile.friendCount}</span>
              <span>구독 {headerProfile && headerProfile.subscribingCount}</span>
              <span>구독자 {headerProfile && headerProfile.subscriberCount}</span>
            </ProfileBox>
          </ProfileCount>
          <ProfileIntro>
            <p>{headerProfile && headerProfile.introduction ? headerProfile.introduction : `${headerProfile.nickName}의 캘린더입니다.`}</p>
          </ProfileIntro>
        </ProfileDetailWrapper>
      </ModalBox>
    </>
  );
}

const ProfileDetailWrapper = styled.div`
  position: relative;
  cursor: auto;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 10;
  cursor: pointer;
  .moreIcon {
    fill: white !important;
    visibility: visibility !important;
  }
`;

const ProfileBackground = styled.div`
  width: 100%;
  height: 289px;
  background-color: ${(props) => props.theme.Bg.mainColor3};
  border-radius: 20px 20px 0 0;
  img {
    width: 100%;
    height: 289px;
    border-radius: 20px 20px 0 0;
  }
`;

const ProfileImageBox = styled.div`
  position: absolute;
  top: 225px;
  left: 122px;
  img {
    ${(props) => props.theme.BoxCustom};
    width: 124px;
    height: 124px;
    border-radius: 50%;
    cursor: auto;
  }
`;

const ProfileNickNameBox = styled.div`
  ${(props) => props.theme.FlexCol};
  margin-top: 80px;
  gap: 5px;
  span:nth-child(1) {
    font-size: 25px;
    color: #121212;
  }
  span:nth-child(2) {
    font-size: 18px;
    color: #afb4bf;
  }
`;

const ProfileCount = styled.div`
  ${(props) => props.theme.FlexCol};
  padding: 0 60px;
  font-size: 15px;
  color: #121212;
`;

const ProfileBox = styled.div`
  ${(props) => props.theme.FlexRowBetween};
  padding: 20px;
  border-bottom: 1px solid ${(props) => props.theme.Bg.color3};
`;

const ProfileIntro = styled.div`
  ${(props) => props.theme.FlexCol};
  justify-content: flex-start;
  margin: 25px 0;
  padding: 0 70px;
  font-size: 15px;
  height: 90px;
  p {
    text-align: center;
    color: #494d55;
    font-size: 14px;
  }
`;
