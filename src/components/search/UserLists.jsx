import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { otherIdState } from "../../redux/modules/headerReducer";
import { __getRecommend, __requestFriend, __cancelRequest } from "../../redux/modules/friendsSlice";
import { __addSubscribe, __cancelSubscribe } from "../../redux/modules/subscribeSlice";

import Loading from "../../components/Loading";
import defaultProfile from "../../assets/defaultImage/profile.jpg";
import { debounce } from "lodash";

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

  //친구신청 디바운스
  const debounceRequestHandler = debounce((id) => {
    dispatch(__requestFriend(id));
    setClickedButtonIds((prev) => [...prev, id]);
  }, 300);

  //친구신청 취소 디바운스
  const debounceCancelRequestHandler = debounce((id) => {
    dispatch(__cancelRequest(id));
    setClickedButtonIds((prev) => prev.filter((prevId) => prevId !== id));
  }, 300);

  //구독 디바운스
  const debounceSubscribeHandler = debounce((id) => {
    dispatch(__addSubscribe(id));
    setClickedSubscribeButtonIds((prev) => [...prev, id]);
  }, 300);

  //구독 취소 디바운스
  const debounceCancelSubscribeHandler = debounce((id) => {
    dispatch(__cancelSubscribe(id));
    setClickedSubscribeButtonIds((prev) => prev.filter((prevId) => prevId !== id));
  }, 300);

  const ButtonFriend = ({ id }) => {
    if (clickedButtonIds.includes(id)) {
      return (
        <ButtonCancel
          onClick={() => {
            debounceCancelRequestHandler(id);
          }}>
          신청취소
        </ButtonCancel>
      );
    }
    return (
      <Button
        onClick={() => {
          debounceRequestHandler(id);
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
            debounceCancelSubscribeHandler(id);
          }}>
          구독취소
        </ButtonCancel>
      );
    }
    return (
      <ButtonSub
        onClick={() => {
          debounceSubscribeHandler(id);
        }}>
        구독하기
      </ButtonSub>
    );
  };

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
            <MiddleBox>
              <IntroductionWrap>
                {user.introduction
                  ? user.introduction.length > 30
                    ? `${user.introduction.substr(0, 30)}...`
                    : user.introduction
                  : `${user.nickName}의 캘린더입니다.`}
              </IntroductionWrap>
              {user.mutualFriendsCount ? <MutualFriendsBox>함께 아는 친구 : {user.mutualFriendsCount}</MutualFriendsBox> : null}
            </MiddleBox>
          </ContentWrap>
          <ButtonArea>
            <ButtonFriend id={user.id} />
            <ButtonSubscribe id={user.id} />
          </ButtonArea>
        </PostBox>
      ))}
    </>
  );
}

const PostBox = styled.div`
  ${(props) => props.theme.FlexCol}
  //padding: 2.125rem 2rem 1.375rem;
  gap: 0.625rem;
  isolation: isolate;

  width: 230px;
  height: 310px;

  background: #ffffff;
  border-radius: 0.5rem;
  border: 0.0625rem solid #121212;

  ${(props) => props.theme.BoxCustom};

  @media screen and (max-width: 1878px) {
    width: 250px;
  }
  @media screen and (max-width: 1780px) {
    width: 230px;
  }
  @media screen and (max-width: 1680px) {
    width: 250px;
  }
  @media screen and (max-width: 1518px) {
    width: 210px;
  }
  @media screen and (max-width: 1415px) {
    width: 230px;
  }
  @media screen and (max-width: 1290px) {
    width: 210px;
  }
  @media screen and (max-width: 1225px) {
    width: 230px;
  }
  @media screen and (max-width: 1040px) {
    width: 210px;
  }
  @media screen and (max-width: 950px) {
    width: 220px;
  }
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem;
  gap: 0.875rem;
  width: 220px;
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

const MiddleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 63px;
  padding-top: 10px;
  border-top: 0.0625rem solid ${(props) => props.theme.Bg.color3};

  /* @media screen and (max-width: 1440px) {
    padding-top: 0;
    gap: 2px;
  } */
`;

const IntroductionWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 0.625rem;

  width: 170px;
  height: 3rem;
  padding: 5px;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 0.875rem;

  color: ${(props) => props.theme.Bg.color2};
`;

const MutualFriendsBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25rem 1rem;

  width: 8.25rem;
  height: 20px;

  font-size: 0.625rem;
  font-weight: 25rem;
  color: ${(props) => props.theme.Bg.color2};
  background: #f2f4f6;

  /* @media screen and (max-width: 90rem) {
    height: 15px;
    font-size: 10px;
  } */
`;

const ButtonArea = styled.div`
  ${(props) => props.theme.FlexRow}
  padding: 0rem;
  gap: 0.5rem;
  margin-top: 10px;
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.625rem 0.875rem;
  gap: 0.5rem;

  width: 80px;
  height: 40px;
  color: #ffffff;
  font-size: 0.75rem;

  background: ${(props) => props.theme.Bg.mainColor5};
  border: 1.5px solid ${(props) => props.theme.Bg.color1};
  border-radius: 0.25rem;
  :hover {
    cursor: pointer;
  }

  /* @media screen and (max-width: 1440px) {
    width: 80px;
    height: 30px;
    padding: 7.5008px 5px;
    font-size: 0.5625rem;
  } */
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
