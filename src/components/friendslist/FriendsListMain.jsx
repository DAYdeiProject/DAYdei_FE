import { React, useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { throttle } from "lodash";

import FriendList from "./FriendList";
import SubscribeList from "./SubscribeList";
import SubscriberList from "./SubscriberList";
import ApproveRequestModal from "./ApproveRequestModal";
import AlignDropdown from "../../elements/AlignDropdown";

import { __getFriendsList, __getRequestedUsersList, __getSentUsersList } from "../../redux/modules/friendsSlice";
import { __getSubscribeList, __getSubscriberList } from "../../redux/modules/subscribeSlice";

import useOutSideClick from "../../hooks/useOutsideClick";
import useAlignFunctions from "../../hooks/useAlignFunctions";
import useSearch from "../../hooks/useSearch";

import { ReactComponent as FriendSearch } from "../../assets/friendList/friendSearch.svg";
import { ReactComponent as FillFriendAdd } from "../../assets/friendList/fillFriendAdd.svg";
import { ReactComponent as FriendAdd } from "../../assets/friendList/friendAdd.svg";
import { ReactComponent as Filter } from "../../assets/friendList/filter.svg";
import { GetUserInfo } from "../../utils/cookie/userInfo";

function FriendsListMain() {
  const dispatch = useDispatch();
  //내 id / 타인 id
  const usersInfo = GetUserInfo();
  const location = useLocation();
  const id = usersInfo.userId;
  const { otherId } = useSelector((state) => state.header);
  //통신 성공 여부
  const statusCodeFriend = useSelector((state) => state.friends.statusCode);
  const statusCodeSubscribe = useSelector((state) => state.subscribe.statusCode);
  const acceptStatusCode = useSelector((state) => state.friends.acceptStatusCode);
  // 내게 온 신청 & 내가 보낸 신청 리스트
  const RequestedUsersList = useSelector((state) => state.friends.RequestedUsersList);
  const SentUsersList = useSelector((state) => state.friends.SentUsersList);
  //헤더 알림 상태
  const { text, notiState } = useSelector((state) => state.header);
  // 친구요청 수락 모달 열고닫힘
  const [isApproveRequestModalOpen, setIsApproveRequestModalOpen] = useState(false);
  //검색어 상태
  const [searchWordPassed, setSearchWordPassed] = useState("");
  //검색창 오픈상태
  const [searchFriendOpen, setSearchFriendOpen] = useState(false);
  const [searchSubscribeOpen, setSearchSubscribeOpen] = useState(false);
  const [searchSubscriberOpen, setSearchSubscriberOpen] = useState(false);

  // 페이지 진입 시 친구/구독 리스트를 GET
  useEffect(() => {
    let url = "";
    if (location.pathname === "/mylist") {
      url = `${id}?sort=name&searchword=`;
    } else if (location.pathname === "/friendsdetail") {
      url = `${otherId}?sort=name&searchword=`;
    }

    dispatch(__getFriendsList(url));
    dispatch(__getSubscribeList(url));
    dispatch(__getSubscriberList(url));
  }, [statusCodeFriend, statusCodeSubscribe, isApproveRequestModalOpen]);

  //셀렉터로 불러오는 친구, 구독, 구독자 리스트
  const FriendsList = useSelector((state) => state.friends.FriendsList);
  const SubscribesList = useSelector((state) => state.subscribe.SubscribesList);
  const SubscribersList = useSelector((state) => state.subscribe.SubscribersList);

  // 친구추가 아이콘 클릭하는 순간 친구신청한 유저 불러오는 GET요청 함수 dispatch
  const approveRequestModalHandler = () => {
    setIsApproveRequestModalOpen(true);
    dispatch(__getRequestedUsersList());
  };

  // 친구수락/거절 모달에서 수락/거절 눌렀을 때 업데이트 된 목록 가져오기
  useEffect(() => {
    dispatch(__getRequestedUsersList());
    dispatch(__getSentUsersList());
  }, [acceptStatusCode, statusCodeFriend, notiState, isApproveRequestModalOpen]);

  //바깥영역 누르면 -> 친구신청모달 닫힘
  const handleApproveRequestModalClose = () => {
    setIsApproveRequestModalOpen(false);
  };

  const ApproveRequestModalRef = useRef(null);
  useOutSideClick(ApproveRequestModalRef, handleApproveRequestModalClose);

  //검색창 오픈여부 결정 함수
  const HandleSearchFriend = () => {
    setSearchFriendOpen(!searchFriendOpen);
    setSearchSubscribeOpen(false);
    setSearchSubscriberOpen(false);

    setIsDropdownFriendOpen(false);
    setSearchWordPassed("");
  };

  const HandleSearchSubscribe = () => {
    setSearchSubscribeOpen(!searchSubscribeOpen);
    setSearchFriendOpen(false);
    setSearchSubscriberOpen(false);

    setIsDropdownSubscribeOpen(false);
    setSearchWordPassed("");
  };

  const HandleSearchSubscriber = () => {
    setSearchSubscriberOpen(!searchSubscriberOpen);
    setSearchFriendOpen(false);
    setSearchSubscribeOpen(false);

    setIsDropdownSubscriberOpen(false);
    setSearchWordPassed("");
  };

  // 검색 Throttle
  const throttledCallback = throttle(() => {
    let passedUrl = "";
    if (location.pathname === "/mylist") {
      passedUrl = `${id}?sort=name&searchword=${searchWordPassed}`;
    } else if (location.pathname === "/friendsdetail") {
      passedUrl = `${otherId}?sort=name&searchword=${searchWordPassed}`;
    }

    searchFriendOpen
      ? dispatch(__getFriendsList(passedUrl))
      : searchSubscribeOpen
      ? dispatch(__getSubscribeList(passedUrl))
      : dispatch(__getSubscriberList(passedUrl));
  }, 300);

  useEffect(() => {
    throttledCallback();
  }, [searchWordPassed, searchFriendOpen, searchSubscribeOpen, searchSubscriberOpen]);

  // 검색어 state에 저장
  const searchHandler = (e) => {
    const value = e.target.value;
    setSearchWordPassed(value);
  };

  const searchSubscribeHandler = (e) => {
    const value = e.target.value;
    setSearchWordPassed(value);
  };

  const searchSubscriberHandler = (e) => {
    const value = e.target.value;
    setSearchWordPassed(value);
  };

  //정렬 드롭다운 관련 : useAlignFunctions에서 import
  const {
    isDropdownFriendOpen,
    setIsDropdownFriendOpen,
    isDropdownSubscribeOpen,
    setIsDropdownSubscribeOpen,
    isDropdownSubscriberOpen,
    setIsDropdownSubscriberOpen,
    DropdownFriendRef,
    DropdownSubscribeRef,
    DropdownSubscriberRef,
  } = useAlignFunctions();

  // 드롭다운 아이콘 클릭 시 열고닫힘
  const handleDropdownFriend = () => {
    setIsDropdownFriendOpen(!isDropdownFriendOpen);
    setSearchFriendOpen(false);

    setIsDropdownSubscribeOpen(false);
    setIsDropdownSubscriberOpen(false);
  };

  const handleDropdownSubscribe = () => {
    setIsDropdownSubscribeOpen(!isDropdownSubscribeOpen);
    setSearchSubscribeOpen(false);

    setIsDropdownFriendOpen(false);
    setIsDropdownSubscriberOpen(false);
  };

  const handleDropdownSubscriber = () => {
    setIsDropdownSubscriberOpen(!isDropdownSubscriberOpen);
    setSearchSubscriberOpen(false);

    setIsDropdownFriendOpen(false);
    setIsDropdownSubscribeOpen(false);
  };

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
                    <SearchBar type="text" placeholder="ID, 닉네임으로 검색해보세요" value={searchWordPassed} onChange={searchHandler}></SearchBar>
                  )}
                  <FriendSearch onClick={HandleSearchFriend} />
                  {RequestedUsersList && RequestedUsersList.length !== 0
                    ? location.pathname === "/mylist" && <FillFriendAdd onClick={approveRequestModalHandler} />
                    : location.pathname === "/mylist" && <FriendAdd onClick={approveRequestModalHandler} />}
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
                    {isDropdownFriendOpen && <AlignDropdown isText={"isFriend"} isSection={"myPage"} />}
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
                    <SearchBar type="text" placeholder="ID, 닉네임으로 검색해보세요" value={searchWordPassed} onChange={searchSubscribeHandler}></SearchBar>
                  )}
                  <FriendSearch onClick={HandleSearchSubscribe} />
                  <IconWrap>
                    <Filter onClick={handleDropdownSubscribe} />
                    {isDropdownSubscribeOpen && <AlignDropdown isText={"isSubscribe"} isSection={"myPage"} />}
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
                    <SearchBar type="text" placeholder="ID, 닉네임으로 검색해보세요" value={searchWordPassed} onChange={searchSubscriberHandler}></SearchBar>
                  )}
                  <FriendSearch onClick={HandleSearchSubscriber} />
                  <IconWrap>
                    <Filter onClick={handleDropdownSubscriber} />
                    {isDropdownSubscriberOpen && <AlignDropdown isText={"isSubscriber"} isSection={"myPage"} />}
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
  height: calc(1080px - 4rem - 0.0625rem);
  justify-content: flex-start;
`;

export const WholeAreaWrapper = styled.div`
  ${(props) => props.theme.FlexRow};
  height: 100%;
  padding: 0 3rem;
  @media screen and (max-width: 1640px) {
    padding: 0 2rem;
  }
  @media screen and (max-width: 1570px) {
    padding: 0 1rem;
  }
  @media screen and (max-width: 1518px) {
    margin-left: 25px;
    padding: 0 3rem;
  }
  @media screen and (max-width: 1110px) {
    padding: 0 2rem;
  }
  @media screen and (max-width: 980px) {
    padding: 0 1rem;
  }
  @media screen and (max-width: 872px) {
    padding-left: 20px;
  }
`;

export const ListFrameBig = styled.div`
  ${(props) => props.theme.FlexCol};
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  flex: 1;

  @media screen and (max-width: 1518px) {
    width: 28.1875rem;
  }
  @media screen and (max-width: 1280px) {
    align-items: center;
  }
`;

export const FrameBigWithPadding = styled(ListFrameBig)`
  flex: 1.05;
  align-items: center;
  border-left: 0.0375rem solid ${(props) => props.theme.Bg.border1};
  border-right: 0.0375rem solid ${(props) => props.theme.Bg.border1};

  @media screen and (max-width: 1518px) {
    width: 28.1875rem;
  }
`;

export const FrameBigWithMargin = styled(ListFrameBig)`
  align-items: flex-end;

  @media screen and (max-width: 1518px) {
    width: 28.1875rem;
  }
  @media screen and (max-width: 1280px) {
    align-items: center;
  }
`;

export const ListFrame = styled.div`
  height: 100%;
`;

export const ContentWrapper = styled.div`
  ${(props) => props.theme.FlexCol};
  height: 100%;

  // 창 최소로 줄였을때..
  max-height: calc(100vh - 4rem - 0.0625rem);

  @media screen and (max-width: 1890px) {
    width: 440px;
  }
  @media screen and (max-width: 1820px) {
    width: 410px;
  }
  @media screen and (max-width: 1720px) {
    width: 380px;
  }
  @media screen and (max-width: 1640px) {
    width: 360px;
  }
  @media screen and (max-width: 1518px) {
    width: 430px;
  }
  @media screen and (max-width: 1440px) {
    width: 410px;
  }
  @media screen and (max-width: 1370px) {
    width: 380px;
  }
  @media screen and (max-width: 1280px) {
    width: 320px;
  }
  @media screen and (max-width: 1110px) {
    width: 290px;
  }
  @media screen and (max-width: 980px) {
    width: 250px;
  }
  @media screen and (max-width: 872px) {
    width: 230px;
  }
`;

export const TopText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 29rem;
  min-height: 2.6875rem;

  border-bottom: 0.0625rem solid #121212;
  margin-top: 3rem;

  @media screen and (max-width: 1890px) {
    width: 440px;
  }
  @media screen and (max-width: 1820px) {
    width: 410px;
  }
  @media screen and (max-width: 1720px) {
    width: 380px;
  }
  @media screen and (max-width: 1640px) {
    width: 360px;
  }

  @media screen and (max-width: 1518px) {
    width: 430px;
    margin-top: 2.25rem;
  }
  @media screen and (max-width: 1440px) {
    width: 410px;
  }
  @media screen and (max-width: 1370px) {
    width: 380px;
  }
  @media screen and (max-width: 1280px) {
    width: 320px;
  }
  @media screen and (max-width: 1110px) {
    width: 290px;
  }
  @media screen and (max-width: 980px) {
    width: 250px;
  }
  @media screen and (max-width: 872px) {
    width: 230px;
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

  @media screen and (max-width: 1518px) {
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

  @media screen and (max-width: 1518px) {
    width: 12rem;
  }
  @media screen and (max-width: 1110px) {
    width: 150px;
    font-size: 12px;
  }
  @media screen and (max-width: 980px) {
    width: 120px;
  }
  @media screen and (max-width: 872px) {
    width: 90px;
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

  width: 29rem;
  height: 100%;
  margin-top: 1rem;
  padding-bottom: 20px;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 1890px) {
    width: 440px;
  }
  @media screen and (max-width: 1820px) {
    width: 410px;
  }
  @media screen and (max-width: 1720px) {
    width: 380px;
  }
  @media screen and (max-width: 1640px) {
    width: 360px;
  }
  @media screen and (max-width: 1518px) {
    width: 430px;
  }
  @media screen and (max-width: 1440px) {
    width: 410px;
  }
  @media screen and (max-width: 1370px) {
    width: 380px;
  }
  @media screen and (max-width: 1280px) {
    width: 320px;
  }
  @media screen and (max-width: 1110px) {
    width: 290px;
  }
  @media screen and (max-width: 980px) {
    width: 250px;
  }
  @media screen and (max-width: 872px) {
    width: 230px;
  }
`;

export default FriendsListMain;
