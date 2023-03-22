import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import styled from "styled-components";
import AddPostModal from "./AddPostModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { __getTotalPosts, __getPostDetail } from "../../../redux/modules/calendarSlice";
import Cookies from "js-cookie";
import Loading from "../../../components/Loading";
import DayScheduleModal from "./DayScheduleModal";
import UserInfo from "../../../utils/localStorage/userInfo";
import ColorFromDB from "./CalendarBasic";
import add from "date-fns/add";
import DetailPostModal from "./DetailPostModal";
import CalendarSidebar from "./CalendarSidebar";

function CalendarMain({ side, setSide }) {
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
  // 일정 detail 로그인/타유저 비교
  const [isModify, setIsModify] = useState(false);

  // 하루 일정 모달창 state
  const [isTodaySchedule, setIsTodaySchedule] = useState(false);

  const dispatch = useDispatch();

  const token = Cookies.get("accessJWTToken");
  const param = useParams();
  const userId = UserInfo();

  const { total, isLoading } = useSelector((state) => {
    return state.calendar;
  });

  useEffect(() => {
    if (String(userId.userId) !== param.id) {
      setDisabled(true);
    }
    dispatch(__getTotalPosts({ userId: param.id, token }));
  }, [isSubmit, param]);

  useEffect(() => {
    setNewData([]);
    if (total && total.length !== 0) {
      const result = total.map((data) => {
        const color = ColorFromDB(data.color);
        const end = add(new Date(data.endDate), { days: 1 });
        return {
          id: data.id,
          title: data.title,
          start: data.startDate,
          end: end,
          color: color,
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
    setIsTodaySchedule(true);
  };

  // 일정detail 클릭시
  const handlerEventClick = (e) => {
    setDetailPostId(e.event._def.publicId);
    // if (String(userId.userId) === param.id) {
    //   setIsModify(true);
    // }
  };

  // 클릭한 date만
  const handlerDateClick = (date) => {
    if (String(userId.userId) === param.id) {
      setPickDate(date.date);
    }
  };

  const setting = {
    headerToolbar: {
      left: "today dayGridMonth timeGridWeek",
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
      },
      week: {},
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
    <>
      {isLoading && <Loading />}
      <CalendarWrapper disabled={disabled}>
        <FullCalendar
          {...setting}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          locale="ko"
          editable={true}
          dayMaxEventRows={true}
          initialView="dayGridMonth"
          defaultAllDay={true}
          moreLinkText="더보기"
          moreLinkClick={handleMoreLinkClick}
          eventClick={handlerEventClick}
          dateClick={handlerDateClick}
        />
        <AddPostModal
          isAddPost={isAddPost}
          setIsAddPost={setIsAddPost}
          side={side}
          setSide={setSide}
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
          side={side}
          setSide={setSide}
        />
        <DayScheduleModal isTodaySchedule={isTodaySchedule} setIsTodaySchedule={setIsTodaySchedule} setIsAddPost={setIsAddPost} />
      </CalendarWrapper>
      <CalendarSidebar />
    </>
  );
}

export default CalendarMain;

// const CalendarSidebarWrapper = styled.div`
//   ${(props) => props.theme.FlexRow}
//   width: 100%;
//   height: 100%;
// `;
export const CalendarWrapper = styled.div`
  width: 100%;
  min-width: 690px;
  height: 100%;
  padding: 40px 48px 40px;

  .fc {
    width: 100%;
    height: 100%;
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
      background-color: transparent !important;
      color: black !important;
    }
  }

  .fc-popover,
  .fc-more-popover {
    visibility: hidden;
  }
  // prev, next button
  /* .fc-prev-button,
  .fc-next-button {
    font-size: 10px;
    background-color: lightsalmon;
    margin: 0 !important;
    border: none;

    .fc-icon {
      size: 10px;
    }
  } */
  // today button

  // 일정추가 button
  .fc-addButton-button {
    visibility: ${(props) => props.disabled && "hidden"};
  }

  // 년,월
  .fc-toolbar-title {
    margin-right: 0.75em;
    font-size: ${(props) => props.theme.Fs.largeText};
  }

  .fc-daygrid {
    border: 0.75px solid ${(props) => props.theme.Bg.borderColor};
  }

  .fc-theme-standard,
  .fc-scrollgrid {
    border: none;
  }

  table {
    border: none;
  }
  // 요일
  th {
    line-height: 30px;
    border: none;
    border-right: 0.75px solid ${(props) => props.theme.Bg.borderColor};
    border-bottom: 0.75px solid ${(props) => props.theme.Bg.borderColor};
  }
  th:last-child {
    border-right: none;
  }

  // 가로
  tr {
    border: none;
    border-bottom: 0.75px solid ${(props) => props.theme.Bg.borderColor};
  }
  tr:last-child {
    border-bottom: none;
  }

  // 세로
  td {
    border: none;
    border-right: 0.75px solid ${(props) => props.theme.Bg.borderColor};
  }
  td:last-child {
    border-right: none;
  }

  // 일정
  .fc-event {
    font-size: ${(props) => props.theme.Fs.smallText};
    height: 22px;
  }

  // 더보기 글씨체
  .fc-more-link {
    font-size: ${(props) => props.theme.Fs.smallText};
  }
`;
