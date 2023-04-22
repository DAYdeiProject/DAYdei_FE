// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import { throttle } from "lodash";

// import { __getFriendsList } from "../redux/modules/friendsSlice";
// import { __getSubscribeList, __getSubscriberList } from "../redux/modules/subscribeSlice";
// import { GetUserInfo } from "../utils/cookie/userInfo";

// import useAlignFunctions from "./useAlignFunctions";

// const useSearch = () => {
//   //검색어 상태
//   // const [searchWordPassed, setSearchWordPassed] = useState("");
//   // 검색창
//   // const [searchFriendOpen, setSearchFriendOpen] = useState(false);
//   // const [searchSubscribeOpen, setSearchSubscribeOpen] = useState(false);
//   // const [searchSubscriberOpen, setSearchSubscriberOpen] = useState(false);

//   const { setIsDropdownFriendOpen, setIsDropdownSubscribeOpen, setIsDropdownSubscriberOpen } = useAlignFunctions();
//   const usersInfo = GetUserInfo();
//   const id = usersInfo.userId;
//   const { otherId } = useSelector((state) => state.header);

//   const dispatch = useDispatch();

//   // //검색창 오픈여부 결정 함수
//   // const HandleSearchFriend = () => {
//   //   setSearchFriendOpen(!searchFriendOpen);
//   //   setSearchSubscribeOpen(false);
//   //   setSearchSubscriberOpen(false);

//   //   setIsDropdownFriendOpen(false);
//   //   setSearchWordPassed("");
//   // };

//   // const HandleSearchSubscribe = () => {
//   //   setSearchSubscribeOpen(!searchSubscribeOpen);
//   //   setSearchFriendOpen(false);
//   //   setSearchSubscriberOpen(false);

//   //   setIsDropdownSubscribeOpen(false);
//   //   setSearchWordPassed("");
//   // };

//   // const HandleSearchSubscriber = () => {
//   //   setSearchSubscriberOpen(!searchSubscriberOpen);
//   //   setSearchFriendOpen(false);
//   //   setSearchSubscribeOpen(false);

//   //   setIsDropdownSubscriberOpen(false);
//   //   setSearchWordPassed("");
//   // };

//   // const location = useLocation();

//   // // 검색 Throttle
//   // const throttledCallback = throttle(() => {
//   //   let passedUrl = "";
//   //   if (location.pathname === "/mylist") {
//   //     passedUrl = `${id}?sort=name&searchword=${searchWordPassed}`;
//   //   } else if (location.pathname === "/friendsdetail") {
//   //     passedUrl = `${otherId}?sort=name&searchword=${searchWordPassed}`;
//   //   }

//   //   searchFriendOpen
//   //     ? dispatch(__getFriendsList(passedUrl))
//   //     : searchSubscribeOpen
//   //     ? dispatch(__getSubscribeList(passedUrl))
//   //     : dispatch(__getSubscriberList(passedUrl));
//   // }, 300);

//   // useEffect(() => {
//   //   throttledCallback();
//   // }, [searchWordPassed, searchFriendOpen, searchSubscribeOpen, searchSubscriberOpen]);

//   // // 검색어 state에 저장
//   // const searchHandler = (e) => {
//   //   const value = e.target.value;
//   //   setSearchWordPassed(value);
//   // };

//   // const searchSubscribeHandler = (e) => {
//   //   const value = e.target.value;
//   //   setSearchWordPassed(value);
//   // };

//   // const searchSubscriberHandler = (e) => {
//   //   const value = e.target.value;
//   //   setSearchWordPassed(value);
//   // };

//   return {
//     searchWordPassed,
//     searchFriendOpen,
//     setSearchFriendOpen,
//     searchSubscribeOpen,
//     setSearchSubscribeOpen,
//     searchSubscriberOpen,
//     setSearchSubscriberOpen,
//     HandleSearchFriend,
//     HandleSearchSubscribe,
//     HandleSearchSubscriber,
//     searchHandler,
//     searchSubscribeHandler,
//     searchSubscriberHandler,
//   };
// };

// export default useSearch;
