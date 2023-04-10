import { React, useEffect } from "react";
import { css } from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { textState, otherIdState } from "../../redux/modules/headerReducer";
import { __cancelRequest, __getFriendsList } from "../../redux/modules/friendsSlice";
import { __friendsList } from "../../redux/modules/kakaoSlice";

import { MdOutlineAddReaction } from "react-icons/md";
import defaultProfile from "../../assets/defaultImage/profile.jpg";

function FriendList({ FriendsList }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteFriendHandler = (id) => {
    dispatch(__cancelRequest(id));
  };

  const URI = "https://daydei.life/friends";
  const KAKAO = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_ID}&redirect_uri=${URI}&response_type=code&scope=friends`;

  const connectKakaoFriendsHandler = () => {
    window.location.href = KAKAO;
  };

  useEffect(() => {
    //카카오톡 sdk 추가
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.bodyNaNpxoveChild(script);
  }, []);

  const sendKakao = () => {
    console.log(window.Kakao);
    if (window.Kakao) {
      const kakao = window.Kakao;

      if (!kakao.isInitialized()) {
        kakao.init("e4934e4a233af99aa9f9c0c7e4b8ed68");
      }

      kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: "DayDei",
          description: "공유하는 일상의 시작 ",
          imageUrl: "https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg",
          imageWidth: 600,
          imageHeight: 315,
          link: {
            mobileWebUrl: "http://localhost:3000",
            androidExecutionParams: "test",
          },
        },
        buttons: [
          {
            title: "DayDei 방문하기",
            link: {
              mobileWebUrl: "http://localhost:3000",
              webUrl: "http://localhost:3000",
            },
          },
        ],
      });
    }
  };

  if (FriendsList?.length === 0) {
    return (
      <NoListMessageWrapper>
        <MessageBox>
          <ContentArea>
            <IconStyle />
            <TextWrap>
              <UpperText>나와 친구인 사람</UpperText>
              <BottomText>친구와 연결하여 캘린더를 공유해보세요.</BottomText>
            </TextWrap>
          </ContentArea>
          <ButtonWrap>
            <KakaoButton onClick={connectKakaoFriendsHandler}>카카오톡 친구와 연동</KakaoButton>
            <InviteButton onClick={sendKakao}>친구 초대</InviteButton>
          </ButtonWrap>
        </MessageBox>
      </NoListMessageWrapper>
    );
  }

  return (
    <>
      {FriendsList?.map((user) => (
        <PostBox key={user.id}>
          <ProfileArea
            onClick={() => {
              navigate(`/other`);
              dispatch(textState(""));
              dispatch(otherIdState(user.id));
            }}>
            <ProfileWrap>
              <PostLeft>
                <PhotoFrame src={user.profileImage ? user.profileImage : defaultProfile}></PhotoFrame>
                <TextArea>
                  <NickNameWrap>{user.nickName ? user.nickName : "이름 없음"} </NickNameWrap>
                  <EmailWrap>@{user.email.split("@")[0]} </EmailWrap>
                </TextArea>
              </PostLeft>
              <IntroductionWrap>
                {user.introduction
                  ? user.introduction.length > 16
                    ? `${user.introduction.substr(0, 16)}...`
                    : user.introduction
                  : `${user.nickName}의 캘린더입니다.`}
              </IntroductionWrap>
            </ProfileWrap>
          </ProfileArea>
          <ButtonArea
            onClick={() => {
              deleteFriendHandler(user.id);
            }}>
            {user.friendCheck === true ? "친구삭제" : "친구신청"}
          </ButtonArea>
        </PostBox>
      ))}
    </>
  );
}

export const NoListMessageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  width: 28.75rem;
  height: 19.25rem;

  background: ${(props) => props.theme.Bg.color6};
  border-radius: 0.5rem;
  border: 0.0625rem solid #121212;
  box-shadow: 0.125rem 0.125rem 0rem #000000;

  @media screen and (max-width: 90rem) {
    width: 25.5rem;
  }
`;

export const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem;
  gap: 1.5rem;

  /* width: 240px; */
  height: 12.1875rem;
  /* background-color: yellow; */
`;

export const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.625rem;
  gap: 1.5rem;

  height: 8.1875rem;
  border-radius: 0.25rem;
  /* background-color: lightgray; */
`;

export const IconStyle = styled(MdOutlineAddReaction)`
  color: gray;
  width: 2.5rem;
  height: 2.5rem;
`;

export const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem;
  gap: 0.5rem;

  height: 2.9375rem;
  /* background-color: gray; */
`;

export const UpperText = styled.div`
  padding: 0rem;
  gap: 0.625rem;

  height: 1.1875rem;

  font-weight: 500;
  font-size: 1rem;
  line-height: 1.1875rem;

  text-align: center;
`;

export const BottomText = styled.div`
  padding: 0rem;
  gap: 0.625rem;

  /* width: 220px; */
  height: 1.25rem;

  font-weight: 400;
  font-size: 0.875rem;
  line-height: 140%;
  text-align: center;

  color: #626262;
`;

export const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0rem;
  gap: 1rem;

  width: 100%;
  height: 2.5rem;
  /* background-color: pink; */
`;

const KakaoButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.625rem 0.875rem;
  gap: 1rem;

  /* width: 144px; */
  height: 2.5rem;

  background: #fbfeff;
  border: 0.0625rem solid black;

  box-shadow: 0.0625rem 0.0625rem 0rem #000000;
  border-radius: 0.25rem;

  font-weight: 500;
  font-size: 0.875rem;
  line-height: 140%;

  :hover {
    cursor: pointer;
  }
`;

const InviteButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.625rem 0.875rem;
  gap: 1rem;

  /* width: 80px; */
  height: 2.5rem;

  background: #fbfeff;
  border: 0.0625rem solid black;
  box-shadow: 0.0625rem 0.0625rem 0rem #000000;
  border-radius: 0.25rem;

  font-weight: 500;
  font-size: 0.875rem;
  line-height: 140%;

  :hover {
    cursor: pointer;
  }
`;

export const PostBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 8px;

  width: 100%;
  height: 4.375rem;

  background: #ffffff;
  border-radius: 0.25rem;

  /* flex: none; */
  order: 0;
  /* flex-grow: 0; */
  :hover {
    cursor: pointer;
  }

  @media screen and (max-width: 90rem) {
    padding: 0.7031rem 0.375rem;
    width: 100%;
  }
`;

export const ProfileArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0rem;
  /* gap: 16px; */

  width: 25.25rem;
  height: 2.5rem;

  @media screen and (max-width: 1440px) {
    width: 21rem;
  }
`;

export const ProfileWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0rem;
  gap: 0.125rem;

  width: 23.125rem;
  height: 2.5rem;

  @media screen and (max-width: 1440px) {
    width: 20rem;
    gap: 0.625rem;
  }
`;

export const PhotoFrame = styled.img`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;

  @media screen and (max-width: 1440px) {
    width: 1.875rem;
    height: 1.875rem;
    border-radius: 50%;
  }
`;

export const PostLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0rem;
  gap: 0.5rem;

  width: 8.25rem;
  height: 2.5rem;

  @media screen and (max-width: 1440px) {
    width: 7rem;
    gap: 0.375rem;
  }
`;

export const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0rem;
  gap: 0.125rem;

  width: 5.25rem;
  height: 1.9375rem;

  /* background-color: yellow; */
`;

export const NickNameWrap = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.0625rem;
`;

export const EmailWrap = styled.div`
  font-weight: 500;
  font-size: 0.625rem;
  line-height: 0.75rem;

  color: #afb4bf;
`;

export const IntroductionWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0rem;
  gap: 0.5rem;

  width: 13.125rem;
  height: 1.25rem;
  /* background-color: lightblue; */

  font-weight: 400;
  font-size: 0.875rem;
  line-height: 140%;

  color: #494d55;

  @media screen and (max-width: 1440px) {
    width: 13rem;
    text-overflow: hidden;
    /* background-color: pink; */
  }
`;

export const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0.625rem 0.625rem;

  width: 5rem;
  height: 2.125rem;

  background: #fbfeff;

  border: 0.0625rem solid #121212;

  box-shadow: 0.0625rem 0.0625rem 0rem #000000;
  border-radius: 0.25rem;

  font-weight: 600;
  font-size: 0.75rem;
  line-height: 0.875rem;

  color: #121212;
  :hover {
    cursor: pointer;
  }
  /* background-color: pink; */

  @media screen and (max-width: 1440px) {
    width: 3.75rem;
    padding: 0.4rem 0.4rem;
  }
`;

export default FriendList;
