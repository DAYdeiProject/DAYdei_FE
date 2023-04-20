// import { React, useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import _ from "lodash";

// import { __getFriendsList, __getRequestedUsersList } from "../../redux/modules/friendsSlice";
// import { __getSubscribeList, __getSubscriberList } from "../../redux/modules/subscribeSlice";

// import DetailFriends from "./DetailFriends";
// import DetailSubscribe from "./DetailSubscribe";
// import DetailSubscriber from "./DetailSubscriber";
// import useOutSideClick from "../../hooks/useOutsideClick";

// import AlignDropdown from "../../elements/AlignDropdown";
// import Loading from "../../components/Loading";
// import { ReactComponent as Filter } from "../../assets/friendList/filter.svg";
// import { ReactComponent as FriendSearch } from "../../assets/friendList/friendSearch.svg";
// import {
//   WholeWrapper,
//   WholeAreaWrapper,
//   ListFrameBig,
//   FrameBigWithPadding,
//   FrameBigWithMargin,
//   ListFrame,
//   ContentWrapper,
//   TopText,
//   TopLeft,
//   TopRight,
//   SearchBar,
//   ListWrap,
//   IconWrap,
// } from "../friendslist/FriendsListMain";
// import useAlignFunctions from "../../hooks/useAlignFunctions";

// function DetailMain() {
//   const dispatch = useDispatch();
//   // 검색어 상태
//   const [searchWord, setSearchWord] = useState("");
//   const [searchWordSubscribe, setSearchWordSubscribe] = useState("");
//   const [searchWordSubscriber, setSearchWordSubscriber] = useState("");
//   // 검색창 상태
//   const [searchFriendOpen, setSearchFriendOpen] = useState(false);
//   const [searchSubscribeOpen, setSearchSubscribeOpen] = useState(false);
//   const [searchSubscriberOpen, setSearchSubscriberOpen] = useState(false);

//   const { otherId } = useSelector((state) => state.header);

//   // 친구의 친구 페이지 진입 시 친구/구독 리스트를 GET
//   useEffect(() => {
//     const id = otherId;
//     if (searchWord === "") {
//       let url = `${id}?sort=name&searchword=`;
//       dispatch(__getFriendsList(url));
//       dispatch(__getSubscribeList(url));
//       dispatch(__getSubscriberList(url));
//     }

//     if (searchWord !== "") {
//       let url = `${id}?sort=name&searchword=${searchWord}`;
//       dispatch(__getFriendsList(url));
//     }

//     if (searchWordSubscribe !== "") {
//       let url = `${id}?sort=name&searchword=${searchWordSubscribe}`;
//       dispatch(__getSubscribeList(url));
//     }

//     if (searchWordSubscriber !== "") {
//       let url = `${id}?sort=name&searchword=${searchWordSubscriber}`;
//       dispatch(__getSubscriberList(url));
//     }
//   }, [searchWord, searchWordSubscribe, searchWordSubscriber]);

//   //정렬 함수 import하여 사용
//   const {
//     isDropdownFriendOpen,
//     setIsDropdownFriendOpen,
//     isDropdownSubscribeOpen,
//     setIsDropdownSubscribeOpen,
//     isDropdownSubscriberOpen,
//     setIsDropdownSubscriberOpen,
//   } = useAlignFunctions();

//   const { FriendsList, isLoadingFriends } = useSelector((state) => state.friends);
//   const { SubscribesList, isLoadingSubscribe } = useSelector((state) => state.subscribe);
//   const { SubscribersList, isLoadingSubscriber } = useSelector((state) => state.subscribe);

//   //입력된 값 기반으로 검색 결과 도출
//   useEffect(() => {
//     const throttleSearch = _.throttle(() => {
//       setSearchWord(searchWord);
//     }, 100);
//     throttleSearch();
//     return () => {
//       throttleSearch.cancel();
//     };
//   }, [searchWord]);

//   useEffect(() => {
//     const throttleSearch = _.throttle(() => {
//       setSearchWordSubscribe(searchWordSubscribe);
//     }, 100);
//     throttleSearch();
//     return () => {
//       throttleSearch.cancel();
//     };
//   }, [searchWordSubscribe]);

//   useEffect(() => {
//     const throttleSearch = _.throttle(() => {
//       setSearchWordSubscriber(searchWordSubscriber);
//     }, 100);
//     throttleSearch();
//     return () => {
//       throttleSearch.cancel();
//     };
//   }, [searchWordSubscriber]);

//   // 입력값 추적하여 searchWord에 넣기
//   const searchHandler = (e) => {
//     const value = e.target.value;
//     setSearchWord(value);
//   };

//   const searchSubscribeHandler = (e) => {
//     const value = e.target.value;
//     setSearchWordSubscribe(value);
//   };

//   const searchSubscriberHandler = (e) => {
//     const value = e.target.value;
//     setSearchWordSubscriber(value);
//   };

//   //검색창 오픈여부 결정 함수
//   const HandleSearchFriend = () => {
//     setSearchFriendOpen(!searchFriendOpen);
//     setSearchSubscribeOpen(false);
//     setSearchSubscriberOpen(false);
//     setIsDropdownFriendOpen(false);
//   };

//   const HandleSearchSubscribe = () => {
//     setSearchSubscribeOpen(!searchSubscribeOpen);
//     setSearchFriendOpen(false);
//     setSearchSubscriberOpen(false);
//     setIsDropdownSubscribeOpen(false);
//   };

//   const HandleSearchSubscriber = () => {
//     setSearchSubscriberOpen(!searchSubscriberOpen);
//     setSearchFriendOpen(false);
//     setSearchSubscribeOpen(false);
//     setIsDropdownSubscriberOpen(false);
//   };

//   // 드롭다운 모달 제어 함수
//   const handleDropdownFriend = () => {
//     setIsDropdownFriendOpen(!isDropdownFriendOpen);
//     setSearchFriendOpen(false);
//   };

//   const handleDropdownSubscribe = () => {
//     setIsDropdownSubscribeOpen(!isDropdownSubscribeOpen);
//     setSearchSubscribeOpen(false);
//   };

//   const handleDropdownSubscriber = () => {
//     setIsDropdownSubscriberOpen(!isDropdownSubscriberOpen);
//     setSearchSubscriberOpen(false);
//   };

//   //모달 닫기 코드
//   const handleDropdownFriendClose = () => {
//     setIsDropdownFriendOpen(false);
//   };

//   const handleDropdownSubscribeClose = () => {
//     setIsDropdownSubscribeOpen(false);
//   };

//   const handleDropdownSubscriberClose = () => {
//     setIsDropdownSubscriberOpen(false);
//   };

//   // 외부 영역 누르면 모달 닫히게 하기
//   const DropdownFriendRef = useRef(null);
//   useOutSideClick(DropdownFriendRef, handleDropdownFriendClose);

//   const DropdownSubscribeRef = useRef(null);
//   useOutSideClick(DropdownSubscribeRef, handleDropdownSubscribeClose);

//   const DropdownSubscriberRef = useRef(null);
//   useOutSideClick(DropdownSubscriberRef, handleDropdownSubscriberClose);

//   //로딩중일때
//   if (isLoadingFriends || isLoadingSubscribe || isLoadingSubscriber) {
//     return (
//       <>
//         <Loading />
//       </>
//     );
//   }

//   return (
//     <>
//       <WholeWrapper>
//         <WholeAreaWrapper>
//           <ListFrameBig>
//             <ListFrame>
//               <ContentWrapper>
//                 <TopText>
//                   <TopLeft>친구 {FriendsList.length}</TopLeft>
//                   <TopRight ref={DropdownFriendRef}>
//                     {searchFriendOpen && (
//                       <SearchBar type="text" placeholder="ID, 닉네임으로 검색해보세요" value={searchWord} onChange={searchHandler}></SearchBar>
//                     )}
//                     <FriendSearch onClick={HandleSearchFriend} />
//                     <IconWrap>
//                       <Filter onClick={handleDropdownFriend} />
//                       {isDropdownFriendOpen && <AlignDropdown isText={"isFriend"} isSection={"otherPage"} />}
//                     </IconWrap>
//                   </TopRight>
//                 </TopText>
//                 <ListWrap>
//                   <DetailFriends FriendsList={FriendsList} />
//                 </ListWrap>
//               </ContentWrapper>
//             </ListFrame>
//           </ListFrameBig>

//           <FrameBigWithPadding>
//             <ListFrame>
//               <ContentWrapper>
//                 <TopText>
//                   <TopLeft>구독 {SubscribesList.length}</TopLeft>
//                   <TopRight ref={DropdownSubscribeRef}>
//                     {searchSubscribeOpen && (
//                       <SearchBar
//                         type="text"
//                         placeholder="ID, 닉네임으로 검색해보세요"
//                         value={searchWordSubscribe}
//                         onChange={searchSubscribeHandler}></SearchBar>
//                     )}
//                     <FriendSearch onClick={HandleSearchSubscribe} />
//                     <IconWrap>
//                       <Filter onClick={handleDropdownSubscribe} />
//                       {isDropdownSubscribeOpen && <AlignDropdown isText={"isSubscribe"} isSection={"otherPage"} />}
//                     </IconWrap>
//                   </TopRight>
//                 </TopText>

//                 <ListWrap>
//                   <DetailSubscribe SubscribesList={SubscribesList} />
//                 </ListWrap>
//               </ContentWrapper>
//             </ListFrame>
//           </FrameBigWithPadding>

//           <FrameBigWithMargin>
//             <ListFrame>
//               <ContentWrapper>
//                 <TopText>
//                   <TopLeft>구독자 {SubscribersList.length}</TopLeft>
//                   <TopRight ref={DropdownSubscriberRef}>
//                     {searchSubscriberOpen && (
//                       <SearchBar
//                         type="text"
//                         placeholder="ID, 닉네임으로 검색해보세요"
//                         value={searchWordSubscriber}
//                         onChange={searchSubscriberHandler}></SearchBar>
//                     )}
//                     <FriendSearch onClick={HandleSearchSubscriber} />
//                     <IconWrap>
//                       <Filter onClick={handleDropdownSubscriber} />
//                       {isDropdownSubscriberOpen && <AlignDropdown isText={"isSubscriber"} isSection={"otherPage"} />}
//                     </IconWrap>
//                   </TopRight>
//                 </TopText>
//                 <ListWrap>
//                   <DetailSubscriber SubscribersList={SubscribersList} />
//                 </ListWrap>
//               </ContentWrapper>
//             </ListFrame>
//           </FrameBigWithMargin>
//         </WholeAreaWrapper>
//       </WholeWrapper>
//     </>
//   );
// }

// export default DetailMain;
