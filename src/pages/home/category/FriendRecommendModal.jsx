import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ModalWrap from "../../../elements/ModalWrap";
import Modal from "../../../elements/Modal";
import { ModalContent } from "./CategoryModal";
import { useDispatch, useSelector } from "react-redux";
import { __getFamousList } from "../../../redux/modules/friendsSlice";
import Cookies from "js-cookie";

function FriendRecommendModal({ setShowFriendRecommendModal, setIsModalVisible }) {
  const [userInfo, setUserInfo] = useState({ userId: "", nickName: "" });
  const FamousList = useSelector((state) => state.friends.FamousList);
  const token = Cookies.get("accessJWTToken");
  console.log(FamousList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getFamousList({ token }));
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, [dispatch]);

  return (
    <>
      <ModalWrap>
        <Modal>
          <ModalContent>
            <ModalHeader>{userInfo.nickName}님을 위한 추천 캘린더!</ModalHeader>
            <ModalContentWrap>
              {FamousList.map((user) => (
                <>
                  <PostWrap>
                    <UserInfoWrap>
                      <div>{user.nickName}</div>
                      <div>{user.introduction}안녕하세요 추천계정입니다.</div>
                    </UserInfoWrap>
                    <ButtonsWrap>
                      <Button>친구신청</Button>
                      <Button>구독하기</Button>
                    </ButtonsWrap>
                  </PostWrap>
                </>
              ))}
            </ModalContentWrap>
            <SkipButton
              onClick={() => {
                setShowFriendRecommendModal(false);
                setIsModalVisible(false);
              }}>
              닫기
            </SkipButton>
          </ModalContent>
        </Modal>
      </ModalWrap>
    </>
  );
}

const ModalHeader = styled.div`
  font-size: 28px;
  margin-bottom: 24px;
  /* background-color: lightgray; */
`;

const ModalContentWrap = styled.div`
  height: 330px;
  /* background: lightgray; */
  display: flex;
  flex-direction: column;
  /* background-color: pink; */
`;

const PostWrap = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  /* background-color: pink; */
  align-items: center;
  justify-content: space-between;
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
  height: 42px;
  :hover {
    cursor: pointer;
  }
`;

export default FriendRecommendModal;
