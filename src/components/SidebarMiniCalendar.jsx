import React from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getDate } from "date-fns";
import format from "date-fns/format";
import koLocale from "date-fns/locale/ko";

export default function SidebarMiniCalendar() {
  const { total } = useSelector((state) => state.calendar);

  const viewList = (date) => {
    if (total && total.find((list) => list.startDate === format(date.date, "yyyy-MM-dd"))) {
      return (
        <CheckPost>
          <div></div>
        </CheckPost>
      );
    } else {
      return (
        <NoneCheckPost>
          <div></div>
        </NoneCheckPost>
      );
    }
  };
  return (
    <MiniWrapper>
      <Calendar tileContent={(date) => viewList(date)} calendarType="US" formatDay={koLocale} />
    </MiniWrapper>
  );
}

const MiniWrapper = styled.div`
  width: 100%;
  margin-bottom: 47px;
  .react-calendar {
    border: none;
    height: 300px;
    background: ${(props) => props.theme.Bg.color5};
  }

  // 현재 날짜
  .react-calendar__tile--now {
    background-color: ${(props) => props.theme.Bg.mainColor3};
    border-radius: 50%;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: ${(props) => props.theme.Fs.size12};
  }
  // 년월
  .react-calendar__navigation {
    height: 30px;
  }
  .react-calendar__navigation__label > span {
    // background: #eede99;
  }
  // 요일
  .react-calendar__month-view__weekdays {
    background: none;
    abbr {
      /*월,화,수... 글자 부분*/
      text-decoration: none;
    }
  }

  // 날짜
  .react-calendar__tile {
    width: 20px;
    height: 40px;
    font-size: ${(props) => props.theme.Fs.size12};
  }
  .react-calendar__tile:hover,
  .react-calendar__tile--active {
    border-radius: 50%;
    background-color: ${(props) => props.theme.Bg.mainColor2};
  }

  /* .react-calendar__month-view__days {
    button {
      height: 60px;
    }
  } */
  // 토, 일
  .react-calendar__month-view__days__day--weekend {
    color: ${(props) => props.theme.Bg.color3};
  }
`;

const CheckPost = styled.div`
  ${(props) => props.theme.FlexCol}
  padding-top: 5px;
  div {
    height: 6px;
    width: 6px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.Bg.mainColor5};
  }
`;
const NoneCheckPost = styled(CheckPost)`
  div {
    background-color: transparent;
  }
`;
