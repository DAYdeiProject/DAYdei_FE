import styled from "styled-components";
import { useParams } from "react-router";
import React, { useEffect, useRef } from "react";
import { getDate, getDay, getMonth } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import ModalBox from "../../../elements/ModalBox";
import useOutSideClick from "../../../hooks/useOutsideClick";
import { DayCheck } from "../../../utils/calendar/CalendarBasic";
import { __getDateSchedule } from "../../../redux/modules/calendarSlice";
import ColorFromDB, { ColorDeepFromDB, DayAmPm } from "../../../utils/calendar/CalendarBasic";
import postStyle from "../../../shared/style/PostStyle";
import { ReactComponent as Dismiss } from "../../../assets/defaultIcons/dismiss.svg";
import { ReactComponent as CalendarIcon } from "../../../assets/calendarIcon/editCalendar.svg";

export default function DayScheduleModal({ ...props }) {
  const dispatch = useDispatch();
  const param = useParams();
  const outside = useRef();
  const { todayList } = useSelector((state) => state.calendar);

  const month = getMonth(new Date(props.moreDate)) + 1;
  const date = getDate(new Date(props.moreDate));
  const day = DayCheck(getDay(new Date(props.moreDate)));

  useEffect(() => {
    if (props.moreDate) {
      dispatch(__getDateSchedule({ userId: param.id, date: props.moreDate }));
    }
  }, [props.moreDate, props.isSubmit]);

  const closeModal = () => {
    props.setIsTodaySchedule(false);
    props.setAgainToday(false);
  };

  const detailClick = (id) => {
    props.setDetailPostId(id);
    props.setAgainToday(true);
    props.setIsTodaySchedule(false);
  };

  useOutSideClick(outside, closeModal);

  return (
    <>
      <ModalBox isOpen={props.isTodaySchedule} width={"460px"}>
        <TodayScheduleWrapper ref={outside}>
          <postStyle.HeaderWrapper>
            <Dismiss className="closeIncon" onClick={closeModal} />
          </postStyle.HeaderWrapper>
          <DateTitleWrapper>
            <CalendarIcon width={25} height={28} />
            <span>
              {month}월 {date}일 ({day})
            </span>
          </DateTitleWrapper>
          <CountWrapper>
            <span>오늘 일정 {todayList.length}개</span>
          </CountWrapper>
          <ScheduleListWrapper>
            <ListContainer>
              {todayList &&
                todayList?.map((list) => {
                  const color = ColorDeepFromDB(list.color);
                  const backColor = ColorFromDB(list.color);
                  const newStartTime = DayAmPm(list.startTime);
                  const newEndTime = DayAmPm(list.endTime);

                  let allDay = "";
                  if (list.startTime.substr(0, 5) === "00:00" && list.endTime.substr(0, 5) === "00:00") {
                    allDay = "종일";
                  }
                  return (
                    <ListBox isBack={backColor} key={list.id} onClick={() => detailClick(list.id)}>
                      <ListTitleArea isColor={color}>
                        <span>{list.title}</span>
                      </ListTitleArea>

                      <ListTimeArea>
                        <TimeBox>
                          {allDay === "종일" ? (
                            <span>{allDay}</span>
                          ) : (
                            <>
                              <span>{newStartTime}</span>
                              <span> - </span>
                              <span>{newEndTime}</span>
                            </>
                          )}
                        </TimeBox>
                        {list.location && <LocationBox>{list.location}</LocationBox>}
                      </ListTimeArea>
                    </ListBox>
                  );
                })}
            </ListContainer>
          </ScheduleListWrapper>
        </TodayScheduleWrapper>
      </ModalBox>
    </>
  );
}

const TodayScheduleWrapper = styled.div`
  padding: 0 30px;
  padding-bottom: 30px;
`;
const ScheduleListWrapper = styled.div`
  max-height: 450px;
  padding-right: 8px;
  overflow-y: auto;
`;
const DateTitleWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  gap: 10px;
  height: 40px;
  ${(props) => props.theme.SidebarTitleText};
  font-size: 20px;
`;
const CountWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  ${(props) => props.theme.DescriptionText};
  font-size: 14px;
  margin: 10px 0;
  margin-bottom: 15px;
`;
const ListContainer = styled.div`
  ${(props) => props.theme.FlexCol}
  gap: 8px;
`;
const ListBox = styled.div`
  ${(props) => props.theme.FlexCol};
  align-items: flex-start;
  gap: 8px;
  height: 80px;
  padding: 15px;
  border-radius: 8px;
  background-color: ${(props) => props.isBack};
  &:hover {
    background-color: ${(props) => props.theme.Bg.color4};
    cursor: pointer;
  }
`;

const ListTitleArea = styled.div`
  ${(props) => props.theme.FlexRow};
  justify-content: left;
  padding: 0 10px;
  ${(props) => props.theme.SidebarTitleText};
  font-size: 18px;
  border-left: ${(props) => props.isColor && `4px solid ${props.isColor}`};
`;

const ListTimeArea = styled.div`
  ${(props) => props.theme.FlexRow};
  justify-content: left;
  gap: 5px;
  padding-left: 15px;
  ${(props) => props.theme.DescriptionText};
  font-size: 14px;
`;

const TimeBox = styled.div`
  width: 100%;
`;
const LocationBox = styled.div`
  width: 100%;
  padding-left: 10px;
  border-left: 1px solid ${(props) => props.theme.Bg.color2};
`;
