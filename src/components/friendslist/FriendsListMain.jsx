import { React, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Cookies from "js-cookie";
import _ from "lodash";

import FriendList from "./FriendList";
import SubscribeList from "./SubscribeList";
import SubscriberList from "./SubscriberList";
import ApproveRequestModal from "./ApproveRequestModal";

import { __getFriendsList, __getRequestedUsersList, __getSentUsersList } from "../../redux/modules/friendsSlice";
import { __getSubscribeList, __getSubscriberList } from "../../redux/modules/subscribeSlice";

import useOutSideClick from "../../hooks/useOutsideClick";
import useAlignFunctions from "../../hooks/useAlignFunctions";

import { ReactComponent as FriendSearch } from "../../assets/friendList/friendSearch.svg";
import { ReactComponent as FillFriendAdd } from "../../assets/friendList/fillFriendAdd.svg";
import { ReactComponent as FriendAdd } from "../../assets/friendList/friendAdd.svg";
import { ReactComponent as Filter } from "../../assets/friendList/filter.svg";
import { GetUserInfo } from "../../utils/cookie/userInfo";

function FriendsListMain() {
  const dispatch = useDispatch();
  const usersInfo = GetUserInfo();
  const token = Cookies.get("accessJWTToken");
  const statusCodeFriend = useSelector((state) => state.friends.statusCode);
  const statusCodeSubscribe = useSelector((state) => state.subscribe.statusCode);
  const acceptStatusCode = useSelector((state) => state.friends.acceptStatusCode);
  // 내게 온 신청 & 내가 보낸 신청 리스트
  const RequestedUsersList = useSelector((state) => state.friends.RequestedUsersList);
  const SentUsersList = useSelector((state) => state.friends.SentUsersList);
  //헤더 알림 상태
  const { text, notiState } = useSelector((state) => state.header);

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
    dispatch(__getSentUsersList());
  }, [acceptStatusCode, statusCodeFriend, notiState]);

  // 페이지 진입 시 친구/구독 리스트를 GET
  useEffect(() => {
    const id = usersInfo.userId;
    if (searchWord === "") {
      let url = `${id}?sort=name&searchword=`;
      // console.log("검색어 없는 url-->", url);
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

  //정렬 함수 import하여 사용
  const {
    alignBasicHandler,
    alignNewestHandler,
    alignOldestHandler,
    alignSubscribeHandler,
    isDropdownFriendOpen,
    setIsDropdownFriendOpen,
    isDropdownSubscribeOpen,
    setIsDropdownSubscribeOpen,
    isDropdownSubscriberOpen,
    setIsDropdownSubscriberOpen,
  } = useAlignFunctions();

  const FriendsList = useSelector((state) => state.friends.FriendsList);
  const SubscribesList = useSelector((state) => state.subscribe.SubscribesList);
  const SubscribersList = useSelector((state) => state.subscribe.SubscribersList);

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
    <WholeWrapper>
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
                  <FriendSearch onClick={HandleSearchFriend} />
                  {RequestedUsersList && RequestedUsersList.length !== 0 ? (
                    <FillFriendAdd onClick={approveRequestModalHandler} />
                  ) : (
                    <FriendAdd onClick={approveRequestModalHandler} />
                  )}
                  {isApproveRequestModalOpen && (
                    <ApproveRequestModal
                      ApproveRequestModalRef={ApproveRequestModalRef}
                      RequestedUsersList={RequestedUsersList}
                      SentUsersList={SentUsersList}
                      setIsApproveRequestModalOpen={setIsApproveRequestModalOpen}
                    />
                  )}
                  <IconWrap>
                    <Filter onClick={handleDropdownFriend} />
                    {isDropdownFriendOpen && (
                      <DropdownFrame>
                        <DropdownItems onClick={() => alignBasicHandler(usersInfo.userId)}>기본</DropdownItems>
                        <DropdownItems onClick={() => alignSubscribeHandler(usersInfo.userId)}>구독자순</DropdownItems>
                        <DropdownItems onClick={() => alignNewestHandler(usersInfo.userId)}>최신순</DropdownItems>
                        <DropdownItems onClick={() => alignOldestHandler(usersInfo.userId)}>오래된순</DropdownItems>
                      </DropdownFrame>
                    )}
                  </IconWrap>
                </TopRight>
              </TopText>
              <ListWrap>
                <FriendList FriendsList={FriendsList} />
              </ListWrap>
            </ContentWrapper>
          </ListFrame>
        </ListFrameBig>

        <FrameBigWithPadding>
          <ListFrame>
            <ContentWrapper>
              <TopText>
                <TopLeft>구독 {SubscribesList.length} </TopLeft>
                <TopRight ref={DropdownSubscribeRef}>
                  {searchSubscribeOpen && (
                    <SearchBar type="text" placeholder="ID, 닉네임으로 검색해보세요" value={searchWordSubscribe} onChange={searchSubscribeHandler}></SearchBar>
                  )}
                  <FriendSearch onClick={HandleSearchSubscribe} />
                  <IconWrap>
                    <Filter onClick={handleDropdownSubscribe} />
                    {isDropdownSubscribeOpen && (
                      <DropdownFrame>
                        <DropdownItems onClick={() => alignBasicHandler(usersInfo.userId)}>기본</DropdownItems>
                        <DropdownItems onClick={() => alignSubscribeHandler(usersInfo.userId)}>구독자순</DropdownItems>
                        <DropdownItems onClick={() => alignNewestHandler(usersInfo.userId)}>최신순</DropdownItems>
                        <DropdownItems onClick={() => alignOldestHandler(usersInfo.userId)}>오래된순</DropdownItems>
                      </DropdownFrame>
                    )}
                  </IconWrap>
                </TopRight>
              </TopText>
              <ListWrap>
                <SubscribeList SubscribesList={SubscribesList} />
              </ListWrap>
            </ContentWrapper>
          </ListFrame>
        </FrameBigWithPadding>

        <FrameBigWithMargin>
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
                  <FriendSearch onClick={HandleSearchSubscriber} />
                  <IconWrap>
                    <Filter onClick={handleDropdownSubscriber} />
                    {isDropdownSubscriberOpen && (
                      <DropdownFrame>
                        <DropdownItems onClick={() => alignBasicHandler(usersInfo.userId)}>기본</DropdownItems>
                        <DropdownItems onClick={() => alignSubscribeHandler(usersInfo.userId)}>구독자순</DropdownItems>
                        <DropdownItems onClick={() => alignNewestHandler(usersInfo.userId)}>최신순</DropdownItems>
                        <DropdownItems onClick={() => alignOldestHandler(usersInfo.userId)}>오래된순</DropdownItems>
                      </DropdownFrame>
                    )}
                  </IconWrap>
                </TopRight>
              </TopText>
              <ListWrap>
                <SubscriberList SubscribersList={SubscribersList} />
              </ListWrap>
            </ContentWrapper>
          </ListFrame>
        </FrameBigWithMargin>
      </WholeAreaWrapper>
    </WholeWrapper>
  );
}

export const WholeWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  height: calc(100vh - 4rem - 0.0625rem);
  justify-content: flex-start;
`;

export const WholeAreaWrapper = styled.div`
  ${(props) => props.theme.FlexRow};
  padding: 0 3rem;
  @media screen and (max-width: 1440px) {
    margin-left: 25px;
  }
`;

export const ListFrameBig = styled.div`
  ${(props) => props.theme.FlexCol};
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  flex: 1;

  @media screen and (max-width: 1440px) {
    width: 28.1875rem;
  }
`;

export const FrameBigWithPadding = styled(ListFrameBig)`
  flex: 1.05;
  align-items: center;
  border-left: 0.0375rem solid ${(props) => props.theme.Bg.border1};
  border-right: 0.0375rem solid ${(props) => props.theme.Bg.border1};

  @media screen and (max-width: 1440px) {
    width: 28.1875rem;
  }
`;

export const FrameBigWithMargin = styled(ListFrameBig)`
  align-items: flex-end;

  @media screen and (max-width: 1440px) {
    width: 28.1875rem;
  }
`;

export const ListFrame = styled.div``;

export const ContentWrapper = styled.div`
  ${(props) => props.theme.FlexCol};

  @media screen and (max-width: 1440px) {
    min-width: 430px;
  }

  @media screen and (max-width: 1880px) {
    width: 460px;
  }
  @media screen and (max-width: 1780px) {
    width: 440px;
  }
`;

export const TopText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 29rem;
  height: 2.6875rem;

  border-bottom: 0.0625rem solid #121212;
  margin-top: 3rem;

  @media screen and (max-width: 1440px) {
    width: 29rem;
    margin-top: 2.25rem;
  }
  @media screen and (max-width: 1880px) {
    width: 420px;
  }
`;

export const TopLeft = styled.div`
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.1875rem;
`;

export const TopLeftWithMargin = styled(TopLeft)`
  margin-left: 0.625rem;
`;

export const TopRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-right: 0.25rem;
  gap: 0.5rem;
  :hover {
    cursor: pointer;
  }

  @media screen and (max-width: 1440px) {
    padding-right: 0.1875rem;
    gap: 0.375rem;
  }
`;

export const SearchBar = styled.input`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0.9375rem;
  border: 0.0625rem solid ${(props) => props.theme.Bg.color3};
  border-radius: 0.25rem;
  width: 14.375rem;
  height: 1.25rem;

  @media screen and (max-width: 1440px) {
    width: 12rem;
  }
`;

export const IconWrap = styled.div`
  width: 1.25rem;
  height: 1.25rem;
`;

export const DropdownFrame = styled.div`
  position: relative;
  width: 6.25rem;
  height: 8.75rem;
  border-radius: 0.25rem;
  background-color: white;
  border: 0.0625rem solid #121212;
  top: calc(100% - 1.25rem);
  right: 4.6875rem;
  padding: 0rem 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0rem;
`;

export const DropdownItems = styled.div`
  height: 25%;
  width: 100%;
  display: flex;
  padding-left: 0.125rem;
  align-items: center;

  font-weight: 600;
  font-size: ${(props) => props.theme.Fs.size12};
  :hover {
    background: ${(props) => props.theme.Bg.hoverColor};
  }
`;

export const ListWrap = styled.div`
  ${(props) => props.theme.FlexCol};
  justify-content: flex-start;
  padding: 0rem;
  //width: 29rem;
  width: 100%;
  height: 50.75rem;
  margin-top: 1rem;
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 1440px) {
    width: 29rem;
  }

  @media screen and (max-height: 1032.22px) {
    height: 850px;
  }
  @media screen and (max-height: 929px) {
    height: 750px;
  }
  @media screen and (max-height: 844.55px) {
    height: 670px;
  }
  @media screen and (max-height: 743.2px) {
    height: 570px;
  }
  @media screen and (max-height: 619.33px) {
    height: 470px;
  }
`;

export default FriendsListMain;
