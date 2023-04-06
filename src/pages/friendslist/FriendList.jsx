import { React, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { textState } from "../../redux/modules/headerReducer";
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
              navigate(`/${user.id}`);
              dispatch(textState(""));
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
  padding: 0px;
  margin-top: 16px;
  width: 460px;
  height: 308px;

  background: ${(props) => props.theme.Bg.color6};
  border-radius: 8px;
  border: 1px solid #121212;
  box-shadow: 2px 2px 0px #000000;
`;

export const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 24px;

  /* width: 240px; */
  height: 195px;
  /* background-color: yellow; */
`;

export const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 24px;

  height: 131px;
  border-radius: 4px;
  /* background-color: lightgray; */
`;

export const IconStyle = styled(MdOutlineAddReaction)`
  color: gray;
  width: 40px;
  height: 40px;
`;

export const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 8px;

  height: 47px;
  /* background-color: gray; */
`;

export const UpperText = styled.div`
  padding: 0px;
  gap: 10px;

  height: 19px;

  font-weight: 500;
  font-size: 16px;
  line-height: 19px;

  text-align: center;
`;

export const BottomText = styled.div`
  padding: 0px;
  gap: 10px;

  /* width: 220px; */
  height: 20px;

  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  text-align: center;

  color: #626262;
`;

export const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px;
  gap: 16px;

  width: 100%;
  height: 40px;
  /* background-color: pink; */
`;

const KakaoButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 14px;
  gap: 16px;

  /* width: 144px; */
  height: 40px;

  background: #fbfeff;
  border: 1px solid black;

  box-shadow: 1px 1px 0px #000000;
  border-radius: 4px;

  font-weight: 500;
  font-size: 14px;
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
  padding: 10px 14px;
  gap: 16px;

  /* width: 80px; */
  height: 40px;

  background: #fbfeff;
  border: 1px solid black;
  box-shadow: 1px 1px 0px #000000;
  border-radius: 4px;

  font-weight: 500;
  font-size: 14px;
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
  height: 70px;

  background: #ffffff;
  border-radius: 4px;

  flex: none;
  order: 0;
  flex-grow: 0;
  :hover {
    cursor: pointer;
  }
`;
export const ProfileArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  /* gap: 16px; */

  width: 404px;
  height: 40px;
  /* background-color: yellow; */
`;

export const ProfileWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 2px;

  width: 370px;
  height: 40px;
  /* background-color: pink; */
`;

export const PhotoFrame = styled.img`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 13.33px;

  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const PostLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;

  width: 132px;
  height: 40px;
`;

export const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 2px;

  width: 84px;
  height: 31px;

  /* background-color: yellow; */
`;

export const NickNameWrap = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;

export const EmailWrap = styled.div`
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;

  color: #afb4bf;
`;

export const IntroductionWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  width: 210px;
  height: 20px;
  /* background-color: lightblue; */

  font-weight: 400;
  font-size: 14px;
  line-height: 140%;

  color: #494d55;
`;

export const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px 10px;

  width: 80px;
  height: 34px;

  background: #fbfeff;

  border: 1px solid #121212;

  box-shadow: 1px 1px 0px #000000;
  border-radius: 4px;

  font-weight: 600;
  font-size: 12px;
  line-height: 14px;

  color: #121212;
  :hover {
    cursor: pointer;
  }
  /* background-color: pink; */
`;

export default FriendList;
