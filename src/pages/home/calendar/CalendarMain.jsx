import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";
import AddPostModal from "./AddPostModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { __getTotalPosts, __getPostDetail, __updateDragPost } from "../../../redux/modules/calendarSlice";
import Cookies from "js-cookie";
import Loading from "../../../components/Loading";
import DayScheduleModal from "./DayScheduleModal";
import UserInfo from "../../../utils/localStorage/userInfo";
import ColorFromDB from "./CalendarBasic";
import add from "date-fns/add";
import DetailPostModal from "./DetailPostModal";
import CalendarSidebar from "./CalendarSidebar";
import format from "date-fns/format";
import OtherUserCalendar from "./OtherUserCalendar";
import getDate from "date-fns/getDate";
import { getYear, getMonth } from "date-fns";

function CalendarMain({ ...props }) {
  // 일정 추가 모달창 open state
  const [isAddPost, setIsAddPost] = useState(false);
  // 일정 detail 모달창 open state
  const [isDetailPost, setIsDetailPost] = useState(false);
  // 수정하기 state
  const [isSubmit, setIsSubmit] = useState(false);
  // 일정 추가 버튼 여부(로그인한 유저 캘린더 / 타 유저 캘린더)
  const [disabled, setDisabled] = useState(false);
  const [newData, setNewData] = useState("");
  // 날짜 클릭시 일정추가모달 뜨고 startDate 해당 클릭 날짜로
  const [pickDate, setPickDate] = useState("");
  // 일정 detailPostId
  const [detailPostId, setDetailPostId] = useState("");
  const [modifyPostId, setModifyPostId] = useState("");
  // 타유저 업데이트/공유한 일정 클릭시 postId
  const [otherCalendarPostId, setOtherCalendarPostId] = useState("");
  // 일정 detail 로그인/타유저 비교
  const [isModify, setIsModify] = useState(false);
  // 하루 일정 모달창 state
  const [isTodaySchedule, setIsTodaySchedule] = useState(false);
  const [moreDate, setMoreDate] = useState("");
  // drag 수정 막기
  const [isDrag, setIsDrag] = useState(true);
  // 타유저 캘린더 share 일정 state
  const [otherCalendarState, setOtherCalendarState] = useState(false);
  // 타유저  캘린더 share 일정 open state
  const [isOtherOpen, setIsOtherOpen] = useState(true);

  const dispatch = useDispatch();

  const token = Cookies.get("accessJWTToken");
  const param = useParams();
  const userId = UserInfo();

  const { total, isLoading } = useSelector((state) => {
    return state.calendar;
  });

  //console.log("메인----------", total);
  useEffect(() => {
    if (String(userId.userId) !== param.id) {
      // 타유저 캘린더에 간 상황
      setDisabled(true);
      setIsDrag(false);
    } else {
      setIsDrag(true);
      setDisabled(false);
    }
    dispatch(__getTotalPosts({ userId: String(param.id), token }));
  }, [isSubmit, param]);

  useEffect(() => {
    setNewData([]);

    if (total && total.length !== 0) {
      const result = total.map((data) => {
        const color = ColorFromDB(data.color);
        let end = "";
        let startDate = "";
        let endtDate = "";
        // 종료날짜 format
        if (data.startDate === data.endDate) {
          end = data.endData;
        } else {
          end = format(add(new Date(data.endDate), { days: 1 }), "yyyy-MM-dd");
        }

        if (data.startTime === "00:00:00" && data.endTime === "00:00:00") {
          // 이건 하루 전체일정
          startDate = data.startDate;
          endtDate = end;
        } else {
          startDate = `${data.startDate}T${data.startTime}`;
          endtDate = `${end}T${data.endTime}`;
        }

        return {
          id: data.id,
          title: data.title,
          start: startDate,
          end: endtDate,
          color: color,
          textColor: "#121212",
        };
      });
      setNewData(result);
    }
  }, [total]);

  // 일정추가 버튼 클릭 -> 모달창 여부
  const addButtonClick = () => {
    showAddpostModal();
  };
  const showAddpostModal = () => {
    setIsAddPost(true);
  };

  // 일정 more 클릭시
  const handleMoreLinkClick = (e) => {
    e.jsEvent.preventDefault();
    const pickDate = format(new Date(getYear(e.date), getMonth(e.date), getDate(e.date)), "yyyy-MM-dd");
    setMoreDate(pickDate);
    setIsTodaySchedule(true);
  };

  // 일정detail 클릭시
  const handlerEventClick = (e) => {
    setDetailPostId(e.event._def.publicId);
  };

  // 클릭한 date만
  const handlerDateClick = (date) => {
    if (String(userId.userId) === param.id && token) {
      setPickDate(date.date);
    }
  };

  // event drop
  const handlerEventDrop = (info) => {
    if (token) {
      const startDate = format(new Date(info.event._instance.range.start), "yyyy-MM-dd");
      const endDate = format(new Date(info.event._instance.range.end), "yyyy-MM-dd");
      let end = "";
      if (startDate === endDate) {
        end = endDate;
      } else {
        end = format(add(new Date(info.event._instance.range.end), { days: -1 }), "yyyy-MM-dd");
      }

      const newPost = {
        startDate,
        endDate: end,
      };

      dispatch(__updateDragPost({ updatePost: newPost, postId: info.event._def.publicId, token })).then(() => {
        alert("일정 날짜가 수정되었습니다.");
        props.CookiessetSide(!props.side);
      });
    }
  };

  const setting = {
    headerToolbar: {
      left: "today",
      center: "prevYear prev title next nextYear",
      right: "addButton",
    },
    customButtons: {
      addButton: {
        text: "일정 추가",
        click: addButtonClick,
      },
    },

    views: {
      timeGrid: {
        dayMaxEventRows: 4,
        slotEventOverlap: false,
      },
    },
    buttonText: {
      //버튼 텍스트 변환
      today: "오늘",
    },
    timeZone: "local",
    events: newData,
  };
  // if (isLoding) <Loading loading={isLoding} />;

  return (
    <CalendarSidebarWrapper>
      {isLoading && <Loading />}
      {userId && String(userId.userId) !== param.id && (
        <OtherUserCalendar
          otherCalendarState={otherCalendarState}
          setOtherCalendarState={setOtherCalendarState}
          setOtherCalendarPostId={setOtherCalendarPostId}
          isOtherOpen={isOtherOpen}
          setIsOtherOpen={setIsOtherOpen}
        />
      )}
      <CalendarWrapper disabled={disabled} isOpen={isOtherOpen}>
        <FullCalendar
          {...setting}
          plugins={[dayGridPlugin, interactionPlugin]}
          locale="ko"
          editable={isDrag}
          dayMaxEventRows={true}
          displayEventTime={false}
          initialView="dayGridMonth"
          moreLinkText="더보기"
          moreLinkClick={handleMoreLinkClick}
          eventClick={handlerEventClick}
          dateClick={handlerDateClick}
          eventDrop={handlerEventDrop}
        />
        <AddPostModal
          isAddPost={isAddPost}
          setIsAddPost={setIsAddPost}
          side={props.side}
          setSide={props.setSide}
          pickDate={pickDate}
          setPickDate={setPickDate}
          isSubmit={isSubmit}
          setIsSubmit={setIsSubmit}
          modifyPostId={modifyPostId}
          setModifyPostId={setModifyPostId}
        />
        <DetailPostModal
          isDetailPost={isDetailPost}
          setIsDetailPost={setIsDetailPost}
          detailPostId={detailPostId}
          setDetailPostId={setDetailPostId}
          setModifyPostId={setModifyPostId}
          setIsAddPost={setIsAddPost}
          isSubmit={isSubmit}
          setIsSubmit={setIsSubmit}
          side={props.side}
          setSide={props.setSide}
          notificationPostId={props.notificationPostId}
          setNotificationPostId={props.setNotificationPostId}
          otherCalendarState={otherCalendarState}
          setOtherCalendarState={setOtherCalendarState}
          otherCalendarPostId={otherCalendarPostId}
          setOtherCalendarPostId={setOtherCalendarPostId}
        />
        <DayScheduleModal
          isTodaySchedule={isTodaySchedule}
          setIsTodaySchedule={setIsTodaySchedule}
          setIsAddPost={setIsAddPost}
          moreDate={moreDate}
          setOtherCalendarPostId={setOtherCalendarPostId}
          isSubmit={isSubmit}
        />
      </CalendarWrapper>
      {String(userId.userId) === String(param.id) && <CalendarSidebar />}
    </CalendarSidebarWrapper>
  );
}

export default CalendarMain;

const CalendarSidebarWrapper = styled.div`
  ${(props) => props.theme.FlexRow};
  height: 100%;
`;
export const CalendarWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px 48px 52px;

  .fc {
    width: 100%;
    height: 100%;
    color: ${(props) => props.theme.Bg.fontBlack};
  }
  // 달력 헤더 영역
  .fc-toolbar {
    height: 43px;
    margin-bottom: 30px !important;
  }
  // 헤더 각 요소 영역
  .fc-toolbar-chunk {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
  }
  .fc-h-event .fc-event-title-container {
    cursor: pointer;
  }
  // 버튼 초기화
  .fc .fc-button-primary:disabled {
    background-color: white;
    color: black;
    border: none;
    margin: 0;
    &:active {
      outline: none;
      border: none;
    }
  }
  .fc .fc-button-primary {
    background-color: white;
    color: black;
    border: none;
    margin: 0;
    &:active {
      border: none;
      outline: none;
    }
    &:focus {
      border: none;
      outline: none;
    }
  }
  .fc-button {
    &:active {
      margin: 0;
    }
  }
  .fc-popover,
  .fc-more-popover {
    visibility: hidden;
  }

  // 버튼 감싸고 있는 div
  .fc-toolbar-chunk {
    display: flex;
    gap: 15px;
  }
  // prev, next button
  .fc-prev-button,
  .fc-next-button,
  .fc-nextYear-button,
  .fc-prevYear-button {
    ${(props) => props.theme.FlexCol};
    ${(props) => props.theme.ButtonSmall};
    width: 30px !important;
    height: 30px !important;
    border: solid 1.4px #121212 !important;
    .fc-icon {
      size: 15px;
    }
    &:active {
      background-color: #fbdf96 !important;
    }
  }
  // today button

  // 일정추가 button
  .fc-addButton-button {
    visibility: ${(props) => props.disabled && "hidden"};
    ${(props) => props.theme.ButtonSmall};
    width: 96px;
    height: 38px;
    font-size: ${(props) => props.theme.Fs.size16};
    border: solid 1.4px #121212 !important;
    background-color: #0eafe1 !important;
    color: #ffffff !important;
  }
  // 오늘 button
  .fc-today-button {
    ${(props) => props.theme.ButtonSmall};
    width: 48px;
    height: 38px;
    font-size: ${(props) => props.theme.Fs.size14};
    border: solid 1.4px #121212 !important;
    color: #121212 !important;
    &:active {
      background-color: #fbdf96 !important;
    }
  }

  // 년,월
  .fc-toolbar-title {
    margin-right: 0.75em;
    font-size: ${(props) => props.theme.Fs.size24};
    font-weight: 600;
  }
  .fc-daygrid,
  .fc-timegrid {
    border: 0.5px solid ${(props) => props.theme.Bg.border1};
    border-radius: 4px;
  }
  // date 각 한칸
  .fc-daygrid-day {
    padding: 10px;
  }
  // 날짜 - 왼쪽으로
  .fc-daygrid-day-top {
    flex-direction: row;
    font-size: ${(props) => props.theme.Fs.size14};
  }

  // 오늘날짜
  .fc,
  .fc-daygrid-day.fc-day-today {
    background-color: transparent !important;
  }
  .fc-day-today {
    .fc-daygrid-day-top {
      a {
        font-weight: 600;
        text-decoration-line: underline;
        text-decoration-color: ${(props) => props.theme.Bg.mainColor5};
        text-decoration-thickness: 3px;
      }
    }
  }

  .fc-theme-standard,
  .fc-scrollgrid {
    border: none;
  }
  .fc-theme-standard td {
    border-top: 0.5px solid ${(props) => props.theme.Bg.border1};
  }

  table {
    border: none;
  }

  // 요일
  th {
    line-height: 30px;
    border: none;
    border-right: 0.5px solid ${(props) => props.theme.Bg.border1};
    background: ${(props) => props.theme.Bg.color5};
    border-radius: 4px;
    font-size: ${(props) => props.theme.Fs.size16};
  }
  th:last-child {
    border-right: none;
  }

  // 가로
  tr {
    border: none;
    border-bottom: 0.5px solid ${(props) => props.theme.Bg.border1};
  }
  tr:last-child {
    border-bottom: none;
  }

  // 세로
  td {
    border: none;
    border-right: 0.5px solid ${(props) => props.theme.Bg.border1};
  }
  td:last-child {
    border-right: none;
  }

  // 일정
  .fc-event {
    line-height: 20px;
    font-size: ${(props) => props.theme.Fs.size14};
    vertical-align: middle;
  }

  // 더보기 글씨체
  .fc-more-link {
    font-size: ${(props) => props.theme.Fs.smallText};
  }

  .fc-direction-ltr .fc-timegrid-slot-label-frame {
    text-align: center;
  }

  .fc-timegrid-axis-frame {
    justify-content: center;
  }
`;
