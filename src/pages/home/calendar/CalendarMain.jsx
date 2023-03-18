import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";
import AddPostModal from "./AddPostModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { __getTotalPosts } from "../../../redux/modules/calendarSlice";
import Cookies from "js-cookie";

function CalendarMain() {
  // 일정 추가 모달창 state
  const [isAddPost, setIsAddPost] = useState(false);
  const dispatch = useDispatch();
  const param = useParams();
  const token = Cookies.get("accessJWTToken");
  //const { data, isLoding } = useSelector();

  useEffect(() => {
    dispatch(__getTotalPosts({ userId: param.id, token }));
  }, []);

  // 일정추가 버튼 클릭 -> 모달창 여부
  const addButtonClick = () => {
    showAddpostModal();
  };
  const showAddpostModal = () => {
    setIsAddPost(true);
  };

  const setting = {
    headerToolbar: {
      left: "today",
      center: "prev title next",
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
    events: [
      {
        id: "1",
        title: "Event 1",
        start: "2023-03-15",
        end: "2023-03-18",
        color: "lightpink",
        textColor: "black",
      },
    ],
  };

  return (
    <CalendarWrapper>
      <FullCalendar
        {...setting}
        plugins={[dayGridPlugin, interactionPlugin]}
        locale="ko"
        dayMaxEventRows={true}
        initialView="dayGridMonth"
        defaultAllDay={true}
        moreLinkText="더보기"
      />
      <AddPostModal isAddPost={isAddPost} setIsAddPost={setIsAddPost} />
      {/* {this.state.isOpenModal && <AddPostModal isOpen={this.state.isOpenModal} closeModal={this.handleCloseModal} />} */}
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

  // prev, next button
  .fc-prev-button,
  .fc-next-button {
    font-size: 10px;
    background-color: lightsalmon;
    margin: 0 !important;
    border: none;

    .fc-icon {
      size: 10px;
    }
  }

  // 일정추가 button
  .fc-addButton-button {
    width: 96px;
    height: 43px;
    color: white;
    background-color: ${(props) => props.theme.Bg.middleColor};
    border: none;
    border-radius: 4px;
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
