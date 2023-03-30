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

function ProfileSettingModal({ setIsProfileSettingModalOpen, isProfileSettingModalOpen, setIsEditProfile }) {
  const [profile, setProfile] = useState("");
  const [background, setBackground] = useState("");

  //업로드된 프로필 이미지 상태
  const [profileImageUrl, setProfileImageUrl] = useState("");
  //업로드된 배경 이름 상태
  const [backgroundImageName, setBackgroundImageName] = useState("");
  //useSelector로 요청 전송 성공코드 불러오기
  const statusCodeProfile = useSelector((state) => state.users.statusCodeProfile);
  //useSelector로 오류 메시지 불러오기
  const isError = useSelector((state) => state.users.isError);
  const isErrorMessage = useSelector((state) => state.users.isErrorMessage);
  //업로드 성공 여부 추적
  const [isUpdated, setIsUpdated] = useState(false);
  //업로드 실패 여부 추적
  const [isProfileUpdateFailed, setIsProfileUpdateFailed] = useState(false);

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

  const handleProfileSettingModalClose = () => {
    setIsProfileSettingModalOpen(false);
  };

  const ProfileSettingModalRef = useRef(null);
  useOutSideClick(ProfileSettingModalRef, handleProfileSettingModalClose);

  const dispatch = useDispatch();
  const userInfo = GetUserInfo();

  const id = userInfo.userId;

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
      console.log("지우기 전 -->", newProfile);
      setProfile(newProfile.slice(1));
      console.log("지운 후-->", profile);
    }
  };
  // console.log("프로필 배열 상태 확인-->", profile);

  const deleteBackGroundHandler = () => {
    setBackgroundImageName("");
  };

  const profileChangeHandler = (e) => {
    e.preventDefault();

    const userProfileRequestDto = {
      nickName,
      newPassword: password,
      introduction: introduction,
    };

    const formData = new FormData();
    formData.append("userProfileRequestDto", new Blob([JSON.stringify(userProfileRequestDto)], { type: "application/json" })); // 텍스트 데이터
    formData.append("profileImage", profile); // 파일 데이터
    formData.append("backgroundImage", background); // 파일 데이터

    // console.log(userProfileRequestDto, profile, background);

    if (nickName !== "" || (password === passwordCheck && password !== "") || introduction !== "") {
    }

    if ((isPw === true && password === passwordCheck) || nickName !== "" || profile.length !== 0 || background.length !== 0 || introduction !== "") {
      // for (let value of formData.values()) {
      //   console.log("value", value);
      // }
      dispatch(__setProfile(formData)).then((data) => {
        console.log(data);
        // 헤더에 이미지 최신꺼 들고오기 위해서
        setIsEditProfile(true);
        if (data.error) {
          alert("수정 실패");
        } else {
          alert("수정 성공");
        }
        // console.log("콘솔------>", data.payload.response.status);
      });
    } else {
      alert("내용을 채워주세요!");
    }
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
                      <SectionBox>나의 프로필</SectionBox>
                      <SectionBox>개인정보 설정</SectionBox>
                    </SectionChooseBox>
                    <MyProfileSection>
                      <PhotoArea>
                        <PhotoWrapSquare>
                          {profileImageUrl || (myProfile.profileImage && profile.length !== 0) ? <CancelIcon onClick={deleteImageHandler} /> : null}
                          <PhotoWrap>
                            {profileImageUrl ? (
                              <img src={profileImageUrl} alt="profile" width="100%" height="100%" />
                            ) : (
                              <ProfilePhotoIcon onClick={handleProfileImageClick} />
                            )}
                            <input id="profileInput" name="profileImage" type="file" hidden onChange={(e) => profileImageHandler(e)} />
                          </PhotoWrap>
                        </PhotoWrapSquare>
                        <BackgroundImageArea>
                          <BackgroundLeft>
                            {backgroundImageName ? (
                              <FileNameWrap>{backgroundImageName}</FileNameWrap>
                            ) : myProfile.backgroundImage && background.length !== 0 ? (
                              <FileNameWrap>{backgroundImageName}</FileNameWrap>
                            ) : null}
                            {backgroundImageName ? <BackgroundCancel onClick={deleteBackGroundHandler} /> : null}
                          </BackgroundLeft>
                          <AddButton>
                            <input id="backgroundInput" name="backgroundImage" type="file" hidden onChange={(e) => backgroundImageHandler(e)} />
                            <span onClick={handleBackgroundButtonClick}>추가</span>
                          </AddButton>
                        </BackgroundImageArea>
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
                    </MyProfileSection>
                  </InfoArea>
                </AboveButtonArea>
                <GapArea></GapArea>
                <ButtonArea>
                  <ButtonWrap type="button" onClick={handleProfileSettingModalClose}>
                    취소
                  </ButtonWrap>
                  <ButtonWrap>수정</ButtonWrap>
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
  border-bottom: 0.960961px solid #000000;
  /* background-color: pink; */
`;

const MyProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: yellow;

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
  background-color: pink;
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
  background-color: skyblue;
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
  border: 1.34535px solid #121212;
  box-shadow: 1.92192px 1.92192px 0px #000000;
  border-radius: 3.84384px;
  font-weight: 600;
  font-size: ${(props) => props.theme.Fs.size14};
  line-height: 18px;
  :hover {
    cursor: pointer;
  }
  font-size: 24px;
`;
