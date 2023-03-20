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

export default function DayScheduleModal({ ...props }) {
  const dispatch = useDispatch();
  const token = Cookies.get("accessJWTToken");
  const param = useParams();
  const localUserInfo = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(localUserInfo);
  const today = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    if (props.isTodaySchedule && param.id !== String(userInfo.userId)) {
      dispatch(__getOtherUserToday({ userId: param.id, today, token }));
    }
  }, [props.isTodaySchedule]);

  return (
    <>
      <CalendarPostModal isAddPost={props.isTodaySchedule} setIsAddPost={props.setIsTodaySchedule}>
        <div>
          <postStyle.HeaderWrapper>
            <BiX className="closeIncon" />
          </postStyle.HeaderWrapper>
        </div>
      </CalendarPostModal>
    </>
  );
}

const TodayScheduleWrapper = styled.div``;
