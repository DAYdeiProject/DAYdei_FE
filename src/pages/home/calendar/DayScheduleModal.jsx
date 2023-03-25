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
import { throwPostId } from "../../../redux/modules/calendarReducer";

export default function DayScheduleModal({ ...props }) {
  const dispatch = useDispatch();
  const token = Cookies.get("accessJWTToken");
  const param = useParams();
  const userInfo = UserInfo();

  const { todayList, isLoading } = useSelector((state) => state.calendar);
  console.log("todayList------>", todayList);

  useEffect(() => {
    if (props.moreDate) {
      dispatch(__getDateSchedule({ userId: param.id, date: props.moreDate, token }));
    }
  }, [props.moreDate]);

  const closeModal = () => {
    props.setIsTodaySchedule(false);
  };

  const detailClick = (id) => {
    dispatch(throwPostId(id));
    closeModal();
  };
  return (
    <>
      {isLoading && <Loading />}
      <CalendarPostModal isOpen={props.isTodaySchedule}>
        <TodayScheduleWrapper>
          <postStyle.HeaderWrapper>
            <BiX className="closeIncon" onClick={closeModal} />
          </postStyle.HeaderWrapper>
          <div>
            {todayList &&
              todayList?.map((list) => {
                return (
                  <div key={list.id} onClick={() => detailClick(list.id)}>
                    <div pickColor={list.color}>
                      <span>{list.title}</span>
                      <span>{list.startDate}</span>
                      <span>{list.endDate}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </TodayScheduleWrapper>
      </CalendarPostModal>
    </>
  );
}

const TodayScheduleWrapper = styled.div`
  padding: 0 30px;
`;
