import { React, useEffect, useRef } from "react";
import styled from "styled-components";
import ModalWrap from "../../../elements/ModalWrap";
import Modal from "../../../elements/Modal";
import useOutSideClick from "../../../hooks/useOutsideClick";
import { BsCardImage } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { __getMyProfile } from "../../../redux/modules/usersSlice";
import { useParams } from "react-router-dom";

function ProfileSettingModal({ setIsProfileSettingModalOpen }) {
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
  }, []);

  const myProfile = useSelector((state) => state.users.myProfile);
  //   console.log("selector로 불러온 내프로필-->", myProfile);
  //   console.log("필요한 정보들-->", myProfile.nickName, myProfile.email, myProfile.introduction, myProfile.backgroundImage, myProfile.profileImage);

  return (
    <>
      <ModalWrap>
        <Modal height="580px" padding="30px 5px 10px 5px">
          <WholeAreaWrapper ref={ProfileSettingModalRef}>
            <InfoArea>
              <PhotoArea>
                <PhotoWrap>
                  <ProfilePhotoIcon />
                </PhotoWrap>
              </PhotoArea>
              <TextArea>
                <TextWrap>
                  <SmallTextBox>이름 :</SmallTextBox> <input type="text" placeholder={myProfile.nickName} autoFocus />
                </TextWrap>
                <TextWrap>
                  <SmallTextBox>이메일 :</SmallTextBox> <input type="text" placeholder={myProfile.email} />
                </TextWrap>
                <TextWrap>
                  <SmallTextBox>새 비밀번호 :</SmallTextBox> <input type="password" />
                </TextWrap>
                <TextWrap>
                  <SmallTextBox>비밀번호 확인 :</SmallTextBox> <input type="password" />
                </TextWrap>
                <TextWrap>
                  <SmallTextBox>소개 :</SmallTextBox> <input type="text" placeholder={myProfile.introduction} />
                </TextWrap>
                <TextWrap>
                  <SmallTextBox>생일 :</SmallTextBox> <input type="text" placeholder={myProfile.birthday} />
                </TextWrap>
              </TextArea>
            </InfoArea>
            <BackgroundImageArea>
              <div>
                <IconStyle />
                배경사진
              </div>
              <AddButton>추가</AddButton>
            </BackgroundImageArea>
            <ButtonArea>
              <ButtonWrap onClick={handleProfileSettingModalClose}>취소</ButtonWrap>
              <ButtonWrap>수정</ButtonWrap>
            </ButtonArea>
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

const PhotoWrap = styled.div`
  width: 200px;
  height: 200px;
  background-color: lightgreen;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  /* gap: 3px; */
  margin-left: 10px;
`;

const TextWrap = styled.div`
  width: 290px;
  height: 50px;
  display: flex;
  flex-direction: row;
  padding-left: 10px;
  align-items: center;
  /* background-color: lightgray; */
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

const IconStyle = styled(BsCardImage)`
  margin-right: 5px;
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

const ButtonWrap = styled.div`
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
