import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getFriendsList, __getRequestedUsersList } from "../../../redux/modules/friendsSlice";
import { __getSubscribeList } from "../../../redux/modules/subscribeSlice";
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

function DetailMain({ setIsCalendarMainVisible, setIsFriendListVisible, setIsSearchUsersvisible, setIsFriendDetailVisible }) {
  const params = useParams();
  const dispatch = useDispatch();

  // 친구의 친구 페이지 진입 시 친구/구독 리스트를 GET
  useEffect(() => {
    const id = params.id;
    let url = `${id}?sort=name&searchword=`;
    dispatch(__getFriendsList(url));
    dispatch(__getSubscribeList(url));
  }, []);

  const { FriendsList, isLoadingFriends } = useSelector((state) => state.friends);
  const { SubscribesList, isLoadingSubscribe } = useSelector((state) => state.subscribe);

  console.log("디테일 부모에서 찍은 친구 -->", FriendsList);
  console.log("디테일 부모에서 찍은 구독 -->", SubscribesList);

  return (
    <>
      <CalendarWrapper>
        <WholeAreaWrapper>
          <ListFrameBig>
            <ListFrame>
              <ContentWrapper>
                <TopText>
                  <TopLeft>친구 {FriendsList.length}</TopLeft>
                  <TopRight>
                    <SearchIcon />
                    <AlignIcon />
                  </TopRight>
                </TopText>
                <ListWrap>
                  <DetailFriends
                    FriendsList={FriendsList}
                    setIsCalendarMainVisible={setIsCalendarMainVisible}
                    setIsFriendListVisible={setIsFriendListVisible}
                    setIsSearchUsersvisible={setIsSearchUsersvisible}
                    setIsFriendDetailVisible={setIsFriendDetailVisible}
                  />
                </ListWrap>
              </ContentWrapper>
            </ListFrame>
          </ListFrameBig>
          <ListFrameBig>
            <ListFrame>
              <ContentWrapper>
                <TopText>
                  <TopLeft>구독 {SubscribesList.length}</TopLeft>
                </TopText>
                <ListWrap>
                  <DetailSubscribe
                    SubscribesList={SubscribesList}
                    setIsCalendarMainVisible={setIsCalendarMainVisible}
                    setIsFriendListVisible={setIsFriendListVisible}
                    setIsSearchUsersvisible={setIsSearchUsersvisible}
                    setIsFriendDetailVisible={setIsFriendDetailVisible}
                  />
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
