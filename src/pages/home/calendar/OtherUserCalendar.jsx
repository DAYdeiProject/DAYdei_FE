import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { __otherUserSharePost, __otherUserUpdatePost } from "../../../redux/modules/calendarSlice";
import ColorFromDB from "./CalendarBasic";
import Loading from "../../../components/Loading";

export default function OtherUserCalendar() {
  const [timeText, setTimeText] = useState("");
  const dispatch = useDispatch();
  const token = Cookies.get("accessJWTToken");
  const param = useParams();

  const { otherUserUpdate, otherUserShare, isLoading } = useSelector((state) => state.calendar);
  //console.log("otherUserUpdate : ", otherUserUpdate);
  //console.log("otherUserShare : ", otherUserShare);

  useEffect(() => {
    dispatch(__otherUserUpdatePost({ userId: String(param.id), token }));
    dispatch(__otherUserSharePost({ userId: String(param.id), token }));
  }, [param]);

  // 업데이트 된 일정
  const updatePostClick = (postId) => {
    //
  };

  const timeForToday = (date) => {
    const today = new Date();
    const timeValue = new Date(date);

    let result = "";
    const time = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (time < 1) result = "방금 전";
    if (time < 60) result = `${time}분 전`;

    const hour = Math.floor(time / 60);
    if (hour < 24) result = `${hour}시간 전`;

    const day = Math.floor(time / 60 / 24);
    if (hour < 365) result = `${day}일 전`;

    return result;
  };

  return (
    <>
      {isLoading && <Loading />}
      <OtherWrapper>
        <IconBox>아이콘(달력크게보기)</IconBox>
        <OtherUpdateWrapper>
          <UpdateTitle>업데이트 된 일정</UpdateTitle>
          <UpdateContainer>
            {otherUserUpdate &&
              otherUserUpdate?.map((list) => {
                const color = ColorFromDB(list.color);
                const time = timeForToday(list.createdAt);
                return (
                  <UpdateBox key={list.id} onClick={() => updatePostClick(list.id)}>
                    <ImgBox>
                      <img src={list.writer.profileImage}></img>
                    </ImgBox>
                    <WriterBox isColor={color}>
                      <span>{list.writer.name}</span>
                      <span>{list.title}</span>
                    </WriterBox>
                    <TimeBox>
                      <span>{time}</span>
                    </TimeBox>
                  </UpdateBox>
                );
              })}
          </UpdateContainer>
        </OtherUpdateWrapper>
        <OtherUpdateWrapper>
          <UpdateTitle>나와 공유한 일정</UpdateTitle>
          <UpdateContainer>
            {/* {otherUserShare &&
              otherUserShare?.map((list) => {
                const color = ColorFromDB(list.color);
                return (
                  <div key={list.id}>
                    <div>
                      <img>{list.writer.profileImage}</img>
                      <span>{list.writer.name}</span>
                    </div>
                    <div isColor={color}>
                      <span>{list.title}</span>
                      <span>몇분전...</span>
                    </div>
                  </div>
                );
              })} */}
          </UpdateContainer>
        </OtherUpdateWrapper>
      </OtherWrapper>
    </>
  );
}

const OtherWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  justify-content: flex-start;
  min-width: 350px;
  max-width: 350px;
  height: 100%;
  padding: 0 20px;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.3);
`;

const IconBox = styled.div`
  ${(props) => props.theme.FlexCol}
  height: 40px;
`;

const OtherUpdateWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  align-items: flex-start;
`;

const UpdateTitle = styled.span`
  line-height: 50px;
  margin-left: 10px;
  font-size: ${(props) => props.theme.Fs.tag};
`;

const UpdateContainer = styled.div`
  ${(props) => props.theme.FlexCol}
  margin-bottom: 10px;
`;

const UpdateBox = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  padding: 5px;
  border-radius: 10px;
  &:hover {
    background-color: #e4beaf;
  }
`;

const ImgBox = styled.div`
  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: #69864f;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const WriterBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
  span {
    font-size: ${(props) => props.theme.Fs.day};
  }
  span:nth-child(2) {
    font-size: ${(props) => props.theme.Fs.smallText};
  }
`;

const TimeBox = styled.div`
  min-width: 40px;
  font-size: ${(props) => props.theme.Fs.smallText};
`;
