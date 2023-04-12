import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { debounce } from "lodash";

import { __getFamousList } from "../../../redux/modules/friendsSlice";
import { __addSubscribe, __cancelSubscribe } from "../../../redux/modules/subscribeSlice";

import Modal from "../../../elements/Modal";
import ModalWrap from "../../../elements/ModalWrap";
import Loading from "../../Loading";

import { TextWrapper, ButtonArea } from "./CategoryModal";
import defaultProfile from "../../../assets/defaultImage/profile.jpg";

function FriendRecommendModal({ setIsModalVisible, setShowFriendRecommendModal }) {
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

  //구독 디바운스
  const debounceSubscribeHandler = debounce((id) => {
    dispatch(__addSubscribe(id));
    setClickedButtonIds((prev) => [...prev, id]);
  }, 300);

  //구독 취소 디바운스
  const debounceCancelSubscribeHandler = debounce((id) => {
    dispatch(__cancelSubscribe(id));
    setClickedButtonIds((prev) => prev.filter((prevId) => prevId !== id));
  }, 300);

  const Button = ({ id }) => {
    if (clickedButtonIds.includes(id)) {
      return (
        <div
          onClick={() => {
            debounceCancelSubscribeHandler(id);
          }}>
          구독취소
        </div>
      );
    }
    return (
      <div
        onClick={() => {
          debounceSubscribeHandler(id);
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
  width: 20rem;
  height: 19.875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.125rem;

  width: 19.4375rem;
  height: 15.625rem;
  /* background-color: pink; */
  margin-bottom: 1.625rem;
`;

const ModalHeader = styled.div`
  font-size: ${(props) => props.theme.Fs.size20};
  font-weight: 500;
  /* background-color: lightgray; */
`;

const SubText = styled.div`
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 140%;
  text-align: center;
  color: #afb4bf;
  /* background-color: yellow; */
`;

const ListWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;

  width: 17.5rem;
  height: 10.375rem;
  /* background-color: yellow; */
`;

const PostWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 17.5rem;
  height: 3.125rem;
  /* background-color: pink; */
  :hover {
    cursor: pointer;
  }
`;

const PhotoFrame = styled.div`
  width: 2rem;
  height: 2rem;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const UserInfoWrap = styled.div`
  /* width: 124px; */
  height: 2.0625rem;

  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  /* background-color: skyblue; */
`;

const UserInfoText1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.0625rem;
`;

const UserInfoText2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 0.875rem;

  color: #afb4bf;
`;

const ButtonStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.625rem 0.625rem;

  width: 4.125rem;
  height: 2.125rem;

  border: 0.0625rem solid #121212;

  box-shadow: 0.0625rem 0.0625rem 0rem #000000;
  border-radius: 0.25rem;

  font-weight: 600;
  font-size: 0.75rem;
  line-height: 0.875rem;
  margin-left: auto;
  background-color: ${(props) => props.backgroundColor};
`;

export const ButtonBottom = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 10.625rem;
  height: 2.625rem;
  font-size: ${(props) => props.theme.Fs.tag};
  color: ${(props) => props.theme.Bg.lightColor};
  background: ${(props) => props.theme.Bg.mainColor5};

  border: 0.0875rem solid #121212;
  color: ${(props) => props.theme.Bg.color6};

  box-shadow: 0.125rem 0.125rem 0rem #000000;
  border-radius: 0.25rem;
  :hover {
    cursor: pointer;
  }
`;

export default FriendRecommendModal;
