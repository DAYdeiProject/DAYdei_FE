import styled from "styled-components";
import React, { useEffect, useRef } from "react";
import { getDate, getDay, getMonth } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import ModalBox from "../../../elements/ModalBox";
import { GetUserInfo } from "../../../utils/cookie/userInfo";
import useOutSideClick from "../../../hooks/useOutsideClick";
import { DayCheck } from "../../../utils/calendar/CalendarBasic";
import { __getDateSchedule } from "../../../redux/modules/calendarSlice";
import ColorFromDB, { ColorDeepFromDB, DayAmPm } from "../../../utils/calendar/CalendarBasic";
import { HeaderWrapper } from "./AddPostModal";
import { ReactComponent as Dismiss } from "../../../assets/defaultIcons/dismiss.svg";
import { ReactComponent as CalendarIcon } from "../../../assets/calendarIcon/editCalendar.svg";

export default function DayScheduleModal({ ...props }) {
  const dispatch = useDispatch();
  const outside = useRef();
  const userInfo = GetUserInfo();
  const { todayList } = useSelector((state) => state.calendar);
  const { otherId } = useSelector((state) => state.header);

  const month = getMonth(new Date(props.moreDate)) + 1;
  const date = getDate(new Date(props.moreDate));
  const day = DayCheck(getDay(new Date(props.moreDate)));

  useEffect(() => {
    if (props.moreDate) {
      if (otherId) {
        dispatch(__getDateSchedule({ userId: otherId, date: props.moreDate }));
      } else {
        dispatch(__getDateSchedule({ userId: userInfo.userId, date: props.moreDate }));
      }
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
          <HeaderWrapper>
            <Dismiss className="closeIncon" onClick={closeModal} />
          </HeaderWrapper>
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
  padding: 0 1.875rem;
  padding-bottom: 1.875rem;
`;
const ScheduleListWrapper = styled.div`
  max-height: 28.125rem;
  padding-right: 0.5rem;
  overflow-y: auto;
`;
const DateTitleWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  gap: 0.625rem;
  height: 2.5rem;
  ${(props) => props.theme.SidebarTitleText};
  font-size: 1.25rem;
`;
const CountWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  ${(props) => props.theme.DescriptionText};
  font-size: 0.875rem;
  margin: 0.625rem 0;
  margin-bottom: 0.9375rem;
`;
const ListContainer = styled.div`
  ${(props) => props.theme.FlexCol}
  gap: .5rem;
`;
const ListBox = styled.div`
  ${(props) => props.theme.FlexCol};
  align-items: flex-start;
  gap: 0.5rem;
  height: 5rem;
  padding: 0.9375rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.isBack};
  &:hover {
    background-color: ${(props) => props.theme.Bg.color4};
    cursor: pointer;
  }
`;

const ListTitleArea = styled.div`
  ${(props) => props.theme.FlexRow};
  justify-content: left;
  padding: 0 0.625rem;
  ${(props) => props.theme.SidebarTitleText};
  font-size: 1.125rem;
  border-left: ${(props) => props.isColor && `4px solid ${props.isColor}`};
`;

const ListTimeArea = styled.div`
  ${(props) => props.theme.FlexRow};
  justify-content: left;
  gap: 0.3125rem;
  padding-left: 0.9375rem;
  ${(props) => props.theme.DescriptionText};
  font-size: 0.875rem;
`;

const TimeBox = styled.div`
  width: 100%;
`;
const LocationBox = styled.div`
  width: 100%;
  padding-left: 0.625rem;
  border-left: 0.0625rem solid ${(props) => props.theme.Bg.color2};
`;
