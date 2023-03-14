import React from "react";
import styled from "styled-components";

function UserLists() {
  const data = [
    {
      nickName: "user1",
      introduction: "안녕하세요 user1입니다!",
      profileImage: null,
      friendCheck: false,
      userSubscribeCheck: false,
    },
    {
      nickName: "user2",
      introduction: "반갑습니다, 좋은 하루입니다.",
      profileImage: null,
      friendCheck: false,
      userSubscribeCheck: false,
    },
    {
      nickName: "user3",
      introduction: "배고프다.",
      profileImage: null,
      friendCheck: false,
      userSubscribeCheck: false,
    },
    {
      nickName: "user1",
      introduction: "안녕하세요 user1입니다!",
      profileImage: null,
      friendCheck: false,
      userSubscribeCheck: false,
    },
    {
      nickName: "user1",
      introduction: "안녕하세요 user1입니다!",
      profileImage: null,
      friendCheck: false,
      userSubscribeCheck: false,
    },
    {
      nickName: "user1",
      introduction: "안녕하세요 user1입니다!",
      profileImage: null,
      friendCheck: false,
      userSubscribeCheck: false,
    },
    {
      nickName: "user1",
      introduction: "안녕하세요 user1입니다!",
      profileImage: null,
      friendCheck: false,
      userSubscribeCheck: false,
    },
  ];
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
            <Button>{user.friendCheck === false ? "친구 신청" : "친구 삭제"}</Button>
            <Button>{user.userSubscribeCheck === false ? "구독 신청" : "구독 취소"}</Button>
          </ButtonArea>
        </PostBox>
      ))}
    </>
  );
}

const PostBox = styled.div`
  width: 95%;
  min-height: 130px;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProfileArea = styled.div`
  height: 75%;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProfilePhoto = styled.div`
  height: 70px;
  width: 70px;
  border-radius: 50%;
  margin-left: 20px;
  border: 1px solid black;
  /* background-color: black; */
`;

const TextArea = styled.div`
  height: 85px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  /* background-color: pink; */
  margin-left: 12px;
  font-size: ${(props) => props.theme.Fs.smallText};
`;

const ButtonArea = styled.div`
  height: 100%;
  margin-left: auto;
  margin-right: 30px;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const Button = styled.button`
  height: 35%;
  width: 100px;
  border-radius: 4px;
`;

export default UserLists;
