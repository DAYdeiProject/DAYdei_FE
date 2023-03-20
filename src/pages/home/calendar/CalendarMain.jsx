import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";
import AddPostModal from "./AddPostModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { __getTotalPosts, __getPostDetail } from "../../../redux/modules/calendarSlice";
import Cookies from "js-cookie";
import { add, format } from "date-fns";
import { addDays } from "date-fns";

function CalendarMain({ setSide }) {
  // 일정 추가 모달창 state
  const [isAddPost, setIsAddPost] = useState(false);
  // 일정 추가 버튼 여부(로그인한 유저 캘린더 / 타 유저 캘린더)
  const [disabled, setDisabled] = useState(false);
  const [newData, setNewData] = useState("");
  // 날짜 클릭시 일정추가모달 뜨고 startDate 해당 클릭 날짜로
  const [pickDate, setPickDate] = useState("");
  // 일정 detail
  const [detailPostId, setDetailPostId] = useState("");
  const dispatch = useDispatch();

  const token = Cookies.get("accessJWTToken");
  const param = useParams();
  const localUserId = localStorage.getItem("userInfo");
  const userId = JSON.parse(localUserId);

  const { total, isLoding } = useSelector((state) => {
    return state.calendar;
  });
  //console.log("메인 detailPost : ", detailPost);

  useEffect(() => {
    if (String(userId.userId) !== param.id) {
      setDisabled(true);
    }
    dispatch(__getTotalPosts({ userId: param.id, token }));
  }, [isAddPost, param]);

  useEffect(() => {
    setNewData([]);
    if (total && total.length !== 0) {
      const result = total.map((data) => {
        let color = "";
        if (data.color === "RED") {
          color = "#EC899F";
        } else if (data.color === "ORANGE") {
          color = "#EB8E54";
        } else if (data.color === "YELLOW") {
          color = "#FCE0A4";
        } else if (data.color === "GREEN") {
          color = "#94DD8E";
        } else if (data.color === "BLUE") {
          color = "#95DFFF";
        } else if (data.color === "NAVY") {
          color = "#4C7EA0";
        } else {
          color = "#9747FF";
        }
        return {
          id: data.id,
          title: data.title,
          start: data.startDate,
          end: data.endDate,
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
    console.log("더보기 클릭됨");
  };

  // 일정detail 클릭시
  const handlerEventClick = (e) => {
    setDetailPostId(e.event._def.publicId);
  };

  // 클릭한 date만
  const handlerDateClick = (date) => {
    setPickDate(date.date);
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
      },
    },
    buttonText: {
      //버튼 텍스트 변환
      today: "오늘",
    },
    timeZone: "local",
    events: newData,
  };
  if (isLoding) <div>로딩중...</div>;

  return (
    <CalendarWrapper disabled={disabled}>
      <FullCalendar
        {...setting}
        plugins={[dayGridPlugin, interactionPlugin]}
        locale="ko"
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
        setSide={setSide}
        pickDate={pickDate}
        setPickDate={setPickDate}
        detailPostId={detailPostId}
        setDetailPostId={setDetailPostId}
      />
    </CalendarWrapper>
  );
}

export default CalendarMain;

export const CalendarWrapper = styled.div`
  width: 1570px;
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

// // 클릭한 event(일정)
//   handleEventClick = (info) => {
//     console.log("info : ", info.event.title);
//   };

//   // 클릭한 date만
//   handleDateClick = (date) => {
//     console.log("date :", date);
//   };

//   // 일정 more 클릭시
//   handleMoreLinkClick = (e) => {
//     alert("ddd");
//     e.preventDefault();
//   };

// events: [
//   {
//     id: "1",
//     title: "Event 1",
//     start: "2023-03-15",
//     end: "2023-03-18",
//     color: "lightpink",
//     textColor: "black",
//   },
//   {
//     id: "2",
//     title: "밥먹기",
//     start: "2023-03-10",
//     end: "2023-03-10",
//     color: "#7e0000",
//   },
//   {
//     id: "3",
//     title: "자기",
//     start: "2023-03-10",
//     end: "2023-03-14",
//     color: "pink",
//   },
//   {
//     id: "4",
//     title: "놀기",
//     start: "2023-03-13",
//     end: "2023-03-15",
//     color: "#056b85",
//   },
//   {
//     id: "5",
//     title: "먹기",
//     start: "2023-03-14",
//     end: "2023-03-16",
//     color: "#96a75b",
//   },
//   {
//     id: "6",
//     title: "여행가기",
//     start: "2023-03-12",
//     end: "2023-03-16",
//     color: "#9992c4",
//   },
//   {
//     id: "7",
//     title: "까꿍",
//     start: "2023-03-12",
//     end: "2023-03-16",
//     color: "#69a9ac",
//   },
//   {
//     id: "8",
//     title: "까꿍",
//     start: "2023-03-13",
//     end: "2023-03-18",
//     color: "#b16666",
//     allDay: true,
//   },
// ],
