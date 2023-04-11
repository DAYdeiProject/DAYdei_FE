import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { otherIdState } from "../../redux/modules/headerReducer";
import { __getRecommend, __requestFriend, __cancelRequest } from "../../redux/modules/friendsSlice";
import { __addSubscribe, __cancelSubscribe } from "../../redux/modules/subscribeSlice";

import Loading from "../../components/Loading";
import defaultProfile from "../../assets/defaultImage/profile.jpg";

function UserLists({ searchWord, selectedCategories }) {
  //클릭된 친구신청 버튼 추적
  const [clickedButtonIds, setClickedButtonIds] = useState([]);
  //클릭된 구독하기 버튼 추적
  const [clickedSubscribeButtonIds, setClickedSubscribeButtonIds] = useState([]);
  const { isLoading, RecommendList } = useSelector((state) => state.friends);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let url = "?searchword=";
    if (searchWord === "" && selectedCategories.length === 0) {
      url = "?searchword=&category=";
      dispatch(__getRecommend(url));
    } else if (searchWord !== "" && selectedCategories.length === 0) {
      url = `?searchword=${searchWord}&category=`;
      dispatch(__getRecommend(url));
    } else if (searchWord === "" && selectedCategories !== 0) {
      selectedCategories.forEach((c) => {
        url += `&category=${c}`;
      });
      dispatch(__getRecommend(url));
    } else {
      url = `?searchword=${searchWord}`;
      selectedCategories.forEach((c) => {
        url += `&category=${c}`;
      });
      dispatch(__getRecommend(url));
    }
  }, [selectedCategories, searchWord]);

  const requestHandler = (id) => {
    dispatch(__requestFriend(id));
    setClickedButtonIds((prev) => [...prev, id]);
  };

  const cancelRequestHandler = (id) => {
    dispatch(__cancelRequest(id));
    setClickedButtonIds((prev) => prev.filter((prevId) => prevId !== id));
  };

  const subscribeHandler = (id) => {
    dispatch(__addSubscribe(id));
    setClickedSubscribeButtonIds((prev) => [...prev, id]);
  };

  const cancelSubscribeHandler = (id) => {
    dispatch(__cancelSubscribe(id));
    setClickedSubscribeButtonIds((prev) => prev.filter((prevId) => prevId !== id));
  };

  const ButtonFriend = ({ id }) => {
    if (clickedButtonIds.includes(id)) {
      return (
        <ButtonCancel
          onClick={() => {
            cancelRequestHandler(id);
          }}>
          신청취소
        </ButtonCancel>
      );
    }
    return (
      <Button
        onClick={() => {
          requestHandler(id);
        }}>
        친구신청
      </Button>
    );
  };

  const ButtonSubscribe = ({ id }) => {
    if (clickedSubscribeButtonIds.includes(id)) {
      return (
        <ButtonCancel
          onClick={() => {
            cancelSubscribeHandler(id);
          }}>
          구독취소
        </ButtonCancel>
      );
    }
    return (
      <ButtonSub
        onClick={() => {
          subscribeHandler(id);
        }}>
        구독하기
      </ButtonSub>
    );
  };

  // console.log(RecommendList);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      {RecommendList.map((user) => (
        <PostBox key={user.id}>
          <ContentWrap>
            <ProfileArea
              onClick={() => {
                navigate(`/other`);
                dispatch(otherIdState(user.id));
              }}>
              <ProfilePhoto>
                <PhotoFrame src={user.profileImage ? user.profileImage : defaultProfile} />
              </ProfilePhoto>
              <ProfileTextFrame>
                <NameArea>
                  <NicknameWrap>{user.nickName ? user.nickName : "(이름 없음)"} </NicknameWrap>
                  <EmailWrap>@{user.email.split("@")[0]} </EmailWrap>
                </NameArea>
                <InfoArea>
                  <FriendsWrap>친구 {user.friendCount}</FriendsWrap>
                  <SubscribingWrap>구독 {user.subscribingCount}</SubscribingWrap>
                  <SubscribeWrap>구독자 {user.subscriberCount}</SubscribeWrap>
                </InfoArea>
              </ProfileTextFrame>
            </ProfileArea>
            <IntroductionWrap>
              {user.introduction
                ? user.introduction.length > 30
                  ? `${user.introduction.substr(0, 30)}...`
                  : user.introduction
                : `${user.nickName}의 캘린더입니다.`}
            </IntroductionWrap>
            <ButtonArea>
              <ButtonFriend id={user.id} />
              <ButtonSubscribe id={user.id} />
            </ButtonArea>
          </ContentWrap>
        </PostBox>
      ))}
    </>
  );
}

const PostBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2.125rem 2rem 1.375rem;
  gap: 0.625rem;
  isolation: isolate;

  width: 14.375rem;
  height: 18.5rem;

  background: #ffffff;
  border-radius: 0.5rem;
  border: 0.0625rem solid #121212;

  ${(props) => props.theme.BoxCustom};
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0rem;
  gap: 0.875rem;

  width: 13.75rem;
  height: 15rem;
`;

const ProfileArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem;
  gap: 0.5rem;

  width: 7.875rem;
  height: 7.75rem;
`;

const ProfilePhoto = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0rem;
  gap: 1.25rem;
`;

const PhotoFrame = styled.img`
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 50%;
`;

const ProfileTextFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem;
  gap: 0.75rem;

  width: 7.875rem;
  height: 3.5rem;
`;

const NameArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0rem;
  gap: 0.125rem;

  height: 2.1875rem;
`;

const NicknameWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0rem;
  gap: 0.5rem;

  height: 1.1875rem;

  font-weight: 500;
  font-size: 1rem;
  line-height: 1.1875rem;
`;

const EmailWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0rem;
  gap: 0.5rem;

  width: 3.625rem;
  height: 0.875rem;

  font-weight: 500;
  font-size: 0.75rem;
  line-height: 0.875rem;
  color: ${(props) => props.theme.Bg.color3};
`;

const InfoArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 0rem;
  gap: 1.875rem;

  width: 11.25rem;
  height: 0.8125rem;
`;

const FriendsWrap = styled.div`
  height: 0.75rem;

  font-weight: 400;
  font-size: 0.625rem;
  line-height: 0.75rem;
  color: #121212;
`;

const SubscribingWrap = styled.div`
  height: 0.75rem;

  font-weight: 400;
  font-size: 0.625rem;
  line-height: 0.75rem;

  color: #121212;
`;

const SubscribeWrap = styled.div`
  height: 0.75rem;

  font-weight: 400;
  font-size: 0.625rem;
  line-height: 0.75rem;
`;

const IntroductionWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 0.625rem;

  width: 80%;
  height: 3rem;

  font-weight: 400;
  font-size: 0.75rem;
  line-height: 0.875rem;

  padding: 10px 20px;
  color: ${(props) => props.theme.Bg.color2};
  border-top: 0.0625rem solid ${(props) => props.theme.Bg.color3};
`;

const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0rem;
  gap: 0.5rem;

  width: 11.75rem;
  height: 2.5rem;

  @media screen and (max-width: 90rem) {
    width: 8.8125rem;
    height: 1.875rem;
  }
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.625rem 0.875rem;
  gap: 0.5rem;

  width: 5.625rem;
  height: 2.5rem;
  color: #ffffff;
  font-size: 0.75rem;

  background: ${(props) => props.theme.Bg.mainColor5};
  border: 1.5px solid ${(props) => props.theme.Bg.color1};
  border-radius: 0.25rem;
  :hover {
    cursor: pointer;
  }

  @media screen and (max-width: 90rem) {
    width: 4.2188rem;
    height: 1.875rem;
    padding: 0.4688rem 0.6563rem;
    font-size: 0.5625rem;
  }
`;

const ButtonSub = styled(Button)`
  background-color: ${(props) => props.theme.Bg.mainColor2};
  color: #121212;
  font-size: 0.75rem;
`;

const ButtonCancel = styled(Button)`
  background-color: ${(props) => props.theme.Bg.color6};
  color: #121212;
`;

export default UserLists;
