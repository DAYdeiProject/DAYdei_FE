import { React, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import { alertState } from "../../../redux/modules/alertReducer";
import { __getMyProfile, __postProfileImgUpload, __setProfile } from "../../../redux/modules/usersSlice";

import useLogin from "../../../hooks/useLogin";
import useOutSideClick from "../../../hooks/useOutsideClick";
import InfoSettingModal from "./InfoSettingModal";
import { CategoryText } from "../../../utils/calendar/CalendarBasic";

import { BsCardImage } from "react-icons/bs";
import { GetUserInfo } from "../../../utils/cookie/userInfo";
import { ReactComponent as Cancel } from "../../../assets/defaultIcons/dismiss.svg";
import ModalBox from "../../../elements/ModalBox";
import MemberOutModal from "./MemberOutModal";

function ProfileSettingModal({ ...props }) {
  //프로필 파일
  const [profile, setProfile] = useState("");
  //업로드된 프로필 이미지 URL 상태 저장
  const [profileImageUrl, setProfileImageUrl] = useState("");
  //업로드 완료된 프로필 이미지 URL 셀렉터로 갖고와서 state에 저장
  const [updatedProfileUrl, setUpdatedProfileUrl] = useState("");
  //배경 파일
  const [background, setBackground] = useState("");
  //업로드된 배경 이름 상태
  const [backgroundImageName, setBackgroundImageName] = useState("");
  //업로드 완료된 배경 이미지 URL 셀렉터로 갖고와서 state에 저장
  const [updatedBackgroundUrl, setUpdatedBackgroundUrl] = useState("");
  //모달에서 현재 위치한 탭 상태
  const [isProfileSectionOpen, setIsProfileSectionOpen] = useState(true);
  //기존에 있던 사진을 지움
  const [deleteProfile, setDeleteProfile] = useState(false);
  const [deleteBackground, setDeleteBackground] = useState(false);
  //탈퇴모달 오픈여부
  const [isMemberOutModalOpen, setIsMemberOutModalOpen] = useState(false);

  const {
    password,
    isPw,
    isPwMessage,
    handlePasswordChange,
    passwordCheck,
    isPwCheckMessage,
    handlePasswordCheckChange,
    nickName,
    handleNickNameChange,
    introduction,
    handleIntroductionChange,
    nicknameRegex,
  } = useLogin();

  //모달 바깥쪽을 누르면 프로필 수정 모달이 닫힘
  const handleProfileSettingModalClose = () => {
    props.setIsProfileSettingModalOpen(false);
    props.setIsProfileEditOpen(false);
  };
  const ProfileSettingModalRef = useRef(null);
  useOutSideClick(ProfileSettingModalRef, handleProfileSettingModalClose);

  //Import하여 쓰는 것들
  const dispatch = useDispatch();
  const userInfo = GetUserInfo();
  const id = userInfo.userId;

  // store에서 내 프로필 정보 가져오기
  const myProfile = useSelector((state) => state.users.myProfile);
  const headerProfile = useSelector((state) => state.users.headerProfile);
  //myProfile에 프사/배사가 있다면 state에 저장
  useEffect(() => {
    // console.log("프로필세팅모달", headerProfile);
    if (headerProfile.profileImage) {
      // console.log("처음 모달열었을 때 프로필 있는지", headerProfile.profileImage);
      setUpdatedProfileUrl(headerProfile.profileImage);
    }
    if (headerProfile.backgroundImage) {
      // console.log("처음 모달열었을 때 배경 있는지", headerProfile.profileImage);
      setUpdatedBackgroundUrl(headerProfile.backgroundImage);
    }
  }, [headerProfile.profileImage, headerProfile.backgroundImage]);

  //내 프로필의 카테고리 리스트
  const myCategory = headerProfile.categoryList;
  //프로필 변경시 내 프로필 GET요청
  useEffect(() => {
    dispatch(__getMyProfile(id));
  }, [profile, props.isEditProfile]);

  //아이콘이 파일업로드 버튼을 대체함
  const handleProfileImageClick = () => {
    document.getElementById("profileInput").click();
  };
  const handleBackgroundButtonClick = () => {
    document.getElementById("backgroundInput").click();
  };

  //업로드한 프로필 이미지 정보 저장
  const profileImageHandler = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 10 * 1024 * 1024) {
      alert("파일 사이즈가 10mb 를 넘습니다.");
      e.target.value = null;
      return;
    }
    setProfile(file);
    setProfileImageUrl(URL.createObjectURL(file));
    if (file && file.size <= 10 * 1024 * 1024) {
      setDeleteProfile(false);
    }
  };

  useEffect(() => {
    setBackgroundImageName(background ? background.name : "");
  }, [background]);

  //업로드한 배경 이미지 정보 저장
  const backgroundImageHandler = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 10 * 1024 * 1024) {
      alert("파일 사이즈가 10mb 를 넘습니다.");
      e.target.value = null;
      return;
    }
    if (file) {
      setBackground(file);
      setBackgroundImageName(URL.createObjectURL(file));
    }

    if (file && file.size <= 10 * 1024 * 1024) {
      setDeleteBackground(false);
    }
  };

  const deleteImageHandler = (e) => {
    setProfile("");
    setProfileImageUrl("");
    setUpdatedProfileUrl("");
    setDeleteProfile(true);
  };

  const deleteBackGroundHandler = () => {
    setBackgroundImageName("");
    setUpdatedBackgroundUrl("");
    setDeleteBackground(true);
  };

  //제출 버튼 클릭 시 호출되는 함수

  const profileChangeHandler = (e) => {
    e.preventDefault();
    const nickNameValue = nickName || headerProfile.nickName;
    const introductionValue = introduction || headerProfile.introduction;

    let userProfileRequestDto = {};
    if (password === "") {
      if (nicknameRegex || nickNameValue === headerProfile.nickName) {
        userProfileRequestDto = {
          nickName: nickNameValue,
          introduction: introductionValue,
          deleteProfile,
          deleteBackground,
        };
      }
    } else {
      if (isPw && password === passwordCheck) {
        userProfileRequestDto = {
          nickName: nickNameValue,
          introduction: introductionValue,
          newPassword: password,
          newPasswordConfirm: passwordCheck,
          deleteProfile,
          deleteBackground,
        };
      }
    }

    const formData = new FormData();
    formData.append("userProfileRequestDto", new Blob([JSON.stringify(userProfileRequestDto)], { type: "application/json" })); // 텍스트 데이터
    formData.append("profileImage", profile); // 파일 데이터
    formData.append("backgroundImage", background); // 파일 데이터

    if ((isPw === true && password === passwordCheck) || nickNameValue !== "" || profile !== "" || background !== "" || introductionValue !== "") {
      // for (let value of formData.values()) {
      //   console.log("value", value);
      // }
      dispatch(__setProfile(formData)).then((data) => {
        console.log("then", data);
        if (data.payload !== 200) {
          dispatch(alertState({ state: true, comment: "프로필 수정 실패" }));
        } else {
          dispatch(alertState({ state: true, comment: "프로필 수정 완료!" }));
          props.setIsProfileSettingModalOpen(false);
          props.setIsEditProfile(!props.isEditProfile);
        }
      });
    } else {
      alert("양식에 맞게 작성해주세요!");
    }
  };

  //나의 프로필, 개인정보 설정 중 어디를 보여줄지 결정하는 함수
  const handleProfileModalSection = () => {
    setIsProfileSectionOpen(true);
  };

  const handleInfoModalSection = () => {
    setIsProfileSectionOpen(false);
  };

  //1440px 미만 스크린 감지
  const isShortScreen = useMediaQuery({ maxWidth: 1440 });

  //회원탈퇴 모달 오픈함수
  const handleMemberOutModal = () => {
    setIsMemberOutModalOpen(true);
    console.log(props.isProfileSettingModalOpen);
  };

  return (
    <>
      <ModalBoxStyle width="370px" height="648px" isOpen={props.isProfileSettingModalOpen} isShort={isShortScreen}>
        <WholeAreaWrapper isShort={isShortScreen} ref={ProfileSettingModalRef}>
          <ContentWrapper>
            <form onSubmit={profileChangeHandler}>
              <AboveButtonArea>
                <TitleTextWrap>기본정보</TitleTextWrap>
                <InfoArea>
                  <SectionChooseBox>
                    <SectionBox
                      onClick={handleProfileModalSection}
                      color={isProfileSectionOpen ? "black" : "#AFB4BF"}
                      borderBottom={isProfileSectionOpen ? "#000000" : "white"}>
                      나의 프로필
                    </SectionBox>
                    <SectionBox
                      onClick={handleInfoModalSection}
                      color={!isProfileSectionOpen ? "black" : "#AFB4BF"}
                      borderBottom={!isProfileSectionOpen ? "#000000" : "white"}>
                      개인정보 설정
                    </SectionBox>
                  </SectionChooseBox>
                  {isProfileSectionOpen ? (
                    <MyProfileSection>
                      <PhotoArea>
                        <PhotoWrapSquare>
                          {updatedProfileUrl ? (
                            <CancelIcon onClick={deleteImageHandler} />
                          ) : profileImageUrl ? (
                            <CancelIcon onClick={deleteImageHandler} />
                          ) : null}
                          <PhotoWrap>
                            {updatedProfileUrl ? (
                              <img src={updatedProfileUrl} alt="profile" width="100%" height="100%" />
                            ) : profileImageUrl ? (
                              <img src={profileImageUrl} alt="profile" width="100%" height="100%" />
                            ) : (
                              <ProfilePhotoIcon onClick={handleProfileImageClick} />
                            )}
                            <input id="profileInput" name="profileImage" type="file" key={new Date()} hidden onChange={(e) => profileImageHandler(e)} />
                          </PhotoWrap>
                        </PhotoWrapSquare>
                        <BackgroundImageArea>
                          <BackgroundBox>
                            <AddBackgroundButton>
                              <input
                                id="backgroundInput"
                                name="backgroundImage"
                                type="file"
                                key={new Date()}
                                hidden
                                onChange={(e) => backgroundImageHandler(e)}
                              />
                              <span onClick={handleBackgroundButtonClick}>배경 사진</span>
                            </AddBackgroundButton>
                            <BackgroundRight>
                              {updatedBackgroundUrl ? (
                                <FileNameWrap>{updatedBackgroundUrl.substring(0, 6)}..</FileNameWrap>
                              ) : backgroundImageName ? (
                                <FileNameWrap>{backgroundImageName.substring(0, 6)}..</FileNameWrap>
                              ) : myProfile.backgroundImage && background.length !== 0 ? (
                                <FileNameWrap>{backgroundImageName}</FileNameWrap>
                              ) : null}
                              {updatedBackgroundUrl || backgroundImageName ? <BackgroundCancel onClick={deleteBackGroundHandler} /> : null}
                            </BackgroundRight>
                          </BackgroundBox>
                          <LimitTextWrap>10MB 이내의 이미지 파일을 업로드 해주세요.</LimitTextWrap>
                        </BackgroundImageArea>
                      </PhotoArea>
                      <TextArea>
                        <TextWrap>
                          <SmallTextBox>닉네임 :</SmallTextBox>
                          <TextMainNickname isBorder={nickName === "" ? "none" : nicknameRegex}>
                            <input type="text" defaultValue={headerProfile.nickName} onChange={handleNickNameChange} autoFocus maxLength="8" />
                          </TextMainNickname>
                        </TextWrap>
                        <TextWrap>
                          <SmallTextBox>한 줄 프로필 :</SmallTextBox>
                          <TextMain>
                            <input type="text" defaultValue={headerProfile.introduction} onChange={handleIntroductionChange} maxLength="30" />
                          </TextMain>
                        </TextWrap>
                        <TextWrap>
                          <SmallTextBox>관심 카테고리 :</SmallTextBox>
                          <TextMain>
                            <CategoryWrap>
                              {myCategory.length !== 0
                                ? myCategory.map((item) => {
                                    let newCategory = CategoryText(item);
                                    return <span key={item}>{newCategory}</span>;
                                  })
                                : "선택한 카테고리가 없습니다."}
                            </CategoryWrap>
                          </TextMain>
                        </TextWrap>
                      </TextArea>
                    </MyProfileSection>
                  ) : (
                    <InfoSettingModal
                      isPw={isPw}
                      password={password}
                      handlePasswordChange={handlePasswordChange}
                      isPwMessage={isPwMessage}
                      passwordCheck={passwordCheck}
                      handlePasswordCheckChange={handlePasswordCheckChange}
                      isPwCheckMessage={isPwCheckMessage}
                    />
                  )}
                </InfoArea>
              </AboveButtonArea>
              <GapArea></GapArea>
              <ButtonArea>
                <ButtonWrap type="button" onClick={handleProfileSettingModalClose}>
                  취소
                </ButtonWrap>
                <ButtonSubmit>저장하기</ButtonSubmit>
              </ButtonArea>
              <MemberOutWrap>
                {!isProfileSectionOpen && <div onClick={handleMemberOutModal}>회원 탈퇴하기</div>}
                {isMemberOutModalOpen && (
                  <MemberOutModal
                    isMemberOutModalOpen={isMemberOutModalOpen}
                    setIsMemberOutModalOpen={setIsMemberOutModalOpen}
                    isProfileSettingModalOpen={props.isProfileSettingModalOpen}
                    setIsProfileSettingModalOpen={props.setIsProfileSettingModalOpen}
                  />
                )}
              </MemberOutWrap>
            </form>
          </ContentWrapper>
        </WholeAreaWrapper>
      </ModalBoxStyle>
    </>
  );
}

export default ProfileSettingModal;

const ModalBoxStyle = styled(ModalBox)`
  height: ${(props) => (props.isShort ? "600px" : "648px")};
  background-color: pink;
`;

const WholeAreaWrapper = styled.div`
  height: 34.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 30px;
  /* background-color: skyblue; */

  height: ${(props) => (props.isShort ? "26rem" : "34.25rem")};
  @media screen and (max-width: 1440px) {
    padding: 65px 30px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* @media screen and (max-width: 1440px) {
    margin-top: 4rem;
  } */
  /* background-color: blue; */
`;

const AboveButtonArea = styled.div`
  width: 100%;
  height: 28.9375rem;
  display: flex;
  flex-direction: column;
  /* background-color: skyblue; */
  /* @media screen and (max-width: 1440px) {
    height: 21.7rem;
  } */
`;

const TitleTextWrap = styled.div`
  width: 100%;
  height: 1.7981rem;
  font-size: ${(props) => props.theme.Fs.size20};
  /* background-color: pink; */
`;

const InfoArea = styled.div`
  width: 100%;
  height: 27.1375rem;
  display: flex;
  flex-direction: column;
  /* background-color: pink; */
  gap: 1.5625rem;
`;

const SectionChooseBox = styled.div`
  width: 100%;
  height: 2.9219rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.9375rem;
  :hover {
    cursor: pointer;
  }
  /* background-color: skyblue; */
`;

const SectionBox = styled.div`
  width: 8.9375rem;
  height: 1.9612rem;
  padding: 0.4875rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: ${(props) => props.theme.Fs.size14};
  line-height: 1rem;
  color: ${(props) => props.color};
  border-bottom: 0.0625rem solid ${(props) => props.borderBottom};
  /* background-color: pink; */
`;

const MyProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: skyblue; */
  width: 100%;
  height: 22.6544rem;
  gap: 1.875rem;
`;

const PhotoArea = styled.div`
  width: 18.375rem;
  height: 4.8125rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.75rem;
  /* background-color: skyblue; */
`;

const PhotoWrapSquare = styled.div`
  position: relative;
  width: 4.8125rem;
  height: 4.8125rem;
  /* background-color: red; */
`;

const CancelIcon = styled(Cancel)`
  position: absolute;
  width: 12px;
  height: 12px;
  right: -7px;
  :hover {
    cursor: pointer;
  }
`;

const PhotoWrap = styled.div`
  width: 4.8125rem;
  height: 4.8125rem;
  background-color: lightgray;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    object-fit: cover;
    border-radius: 50%;
  }
`;

const ProfilePhotoIcon = styled(BsCardImage)`
  font-size: 1.25rem;
  :hover {
    cursor: pointer;
  }
`;

const BackgroundImageArea = styled.div`
  width: 11.8125rem;
  height: 3.575rem;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  /* background-color: skyblue; */
  gap: 0.75rem;
`;

const BackgroundBox = styled.div`
  width: 100%;
  height: 2.0419rem;
  display: flex;
  flex-direction: row;
  gap: 0.8125rem;
  /* background-color: pink; */
`;

const AddBackgroundButton = styled.div`
  width: 5.625rem;
  height: 100%;
  background: #fbfeff;
  border: 0.0625rem solid #121212;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: ${(props) => props.theme.Fs.size12};
  line-height: 0.875rem;
  :hover {
    cursor: pointer;
  }
`;

const BackgroundRight = styled.div`
  width: 5.375rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: ${(props) => props.theme.Bg.fontColor2};
  background-color: #f2f4f6;
  border-radius: 0.25rem;
  padding: 0.4375rem;
`;

const FileNameWrap = styled.div`
  background-color: #f2f4f6;
  font-size: ${(props) => props.theme.Fs.size12};
  font-weight: 400;
  line-height: 0.875rem;
`;

const LimitTextWrap = styled.div`
  width: 100%;
  height: 0.8125rem;
  font-weight: 400;
  font-size: 0.6563rem;
  color: #494d55;
`;

const TextArea = styled.div`
  width: 100%;
  height: 16rem;
  /* background-color: yellow; */
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
  @media screen and (max-width: 1440px) {
    gap: 2rem;
  }
`;

export const TextWrap = styled.div`
  height: 4.5625rem;
  display: flex;
  flex-direction: column;
  /* background-color: pink; */
  gap: 0.4688rem;
`;

export const SmallTextBox = styled.div`
  color: #494d55;
  font-weight: 500;
  font-size: ${(props) => props.theme.Fs.size16};
  line-height: 1.125rem;
`;

export const TextMain = styled.div`
  width: 100%;
  height: 2.75rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 0.0625rem solid ${(props) => props.theme.Bg.color3};
  border-radius: 0.5rem;
  input[type="text"],
  input[type="password"] {
    width: 17.6563rem;
  }
  /* background-color: skyblue; */
`;

const TextMainNickname = styled(TextMain)`
  border: 0.0625rem solid ${(props) => (props.isBorder === "none" ? props.theme.Bg.color3 : props.isBorder ? "#58c179" : "#DF5445")};
`;

export const TextMainPw = styled(TextMain)`
  border: 0.0625rem solid ${(props) => (props.isBorder === "none" ? props.theme.Bg.color3 : props.isBorder ? "#58c179" : "#DF5445")};
`;

export const TextMainPwCheck = styled(TextMain)`
  border: 0.0625rem solid ${(props) => (props.isBorder === "none" ? props.theme.Bg.color3 : props.isBorder ? "#58c179" : "#DF5445")};
`;

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3125rem;
`;

export const CheckMessage = styled.div`
  font-size: 0.4375rem;
  /* text-align: center; */
  /* background-color: yellow; */
`;

const IconStyle = styled(BsCardImage)`
  margin-right: 0.3125rem;
  margin-left: 0.3125rem;
`;

const BackgroundCancel = styled(Cancel)`
  width: 12px;
  height: 12px;
  margin-left: 0.3125rem;
  :hover {
    cursor: pointer;
  }
`;

const GapArea = styled.div`
  width: 100%;
  height: 2.75rem;
  /* background-color: pink; */
  @media screen and (max-width: 1440px) {
    height: 4.5rem;
  }
`;

const ButtonArea = styled.div`
  height: 2.5rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  /* background-color: lightgray; */
  justify-content: center;
  gap: 0.5rem;
`;

const ButtonWrap = styled.button`
  height: 100%;
  width: 8.25rem;
  background-color: ${(props) => props.theme.Bg.deepColor};
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #afb4bf;
  color: ${(props) => props.theme.Bg.lightColor};
  border: 0.0813rem solid #121212;
  box-shadow: 0.125rem 0.125rem 0rem #000000;
  border-radius: 0.25rem;
  font-weight: 600;
  font-size: ${(props) => props.theme.Fs.size16};
  line-height: 1.125rem;

  :hover {
    cursor: pointer;
  }
`;

const ButtonSubmit = styled(ButtonWrap)`
  background: #0eafe1;
  color: ${(props) => props.theme.Bg.color6};
`;

const MemberOutWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-size: ${(props) => props.theme.Fs.size12};
  color: ${(props) => props.theme.Bg.mainColor1};

  div:nth-child(1) {
    :hover {
      cursor: pointer;
    }
  }
`;
