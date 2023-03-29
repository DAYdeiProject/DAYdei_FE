import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getRecommend, __requestFriend, __cancelRequest } from "../../../redux/modules/friendsSlice";
import { __addSubscribe, __cancelSubscribe } from "../../../redux/modules/subscribeSlice";
import defaultProfile from "../../../assets/defaultImage/profile.jpg";
import { CalendarWrapper } from "../calendar/CalendarMain";
import Loading from "../../../components/Loading";

function UserLists({ searchWord, selectedCategories, setIsCalendarMainVisible, setIsFriendListVisible, setIsSearchUsersvisible, setIsFriendDetailVisible }) {
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
        <Button
          onClick={() => {
            cancelRequestHandler(id);
          }}>
          신청취소
        </Button>
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
        <ButtonSub
          onClick={() => {
            cancelSubscribeHandler(id);
          }}>
          구독취소
        </ButtonSub>
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
        <CalendarWrapper>
          <LoadingInnerWrapper>
            <Loading />
          </LoadingInnerWrapper>
        </CalendarWrapper>
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
                navigate(`/${user.id}`);
                setIsCalendarMainVisible(true);
                setIsFriendListVisible(false);
                setIsSearchUsersvisible(false);
                setIsFriendDetailVisible(false);
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
                ? user.introduction
                : user.categoryList.length !== 0
                ? `카테고리 : ${user.categoryList[0]}`
                : `${user.nickName}의 캘린더 입니다.`}
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

export const LoadingInnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 34px 32px 22px;
  gap: 10px;
  isolation: isolate;

  width: 230px;
  height: 296px;

  background: #ffffff;
  border-radius: 8px;
  /* background-color: pink; */
  border: 1px solid black;
  :hover {
    cursor: pointer;
  }
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 14px;

  width: 220px;
  height: 240px;
  /* background-color: blue; */
`;

const ProfileArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 8px;

  width: 126px;
  height: 124px;
  /* background-color: orange; */
  /* margin-bottom: 10px; */
`;

const ProfilePhoto = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 20px;
`;

const PhotoFrame = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const ProfileTextFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 12px;

  width: 126px;
  height: 56px;
  /* background-color: orange; */
`;

const NameArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 2px;

  width: 83px;
  height: 35px;
  /* background-color: yellow; */
`;

const NicknameWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px;
  gap: 8px;

  width: 83px;
  height: 19px;

  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  /* background-color: lightgray; */
`;

const EmailWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px;
  gap: 8px;

  width: 58px;
  height: 14px;

  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: #a5a5a5;
`;

const InfoArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;
  gap: 30px;

  width: 160px;
  height: 13px;
  /* background-color: pink; */
`;

const FriendsWrap = styled.div`
  /* width: 32px; */
  height: 12px;

  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: black;
`;

const SubscribingWrap = styled.div`
  height: 12px;

  font-weight: 400;
  font-size: 10px;
  line-height: 12px;

  color: black;
`;

const SubscribeWrap = styled.div`
  /* width: 47px; */
  height: 12px;

  font-weight: 400;
  font-size: 10px;
  line-height: 12px;

  color: black;
`;

const IntroductionWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  /* padding: 10px 32px; */
  gap: 10px;

  width: 185px;
  height: 48px;

  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  color: #626262;

  border-top: 1px solid #626262;
`;

const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  width: 188px;
  height: 40px;
  /* background-color: pink; */
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 14px;
  gap: 8px;

  width: 90px;
  height: 40px;
  color: #ffffff;
  font-weight: 600;
  font-size: 12px;

  background: ${(props) => props.theme.Bg.mainColor5};
  border-radius: 4px;
  :hover {
    cursor: pointer;
  }
`;

const ButtonSub = styled(Button)`
  background-color: ${(props) => props.theme.Bg.mainColor2};
  color: black;
  font-weight: 600;
  font-size: 12px;
`;

export default UserLists;
