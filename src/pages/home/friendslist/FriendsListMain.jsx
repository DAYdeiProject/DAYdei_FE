import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
// import { CalendarWrapper } from "../calendar/CalendarMain";
import FriendList from "./FriendList";
import SubscribeList from "./SubscribeList";
import { __getFriendsList } from "../../../redux/modules/friendsSlice";
function FriendsListMain() {
  const dispatch = useDispatch();
  const statusCodeFriend = useSelector((state) => state.friends.statusCode);
  const statusCodeSubscribe = useSelector((state) => state.subscribe.statusCode);
  useEffect(() => {
    dispatch(__getFriendsList());
  }, [dispatch, statusCodeFriend, statusCodeSubscribe]);
  const { FriendsList, isLoading } = useSelector((state) => state.friends);
  // console.log("로딩중 위-->", FriendsList);
  if (isLoading) {
    return <LoadingWrapper>로딩중...</LoadingWrapper>;
  }
  // console.log("로딩아래 -->", FriendsList);
  const friendsList = FriendsList?.friendResponseList || [];
  const subscribeList = FriendsList?.userSubscribeResponseList || [];
  return (
    <>
      <CalendarWrapper>
        <WholeAreaWrapper>
          <ListFrameBig>
            <ListFrame>
              <ContentWrapper>
                <TopText>
                  <TopLeft>친구 {friendsList.length}</TopLeft>
                </TopText>
                <ListWrap>
                  <FriendList friendsList={friendsList} />
                </ListWrap>
              </ContentWrapper>
            </ListFrame>
          </ListFrameBig>
          <ListFrameBig>
            <ListFrame>
              <ContentWrapper>
                <TopText>
                  <TopLeft>구독 {subscribeList.length}</TopLeft>
                </TopText>
                <ListWrap>
                  <SubscribeList subscribeList={subscribeList} />
                </ListWrap>
              </ContentWrapper>
            </ListFrame>
          </ListFrameBig>
        </WholeAreaWrapper>
      </CalendarWrapper>
    </>
  );
}

const LoadingWrapper = styled.div`
  width: 1570px;
  height: 100%;
`;

const CalendarWrapper = styled.div`
  width: 1570px;
  height: 100%;
`;
export const WholeAreaWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  /* position: absolute; */
  width: 1570px;
  height: 980px;
  left: 350px;
  top: 100px;
  /* background-color: skyblue; */
`;
const ListFrameBig = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 40px 71px;
  gap: 16px;
  width: 783px;
  height: 980px;
  /* background-color: pink; */
`;
const ListFrame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 16px;
  width: 698px;
  height: 835px;
  /* background-color: gray; */
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
  width: 678px;
  height: 835px;
  /* background-color: ${(props) => props.theme.Bg.lightColor}; */
`;
const TopText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px 0px 0px;
  gap: 467px;
  width: 678px;
  height: 44px;
  /* background-color: pink; */
`;

const TopLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px;
  gap: 10px;

  /* width: 85px; */
  height: 44px;
  /* background-color: skyblue; */

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
`;

const ListWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 678px;
  height: 770px;
  background: #fbfbfb;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
export default FriendsListMain;
