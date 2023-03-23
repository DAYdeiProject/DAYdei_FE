import { React, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import FriendList from "./FriendList";
import SubscribeList from "./SubscribeList";
import SubscriberList from "./SubscriberList";
import { __getFriendsList, __getRequestedUsersList } from "../../../redux/modules/friendsSlice";
import { __getSubscribeList, __getSubscriberList } from "../../../redux/modules/subscribeSlice";
import { AiOutlineSearch } from "react-icons/ai";
import { BsPersonAdd } from "react-icons/bs";
import { RxTextAlignMiddle } from "react-icons/rx";
import ApproveRequestModal from "./ApproveRequestModal";
import useOutSideClick from "../../../hooks/useOutsideClick";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import _ from "lodash";

function FriendsListMain({ setIsCalendarMainVisible, setIsFriendListVisible, setIsSearchUsersvisible, setIsFriendDetailVisible }) {
  const params = useParams();
  const dispatch = useDispatch();
  const token = Cookies.get("accessJWTToken");
  const statusCodeFriend = useSelector((state) => state.friends.statusCode);
  const statusCodeSubscribe = useSelector((state) => state.subscribe.statusCode);
  const acceptStatusCode = useSelector((state) => state.friends.acceptStatusCode);
  const RequestedUsersList = useSelector((state) => state.friends.RequestedUsersList);

  // 친구요청 수락 모달 열고닫기 상태관리
  const [isApproveRequestModalOpen, setIsApproveRequestModalOpen] = useState(false);
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

  // 친구추가 아이콘 클릭하는 순간 친구신청한 유저 불러오는 GET요청 함수 dispatch
  const approveRequestModalHandler = () => {
    setIsApproveRequestModalOpen(true);
    dispatch(__getRequestedUsersList({ token }));
  };

  const handleCategoryModalClose = () => {
    setIsApproveRequestModalOpen(false);
  };

  const ApproveRequestModalRef = useRef(null);
  useOutSideClick(ApproveRequestModalRef, handleCategoryModalClose);

  // 친구수락/거절 모달에서 수락/거절 눌렀을 때 업데이트 된 목록 가져오기
  useEffect(() => {
    dispatch(__getRequestedUsersList({ token }));
  }, [acceptStatusCode, statusCodeFriend]);

  // 페이지 진입 시 친구/구독 리스트를 GET
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
  }, [searchWord, searchWordSubscribe, searchWordSubscriber, statusCodeFriend, statusCodeSubscribe, isApproveRequestModalOpen]);

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
  };

  const HandleSearchSubscribe = () => {
    setSearchSubscribeOpen(!searchSubscribeOpen);
  };

  const HandleSearchSubscriber = () => {
    setSearchSubscriberOpen(!searchSubscriberOpen);
  };

  // 드롭다운 모달 제어 함수
  const handleDropdownFriend = () => {
    setIsDropdownFriendOpen(!isDropdownFriendOpen);
  };

  const handleDropdownSubscribe = () => {
    setIsDropdownSubscribeOpen(!isDropdownSubscribeOpen);
  };

  const handleDropdownSubscriber = () => {
    setIsDropdownSubscriberOpen(!isDropdownSubscriberOpen);
  };

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
                    <PersonAddIcon onClick={approveRequestModalHandler} />
                    {isApproveRequestModalOpen && (
                      <ApproveRequestModal
                        ApproveRequestModalRef={ApproveRequestModalRef}
                        RequestedUsersList={RequestedUsersList}
                        setIsApproveRequestModalOpen={setIsApproveRequestModalOpen}
                      />
                    )}
                    <AlignIcon onClick={handleDropdownFriend} />
                    {isDropdownFriendOpen && (
                      <DropdownFrame>
                        <DropdownItems onClick={() => alignBasicHandler(params.id)}>기본</DropdownItems>
                        <DropdownItems onClick={() => alignSubscribeHandler(params.id)}>구독자순</DropdownItems>
                        <DropdownItems onClick={() => alignNewestHandler(params.id)}>최신순</DropdownItems>
                        <DropdownItems onClick={() => alignOldestHandler(params.id)}>오래된순</DropdownItems>
                      </DropdownFrame>
                    )}
                  </TopRight>
                </TopText>
                <ListWrap>
                  <FriendList
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
                  <TopLeft>구독 {SubscribesList.length} </TopLeft>
                  <TopRight ref={DropdownSubscribeRef}>
                    {searchSubscribeOpen && (
                      <SearchBar
                        type="text"
                        placeholder="ID, 닉네임으로 검색해보세요"
                        value={searchWordSubscribe}
                        onChange={searchSubscribeHandler}></SearchBar>
                    )}
                    <SearchIcon onClick={HandleSearchSubscribe} />
                    <AlignIcon onClick={handleDropdownSubscribe} />
                    {isDropdownSubscribeOpen && (
                      <DropdownFrame>
                        <DropdownItems onClick={() => alignBasicHandler(params.id)}>기본</DropdownItems>
                        <DropdownItems onClick={() => alignSubscribeHandler(params.id)}>구독자순</DropdownItems>
                        <DropdownItems onClick={() => alignNewestHandler(params.id)}>최신순</DropdownItems>
                        <DropdownItems onClick={() => alignOldestHandler(params.id)}>오래된순</DropdownItems>
                      </DropdownFrame>
                    )}
                  </TopRight>
                </TopText>
                <ListWrap>
                  <SubscribeList
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
          <ListFrameBig>
            <ListFrame>
              <ContentWrapper>
                <TopText>
                  <TopLeft>구독자 {SubscribersList.length} </TopLeft>
                  <TopRight ref={DropdownSubscriberRef}>
                    {searchSubscriberOpen && (
                      <SearchBar
                        type="text"
                        placeholder="ID, 닉네임으로 검색해보세요"
                        value={searchWordSubscriber}
                        onChange={searchSubscriberHandler}></SearchBar>
                    )}
                    <SearchIcon onClick={HandleSearchSubscriber} />
                    <AlignIcon onClick={handleDropdownSubscriber} />
                    {isDropdownSubscriberOpen && (
                      <DropdownFrame>
                        <DropdownItems onClick={() => alignBasicHandler(params.id)}>기본</DropdownItems>
                        <DropdownItems onClick={() => alignSubscribeHandler(params.id)}>구독자순</DropdownItems>
                        <DropdownItems onClick={() => alignNewestHandler(params.id)}>최신순</DropdownItems>
                        <DropdownItems onClick={() => alignOldestHandler(params.id)}>오래된순</DropdownItems>
                      </DropdownFrame>
                    )}
                  </TopRight>
                </TopText>
                <ListWrap>
                  <SubscriberList
                    SubscribersList={SubscribersList}
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

export const LoadingWrapper = styled.div`
  width: 1570px;
  height: 100%;
`;

export const CalendarWrapper = styled.div`
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
export const ListFrameBig = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 40px 71px;
  gap: 16px;
  width: 520px;
  height: 980px;
  /* background-color: pink; */
`;
export const ListFrame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 16px;
  width: 490px;
  height: 835px;
  /* background-color: gray; */
`;
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
  width: 480px;
  height: 835px;
  /* background-color: skyblue; */
`;
export const TopText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px 0px 0px;
  width: 478px;
  height: 44px;
  /* background-color: yellow; */
`;

export const TopLeft = styled.div`
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

export const TopRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0px;
  gap: 16px;

  /* width: 92px; */
  height: 20px;
  /* background-color: pink; */
  :hover {
    cursor: pointer;
  }
`;

const SearchBar = styled.input`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 15px;
  border: 1px solid gray;
  border-radius: 4px;
  width: 230px;
  height: 20px;
`;

export const SearchIcon = styled(AiOutlineSearch)`
  color: gray;
  width: 20px;
  height: 20px;
`;

export const PersonAddIcon = styled(BsPersonAdd)`
  color: gray;
  width: 20px;
  height: 20px;
`;

export const AlignIcon = styled(RxTextAlignMiddle)`
  color: gray;
  width: 20px;
  height: 20px;
`;

export const DropdownFrame = styled.div`
  width: 100px;
  height: 140px;
  border-radius: 4px;
  background-color: white;
  border: 1px solid black;

  position: absolute;
  top: calc(20% - 10px);

  z-index: 10;
  padding: 0px 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const DropdownItems = styled.div`
  border-bottom: 1px solid lightgray;
`;

export const ListWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 478px;
  height: 770px;
  background: #fbfbfb;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default FriendsListMain;
