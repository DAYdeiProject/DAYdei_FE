import { React, useState, useEffect } from "react";
import styled from "styled-components";
import ModalWrap from "../../../elements/ModalWrap";
import Modal from "../../../elements/Modal";
import { __getRequestedUsersList, __acceptNewFriend } from "../../../redux/modules/friendsSlice";
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
  }, [acceptStatusCode]);

  const HandleModalClose = () => {
    setIsApproveRequestModalOpen(false);
  };

  const dispatch = useDispatch();

  const ApproveRequestHandler = (id) => {
    dispatch(__acceptNewFriend(id));
  };

  return (
    <>
      <ModalWrap>
        <Modal>
          <ModalContent ref={ApproveRequestModalRef}>
            <ModalHeader>친구신청 목록</ModalHeader>
            <ModalContentWrap>
              {RequestedUsersList.map((user) => (
                <>
                  <PostWrap>
                    <UserInfoWrap>
                      <div>{user.nickName}</div>
                      <div>{user.introduction}안녕하세요 친구신청합니다.</div>
                    </UserInfoWrap>
                    <ButtonsWrap>
                      <Button
                        onClick={() => {
                          ApproveRequestHandler(user.id);
                        }}>
                        신청수락
                      </Button>
                      <Button>신청거절</Button>
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
  font-size: 28px;
  margin-bottom: 28px;
  /* background-color: lightgray; */
`;

const ModalContentWrap = styled.div`
  height: 330px;
  width: 120%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  gap: 40px;
  margin-bottom: 28px;
  ::-webkit-scrollbar {
    display: none;
  }
  /* background: ${(props) => props.theme.Bg.lightColor}; */
`;

const PostWrap = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  /* background: ${(props) => props.theme.Bg.lightColor}; */
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.Bg.lightColor};
  :hover {
    cursor: pointer;
  }
`;

const UserInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  font-size: 20px;
  gap: 6px;
`;

const ButtonsWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 5px;
  gap: 6px;
  align-items: center;
  font-size: 14px;
  /* background-color: skyblue; */
`;

const Button = styled.div`
  border: 1px solid ${(props) => props.theme.Bg.deepColor};
  padding: 7px 7px;
`;

const SkipButton = styled.button`
  width: 200px;
  height: 42px;
  :hover {
    cursor: pointer;
  }
`;

export default ApproveRequestModal;
