import { React, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ModalWrap from "../../../elements/ModalWrap";
import Modal from "../../../elements/Modal";
import useOutSideClick from "../../../hooks/useOutsideClick";
import { BsCardImage } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { __getMyProfile, __postProfileImgUpload, __setProfile } from "../../../redux/modules/usersSlice";
import { GiCancel } from "react-icons/gi";
import useLogin from "../../../hooks/useLogin";
import { GetUserInfo } from "../../../utils/cookie/userInfo";
import InfoSettingModal from "./InfoSettingModal";
import { CategoryText } from "../../../utils/calendar/CalendarBasic";

function ProfileSettingModal({ setIsProfileSettingModalOpen, isProfileSettingModalOpen, isEditProfile, setIsEditProfile }) {
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
  } = useLogin();

  //모달 바깥쪽을 누르면 프로필 수정 모달이 닫힘
  const handleProfileSettingModalClose = () => {
    setIsProfileSettingModalOpen(false);
  };
  const ProfileSettingModalRef = useRef(null);
  useOutSideClick(ProfileSettingModalRef, handleProfileSettingModalClose);

  //Import하여 쓰는 것들
  const dispatch = useDispatch();
  const userInfo = GetUserInfo();
  const id = userInfo.userId;

  // store에서 내 프로필 정보 가져오기
  const myProfile = useSelector((state) => state.users.myProfile);
  //myProfile에 프사/배사가 있다면 state에 저장
  useEffect(() => {
    if (myProfile.profileImage) {
      setUpdatedProfileUrl(myProfile.profileImage);
    }
    if (myProfile.backgroundImage) {
      setUpdatedBackgroundUrl(myProfile.backgroundImage);
    }
  }, [myProfile.profileImage, myProfile.backgroundImage]);

  //내 프로필의 카테고리 리스트
  const myCategory = myProfile.categoryList;
  //프로필 변경시 내 프로필 GET요청
  useEffect(() => {
    dispatch(__getMyProfile(id));
  }, [profile, isEditProfile]);

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
  };

  useEffect(() => {
    setBackgroundImageName(background ? background.name : "");
  }, [background]);

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
  };

  const deleteImageHandler = () => {
    setProfile("");
    setProfileImageUrl("");
    setUpdatedProfileUrl("");
  };

  const deleteBackGroundHandler = () => {
    setBackgroundImageName("");
    setUpdatedBackgroundUrl("");
  };

  //제출 버튼 클릭 시 호출되는 함수
  const profileChangeHandler = (e) => {
    e.preventDefault();

    // console.log("store에서 불러온 내프로필-->", myProfile);
    const nickNameValue = nickName || myProfile.nickName;
    const introductionValue = introduction || myProfile.introduction;
    let userProfileRequestDto = {};
    if (password === "") {
      userProfileRequestDto = {
        nickName: nickNameValue,
        introduction: introductionValue,
      };
    } else {
      userProfileRequestDto = {
        nickName: nickNameValue,
        introduction: introductionValue,
        newPassword: password,
        newPasswordConfirm: passwordCheck,
      };
    }

    const formData = new FormData();
    formData.append("userProfileRequestDto", new Blob([JSON.stringify(userProfileRequestDto)], { type: "application/json" })); // 텍스트 데이터
    formData.append("profileImage", profile); // 파일 데이터
    formData.append("backgroundImage", background); // 파일 데이터

    if ((isPw === true && password === passwordCheck) || nickNameValue !== "" || profile.length !== 0 || background.length !== 0 || introductionValue !== "") {
      // for (let value of formData.values()) {
      //   console.log("value", value);
      // }
      dispatch(__setProfile(formData)).then((data) => {
        if (data.error) {
          alert("수정 실패");
        } else {
          alert("수정 성공");
          setIsProfileSettingModalOpen(false);
          setIsEditProfile(!isEditProfile);
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

  return (
    <>
      <ModalWrap>
        <Modal width="370px" height="648px" padding="50px 0px 0px 0px;">
          <WholeAreaWrapper ref={ProfileSettingModalRef}>
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
                            <TextMain>
                              <input type="text" defaultValue={myProfile.nickName} onChange={handleNickNameChange} autoFocus maxLength="6" />
                            </TextMain>
                          </TextWrap>
                          <TextWrap>
                            <SmallTextBox>한 줄 프로필 :</SmallTextBox>
                            <TextMain>
                              <input type="text" defaultValue={myProfile.introduction} onChange={handleIntroductionChange} maxLength="30" />
                            </TextMain>
                          </TextWrap>
                          <TextWrap>
                            <SmallTextBox>관심 카테고리 :</SmallTextBox>
                            <TextMain>
                              <CategoryWrap>
                                {myCategory.length !== 0
                                  ? myCategory.map((item) => {
                                      let newCategory = CategoryText(item);
                                      return <span>{newCategory}</span>;
                                    })
                                  : "선택한 카테고리가 없습니다."}
                              </CategoryWrap>
                            </TextMain>
                          </TextWrap>
                        </TextArea>
                      </MyProfileSection>
                    ) : (
                      <InfoSettingModal
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
              </form>
            </ContentWrapper>
          </WholeAreaWrapper>
        </Modal>
      </ModalWrap>
    </>
  );
}

export default ProfileSettingModal;

const WholeAreaWrapper = styled.div`
  width: 320px;
  height: 548px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: pink; */
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* background-color: blue; */
`;

const AboveButtonArea = styled.div`
  width: 100%;
  height: 463px;
  display: flex;
  flex-direction: column;
  /* background-color: skyblue; */
`;

const TitleTextWrap = styled.div`
  width: 100%;
  height: 28.77px;
  font-size: ${(props) => props.theme.Fs.size20};
  /* background-color: pink; */
`;

const InfoArea = styled.div`
  width: 100%;
  height: 434.2px;
  display: flex;
  flex-direction: column;
  /* background-color: pink; */
  gap: 25px;
`;

const SectionChooseBox = styled.div`
  width: 100%;
  height: 46.75px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;
  :hover {
    cursor: pointer;
  }
  /* background-color: skyblue; */
`;

const SectionBox = styled.div`
  width: 143px;
  height: 31.38px;
  padding: 7.8px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 500;
  font-size: ${(props) => props.theme.Fs.size14};
  line-height: 16px;
  color: ${(props) => props.color};
  border-bottom: 1px solid ${(props) => props.borderBottom};
  /* background-color: pink; */
`;

const MyProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: skyblue; */

  width: 100%;
  height: 362.47px;
  gap: 30px;
`;

const PhotoArea = styled.div`
  width: 294px;
  height: 77px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 28px;
  /* background-color: skyblue; */
`;

const PhotoWrapSquare = styled.div`
  position: relative;
  width: 77px;
  height: 77px;
  /* background-color: red; */
`;

const CancelIcon = styled(GiCancel)`
  position: absolute;
  right: 0;
  :hover {
    cursor: pointer;
  }
`;

const PhotoWrap = styled.div`
  width: 77px;
  height: 77px;
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
  font-size: 20px;
  :hover {
    cursor: pointer;
  }
`;

const BackgroundImageArea = styled.div`
  width: 189px;
  height: 57.2px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  /* background-color: skyblue; */
  gap: 12px;
`;

const BackgroundBox = styled.div`
  width: 100%;
  height: 32.67px;
  display: flex;
  flex-direction: row;
  gap: 13px;
  /* background-color: pink; */
`;

const AddBackgroundButton = styled.div`
  width: 90px;
  height: 100%;
  background: #fbfeff;
  border: 1px solid #121212;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 600;
  font-size: ${(props) => props.theme.Fs.size12};
  line-height: 14px;

  :hover {
    cursor: pointer;
  }
`;

const BackgroundRight = styled.div`
  width: 86px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: ${(props) => props.theme.Bg.fontColor2};
  background-color: #f2f4f6;
  border-radius: 4px;
  padding: 7px;
`;

const FileNameWrap = styled.div`
  background-color: #f2f4f6;
  font-size: ${(props) => props.theme.Fs.size12};
  font-weight: 400;
  line-height: 14px;
`;

const LimitTextWrap = styled.div`
  width: 100%;
  height: 13px;

  font-weight: 400;
  font-size: 10.5px;
  color: #494d55;
`;

const TextArea = styled.div`
  width: 100%;
  height: 256px;
  /* background-color: yellow; */
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const TextWrap = styled.div`
  height: 73px;
  display: flex;
  flex-direction: column;
  /* background-color: pink; */
  gap: 7.5px;
`;

export const SmallTextBox = styled.div`
  color: #494d55;
  font-weight: 500;
  font-size: ${(props) => props.theme.Fs.size16};
  line-height: 18px;
`;

export const TextMain = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px solid #afb4bf;
  border-radius: 8px;
  input[type="text"],
  input[type="password"] {
    width: 282.5px;
  }
  /* background-color: skyblue; */
`;

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

export const CheckMessage = styled.div`
  font-size: 7px;
  /* text-align: center; */
  /* background-color: yellow; */
`;

const IconStyle = styled(BsCardImage)`
  margin-right: 5px;
  margin-left: 5px;
`;

const BackgroundCancel = styled(GiCancel)`
  margin-left: 5px;
`;

const GapArea = styled.div`
  width: 100%;
  height: 44px;
  /* background-color: pink; */
`;

const ButtonArea = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  flex-direction: row;
  /* background-color: lightgray; */
  justify-content: center;
  gap: 8px;
`;

const ButtonWrap = styled.button`
  height: 100%;
  width: 132px;
  background-color: ${(props) => props.theme.Bg.deepColor};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #afb4bf;
  color: ${(props) => props.theme.Bg.lightColor};
  border: 1.3px solid #121212;
  box-shadow: 2px 2px 0px #000000;
  border-radius: 4px;
  font-weight: 600;
  font-size: ${(props) => props.theme.Fs.size16};
  line-height: 18px;
  :hover {
    cursor: pointer;
  }
`;

const ButtonSubmit = styled(ButtonWrap)`
  background: #0eafe1;
`;
