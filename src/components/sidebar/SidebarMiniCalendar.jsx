import React from "react";
import format from "date-fns/format";
import Calendar from "react-calendar";
import styled from "styled-components";
import { useSelector } from "react-redux";
import "react-calendar/dist/Calendar.css";

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
      <Calendar tileContent={(date) => viewList(date)} calendarType="US" onClickDay={null} onChange={null} selectRange={false} />
    </MiniWrapper>
  );
}

const MiniWrapper = styled.div`
  width: 100%;
  margin-bottom: 2.9375rem;

  @media screen and (max-width: 1440px) {
    height: 240px;
  }
  @media screen and (max-height: 844.55px) {
    height: 236px;
  }

  .react-calendar {
    border: none;
    background: ${(props) => props.theme.Bg.color5};
  }

  // 현재 날짜
  .react-calendar__tile--now {
    background-color: ${(props) => props.theme.Bg.mainColor3};
    border-radius: 50%;
    :hover {
      background-color: ${(props) => props.theme.Bg.mainColor2};
    }
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background-color: ${(props) => props.theme.Bg.mainColor2};
  }

  // 년월
  .react-calendar__navigation {
    height: 1.875rem;

    @media screen and (max-width: 1440px) {
      height: 1.2rem;
    }
    @media screen and (max-height: 929px) {
      height: 1rem;
    }
    @media screen and (max-height: 844.55px) {
      height: 0.8rem;
    }
  }

  .react-calendar__navigation__label > span {
    @media screen and (max-width: 1440px) {
      font-size: 0.87rem;
    }
  }
  // 요일
  .react-calendar__month-view__weekdays {
    background: none;
    abbr {
      /*월,화,수... 글자 부분*/
      text-decoration: none;
    }
    @media screen and (max-width: 1440px) {
      height: 1.4rem;
    }
    @media screen and (max-height: 929px) {
      height: 1.3rem;
    }
    @media screen and (max-height: 844.55px) {
      height: 1.3rem;
    }
  }

  // 날짜
  .react-calendar__tile {
    width: 1.25rem;
    height: 2.5rem;
    font-size: ${(props) => props.theme.Fs.size12};

    @media screen and (max-width: 1440px) {
      font-size: 0.625rem;
    }
    @media screen and (max-height: 844.55px) {
      font-size: 0.5rem;
    }
    @media screen and (max-height: 743.2px) {
      font-size: 0.5rem;
      width: 1rem;
      height: 2.3rem;
    }
  }
  .react-calendar__tile:hover {
    border-radius: 50%;
    background-color: ${(props) => props.theme.Bg.mainColor2};
  }

  .react-calendar__tile--active {
    color: #121212;
    border-radius: 50%;
    background-color: none !important;
  }

  // 토, 일
  .react-calendar__month-view__days__day--weekend {
    color: ${(props) => props.theme.Bg.color3};
  }

  .react-calendar button {
    background-color: none;
  }
`;

const CheckPost = styled.div`
  ${(props) => props.theme.FlexCol}
  padding-top: 0.3125rem;

  @media screen and (max-width: 1440px) {
    padding-top: 0;
  }

  div {
    height: 0.375rem;
    width: 0.375rem;
    border-radius: 50%;
    background-color: ${(props) => props.theme.Bg.mainColor5};

    @media screen and (max-width: 1440px) {
      height: 0.25rem;
      width: 0.25rem;
    }
    @media screen and (max-height: 743.2px) {
      height: 0.25rem;
      width: 0.25rem;
    }
  }
`;
const NoneCheckPost = styled(CheckPost)`
  div {
    background-color: transparent;
  }
`;
