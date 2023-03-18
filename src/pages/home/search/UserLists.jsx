import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getRecommend, __requestFriend, __cancelRequest } from "../../../redux/modules/friendsSlice";
import { __addSubscribe, __cancelSubscribe } from "../../../redux/modules/subscribeSlice";

function UserLists({ searchWord, selectedCategories }) {
  const [buttonText, setButtonText] = useState("");
  const RecommendList = useSelector((state) => state.friends.RecommendList);
  console.log(RecommendList);

  const dispatch = useDispatch();

  useEffect(() => {
    let url = "?searchword=";

    if (searchWord === "" && selectedCategories.length === 0) {
      url = "?searchword=&category=";
      dispatch(__getRecommend(url));
    } else if (searchWord !== "" && selectedCategories.length === 0) {
      url = `?searchword=${searchWord}&category=`;
      dispatch(__getRecommend(url));
    } else if (searchWord === "" && selectedCategories !== 0) {
      selectedCategories.forEach((c) => {
        url += `&category=${c}`;
      });
      dispatch(__getRecommend(url));
    } else {
      url = `?searchword=${searchWord}`;
      selectedCategories.forEach((c) => {
        url += `&category=${c}`;
      });

      dispatch(__getRecommend(url));
    }
  }, [selectedCategories, searchWord]);

  const requestHandler = (id) => {
    dispatch(__requestFriend(id));
    setButtonText("친구신청 취소");
  };

  const cancelRequestHandler = (id) => {
    dispatch(__cancelRequest(id));
    setButtonText("친구신청");
  };

  const subscribeHandler = (id) => {
    dispatch(__addSubscribe(id));
  };

  const cancelSubscribeHandler = (id) => {
    dispatch(__cancelSubscribe(id));
  };

  const handleFriendButtonClick = async (user) => {
    if (user.friendCheck === false && user.isRequestFriend === null) {
      requestHandler(user.id);
    } else if (
      (user.friendCheck === false && user.isRequestFriend === false) ||
      (user.friendCheck === true && user.isRequestFriend === null)
    ) {
      cancelRequestHandler(user.id);
    }
  };

  const handleSubscribeButtonClick = async (user) => {
    if (user.userSubscribeCheck === false) {
      subscribeHandler(user.id);
    } else {
      cancelSubscribeHandler(user.id);
    }
  };

  useEffect(() => {
    RecommendList.forEach((user) => {
      if (user.friendCheck === false && user.isRequestFriend === null) {
        setButtonText("친구신청");
      } else if (
        (user.friendCheck === false && user.isRequestFriend === false) ||
        (user.friendCheck === true && user.isRequestFriend === null)
      ) {
        setButtonText("친구신청 취소");
      }
    });
  }, [RecommendList]);

  return (
    <>
      {RecommendList.map((user) => (
        <PostBox key={user.id}>
          <ProfileArea>
            <ProfilePhoto></ProfilePhoto>
            <TextArea>
              <div>닉네임 : {user.nickName} </div>
              <div>한줄 소개 : {user.introduction} </div>
            </TextArea>
          </ProfileArea>
          <ButtonArea>
            <Button onClick={() => handleFriendButtonClick(user)}>
              {user.friendCheck === false && user.isRequestFriend === null
                ? "친구신청"
                : user.friendCheck === false && user.isRequestFriend === false
                ? "친구신청 취소"
                : user.friendCheck === false && user.isRequestFriend === true
                ? "신청 승인"
                : user.friendCheck === true && user.isRequestFriend === null
                ? "친구 끊기"
                : null}
            </Button>
            <Button onClick={() => handleSubscribeButtonClick(user)}>
              {user.userSubscribeCheck === false ? "구독하기" : "구독취소"}
            </Button>
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
