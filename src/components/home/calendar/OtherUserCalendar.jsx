import styled from "styled-components";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DayAmPm } from "../../../utils/calendar/CalendarBasic";
import { FormatTimeDot, TimeCheck } from "../../../utils/calendar/CalendarBasic";
import { __otherUserSharePost, __otherUserUpdatePost } from "../../../redux/modules/calendarSlice";
import defaultProfile from "../../../assets/defaultImage/profile.jpg";
import { ReactComponent as Note } from "../../../assets/defaultIcons/note.svg";

export default function OtherUserCalendar({ ...props }) {
  const dispatch = useDispatch();

  const { otherUserUpdate, otherUserShare, otherUser } = useSelector((state) => state.calendar);
  const { otherId } = useSelector((state) => state.usersInfo);

  //console.log("otherUserUpdate : ", otherUserUpdate);
  //console.log("otherUserShare : ", otherUserShare);

  useEffect(() => {
    dispatch(__otherUserUpdatePost({ userId: otherId }));
    dispatch(__otherUserSharePost({ userId: otherId }));
  }, [otherId, props.otherCalendarState]);

  // 업데이트 된 일정
  const updatePostClick = (postId) => {
    props.setOtherCalendarPostId(postId);
  };

  return (
    <>
      {otherUser && (
        <OtherWrapper isOpen={props.isOtherOpen}>
          <OtherUpdateWrapper>
            <UpdateTitle>업데이트 된 일정</UpdateTitle>
            <UpdateContainer>
              {otherUserUpdate.length !== 0 ? (
                otherUserUpdate?.map((list) => {
                  const startDate = FormatTimeDot(list.startDate);
                  const time = TimeCheck(list.modifiedAt);
                  const newStartTime = DayAmPm(list.startTime);
                  return (
                    <UpdateBox key={list.id} onClick={() => updatePostClick(list.id)}>
                      <ImgBox>
                        <img src={list.writer.profileImage ? list.writer.profileImage : defaultProfile} />
                      </ImgBox>
                      <WriterBox>
                        <span>{list.title}</span>
                        <WriterTimeBox>
                          <span>{startDate}</span>
                          <span>{newStartTime} ~</span>
                        </WriterTimeBox>
                      </WriterBox>
                      <TimeBox>
                        <span>{time}</span>
                      </TimeBox>
                    </UpdateBox>
                  );
                })
              ) : (
                <NoneScheduleBox>
                  <Note width={32} height={32} className="noneToday" />
                  <div>일주일간 업데이트 된 일정이 없습니다.</div>
                </NoneScheduleBox>
              )}
            </UpdateContainer>
          </OtherUpdateWrapper>
          <OtherUpdateWrapper>
            <UpdateTitle>나와 공유한 일정</UpdateTitle>
            <ShareContainer>
              {otherUserShare.length !== 0 ? (
                otherUserShare?.map((list) => {
                  const time = TimeCheck(list.modifiedAt);
                  return (
                    <UpdateBox key={list.id} onClick={() => updatePostClick(list.id)}>
                      <ImgBox>
                        <img src={list.writer.profileImage ? list.writer.profileImage : defaultProfile} />
                      </ImgBox>
                      <WriterBox>
                        <span>{list.writer.name}</span>
                        <span>{list.title}</span>
                      </WriterBox>
                      <TimeBox>
                        <span>{time}</span>
                      </TimeBox>
                    </UpdateBox>
                  );
                })
              ) : (
                <NoneScheduleBox>
                  <Note width={32} height={32} className="noneToday" />
                  <div>나와 공유한 일정이 없습니다.</div>
                </NoneScheduleBox>
              )}
            </ShareContainer>
          </OtherUpdateWrapper>
        </OtherWrapper>
      )}
    </>
  );
}

const OtherWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  justify-content: flex-start;
  min-width: 21.875rem;
  max-width: 21.875rem;
  height: 100%;
  border-right: 0.0625rem solid #afb4bf;
  //position: ${(props) => (props.isOpen ? "absolute" : "inherit")};
  //left: 28px;
  //z-index: 10;
  padding: 1.875rem;
`;

const IconBox = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: right;
  margin-top: 0.9375rem;
  margin-bottom: 0.3125rem;
  padding-right: 1.875rem;
  cursor: pointer;
`;

const OtherUpdateWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 25rem;
  //padding: 0 30px;
  //z-index: 10;
`;

const UpdateTitle = styled.span`
  width: 100%;
  line-height: 2.5rem;
  margin: 0;
  margin-bottom: 0.75rem;
  padding: 0 0.625rem;
  border-bottom: 0.0469rem solid ${(props) => props.theme.Bg.color3};
  ${(props) => props.theme.SidebarTitleText};
`;

const UpdateContainer = styled.div`
  ${(props) => props.theme.FlexCol}
  padding-bottom: 1.25rem;
`;

const ShareContainer = styled(UpdateContainer)`
  border-bottom: none;
`;

const UpdateBox = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  padding: 0.3125rem;
  border-radius: 0.625rem;
  &:hover {
    background-color: ${(props) => props.theme.Bg.hoverColor};
    cursor: pointer;
  }
`;

const ImgBox = styled.div`
  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    margin-left: 0.3125rem;
    margin-right: 0.625rem;
  }
`;

const WriterBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.3125rem;
`;

const WriterTimeBox = styled.div`
  display: flex;
  gap: 0.3125rem;
  span {
    font-size: ${(props) => props.theme.Fs.size14};
    color: ${(props) => props.theme.Fs.color2};
  }
`;

const TimeBox = styled.div`
  min-width: 3.75rem;
  margin-right: 0.3125rem;
  text-align: right;
  font-size: ${(props) => props.theme.Fs.size12};
`;

const NoneScheduleBox = styled.div`
  ${(props) => props.theme.BoxCustom};
  ${(props) => props.theme.FlexCol}
  height: 14.375rem;
  gap: 1.25rem;
  cursor: auto;
  div {
    font-size: ${(props) => props.theme.DescriptionText};
  }
`;