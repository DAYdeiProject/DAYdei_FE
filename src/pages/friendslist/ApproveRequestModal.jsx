import { React, useState, useEffect } from "react";
import styled from "styled-components";
import ModalWrap from "../../elements/ModalWrap";
import Modal from "../../elements/Modal";
import { __getRequestedUsersList, __acceptNewFriend, __cancelRequest } from "../../redux/modules/friendsSlice";
import { useDispatch, useSelector } from "react-redux";
import defaultProfile from "../../assets/defaultImage/profile.jpg";

function ApproveRequestModal({ ApproveRequestModalRef, RequestedUsersList, setIsApproveRequestModalOpen, SentUsersList }) {
  //보낸 친구요청 or 받은 친구요청 띄우기 상태
  const [isReceivedRequestOpen, setIsReceivedRequestOpen] = useState(false);
  const [isSentRequestOpen, setIsSentRequestOpen] = useState(true);

  //보낸 친구요청 오픈함수
  const SentRequestOpenHandler = () => {
    setIsSentRequestOpen(true);
    setIsReceivedRequestOpen(false);
  };
  //받은 친구요청 오픈함수
  const ReceivedRequestOpenHandler = () => {
    setIsReceivedRequestOpen(true);
    setIsSentRequestOpen(false);
  };

  const HandleModalClose = () => {
    setIsApproveRequestModalOpen(false);
  };

  const dispatch = useDispatch();

  const ApproveRequestHandler = (id) => {
    dispatch(__acceptNewFriend(id));
  };

  const refuseHandler = (id) => {
    dispatch(__cancelRequest(id));
  };

  return (
    <>
      <ModalWrap>
        <Modal padding="42px 0px" width="370px" height="400px">
          <ModalContent ref={ApproveRequestModalRef}>
            <UpperBox>
              <ModalHeader>친구신청</ModalHeader>
              <OptionsWrap>
                <OptionBoxSent onClick={SentRequestOpenHandler} isSent={isSentRequestOpen}>
                  보낸 친구 요청
                </OptionBoxSent>
                <OptionBoxReceived onClick={ReceivedRequestOpenHandler} isReceived={isReceivedRequestOpen}>
                  받은 친구 요청
                </OptionBoxReceived>
              </OptionsWrap>
            </UpperBox>
            {isReceivedRequestOpen ? (
              <ModalContentWrap>
                {RequestedUsersList.map((user) => (
                  <>
                    <PostWrap>
                      <UserInfoWrap>
                        <PhotoFrame src={user.profileImage ? user.profileImage : defaultProfile}></PhotoFrame>
                        <ProfileWrap>
                          <NicknameWrap>{user.nickName ? user.nickName : "이름 없음"}</NicknameWrap>
                          <EmailWrap>@{user.email.split("@")[0]}</EmailWrap>
                        </ProfileWrap>
                      </UserInfoWrap>
                      <ButtonsWrap>
                        <ButtonAccept
                          onClick={() => {
                            ApproveRequestHandler(user.id);
                          }}>
                          수락
                        </ButtonAccept>
                        <ButtonRefuse
                          onClick={() => {
                            refuseHandler(user.id);
                          }}>
                          요청 삭제
                        </ButtonRefuse>
                      </ButtonsWrap>
                    </PostWrap>
                  </>
                ))}
              </ModalContentWrap>
            ) : (
              <ModalContentWrap>
                {SentUsersList.map((user) => (
                  <>
                    <PostWrap>
                      <UserInfoWrap>
                        <PhotoFrame src={user.profileImage ? user.profileImage : defaultProfile}></PhotoFrame>
                        <ProfileWrap>
                          <NicknameWrap>{user.nickName ? user.nickName : "이름 없음"}</NicknameWrap>
                          <EmailWrap>@{user.email.split("@")[0]}</EmailWrap>
                        </ProfileWrap>
                      </UserInfoWrap>
                      <ButtonsWrap>
                        <ButtonRefuse
                          onClick={() => {
                            refuseHandler(user.id);
                          }}>
                          신청 취소
                        </ButtonRefuse>
                      </ButtonsWrap>
                    </PostWrap>
                  </>
                ))}
              </ModalContentWrap>
            )}
          </ModalContent>
        </Modal>
      </ModalWrap>
    </>
  );
}

const ModalContent = styled.div`
  height: 316px;
  width: 326px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;
  /* background-color: pink; */
`;

const UpperBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 26px;

  width: 100%;
  height: 80px;
  /* background: lightgray; */
`;

const ModalHeader = styled.div`
 
font-weight: 600;
font-size: ${(props) => props.theme.Fs.size20}
line-height: 23px;
text-align: center;
`;

const OptionsWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;

  width: 100%;
  height: 31px;
  /* background: yellow; */
`;

const OptionBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 500;
  font-size: ${(props) => props.theme.Fs.size14};
  border-bottom: 1px solid black;
`;

const OptionBoxSent = styled(OptionBox)`
  border-bottom: ${(props) => (props.isSent ? "1px solid black" : "none")};
`;

const OptionBoxReceived = styled(OptionBox)`
  border-bottom: ${(props) => (props.isReceived ? "1px solid black" : "none")};
`;

const ModalContentWrap = styled.div`
  min-height: 220px;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  gap: 20px;
  margin-bottom: 12px;
  ::-webkit-scrollbar {
    display: none;
  }
  margin-bottom: 32px;
  /* background: lightgray; ; */
`;

const PostWrap = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* background-color: skyblue; */
`;

const UserInfoWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  /* background-color: gray; */
`;

const PhotoFrame = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const ProfileWrap = styled.div`
  height: 31px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2px;
`;

const NicknameWrap = styled.div`
  font-weight: 600;
  font-size: ${(props) => props.theme.Fs.size14};
`;

const EmailWrap = styled.div`
  font-weight: 500;
  font-size: 10px;
  color: ${(props) => props.theme.Bg.fontColor3};
`;

const ButtonsWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 34px;
  gap: 8px;
`;

const Button = styled.div`
  height: 34px;
  border: 1px solid ${(props) => props.theme.Bg.color1};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;

  font-size: ${(props) => props.theme.Fs.size12};
  font-weight: 600;
  line-height: 14px;
`;

const ButtonAccept = styled(Button)`
  width: 40px;
  background-color: ${(props) => props.theme.Bg.mainColor5};
  color: white;
`;

const ButtonRefuse = styled(Button)`
  width: 60px;
  background-color: ${(props) => props.theme.Bg.color6};
`;

export default ApproveRequestModal;
