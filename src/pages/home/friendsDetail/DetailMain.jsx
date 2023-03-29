import { React, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getFriendsList, __getRequestedUsersList } from "../../../redux/modules/friendsSlice";
import { __getSubscribeList, __getSubscriberList } from "../../../redux/modules/subscribeSlice";
import {
  LoadingWrapper,
  WholeWrapper,
  CalendarWrapper,
  WholeAreaWrapper,
  ListFrameBig,
  FrameBigWithPadding,
  FrameBigWithMargin,
  ListFrame,
  ContentWrapper,
  TopText,
  TopLeft,
  TopRight,
  SearchIcon,
  SearchBar,
  AlignIcon,
  ListWrap,
  DropdownFrame,
  DropdownItems,
  IconWrap,
} from "../friendslist/FriendsListMain";
import { useParams } from "react-router-dom";
import DetailFriends from "./DetailFriends";
import DetailSubscribe from "./DetailSubscribe";
import DetailSubscriber from "./DetailSubscriber";
import _ from "lodash";
import useOutSideClick from "../../../hooks/useOutsideClick";

function DetailMain({ setIsCalendarMainVisible, setIsFriendListVisible, setIsSearchUsersvisible, setIsFriendDetailVisible }) {
  const params = useParams();
  const dispatch = useDispatch();
  // 검색어 상태
  const [searchWord, setSearchWord] = useState("");
  const [searchWordSubscribe, setSearchWordSubscribe] = useState("");
  const [searchWordSubscriber, setSearchWordSubscriber] = useState("");
  // 검색창 상태
  const [searchFriendOpen, setSearchFriendOpen] = useState(false);
  const [searchSubscribeOpen, setSearchSubscribeOpen] = useState(false);
  const [searchSubscriberOpen, setSearchSubscriberOpen] = useState(false);
  // 정렬 드롭다운모달
  const [isDropdownFriendOpen, setIsDropdownFriendOpen] = useState(false);
  const [isDropdownSubscribeOpen, setIsDropdownSubscribeOpen] = useState(false);
  const [isDropdownSubscriberOpen, setIsDropdownSubscriberOpen] = useState(false);

  // 친구의 친구 페이지 진입 시 친구/구독 리스트를 GET
  useEffect(() => {
    const id = params.id;
    if (searchWord === "") {
      let url = `${id}?sort=name&searchword=`;
      console.log("검색어 없는 url-->", url);
      dispatch(__getFriendsList(url));
      dispatch(__getSubscribeList(url));
      dispatch(__getSubscriberList(url));
    }

    if (searchWord !== "") {
      let url = `${id}?sort=name&searchword=${searchWord}`;
      // console.log("검색어가 들어간 url -->", url);
      dispatch(__getFriendsList(url));
    }

    if (searchWordSubscribe !== "") {
      let url = `${id}?sort=name&searchword=${searchWordSubscribe}`;
      // console.log("검색어가 들어간 url -->", url);
      dispatch(__getSubscribeList(url));
    }

    if (searchWordSubscriber !== "") {
      let url = `${id}?sort=name&searchword=${searchWordSubscriber}`;
      // console.log("검색어가 들어간 url -->", url);
      dispatch(__getSubscriberList(url));
    }
  }, [searchWord, searchWordSubscribe, searchWordSubscriber]);

  //정렬 기준 함수

  const alignBasicHandler = (id) => {
    let url = `${id}?sort=name&searchword=`;
    // console.log("여기-", url);
    if (isDropdownFriendOpen) {
      dispatch(__getFriendsList(url));
    }
    if (isDropdownSubscribeOpen) {
      dispatch(__getSubscribeList(url));
    }
    if (isDropdownSubscriberOpen) {
      dispatch(__getSubscriberList(url));
    }
  };

  const alignSubscribeHandler = (id) => {
    let url = `${id}?sort=famous&searchword=`;
    // console.log("여기-", url);
    if (isDropdownFriendOpen) {
      dispatch(__getFriendsList(url));
    }
    if (isDropdownSubscribeOpen) {
      dispatch(__getSubscribeList(url));
    }
    if (isDropdownSubscriberOpen) {
      dispatch(__getSubscriberList(url));
    }
  };

  const alignNewestHandler = (id) => {
    let url = `${id}?sort=recent&searchword=`;
    // console.log("여기-", url);
    if (isDropdownFriendOpen) {
      dispatch(__getFriendsList(url));
    }
    if (isDropdownSubscribeOpen) {
      dispatch(__getSubscribeList(url));
    }
    if (isDropdownSubscriberOpen) {
      dispatch(__getSubscriberList(url));
    }
  };
  const alignOldestHandler = (id) => {
    let url = `${id}?sort=old&searchword=`;
    // console.log("여기-", url);
    if (isDropdownFriendOpen) {
      dispatch(__getFriendsList(url));
    }
    if (isDropdownSubscribeOpen) {
      dispatch(__getSubscribeList(url));
    }
    if (isDropdownSubscriberOpen) {
      dispatch(__getSubscriberList(url));
    }
  };

  const { FriendsList, isLoadingFriends } = useSelector((state) => state.friends);
  const { SubscribesList, isLoadingSubscribe } = useSelector((state) => state.subscribe);
  const { SubscribersList, isLoadingSubscriber } = useSelector((state) => state.subscribe);

  //입력된 값 기반으로 검색 결과 도출
  useEffect(() => {
    const throttleSearch = _.throttle(() => {
      setSearchWord(searchWord);
    }, 100);
    throttleSearch();
    return () => {
      throttleSearch.cancel();
    };
  }, [searchWord]);

  useEffect(() => {
    const throttleSearch = _.throttle(() => {
      setSearchWordSubscribe(searchWordSubscribe);
    }, 100);
    throttleSearch();
    return () => {
      throttleSearch.cancel();
    };
  }, [searchWordSubscribe]);

  useEffect(() => {
    const throttleSearch = _.throttle(() => {
      setSearchWordSubscriber(searchWordSubscriber);
    }, 100);
    throttleSearch();
    return () => {
      throttleSearch.cancel();
    };
  }, [searchWordSubscriber]);

  // 입력값 추적하여 searchWord에 넣기
  const searchHandler = (e) => {
    const value = e.target.value;
    setSearchWord(value);
  };

  const searchSubscribeHandler = (e) => {
    const value = e.target.value;
    setSearchWordSubscribe(value);
  };

  const searchSubscriberHandler = (e) => {
    const value = e.target.value;
    setSearchWordSubscriber(value);
  };

  //검색창 오픈여부 결정 함수
  const HandleSearchFriend = () => {
    setSearchFriendOpen(!searchFriendOpen);
    setSearchSubscribeOpen(false);
    setSearchSubscriberOpen(false);
    setIsDropdownFriendOpen(false);
  };

  const HandleSearchSubscribe = () => {
    setSearchSubscribeOpen(!searchSubscribeOpen);
    setSearchFriendOpen(false);
    setSearchSubscriberOpen(false);
    setIsDropdownSubscribeOpen(false);
  };

  const HandleSearchSubscriber = () => {
    setSearchSubscriberOpen(!searchSubscriberOpen);
    setSearchFriendOpen(false);
    setSearchSubscribeOpen(false);
    setIsDropdownSubscriberOpen(false);
  };

  // 드롭다운 모달 제어 함수
  const handleDropdownFriend = () => {
    setIsDropdownFriendOpen(!isDropdownFriendOpen);
    setSearchFriendOpen(false);
  };

  const handleDropdownSubscribe = () => {
    setIsDropdownSubscribeOpen(!isDropdownSubscribeOpen);
    setSearchSubscribeOpen(false);
  };

  const handleDropdownSubscriber = () => {
    setIsDropdownSubscriberOpen(!isDropdownSubscriberOpen);
    setSearchSubscriberOpen(false);
  };

  //모달 닫기 코드
  const handleDropdownFriendClose = () => {
    setIsDropdownFriendOpen(false);
  };

  const handleDropdownSubscribeClose = () => {
    setIsDropdownSubscribeOpen(false);
  };

  const handleDropdownSubscriberClose = () => {
    setIsDropdownSubscriberOpen(false);
  };

  // 외부 영역 누르면 모달 닫히게 하기
  const DropdownFriendRef = useRef(null);
  useOutSideClick(DropdownFriendRef, handleDropdownFriendClose);

  const DropdownSubscribeRef = useRef(null);
  useOutSideClick(DropdownSubscribeRef, handleDropdownSubscribeClose);

  const DropdownSubscriberRef = useRef(null);
  useOutSideClick(DropdownSubscriberRef, handleDropdownSubscriberClose);

  return (
    <>
      <WholeWrapper>
        <CalendarWrapper>
          <WholeAreaWrapper>
            <ListFrameBig>
              <ListFrame>
                <ContentWrapper>
                  <TopText>
                    <TopLeft>친구 {FriendsList.length}</TopLeft>
                    <TopRight ref={DropdownFriendRef}>
                      {searchFriendOpen && (
                        <SearchBar type="text" placeholder="ID, 닉네임으로 검색해보세요" value={searchWord} onChange={searchHandler}></SearchBar>
                      )}
                      <SearchIcon onClick={HandleSearchFriend} />
                      <IconWrap>
                        <AlignIcon onClick={handleDropdownFriend} />
                        {isDropdownFriendOpen && (
                          <DropdownFrame>
                            <DropdownItems onClick={() => alignBasicHandler(params.id)}>기본</DropdownItems>
                            <DropdownItems onClick={() => alignSubscribeHandler(params.id)}>구독자순</DropdownItems>
                            <DropdownItems onClick={() => alignNewestHandler(params.id)}>최신순</DropdownItems>
                            <DropdownItems onClick={() => alignOldestHandler(params.id)}>오래된순</DropdownItems>
                          </DropdownFrame>
                        )}
                      </IconWrap>
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

            <FrameBigWithPadding>
              <ListFrame>
                <ContentWrapper>
                  <TopText>
                    <TopLeft>구독 {SubscribesList.length}</TopLeft>
                    <TopRight ref={DropdownSubscribeRef}>
                      {searchSubscribeOpen && (
                        <SearchBar
                          type="text"
                          placeholder="ID, 닉네임으로 검색해보세요"
                          value={searchWordSubscribe}
                          onChange={searchSubscribeHandler}></SearchBar>
                      )}
                      <SearchIcon onClick={HandleSearchSubscribe} />
                      <IconWrap>
                        <AlignIcon onClick={handleDropdownSubscribe} />
                        {isDropdownSubscribeOpen && (
                          <DropdownFrame>
                            <DropdownItems onClick={() => alignBasicHandler(params.id)}>기본</DropdownItems>
                            <DropdownItems onClick={() => alignSubscribeHandler(params.id)}>구독자순</DropdownItems>
                            <DropdownItems onClick={() => alignNewestHandler(params.id)}>최신순</DropdownItems>
                            <DropdownItems onClick={() => alignOldestHandler(params.id)}>오래된순</DropdownItems>
                          </DropdownFrame>
                        )}
                      </IconWrap>
                    </TopRight>
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
            </FrameBigWithPadding>

            <FrameBigWithMargin>
              <ListFrame>
                <ContentWrapper>
                  <TopText>
                    <TopLeft>구독자 {SubscribersList.length}</TopLeft>
                    <TopRight ref={DropdownSubscriberRef}>
                      {searchSubscriberOpen && (
                        <SearchBar
                          type="text"
                          placeholder="ID, 닉네임으로 검색해보세요"
                          value={searchWordSubscriber}
                          onChange={searchSubscriberHandler}></SearchBar>
                      )}
                      <SearchIcon onClick={HandleSearchSubscriber} />
                      <IconWrap>
                        <AlignIcon onClick={handleDropdownSubscriber} />
                        {isDropdownSubscriberOpen && (
                          <DropdownFrame>
                            <DropdownItems onClick={() => alignBasicHandler(params.id)}>기본</DropdownItems>
                            <DropdownItems onClick={() => alignSubscribeHandler(params.id)}>구독자순</DropdownItems>
                            <DropdownItems onClick={() => alignNewestHandler(params.id)}>최신순</DropdownItems>
                            <DropdownItems onClick={() => alignOldestHandler(params.id)}>오래된순</DropdownItems>
                          </DropdownFrame>
                        )}
                      </IconWrap>
                    </TopRight>
                  </TopText>
                  <ListWrap>
                    <DetailSubscriber
                      SubscribersList={SubscribersList}
                      setIsCalendarMainVisible={setIsCalendarMainVisible}
                      setIsFriendListVisible={setIsFriendListVisible}
                      setIsSearchUsersvisible={setIsSearchUsersvisible}
                      setIsFriendDetailVisible={setIsFriendDetailVisible}
                    />
                  </ListWrap>
                </ContentWrapper>
              </ListFrame>
            </FrameBigWithMargin>
          </WholeAreaWrapper>
        </CalendarWrapper>
      </WholeWrapper>
    </>
  );
}

export default DetailMain;
