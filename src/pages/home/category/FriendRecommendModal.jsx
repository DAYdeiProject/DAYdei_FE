import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { __getFamousList } from "../../../redux/modules/friendsSlice";
import { __addSubscribe } from "../../../redux/modules/subscribeSlice";

import Modal from "../../../elements/Modal";
import ModalWrap from "../../../elements/ModalWrap";
import Loading from "../../../components/Loading";

import { TextWrapper, ButtonArea } from "./CategoryModal";
import defaultProfile from "../../../assets/defaultImage/profile.jpg";

function FriendRecommendModal({ setIsModalVisible, showFriendRecommendModal, setShowFriendRecommendModal, setIsButtonclicked }) {
  const [userInfo, setUserInfo] = useState({ userId: "", nickName: "" });
  const { isLoading, FamousList } = useSelector((state) => state.friends);
  const [clickedButtonIds, setClickedButtonIds] = useState([]);
  //구독 눌림 상태

  const token = Cookies.get("accessJWTToken");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myProfile = useSelector((state) => state.users.myProfile);

  useEffect(() => {
    dispatch(__getFamousList({ token }));
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, [dispatch]);

  //구독하기 POST요청함수 Dispatch
  const addSubscribeHandler = (id) => {
    dispatch(__addSubscribe(id));
    setClickedButtonIds((prev) => [...prev, id]);
  };

  const Button = ({ id }) => {
    if (clickedButtonIds.includes(id)) {
      return <div>구독중</div>;
    }
    return (
      <div
        onClick={() => {
          addSubscribeHandler(id);
        }}>
        구독하기
      </div>
    );
  };

  if (isLoading) {
    return (
      <>
        <ModalWrap>
          <Modal>
            <ModalContent>
              <Loading />
            </ModalContent>
          </Modal>
        </ModalWrap>
      </>
    );
  }

  return (
    <>
      <ModalWrap>
        <Modal padding="48px 38px">
          <ModalContent>
            <ContentWrapper>
              <TextWrapper>
                <ModalHeader>{myProfile.nickName}님을 위한 추천 캘린더!</ModalHeader>
                <SubText>
                  <p>다른 사용자들을 구독하면</p>
                  <p>내 캘린더에서 확인할 수 있어요.</p>
                </SubText>
              </TextWrapper>

              <ListWrap>
                {FamousList.map((user) => (
                  <div key={user.id}>
                    <PostWrap>
                      <PhotoFrame src={user.profileImage ? user.profileImage : defaultProfile}></PhotoFrame>
                      <UserInfoWrap>
                        <UserInfoText1>{user.nickName ? user.nickName : "알수없음"}</UserInfoText1>
                        <UserInfoText2>
                          {!user.nickName
                            ? "알 수 없는 캘린더"
                            : user.introduction === null
                            ? `${user.nickName}의 캘린더입니다.`
                            : `${user.introduction.substr(0, 16)}...`}
                        </UserInfoText2>
                      </UserInfoWrap>
                      <ButtonStyle backgroundColor={clickedButtonIds.includes(user.id) ? "#FBDF96" : "#FFFFFF"}>
                        <Button id={user.id} />
                      </ButtonStyle>
                    </PostWrap>
                  </div>
                ))}
              </ListWrap>
            </ContentWrapper>
            <ButtonArea>
              <ButtonBottom
                onClick={() => {
                  setShowFriendRecommendModal(false);
                  setIsModalVisible(false);
                }}>
                시작하기
              </ButtonBottom>
            </ButtonArea>
          </ModalContent>
        </Modal>
      </ModalWrap>
    </>
  );
}

const ModalContent = styled.div`
  width: 320px;
  height: 318px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;

  width: 311px;
  height: 250px;
  /* background-color: pink; */
  margin-bottom: 26px;
`;

const ModalHeader = styled.div`
  font-size: ${(props) => props.theme.Fs.size20};
  font-weight: 500;
  /* background-color: lightgray; */
`;

const SubText = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 140%;
  text-align: center;
  color: #afb4bf;
  /* background-color: yellow; */
`;

const ListWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  width: 280px;
  height: 166px;
  /* background-color: yellow; */
`;

const PostWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 280px;
  height: 50px;
  /* background-color: pink; */
  :hover {
    cursor: pointer;
  }
`;

const PhotoFrame = styled.div`
  width: 32px;
  height: 32px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  margin-right: 8px;
`;

const UserInfoWrap = styled.div`
  /* width: 124px; */
  height: 33px;

  display: flex;
  flex-direction: column;
  gap: 2px;
  /* background-color: skyblue; */
`;

const UserInfoText1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;

const UserInfoText2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  color: #afb4bf;
`;

const ButtonStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px;

  width: 66px;
  height: 34px;

  border: 1px solid #121212;

  box-shadow: 1px 1px 0px #000000;
  border-radius: 4px;

  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  margin-left: auto;
  background-color: ${(props) => props.backgroundColor};
`;

export const ButtonBottom = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 170px;
  height: 42px;
  font-size: ${(props) => props.theme.Fs.tag};
  color: ${(props) => props.theme.Bg.lightColor};
  background: ${(props) => props.theme.Bg.mainColor5};

  border: 1.4px solid #121212;

  box-shadow: 2px 2px 0px #000000;
  border-radius: 4px;
  :hover {
    cursor: pointer;
  }
`;

export default FriendRecommendModal;
