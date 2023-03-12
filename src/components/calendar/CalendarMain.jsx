import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styled from 'styled-components';
import interactionPlugin from '@fullcalendar/interaction';

class CalendarMain extends React.Component {
    handleEventClick = (info) => {
        console.log('info : ', info.event.title);
        return false;
    };

    // 클릭한 date만
    handleDateClick = (date) => {
        console.log('date :', date);
    };

    // 드래그했을때 start - end date 나옴
    selectDate = (item) => {
        console.log('select :', item);
    };

    headerToolbar = {
        left: 'title prev,next today',
        center: '',
        right: '',
    };

    events = [
        {
            id: '1',
            title: 'Event 1',
            start: '2023-03-15',
            end: '2023-03-18',
            color: 'lightpink',
            textColor: 'black',
        },
        {
            id: '2',
            title: '밥먹기',
            start: '2023-03-10',
            end: '2023-03-10',
            color: '#7e0000',
        },
        {
            id: '3',
            title: '자기',
            start: '2023-03-10',
            end: '2023-03-14',
            color: 'pink',
        },
        {
            id: '4',
            title: '놀기',
            start: '2023-03-13',
            end: '2023-03-15',
            color: '#056b85',
        },
        {
            id: '5',
            title: '먹기',
            start: '2023-03-14',
            end: '2023-03-16',
            color: '#96a75b',
        },
        {
            id: '6',
            title: '여행가기',
            start: '2023-03-12',
            end: '2023-03-16',
            color: '#9992c4',
        },
    ];

    views = {
        timeGrid: {
            dayMaxEventRows: 4,
        },
    };
    limitClick = 'week';

    handleMoreLinkClick = (e) => {
        alert('ddd');
        e.preventDefault();
    };

    render() {
        return (
            <CalendarWrapper>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    headerToolbar={this.headerToolbar}
                    dayMaxEventRows={true}
                    views={this.views}
                    initialView="dayGridMonth"
                    events={this.events}
                    eventClick={this.handleEventClick}
                    dateClick={this.handleDateClick}
                    select={this.selectDate}
                    moreLinkClick={this.handleMoreLinkClick}
                    moreLinkText="더보기"
                />
            </CalendarWrapper>
        );
    }
}

export default CalendarMain;

const CalendarWrapper = styled.div`
    min-width: 1500px;
    padding: 100px;
    white-space: nowrap;
    overflow: auto;

    // 헤더
    .fc-toolbar {
        height: 80px;
    }
    .fc-toolbar-chunk {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    // pre, next button
    .fc-button-group {
        display: flex;
        align-items: center;

        gap: 100px;
        margin-right: 200px;
        font-size: 12px;
        button {
            background-color: lightsalmon;
            border: none;
            span {
                line-height: 10px;
            }
        }
    }

    .fc-daygrid {
        border: 1px solid var(--fc-border-color);
        border-radius: 20px;
    }

    .fc-theme-standard .fc-scrollgrid {
        border: none;
    }
    table {
        border: none;
    }
    // 요일
    th {
        line-height: 80px;
        border: none;
        border-right: 1px solid var(--fc-border-color);
    }
    th:last-child {
        border-right: none;
    }

    // 가로
    tr {
        border: none;
        border-bottom: 1px solid var(--fc-border-color);
    }
    // 세로
    td {
        border-right: 1px solid var(--fc-border-color);
    }
    td:last-child {
        border-right: none;
    }

    // 일정
    .fc-event {
        font-size: 15px;
        height: 25px;
    }

    // 더보기 글씨체
    .fc-more-link {
        font-size: 15px;
    }
    /* .fc-popover {
        width: 30px;
    } */
`;
