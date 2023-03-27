import { React, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ModalWrap from "../../../elements/ModalWrap";
import Modal from "../../../elements/Modal";
import useOutSideClick from "../../../hooks/useOutsideClick";
import { BsCardImage } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { __getMyProfile, __postProfileImgUpload, __setProfile } from "../../../redux/modules/usersSlice";
import { useParams } from "react-router-dom";
import { GiCancel } from "react-icons/gi";
import useLogin from "../../../hooks/useLogin";

function ProfileSettingModal({ setIsProfileSettingModalOpen, isProfileSettingModalOpen }) {
  const [profile, setProfile] = useState([]);
  const [background, setBackground] = useState([]);
  //업로드된 프로필 이미지 상태
  const [profileImageUrl, setProfileImageUrl] = useState("");
  //업로드된 배경 이름 상태
  const [backgroundImageName, setBackgroundImageName] = useState("");

  const {
    email,
    isEmail,
    isEmailMessage,
    handleEmailChange,
    password,
    isPw,
    isPwMessage,
    handlePasswordChange,
    passwordCheck,
    isPwCheckMessage,
    handlePasswordCheckChange,
    nickName,
    handleNickNameChange,
    birthday,
    handleBirthdayChange,
    introduction,
    handleIntroductionChange,
  } = useLogin();

  const handleProfileSettingModalClose = () => {
    setIsProfileSettingModalOpen(false);
  };

  const ProfileSettingModalRef = useRef(null);
  useOutSideClick(ProfileSettingModalRef, handleProfileSettingModalClose);

  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    dispatch(__getMyProfile(id));
  }, [isProfileSettingModalOpen, profile]);

  const myProfile = useSelector((state) => state.users.myProfile);
  //   console.log("selector로 불러온 내프로필-->", myProfile);
  // console.log("필요한 정보들-->", myProfile.nickName, myProfile.email, myProfile.introduction, myProfile.backgroundImage, myProfile.profileImage);

  const handleProfileImageClick = () => {
    document.getElementById("profileInput").click();
  };

  const handleBackgroundButtonClick = () => {
    document.getElementById("backgroundInput").click();
  };

  const profileImageHandler = (e) => {
    setProfile(e.target.files[0]);
    setProfileImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    setBackgroundImageName(background ? background.name : "");
  }, [background]);

  const backgroundImageHandler = (e) => {
    setBackground(e.target.files[0]);
  };

  const deleteImageHandler = () => {
    setProfileImageUrl("");
    if (myProfile.profileImage) {
      const newProfile = [myProfile.profileImage];
      console.log(newProfile);
      setProfile(newProfile.slice(1));
    }
  };
  console.log("프로필 배열 상태 확인-->", profile);

  const deleteBackGroundHandler = () => {
    setBackgroundImageName("");
  };

  const profileChangeHandler = (e) => {
    e.preventDefault();

    const userProfileRequestDto = {
      nickName,
      newPassword: password,
      newPasswordConfirm: passwordCheck,
      introduction: introduction,
    };

    const formData = new FormData();
    formData.append("userProfileRequestDto", new Blob([JSON.stringify(userProfileRequestDto)], { type: "application/json" })); // 텍스트 데이터
    formData.append("profileImage", profile); // 파일 데이터
    formData.append("backgroundImage", background); // 파일 데이터

    dispatch(__setProfile(formData));
  };

  return (
    <>
      <ModalWrap>
        <Modal height="580px" padding="30px 5px 10px 5px">
          <WholeAreaWrapper ref={ProfileSettingModalRef}>
            <form onSubmit={profileChangeHandler}>
              <InfoArea>
                <PhotoArea>
                  <PhotoWrapSquare>
                    {profileImageUrl || myProfile.profileImage ? <CancelIcon onClick={deleteImageHandler} /> : null}
                    <PhotoWrap>
                      {profileImageUrl ? (
                        <img src={profileImageUrl} alt="profile" width="100%" height="100%" />
                      ) : myProfile.profileImage ? (
                        <img src={myProfile.profileImage} alt="profileImage" width="100%" height="100%" />
                      ) : (
                        <ProfilePhotoIcon onClick={handleProfileImageClick} />
                      )}
                      <input id="profileInput" name="profileImage" type="file" hidden onChange={(e) => profileImageHandler(e)} />
                    </PhotoWrap>
                  </PhotoWrapSquare>
                </PhotoArea>
                <TextArea>
                  <TextWrap>
                    <TextMain>
                      <SmallTextBox>닉네임 :</SmallTextBox>
                      <input type="text" placeholder={myProfile.nickName} value={nickName} onChange={handleNickNameChange} autoFocus />
                    </TextMain>
                  </TextWrap>
                  <TextWrap>
                    <TextMain>
                      <SmallTextBox>새 비밀번호 :</SmallTextBox> <input type="password" value={password} onChange={handlePasswordChange} />
                    </TextMain>
                    <CheckMessage>{isPwMessage}</CheckMessage>
                  </TextWrap>
                  <TextWrap>
                    <TextMain>
                      <SmallTextBox>비밀번호 확인 :</SmallTextBox> <input type="password" value={passwordCheck} onChange={handlePasswordCheckChange} />
                    </TextMain>
                    <CheckMessage>{isPwCheckMessage}</CheckMessage>
                  </TextWrap>
                  <TextWrap>
                    <TextMain>
                      <SmallTextBox>소개 :</SmallTextBox>
                      <input type="text" placeholder={myProfile.introduction} value={introduction} onChange={handleIntroductionChange} />
                    </TextMain>
                  </TextWrap>
                </TextArea>
              </InfoArea>
              <BackgroundImageArea>
                <BackgroundLeft>
                  <IconStyle />
                  <span>배경사진</span>
                  <FileNameWrap>{backgroundImageName}</FileNameWrap>
                  {backgroundImageName ? <BackgroundCancel onClick={deleteBackGroundHandler} /> : null}
                </BackgroundLeft>
                <AddButton>
                  <input id="backgroundInput" name="backgroundImage" type="file" hidden onChange={(e) => backgroundImageHandler(e)} />
                  <span onClick={handleBackgroundButtonClick}>추가</span>
                </AddButton>
              </BackgroundImageArea>
              <ButtonArea>
                <ButtonWrap type="button" onClick={handleProfileSettingModalClose}>
                  취소
                </ButtonWrap>
                <ButtonWrap>수정</ButtonWrap>
              </ButtonArea>
            </form>
          </WholeAreaWrapper>
        </Modal>
      </ModalWrap>
    </>
  );
}

export default ProfileSettingModal;

const WholeAreaWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoArea = styled.div`
  height: 350px;
  width: 500px;
  display: flex;
  flex-direction: row;
  /* background-color: pink; */
  margin-bottom: 20px;
`;

const PhotoArea = styled.div`
  width: 200px;
  height: 100%;
  /* background-color: pink; */
  display: flex;
  align-items: center;
`;

const PhotoWrapSquare = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  /* background-color: pink; */
`;

const CancelIcon = styled(GiCancel)`
  position: absolute;
  right: 0;
  :hover {
    cursor: pointer;
  }
`;

const PhotoWrap = styled.div`
  width: 200px;
  height: 200px;
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
  font-size: 30px;
  :hover {
    cursor: pointer;
  }
`;

const TextArea = styled.div`
  width: 300px;
  height: 100%;
  /* background-color: yellow; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  margin-left: 10px;
  input[type="text"],
  input[type="password"] {
    width: 150px;
  }
`;

const TextWrap = styled.div`
  width: 290px;
  height: 60px;
  display: flex;
  flex-direction: row;
  padding-left: 10px;
  justify-content: center;
  /* background-color: pink; */
  flex-direction: column;
  gap: 5px;
`;

const TextMain = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 3px;
  /* background-color: skyblue; */
`;

const CheckMessage = styled.div`
  font-size: 7px;
  /* text-align: center; */
  /* background-color: yellow; */
`;

const SmallTextBox = styled.div`
  margin-right: 5px;
`;

const BackgroundImageArea = styled.div`
  /* height: 80px; */
  width: 500px;
  display: flex;
  flex-direction: row;
  /* background-color: skyblue; */
  margin-bottom: 20px;
  border: 1px solid ${(props) => props.theme.Bg.deepColor};
  border-radius: 4px;
  padding: 5px;
  justify-content: space-between;
  align-items: center;
`;

const BackgroundLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const IconStyle = styled(BsCardImage)`
  margin-right: 5px;
  margin-left: 5px;
`;

const FileNameWrap = styled.div`
  margin-left: 10px;
  background-color: skyblue;
`;

const BackgroundCancel = styled(GiCancel)`
  margin-left: 5px;
`;

const AddButton = styled.div`
  width: 40px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 3px;
  background-color: lightgray;
  :hover {
    cursor: pointer;
  }
`;

const ButtonArea = styled.div`
  height: 60px;
  width: 500px;
  display: flex;
  flex-direction: row;
  /* background-color: lightgray; */
  justify-content: center;
  gap: 60px;
  margin-top: 20px;
`;

const ButtonWrap = styled.button`
  height: 50px;
  width: 120px;
  background-color: ${(props) => props.theme.Bg.deepColor};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    cursor: pointer;
  }
  font-size: 24px;
  color: ${(props) => props.theme.Bg.lightColor};
`;