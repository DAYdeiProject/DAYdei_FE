import styled from "styled-components";
import { ko } from "date-fns/esm/locale";
import DatePicker from "react-datepicker";
import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { TimeList } from "../../../utils/calendar/CalendarBasic";
import { ReactComponent as Clock } from "../../../assets/calendarIcon/clock.svg";

export default function PostDate({ ...props }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(startDate);
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [isAllDay, setIsAllDay] = useState("");
  const time = TimeList();

  // 종일 체크
  const isAllDayChange = () => {
    if (isAllDay === "checked") {
      setIsAllDay("");
    } else {
      setIsAllDay("checked");
    }
  };
  const startTimeHandler = (e) => {
    setStartTime(e.target.value);
  };
  const endTimeHandler = (e) => {
    setEndTime(e.target.value);
  };

  // 날짜 클릭시 해당날짜의 일정추가
  useEffect(() => {
    if (props.pickDate) {
      setStartDate(props.pickDate);
      setEndDate(props.pickDate);
    }
  }, [props.pickDate]);

  useEffect(() => {
    if (props.postDetail.length !== 0) {
      setStartDate(new Date(props.postDetail.startDate));
      setEndDate(new Date(props.postDetail.endDate));
      setStartTime(props.postDetail.startTime.substr(0, 5));
      setEndTime(props.postDetail.endTime.substr(0, 5));

      if (props.postDetail.startTime.substr(0, 5) === "00:00" && props.postDetail.endTime.substr(0, 5) === "00:00") {
        setIsAllDay("checked");
      }
    }
  }, [props.postDetail]);

  useEffect(() => {
    props.setStartDate(startDate);
    props.setEndDate(endDate);
    props.setStartTime(startTime);
    props.setEndTime(endTime);
    props.setIsAllDay(isAllDay);
  }, [startDate, endDate, startTime, endTime, isAllDay, props.pickDate]);

  return (
    <>
      <DaysCheckWrapper>
        <DaysIconBox>
          <Clock />
        </DaysIconBox>
        <DaysCheckContainer>
          <StartDateContainer>
            <span>시작</span>
            <CustomDatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="yyyy-MM-dd" locale={ko} />
            <TimeSelectBox onChange={startTimeHandler} disabled={isAllDay} value={startTime}>
              {time.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </TimeSelectBox>
          </StartDateContainer>

          <StartDateContainer>
            <span>종료</span>
            <CustomDatePicker selected={endDate} onChange={(date) => setEndDate(date)} minDate={startDate} dateFormat="yyyy-MM-dd" locale={ko} />
            <TimeSelectBox onChange={endTimeHandler} disabled={isAllDay} value={endTime}>
              {time.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </TimeSelectBox>
          </StartDateContainer>
        </DaysCheckContainer>

        <DaysAllCheckContainer>
          <input type="checkbox" onChange={isAllDayChange} checked={isAllDay}></input>

          <AllDayText>종일</AllDayText>
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
  align-items: flex-start;
  input {
    margin: 0;
    cursor: pointer;
  }
`;

const AllDayText = styled.span`
  width: 40px;
  text-align: left;
  line-height: 15px;
  margin: 0 !important;
  font-size: 13px;
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
`;

const TimeSelectBox = styled.select`
  margin-right: 115px;
  border: none;
  font-size: ${(props) => props.theme.Fs.size16};
  cursor: pointer;
`;
const CustomDatePicker = styled(DatePicker)`
  width: 100px;
  font-size: ${(props) => props.theme.Fs.size16};
  cursor: pointer;
`;
