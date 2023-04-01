import { React, useState, useEffect } from "react";
import styled from "styled-components";
import ModalWrap from "../../elements/ModalWrap";
import Modal from "../../elements/Modal";
import { __getRequestedUsersList, __acceptNewFriend, __cancelRequest } from "../../redux/modules/friendsSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

function ApproveRequestModal({ ApproveRequestModalRef, RequestedUsersList, setIsApproveRequestModalOpen }) {
  const [userInfo, setUserInfo] = useState({ userId: "", nickName: "" });
  const acceptStatusCode = useSelector((state) => state.friends.acceptStatusCode);
  const token = Cookies.get("accessJWTToken");

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

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
        <Modal padding="5px 0px" height="420px">
          <ModalContent ref={ApproveRequestModalRef}>
            <ModalHeader>친구신청 목록</ModalHeader>
            <ModalContentWrap>
              {RequestedUsersList.map((user) => (
                <>
                  <PostWrap>
                    <UserInfoWrap>
                      <NickNameWrap>{user.nickName ? user.nickName : "이름 없음"}</NickNameWrap>
                      <IntroductionWrap>{user.introduction ? user.introduction : "안녕하세요, 친구신청합니다."}</IntroductionWrap>
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
                        거절
                      </ButtonRefuse>
                    </ButtonsWrap>
                  </PostWrap>
                </>
              ))}
            </ModalContentWrap>
            <SkipButton onClick={HandleModalClose}>닫기</SkipButton>
          </ModalContent>
        </Modal>
      </ModalWrap>
    </>
  );
}

const ModalContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: pink; */
`;

const ModalHeader = styled.div`
  font-size: ${(props) => props.theme.Fs.size24};
  font-weight: 600;
  /* background-color: lightgray; */
  margin-top: 24px;
  margin-bottom: 20px;
`;

const ModalContentWrap = styled.div`
  height: 240px;
  width: 120%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  gap: 18px;
  margin-bottom: 12px;
  /* background-color: skyblue; */
  ::-webkit-scrollbar {
    display: none;
  }
  margin-bottom: 32px;
  /* background: ${(props) => props.theme.Bg.lightColor}; */
`;

const PostWrap = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;

  border-radius: 10px;
  :hover {
    cursor: pointer;
  }
  /* background-color: pink; */
  /* border: 1px solid ${(props) => props.theme.Bg.lightColor}; */
`;

const UserInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: skyblue; */
  gap: 8px;
`;

const NickNameWrap = styled.div`
  font-size: ${(props) => props.theme.Fs.size20};
  font-weight: 600;
`;

const IntroductionWrap = styled.div`
  font-size: ${(props) => props.theme.Fs.size14};
`;

const ButtonsWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  font-size: 14px;
  width: 60px;
  /* background-color: skyblue; */
  margin-left: auto;
`;

const Button = styled.div`
  border: 1px solid ${(props) => props.theme.Bg.deepColor};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 6px 6px;
  border-radius: 5px;
`;

const ButtonAccept = styled(Button)`
  background-color: ${(props) => props.theme.Bg.mainColor5};
  color: white;
`;

const ButtonRefuse = styled(Button)`
  background-color: ${(props) => props.theme.Bg.mainColor2};
`;

const SkipButton = styled.button`
  width: 200px;
  height: 42px;
  color: ${(props) => props.theme.Bg.lightColor};
  background: #494d55;

  border: 1.4px solid #121212;

  box-shadow: 2px 2px 0px #000000;
  border-radius: 4px;
  :hover {
    cursor: pointer;
  }
`;

export default ApproveRequestModal;
