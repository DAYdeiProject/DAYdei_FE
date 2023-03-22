import React, { useEffect } from "react";
import styled from "styled-components";
import CalendarPostModal from "./CalendarPostModal";
import postStyle from "../../../shared/style/PostStyle";
import { BiX } from "react-icons/bi";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useParams } from "react-router";
import { __getOtherUserToday } from "../../../redux/modules/calendarSlice";
import format from "date-fns/format";
import UserInfo from "../../../utils/localStorage/userInfo";

export default function DayScheduleModal({ ...props }) {
  const dispatch = useDispatch();
  const token = Cookies.get("accessJWTToken");
  const param = useParams();
  const userInfo = UserInfo();
  const today = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    if (props.isTodaySchedule && param.id !== String(userInfo.userId)) {
      dispatch(__getOtherUserToday({ userId: param.id, today, token }));
    }
  }, [props.isTodaySchedule]);

  const closeModal = () => {
    props.setIsTodaySchedule(false);
  };

  return (
    <>
      <CalendarPostModal isAddPost={props.isTodaySchedule} setIsAddPost={props.setIsTodaySchedule}>
        <div>
          <postStyle.HeaderWrapper>
            <BiX className="closeIncon" onClick={closeModal} />
          </postStyle.HeaderWrapper>
        </div>
      </CalendarPostModal>
    </>
  );
}

const TodayScheduleWrapper = styled.div``;
