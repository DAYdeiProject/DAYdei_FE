import { useDispatch } from "react-redux";
import { __getFriendsList } from "../redux/modules/friendsSlice";
import { __getSubscribeList, __getSubscriberList } from "../redux/modules/subscribeSlice";
import { useState } from "react";

const useAlignFunctions = () => {
  //리스트별 드롭다운 모달 열림 or 닫힘 상태
  const [isDropdownFriendOpen, setIsDropdownFriendOpen] = useState(false);
  const [isDropdownSubscribeOpen, setIsDropdownSubscribeOpen] = useState(false);
  const [isDropdownSubscriberOpen, setIsDropdownSubscriberOpen] = useState(false);

  const dispatch = useDispatch();

  //기본 순 정렬
  const alignBasicHandler = (id) => {
    let url = `${id}?sort=name&searchword=`;
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

  // 구독자 많은 순 정렬
  const alignSubscribeHandler = (id) => {
    let url = `${id}?sort=famous&searchword=`;
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

  // 최근 친구가 된 순으로 정렬
  const alignNewestHandler = (id) => {
    let url = `${id}?sort=recent&searchword=`;
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

  // 오래 전 친구 맺은 순으로 정렬
  const alignOldestHandler = (id) => {
    let url = `${id}?sort=old&searchword=`;
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

  return {
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
  };
};

export default useAlignFunctions;
