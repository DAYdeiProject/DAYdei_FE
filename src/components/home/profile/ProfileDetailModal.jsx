import { React, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { __getHeaderProfile } from "../../../redux/modules/usersSlice";

import ModalBox from "../../../elements/ModalBox";
import useOutSideClick from "../../../hooks/useOutsideClick";
import defaultProfile from "../../../assets/defaultImage/profile.jpg";
import { ReactComponent as WhiteDismiss } from "../../../assets/defaultIcons/whiteDismiss.svg";
import { ReactComponent as WhiteMoreY } from "../../../assets/defaultIcons/whiteMoreY.svg";
import { ReactComponent as Edit } from "../../../assets/calendarIcon/edit.svg";

export default function ProfileDetailModal({ ...props }) {
  const outside = useRef();
  const headerProfile = useSelector((state) => state.users.headerProfile);

  // 수정하기 이동
  // const editProfileClick = () => {
  //   props.setIsProfileEditOpen(!props.isProfileEditOpen);
  // };

  const moveEditClick = () => {
    props.setIsProfileSettingModalOpen(true);
    props.setIsProfileDetail(false);
  };

  // 모달창 닫기
  const closeModal = () => {
    props.setIsProfileDetail(false);
    //props.setIsProfileEditOpen(false);
  };

  useOutSideClick(outside, closeModal);

  return (
    <>
      <ModalBox isOpen={props.isProfileDetail} width={"363px"} height={"648px"}>
        <ProfileDetailWrapper ref={outside}>
          <ProfileBackground>{headerProfile && headerProfile?.backgroundImage && <img src={headerProfile.backgroundImage} alt="profile" />}</ProfileBackground>
          <ProfileImageBox>
            <img src={headerProfile && headerProfile.profileImage ? headerProfile.profileImage : defaultProfile} alt="profile" />
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
          <ButtonArea>
            <CancleButton onClick={closeModal}>취소</CancleButton>
            <ModifyButton onClick={moveEditClick}>수정하기</ModifyButton>
          </ButtonArea>
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
  top: 0.9375rem;
  right: 0.9375rem;
  z-index: 10;
  cursor: pointer;
  display: flex;
  gap: 10px;
  .moreIcon {
    fill: white !important;
    visibility: visibility !important;
  }
`;

const ProfileEditBox = styled.div`
  position: absolute;
  top: 30px;
  ${(props) => props.theme.BoxCustom};
  ${(props) => props.theme.BtnHoverYellow};
  ${(props) => props.theme.FlexRow};
  width: 100px;
  height: 40px;
  font-size: 15px;
  background-color: #ffffff;
  span {
    margin-left: 5px;
    line-height: 40px;
    text-align: center;
  }
`;

const ProfileBackground = styled.div`
  width: 100%;
  height: 18.0625rem;
  background-color: ${(props) => props.theme.Bg.mainColor3};
  border-radius: 1.25rem 1.25rem 0 0;
  img {
    width: 100%;
    height: 18.0625rem;
    border-radius: 1.25rem 1.25rem 0 0;
  }

  @media screen and (max-width: 1440px) {
    height: 300px;
    img {
      height: 300px;
    }
  }
`;

const ProfileImageBox = styled.div`
  position: absolute;
  top: 14.0625rem;
  left: 7.625rem;
  img {
    ${(props) => props.theme.BoxCustom};
    width: 7.5rem;
    height: 7.5rem;
    border-radius: 50%;
    cursor: auto;
  }

  @media screen and (max-width: 1440px) {
    top: 240px;
    left: 130px;
  }
`;

const ProfileNickNameBox = styled.div`
  ${(props) => props.theme.FlexCol};
  margin-top: 5rem;
  gap: 0.3125rem;
  span:nth-child(1) {
    font-size: 23px;
    color: #121212;
  }
  span:nth-child(2) {
    font-size: 17px;
    color: #afb4bf;
  }
`;

const ProfileCount = styled.div`
  ${(props) => props.theme.FlexCol};
  padding: 0 3.75rem;
  font-size: 0.9375rem;
  color: #121212;
`;

const ProfileBox = styled.div`
  ${(props) => props.theme.FlexRowBetween};
  padding: 1.25rem;
  border-bottom: 0.0625rem solid ${(props) => props.theme.Bg.color3};
`;

const ProfileIntro = styled.div`
  ${(props) => props.theme.FlexCol};
  justify-content: flex-start;
  margin: 10px 0;
  padding: 0 4.375rem;
  font-size: 0.9375rem;
  height: 70px;
  p {
    text-align: center;
    color: #494d55;
    font-size: 0.875rem;
  }
`;

const ButtonArea = styled.div`
  ${(props) => props.theme.FlexRow};
  gap: 8px;
`;
const CancleButton = styled.div`
  ${(props) => props.theme.FlexCol};
  width: 130px;
  height: 2.5rem;
  ${(props) => props.theme.BoxCustom};
  background: ${(props) => props.theme.Bg.color3};
  border-radius: 4px;
`;
const ModifyButton = styled(CancleButton)`
  background: ${(props) => props.theme.Bg.mainColor5};
  color: #ffffff;
`;
