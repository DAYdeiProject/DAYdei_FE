import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { __cancelRequest, __getFriendsList } from "../../../redux/modules/friendsSlice";

function FriendList({ friendsList, updateIsFriendState }) {
  const dispatch = useDispatch();
  // console.log(friendsList);

  const deleteFriendHandler = (id) => {
    dispatch(__cancelRequest(id));
    updateIsFriendState();
    dispatch(__getFriendsList());
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
            <ProfilePhoto></ProfilePhoto>
            <TextArea>
              <div>닉네임 : {user.nickName} </div>
              <div>이메일 : {user.email} </div>
            </TextArea>
          </ProfileArea>
          <ButtonArea>
            <Button onClick={() => deleteFriendHandler(user.id)}>{user.friendCheck === true ? "친구 끊기" : "친구 신청"}</Button>
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
  height: 70px;
  width: 70px;
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
  font-size: ${(props) => props.theme.Fs.smallText};
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
