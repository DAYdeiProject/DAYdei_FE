import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

import { otherIdState } from "../../redux/modules/headerReducer";
import { __cancelRequest, __getFriendsList } from "../../redux/modules/friendsSlice";
import { __friendsList } from "../../redux/modules/kakaoSlice";

import { MdOutlineAddReaction } from "react-icons/md";
import defaultProfile from "../../assets/defaultImage/profile.jpg";

function FriendList({ FriendsList }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const headerProfile = useSelector((state) => state.users.headerProfile);

  const [number, setNumber] = useState(0);
  const width1820 = useMediaQuery({ maxWidth: 1820 });
  const width1720 = useMediaQuery({ maxWidth: 1720 });
  const width1640 = useMediaQuery({ maxWidth: 1640 });
  const width1518 = useMediaQuery({ maxWidth: 1518 });
  const width1374 = useMediaQuery({ maxWidth: 1374 });
  const width1280 = useMediaQuery({ maxWidth: 1280 });

  useEffect(() => {
    if (width1820 && !width1720 && !width1640 && !width1518 && !width1374) {
      setNumber(13);
    } else if (width1820 && width1720 && !width1640 && !width1518 && !width1374) {
      setNumber(9);
    } else if (width1820 && width1720 && width1640 && !width1518 && !width1374) {
      setNumber(7);
    } else if (width1820 && width1720 && width1640 && width1518 && !width1374) {
      setNumber(16);
    } else if (width1820 && width1720 && width1640 && width1518 && width1374) {
      setNumber(9);
    } else {
      setNumber(16);
    }
  }, [width1820, width1720, width1640, width1518]);

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
    return () => document.body.removeChild(script);
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
          imageUrl: "https://user-images.githubusercontent.com/86552492/231071966-79737d9a-a953-40b5-8ac9-61eba3852ccc.png",
          imageWidth: 600,
          imageHeight: 500,
          link: {
            mobileWebUrl: "https://daydei.life",
            androidExecutionParams: "test",
          },
        },
        buttons: [
          {
            title: "DayDei 방문하기",
            link: {
              mobileWebUrl: "https://daydei.life",
              webUrl: "https://daydei.life",
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
          {headerProfile && headerProfile.kakaoId === null ? (
            <ButtonOneWrap>
              <InviteButton onClick={sendKakao}>친구 초대</InviteButton>
            </ButtonOneWrap>
          ) : (
            <ButtonWrap>
              <KakaoButton onClick={connectKakaoFriendsHandler}>카카오톡 친구와 연동</KakaoButton>
              <InviteButton onClick={sendKakao}>친구 초대</InviteButton>
            </ButtonWrap>
          )}
        </MessageBox>
      </NoListMessageWrapper>
    );
  }

  return (
    <>
      {FriendsList?.map((user) => {
        const defualtIntro = `${user.nickName}의 캘린더입니다.`;
        let newDefault = "";

        if (defualtIntro.length > number) {
          newDefault = defualtIntro.substr(0, number) + "...";
        } else {
          newDefault = defualtIntro;
        }

        return (
          <PostBox key={user.id}>
            <ProfileArea
              onClick={() => {
                navigate(`/other`);
                dispatch(otherIdState(user.id));
              }}>
              <ProfileWrap>
                <PostLeft>
                  <PhotoFrame>
                    <img src={user.profileImage ? user.profileImage : defaultProfile} />
                  </PhotoFrame>
                  <TextArea>
                    <NickNameWrap>{user.nickName ? user.nickName : "이름 없음"} </NickNameWrap>
                    <EmailWrap>@{user.email.split("@")[0]} </EmailWrap>
                  </TextArea>
                </PostLeft>
                {!width1280 && (
                  <IntroductionWrap>
                    {user.introduction ? (user.introduction.length > number ? `${user.introduction.substr(0, number)}...` : user.introduction) : newDefault}
                  </IntroductionWrap>
                )}
              </ProfileWrap>
            </ProfileArea>
            <ButtonArea
              onClick={() => {
                deleteFriendHandler(user.id);
              }}>
              {user.friendCheck === true ? "친구삭제" : "친구신청"}
            </ButtonArea>
          </PostBox>
        );
      })}
      {headerProfile && headerProfile.kakaoId === null ? (
        <VisitKakaoWrap>
          <div onClick={sendKakao}>친구 초대</div>
        </VisitKakaoWrap>
      ) : (
        <ListKakaoWrap>
          <KakaoButton onClick={connectKakaoFriendsHandler}>카카오톡 친구와 연동</KakaoButton>
          <InviteButton onClick={sendKakao}>친구 초대</InviteButton>
        </ListKakaoWrap>
      )}
    </>
  );
}

export const NoListMessageWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  width: 28.75rem;
  height: 19.25rem;
  background: ${(props) => props.theme.Bg.color6};
  border-radius: 0.5rem;
  border: 0.0625rem solid #121212;
  box-shadow: 0.125rem 0.125rem 0rem #000000;
  padding-bottom: 15px;

  @media screen and (max-width: 1880px) {
    width: 23rem;
    height: 16.875rem;
  }
  @media screen and (max-width: 1640px) {
    width: 20.625rem;
  }
  @media screen and (max-width: 1518px) {
    width: 28.75rem;
  }
  @media screen and (max-width: 1380px) {
    width: 25rem;
  }
  @media screen and (max-width: 1280px) {
    width: 20rem;
  }
  @media screen and (max-width: 1012px) {
    width: 18rem;
  }
  @media screen and (max-width: 980px) {
    width: 16rem;
    height: 15rem;
  }
`;

export const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem;
  gap: 1.5rem;
  height: 12.1875rem;
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
  height: 1.25rem;

  font-weight: 400;
  font-size: 0.875rem;
  line-height: 140%;
  text-align: center;
`;

export const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  gap: 10px;

  width: 100%;
  height: 2.5rem;
`;

const ButtonOneWrap = styled.div`
  ${(props) => props.theme.FlexRow};
`;

const ListKakaoWrap = styled.div`
  ${(props) => props.theme.FlexRow};
  margin: 20px 0;
  gap: 10px;
`;

const VisitKakaoWrap = styled.div`
  ${(props) => props.theme.FlexCol};
  div {
    ${(props) => props.theme.FlexCol};
    width: 100px;
    height: 40px;
    background: #ffffff;
    border: 0.0625rem solid #121212;
    box-shadow: 0.0625rem 0.0625rem 0rem #000000;
    border-radius: 0.25rem;

    margin: 20px 0;

    font-weight: 500;
    font-size: 0.875rem;
    line-height: 140%;

    :hover {
      cursor: pointer;
      background-color: ${(props) => props.theme.Bg.mainColor2};
    }

    @media screen and (max-width: 1518px) {
      height: 30px;
      width: 80px;
    }
  }
`;

const KakaoButton = styled.div`
  ${(props) => props.theme.FlexCol}
  width: 160px;
  height: 2.5rem;
  background: #ffffff;
  border: 0.0625rem solid #121212;

  box-shadow: 0.0625rem 0.0625rem 0rem #000000;
  border-radius: 0.25rem;

  font-weight: 500;
  font-size: 0.875rem;

  :hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.Bg.mainColor2};
  }

  @media screen and (max-width: 1280px) {
    width: 120px;
    height: 30px;
    font-size: 12px;
  }
`;

const InviteButton = styled.div`
  ${(props) => props.theme.FlexCol}
  height: 2.5rem;
  width: 100px;
  background: #ffffff;
  border: 0.0625rem solid #121212;
  box-shadow: 0.0625rem 0.0625rem 0rem #000000;
  border-radius: 0.25rem;

  font-weight: 500;
  font-size: 0.875rem;
  line-height: 140%;

  :hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.Bg.mainColor2};
  }
  @media screen and (max-width: 1280px) {
    width: 60px;
    height: 30px;
    font-size: 12px;
  }
`;

export const PostBox = styled.div`
  ${(props) => props.theme.FlexRowBetween};
  padding: 15px 8px;
  border-radius: 0.25rem;

  order: 0;
  :hover {
    cursor: pointer;
  }

  @media screen and (max-width: 1518px) {
    padding: 10px 15px;
    width: 100%;
  }
`;

export const ProfileArea = styled.div`
  ${(props) => props.theme.FlexRow};
  justify-content: left;
  padding: 0rem;
  width: 80%;
  height: 2.5rem;
`;

export const ProfileWrap = styled.div`
  ${(props) => props.theme.FlexRow};
  justify-content: left;

  padding: 0rem;
  gap: 0.3125rem;
`;

export const PostLeft = styled.div`
  ${(props) => props.theme.FlexRow};
  justify-content: left;
  gap: 0.5rem;
  width: 45%;
  height: 2.5rem;

  @media screen and (max-width: 1280px) {
    width: 100%;
  }
`;

export const PhotoFrame = styled.div`
  ${(props) => props.theme.FlexCol};
  width: 40px;
  height: 40px;
  border-radius: 50%;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: solid 1px #121212;
    box-shadow: 1px 1px 0 0 #000;

    @media screen and (max-width: 1570px) {
      width: 35px;
      height: 35px;
    }
  }
`;

export const TextArea = styled.div`
  ${(props) => props.theme.FlexCol};
  align-items: flex-start;

  gap: 0.125rem;

  width: 5.25rem;
  height: 1.9375rem;
`;

export const NickNameWrap = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.0625rem;

  @media screen and (max-width: 1640px) {
    font-size: 0.78rem;
  }
  @media screen and (max-width: 1518px) {
    font-size: 0.875rem;
  }
`;

export const EmailWrap = styled.div`
  font-weight: 500;
  font-size: 0.625rem;
  line-height: 0.75rem;
  color: ${(props) => props.theme.Bg.color2};
`;

export const IntroductionWrap = styled.div`
  ${(props) => props.theme.FlexRow};
  justify-content: left;
  padding: 0rem;
  gap: 0.5rem;

  width: 100%;

  font-weight: 400;
  font-size: 0.875rem;
  line-height: 140%;
`;

export const ButtonArea = styled.div`
  ${(props) => props.theme.FlexRow};

  width: 5rem;
  height: 2.125rem;
  background: #ffffff;

  border: 0.0625rem solid #121212;
  box-shadow: 0.0625rem 0.0625rem 0rem #000000;
  border-radius: 0.25rem;

  font-weight: 600;
  font-size: 0.75rem;
  line-height: 0.875rem;
  color: #121212;
  :hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.Bg.mainColor2};
  }

  @media screen and (max-width: 1890px) {
    width: 4rem;
  }
  @media screen and (max-width: 1640px) {
    width: 3.4rem;
  }
  @media screen and (max-width: 1518px) {
    width: 5rem;
  }
  @media screen and (max-width: 980px) {
    width: 3rem;
    font-size: 9px;
  }
`;

export default FriendList;
