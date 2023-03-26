import React from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getDate } from "date-fns";
import format from "date-fns/format";

export default function SidebarMiniCalendar() {
  const [totalList, setTotalList] = useState([]);

  const { total } = useSelector((state) => state.calendar);
  console.log("미니==>", total);

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
      <Calendar tileContent={(date) => viewList(date)} calendarType="US" />
    </MiniWrapper>
  );
}

const MiniWrapper = styled.div`
  width: 100%;
  height: 350px;
  .react-calendar {
    border: none;
    max-height: 300px;
  }

  // 현재 날짜
  .react-calendar__tile--now {
    background: lightblue;
    border-radius: 50%;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #eede99;
  }
  // 년월
  .react-calendar__navigation {
    height: 30px;
  }
  .react-calendar__navigation__label > span {
    background: #eede99;
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
    height: 50px;
    font-size: ${(props) => props.theme.Fs.xsmallText};
  }
  .react-calendar__tile:hover,
  .react-calendar__tile--active {
    border-radius: 50%;
    background-color: lightgray;
  }

  /* .react-calendar__month-view__days {
    button {
      height: 60px;
    }
  } */
  // 토, 일
  .react-calendar__month-view__days__day--weekend {
    color: black;
    :nth-child(7n + 1) {
      color: #b81010;
    }
    :nth-child(7n) {
      color: #072edd;
    }
  }
`;

const CheckPost = styled.div`
  ${(props) => props.theme.FlexCol}
  padding-top: 5px;
  div {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: coral;
  }
`;
const NoneCheckPost = styled(CheckPost)`
  div {
    background-color: transparent;
  }
`;
