import { React, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { __getRequestedUsersList, __acceptNewFriend, __cancelRequest } from "../../redux/modules/friendsSlice";

import Modal from "../../elements/Modal";
import ModalWrap from "../../elements/ModalWrap";

import defaultProfile from "../../assets/defaultImage/profile.jpg";

function ApproveRequestModal({ ...props }) {
  //보낸 친구요청 or 받은 친구요청 띄우기 상태
  const [isReceivedRequestOpen, setIsReceivedRequestOpen] = useState(true);
  const [isSentRequestOpen, setIsSentRequestOpen] = useState(false);

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
    props.setIsApproveRequestModalOpen(false);
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
          <ModalContent ref={props.ApproveRequestModalRef}>
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
                {props.RequestedUsersList.map((user) => (
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
                {props.SentUsersList.map((user) => (
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
  height: 19.75rem;
  width: 20.375rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.625rem;
  /* background-color: pink; */
`;

const UpperBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.625rem;

  width: 100%;
  height: 5rem;
  /* background: lightgray; */
`;

const ModalHeader = styled.div`
  font-weight: 600;
  font-size: ${(props) => props.theme.Fs.size20};
  line-height: 1.4375rem;
  text-align: center;
`;

const OptionsWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;

  width: 100%;
  height: 1.9375rem;
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
  min-height: 13.75rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  gap: 1.25rem;
  margin-bottom: 0.75rem;
  ::-webkit-scrollbar {
    display: none;
  }
  margin-bottom: 2rem;
  /* background: lightgray; ; */
`;

const PostWrap = styled.div`
  width: 100%;
  height: 2.5rem;
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
  gap: 0.5rem;
  /* background-color: gray; */
`;

const PhotoFrame = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
`;

const ProfileWrap = styled.div`
  height: 1.9375rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.125rem;
`;

const NicknameWrap = styled.div`
  font-weight: 600;
  font-size: ${(props) => props.theme.Fs.size14};
`;

const EmailWrap = styled.div`
  font-weight: 500;
  font-size: 0.625rem;
  color: ${(props) => props.theme.Bg.fontColor3};
`;

const ButtonsWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 2.125rem;
  gap: 0.5rem;
`;

const Button = styled.div`
  height: 2.125rem;
  border: 0.0625rem solid ${(props) => props.theme.Bg.color1};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;

  font-size: ${(props) => props.theme.Fs.size12};
  font-weight: 600;
  line-height: 0.875rem;
`;

const ButtonAccept = styled(Button)`
  width: 2.5rem;
  background-color: ${(props) => props.theme.Bg.mainColor5};
  color: white;
`;

const ButtonRefuse = styled(Button)`
  width: 3.75rem;
  background-color: ${(props) => props.theme.Bg.color6};
`;

export default ApproveRequestModal;
