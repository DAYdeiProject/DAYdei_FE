import React from "react";
import styled from "styled-components";

function FriendList() {
  const data = [
    {
      nickName: "user1",
      introduction: "안녕하세요 user1입니다!",
      profileImage: null,
      friendCheck: true,
    },
    {
      nickName: "user2",
      introduction: "반갑습니다, 좋은 하루입니다.",
      profileImage: null,
      friendCheck: true,
    },
    {
      nickName: "user3",
      introduction: "배고프다.",
      profileImage: null,
      friendCheck: true,
    },
  ];

  if (data.length === 0) {
    return (
      <NoListMessage>
        There's no friend in the list
        <button>초대하기</button>
      </NoListMessage>
    );
  }

  return (
    <>
      {data.map((user) => (
        <PostBox>
          <ProfileArea>
            <ProfilePhoto></ProfilePhoto>
            <TextArea>
              <div>닉네임 : {user.nickName} </div>
              <div>한줄 소개 : {user.introduction} </div>
            </TextArea>
          </ProfileArea>
          <ButtonArea>
            <Button>{user.friendCheck === true ? "친구 취소" : "친구 신청"}</Button>
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
  width: 95%;
  min-height: 130px;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ProfileArea = styled.div`
  height: 75%;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ProfilePhoto = styled.div`
  height: 75px;
  width: 75px;
  border-radius: 50%;
  margin-left: 12px;
  border: 1px solid black;
  /* background-color: black; */
`;

export const TextArea = styled.div`
  height: 85px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  /* background-color: pink; */
  margin-left: 12px;
`;

export const ButtonArea = styled.div`
  height: 75%;
  margin-left: auto;
  margin-right: 20px;
  /* border: 1px solid black; */
  display: flex;
  align-items: center;
`;

export const Button = styled.button`
  height: 40%;
  width: 100px;
`;

export default FriendList;
