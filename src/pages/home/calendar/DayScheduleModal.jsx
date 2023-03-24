import React, { useEffect } from "react";
import styled from "styled-components";
import CalendarPostModal from "./CalendarPostModal";
import postStyle from "../../../shared/style/PostStyle";
import { BiX } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useParams } from "react-router";
import { __getDateSchedule } from "../../../redux/modules/calendarSlice";
import UserInfo from "../../../utils/localStorage/userInfo";
import Loading from "../../../components/Loading";

export default function DayScheduleModal({ ...props }) {
  const dispatch = useDispatch();
  const token = Cookies.get("accessJWTToken");
  const param = useParams();
  const userInfo = UserInfo();

  const { todayList, isLoading } = useSelector((state) => state.calendar);
  console.log("todayList------>", todayList);

  useEffect(() => {
    if (props.moreDate) {
      if (props.isTodaySchedule && param.id !== String(userInfo.userId)) {
        dispatch(__getDateSchedule({ userId: param.id, date: props.moreDate, token }));
      } else {
        dispatch(__getDateSchedule({ userId: userInfo.userId, date: props.moreDate, token }));
      }
    }
  }, [props.moreDate]);

  const closeModal = () => {
    props.setIsTodaySchedule(false);
  };

  return (
    <>
      {isLoading && <Loading />}
      <CalendarPostModal isOpen={props.isTodaySchedule}>
        <TodayScheduleWrapper>
          <postStyle.HeaderWrapper>
            <BiX className="closeIncon" onClick={closeModal} />
          </postStyle.HeaderWrapper>
        </TodayScheduleWrapper>
      </CalendarPostModal>
    </>
  );
}

const TodayScheduleWrapper = styled.div`
  padding: 0 30px;
`;
