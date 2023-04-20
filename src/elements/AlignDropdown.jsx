import React from "react";
import { useSelector } from "react-redux";
import useAlignFunctions from "../hooks/useAlignFunctions";
import { DropdownFrame, DropdownItems } from "../components/friendslist/FriendsListMain";
import { GetUserInfo } from "../utils/cookie/userInfo";
import { useLocation } from "react-router-dom";

function AlignDropdown({ ...props }) {
  const { alignBasicHandler, alignNewestHandler, alignOldestHandler, alignSubscribeHandler } = useAlignFunctions();

  const usersInfo = GetUserInfo();
  const { otherId } = useSelector((state) => state.header);
  const id = usersInfo.userId;

  const location = useLocation();

  return (
    <>
      <DropdownFrame>
        <DropdownItems
          onClick={() => {
            location.pathname === "/mylist" ? alignBasicHandler({ id, text: props.isText }) : alignBasicHandler({ id: otherId, text: props.isText });
          }}>
          기본
        </DropdownItems>
        <DropdownItems
          onClick={() => {
            location.pathname === "/mylist" ? alignSubscribeHandler({ id, text: props.isText }) : alignSubscribeHandler({ id: otherId, text: props.isText });
          }}>
          구독자순
        </DropdownItems>
        <DropdownItems
          onClick={() => {
            location.pathname === "/mylist" ? alignNewestHandler({ id, text: props.isText }) : alignNewestHandler({ id: otherId, text: props.isText });
          }}>
          최신순
        </DropdownItems>
        <DropdownItems
          onClick={() => {
            location.pathname === "/mylist" ? alignOldestHandler({ id, text: props.isText }) : alignOldestHandler({ id: otherId, text: props.isText });
          }}>
          오래된순
        </DropdownItems>
      </DropdownFrame>
    </>
  );
}

export default AlignDropdown;
