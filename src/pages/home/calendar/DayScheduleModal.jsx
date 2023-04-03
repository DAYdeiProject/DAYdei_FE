import React, { useEffect } from "react";
import styled from "styled-components";
import postStyle from "../../../shared/style/PostStyle";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useParams } from "react-router";
import { __getDateSchedule } from "../../../redux/modules/calendarSlice";
import Loading from "../../../components/Loading";
import ModalBox from "../../../elements/ModalBox";
import { ReactComponent as Dismiss } from "../../../assets/defaultIcons/dismiss.svg";
import { format } from "date-fns";
import ColorFromDB from "./CalendarBasic";

export default function DayScheduleModal({ ...props }) {
  const dispatch = useDispatch();
  const token = Cookies.get("accessJWTToken");
  const param = useParams();

  const { todayList } = useSelector((state) => state.calendar);
  //console.log("todayList------>", todayList);

  useEffect(() => {
    if (props.moreDate) {
      dispatch(__getDateSchedule({ userId: param.id, date: props.moreDate, token }));
    }
  }, [props.moreDate, props.isSubmit]);

  const closeModal = () => {
    props.setIsTodaySchedule(false);
  };

  const detailClick = (id) => {
    props.setOtherCalendarPostId(id);
    closeModal();
  };
  return (
    <>
      <ModalBox isOpen={props.isTodaySchedule} width={"500px"} height={"500px"}>
        <TodayScheduleWrapper>
          <postStyle.HeaderWrapper>
            <Dismiss className="closeIncon" onClick={closeModal} />
          </postStyle.HeaderWrapper>
          <DateTitleWrapper>
            <span>{props.moreDate.substr(-2)}일 일정</span>
          </DateTitleWrapper>
          <ScheduleListWrapper>
            <ListContainer>
              {todayList &&
                todayList?.map((list) => {
                  const newStartDate = format(new Date(list.startDate), "yy.M.dd");
                  const newEndDate = format(new Date(list.endDate), "yy.M.dd");
                  const newStartTime = list.startTime.substr(0, 5);
                  const newEndTime = list.endTime.substr(0, 5);
                  const color = ColorFromDB(list.color);
                  return (
                    <ListBox key={list.id} onClick={() => detailClick(list.id)}>
                      <ListTimeArea isColor={color}>
                        <span>{newStartDate}</span>
                        <span> {newStartTime}</span>
                        <span> - </span>
                        <span>{newEndDate}</span>
                        <span> {newEndTime}</span>
                      </ListTimeArea>
                      <ListTitleArea>
                        <span>{list.title}</span>
                      </ListTitleArea>
                    </ListBox>
                  );
                })}
            </ListContainer>
          </ScheduleListWrapper>
        </TodayScheduleWrapper>
      </ModalBox>
    </>
  );
}

const TodayScheduleWrapper = styled.div`
  padding: 0 30px;
`;
const ScheduleListWrapper = styled.div`
  height: 400px;
  overflow-y: auto;
  padding: 0 10px;
`;
const DateTitleWrapper = styled.div`
  height: 40px;
  padding-left: 10px;
  ${(props) => props.theme.SidebarTitleText};
  font-size: 18px;
`;
const ListContainer = styled.div`
  ${(props) => props.theme.FlexCol}
  gap: 8px;
`;
const ListBox = styled.div`
  ${(props) => props.theme.FlexCol};
  align-items: flex-start;
  gap: 5px;
  height: 60px;
  padding: 5px 10px;
  border-radius: 8px;
  &:hover {
    background-color: ${(props) => props.theme.Bg.mainColor3};
  }
`;

const ListTimeArea = styled.div`
  ${(props) => props.theme.FlexRow};
  justify-content: left;
  gap: 5px;
  padding: 0 10px;
  ${(props) => props.theme.DescriptionText};
  font-size: 14px;
  border-left: ${(props) => props.isColor && `3px solid ${props.isColor}`};
`;

const ListTitleArea = styled.div`
  ${(props) => props.theme.FlexRow};
  justify-content: left;
  padding: 0 10px;
  padding-left: 13px;
  ${(props) => props.theme.SidebarTitleText};
`;
