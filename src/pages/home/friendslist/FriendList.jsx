import { React, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { __cancelRequest, __getFriendsList } from "../../../redux/modules/friendsSlice";
import { MdOutlineEditCalendar, MdOutlineAddReaction } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function FriendList({ friendsList, setIsCalendarMainVisible, setIsFriendListVisible, setIsSearchUsersvisible, setIsFriendDetailVisible }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteFriendHandler = (id) => {
    dispatch(__cancelRequest(id));
  };

  if (friendsList.length === 0) {
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
            <KakaoButton>카카오톡 친구와 연동</KakaoButton>
            <InviteButton>친구 초대</InviteButton>
          </ButtonWrap>
        </MessageBox>
      </NoListMessageWrapper>
    );
  }
  return (
    <>
      {friendsList.map((user) => (
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

  width: 678px;
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
  gap: 165px;

  width: 678px;
  height: 70px;
  :hover {
    cursor: pointer;
  }
  /* background-color: skyblue;
  /* border: 1px solid ${(props) => props.theme.Bg.lightColor}; */
`;
export const ProfileArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 16px;

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

  width: 140px;
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

  width: 260px;
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
  gap: 16px;

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
`;

export default FriendList;
