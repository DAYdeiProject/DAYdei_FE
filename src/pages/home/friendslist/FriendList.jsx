import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { __cancelRequest, __getFriendsList } from "../../../redux/modules/friendsSlice";
function FriendList({ friendsList }) {
  const dispatch = useDispatch();
  const deleteFriendHandler = (id) => {
    dispatch(__cancelRequest(id));
  };
  if (friendsList.length === 0) {
    return (
      <NoListMessage>
        There's no friend in the list
        <button>초대하기</button>
      </NoListMessage>
    );
  }
  return (
    <>
      {friendsList.map((user) => (
        <PostBox key={user.id}>
          <ProfileArea>
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
export const NoListMessage = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;
export const PostBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 16px;
  gap: 165px;

  width: 678px;
  height: 70px;
  /* background-color: skyblue; */
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
