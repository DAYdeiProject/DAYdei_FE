import { React, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { __cancelRequest, __getFriendsList } from "../../../redux/modules/friendsSlice";
import { __friendsList } from "../../../redux/modules/kakaoSlice";
import { MdOutlineAddReaction } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function FriendList({ FriendsList, setIsCalendarMainVisible, setIsFriendListVisible, setIsSearchUsersvisible, setIsFriendDetailVisible }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteFriendHandler = (id) => {
    dispatch(__cancelRequest(id));
  };

  //const URI = "http://daydei.s3-website.ap-northeast-2.amazonaws.com/friends";
  const URI = "http://localhost:3000/friends";
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
        kakao.init("09575cc341b5e4613bf2d9332389afd0");
      }

      // 메시지 공유 함수
      kakao.Link.sendScrap({
        requestUrl: "http://localhost:3000", // 페이지 url
        templateId: 91733, // 메시지템플릿 번호
        templateArgs: {
          THUMB: "https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg", // 썸네일 주소 ${THUMB}
          TITLE: "DayDei", // 제목 텍스트 ${TITLE}
          DESC: "공유하는 일상의 시작", // 설명 텍스트 ${DESC}
        },
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
              setIsCalendarMainVisible(true);
              setIsFriendListVisible(false);
              setIsSearchUsersvisible(false);
              setIsFriendDetailVisible(false);
            }}>
            <ProfileWrap>
              <PhotoFrame src={user.profileImage}></PhotoFrame>
              <TextArea>
                <NickNameWrap>{user.nickName} </NickNameWrap>
                <EmailWrap>@{user.email.split("@")[0]} </EmailWrap>
              </TextArea>
            </ProfileWrap>
            <IntroductionWrap></IntroductionWrap>
          </ProfileArea>
          <ButtonArea
            onClick={() => {
              deleteFriendHandler(user.id);
            }}>
            {user.friendCheck === true ? "친구 끊기" : "친구 신청"}
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

  width: 478px;
  height: 372px;

  background: #fbfbfb;
  border-radius: 8px;
  /* background-color: skyblue; */
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

  /* width: 240px; */
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

  /* width: 220px; */
  height: 47px;
  /* background-color: gray; */
`;

export const UpperText = styled.div`
  padding: 0px;
  gap: 10px;

  /* width: 105px; */
  height: 19px;

  font-family: "Pretendard";
  font-style: normal;
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
  font-family: "Pretendard";
  font-style: normal;
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

  background: #d9d9d9;
  border-radius: 4px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
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

  background: #d9d9d9;
  border-radius: 4px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
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
  padding: 15px 16px;
  gap: 15px;

  width: 478px;
  height: 70px;
  :hover {
    cursor: pointer;
  }
  /* background-color: skyblue; */
  /* border: 1px solid ${(props) => props.theme.Bg.lightColor}; */
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
  gap: 16px;

  /* width: 140px; */
  height: 40px;
  /* background-color: red; */
`;

export const PhotoFrame = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 2px;

  width: 84px;
  height: 35px;
  /* background-color: pink; */
`;

export const NickNameWrap = styled.div`
  padding: 0px;
  gap: 8px;
  /* 
  width: 42px; */
  height: 19px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
`;

export const EmailWrap = styled.div`
  padding: 0px;
  gap: 8px;

  /* width: 67px; */
  height: 14px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;

  color: #a5a5a5;
`;

export const IntroductionWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  width: 200px;
  height: 20px;
  background-color: lightgray;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  color: #626262;
`;

export const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 78px;
  height: 40px;

  background: #d9d9d9;
  border-radius: 4px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;

  color: #121212;

  :hover {
    cursor: pointer;
  }
  /* background-color: pink; */
`;

export default FriendList;
