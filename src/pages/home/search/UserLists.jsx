import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getRecommend, __requestFriend, __cancelRequest } from "../../../redux/modules/friendsSlice";

function UserLists({ finalList }) {
  const [buttonText, setButtonText] = useState("");
  const dispatch = useDispatch();

  const requestHandler = (id) => {
    dispatch(__requestFriend(id)).then(() => {
      setButtonText((prevState) => ({
        ...prevState,
        [id]: "친구신청 취소",
      }));
    });
  };

  const cancelRequestHandler = (id) => {
    dispatch(__cancelRequest(id)).then(() => {
      setButtonText((prevState) => ({
        ...prevState,
        [id]: "친구신청",
      }));
    });
  };

  const handleButtonClick = async (user) => {
    if (user.friendCheck === false && user.isRequestFriend === null) {
      requestHandler(user.id);
    } else if (user.friendCheck === false && user.isRequestFriend === false) {
      cancelRequestHandler(user.id);
    }
  };

  return (
    <>
      {finalList.map((user) => (
        <PostBox key={user.id}>
          <ProfileArea>
            <ProfilePhoto></ProfilePhoto>
            <TextArea>
              <div>닉네임 : {user.nickName} </div>
              <div>한줄 소개 : {user.introduction} </div>
            </TextArea>
          </ProfileArea>
          <ButtonArea>
            <Button onClick={() => handleButtonClick(user)}>
              {buttonText[user.id] ||
                (user.friendCheck === false && user.isRequestFriend === null
                  ? "친구신청"
                  : user.friendCheck === false && user.isRequestFriend === false
                  ? "친구신청 취소"
                  : user.friendCheck === false && user.isRequestFriend === true
                  ? "신청 승인"
                  : user.friendCheck === true && user.isRequestFriend === null
                  ? "친구 끊기"
                  : null)}
            </Button>
            <Button>구독하기</Button>
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
  height: 72px;
  width: 72px;
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
  gap: 12px;
`;

const Button = styled.button`
  height: 30%;
  width: 100px;
  border-radius: 4px;
  :hover {
    cursor: pointer;
  }
`;

export default UserLists;
