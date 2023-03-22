import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getFriendsList, __getRequestedUsersList } from "../../../redux/modules/friendsSlice";
import { __getFriendDetail } from "../../../redux/modules/friendsSlice";
import {
  LoadingWrapper,
  CalendarWrapper,
  WholeAreaWrapper,
  ListFrameBig,
  ListFrame,
  ContentWrapper,
  TopText,
  TopLeft,
  TopRight,
  SearchIcon,
  AlignIcon,
  ListWrap,
} from "../friendslist/FriendsListMain";
import { useParams } from "react-router-dom";
import DetailFriends from "./DetailFriends";
import DetailSubscribe from "./DetailSubscribe";

function DetailMain() {
  const params = useParams();
  const dispatch = useDispatch();

  const statusCodeFriend = useSelector((state) => state.friends.statusCode);
  const statusCodeSubscribe = useSelector((state) => state.subscribe.statusCode);

  useEffect(() => {
    const url = params.id;
    console.log(url);
    dispatch(__getFriendDetail(url));
  }, [dispatch, statusCodeFriend, statusCodeSubscribe]);

  const { FriendDetailList, isLoading } = useSelector((state) => state.friends);
  //   console.log(FriendDetailList);

  const friendsList = FriendDetailList?.friendResponseList || [];
  const subscribeList = FriendDetailList?.userSubscribeResponseList || [];

  if (isLoading) {
    return <LoadingWrapper>로딩중...</LoadingWrapper>;
  }

  return (
    <>
      <CalendarWrapper>
        <WholeAreaWrapper>
          <ListFrameBig>
            <ListFrame>
              <ContentWrapper>
                <TopText>
                  <TopLeft>친구 {friendsList.length}</TopLeft>
                  <TopRight>
                    <SearchIcon />
                    <AlignIcon />
                  </TopRight>
                </TopText>
                <ListWrap>
                  <DetailFriends friendsList={friendsList} />
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
                  <DetailSubscribe subscribeList={subscribeList} />
                </ListWrap>
              </ContentWrapper>
            </ListFrame>
          </ListFrameBig>
        </WholeAreaWrapper>
      </CalendarWrapper>
    </>
  );
}

export default DetailMain;
