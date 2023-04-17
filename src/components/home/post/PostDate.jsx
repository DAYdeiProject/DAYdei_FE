import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { ReactComponent as Clock } from "../../../assets/calendarIcon/clock.svg";
import { useState } from "react";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import { TimeList } from "../../../utils/calendar/CalendarBasic";
import DatePicker from "react-datepicker";

export default function PostDate({ ...props }) {
  //const [startDate, setStartDate] = useState(new Date());
  //const [endDate, setEndDate] = useState(startDate);
  // const [endTime, setEndTime] = useState();
  const time = TimeList();

  // 종일 체크
  const isAllDayChange = () => {
    //props.setIsAllDay(!props.isAllDay);
  };
  const startTimeHandler = (e) => {};
  const endTimeHandler = (e) => {};

  return (
    <>
      <DaysCheckWrapper>
        <DaysIconBox>
          <Clock />
        </DaysIconBox>
        <DaysCheckContainer>
          <StartDateContainer>
            <span>시작</span>
            <CustomDatePicker selected={props.startDate} onChange={(date) => props.setStartDate(date)} dateFormat="yyyy-MM-dd" locale={ko} />
            <select onChange={startTimeHandler} disabled={props.isAllDay}>
              {time.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </StartDateContainer>

          <StartDateContainer>
            <span>종료</span>
            <CustomDatePicker
              selected={props.endDate}
              onChange={(date) => props.setEndDate(date)}
              minDate={props.startDate}
              dateFormat="yyyy-MM-dd"
              locale={ko}
            />
            <select onChange={endTimeHandler} disabled={props.isAllDay}>
              {time.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </StartDateContainer>
        </DaysCheckContainer>

        <DaysAllCheckContainer>
          <input type="checkbox" onChange={isAllDayChange}></input>
          <span>종일</span>
        </DaysAllCheckContainer>
      </DaysCheckWrapper>
    </>
  );
}

const DaysCheckWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  height: 50px;
`;
const DaysIconBox = styled.div`
  height: 100%;
  display: flex;
  padding-top: 2px;
`;
const DaysCheckContainer = styled.div`
  ${(props) => props.theme.FlexCol}
  width: 330px;
  margin-left: 8px;
`;
const DaysAllCheckContainer = styled(DaysIconBox)`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  width: 80px;
  align-items: flex-start;
  input {
    cursor: pointer;
  }
  span {
    margin: 0;
    font-size: ${(props) => props.theme.Fs.size14};
  }
`;
const StartDateContainer = styled.div`
  ${(props) => props.theme.FlexRow}
  width: 100%;
  margin-bottom: 8px;
  span {
    min-width: 32px;
  }
  .react-datepicker-wrapper {
    width: 100px;
    margin-right: 10px;
  }
  select {
    margin-right: 115px;
    border: none;
    font-size: ${(props) => props.theme.Fs.size16};
    cursor: pointer;
  }
`;
const CustomDatePicker = styled(DatePicker)`
  width: 100px;
  font-size: ${(props) => props.theme.Fs.size16};
  cursor: pointer;
`;
