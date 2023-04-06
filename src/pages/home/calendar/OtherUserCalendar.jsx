import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { __otherUserSharePost, __otherUserUpdatePost } from "../../../redux/modules/calendarSlice";
import { ReactComponent as Note } from "../../../assets/defaultIcons/note.svg";
import defaultProfile from "../../../assets/defaultImage/profile.jpg";
import { FormatTimeDot, TimeCheck } from "../../../utils/calendar/CalendarBasic";

export default function OtherUserCalendar({ ...props }) {
  const dispatch = useDispatch();
  const token = Cookies.get("accessJWTToken");
  const param = useParams();

  const { otherUserUpdate, otherUserShare, otherUser } = useSelector((state) => state.calendar);

  //console.log("otherUserUpdate : ", otherUserUpdate);
  //console.log("otherUserShare : ", otherUserShare);

  useEffect(() => {
    dispatch(__otherUserUpdatePost({ userId: String(param.id), token }));
    dispatch(__otherUserSharePost({ userId: String(param.id), token }));
  }, [param, props.otherCalendarState]);

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
                  return (
                    <UpdateBox key={list.id} onClick={() => updatePostClick(list.id)}>
                      <ImgBox>
                        <img src={list.writer.profileImage ? list.writer.profileImage : defaultProfile} />
                      </ImgBox>
                      <WriterBox>
                        <span>{list.writer.name}</span>
                        <WriterTimeBox>
                          <span>{startDate}</span>
                          <span>{list.startTime.substr(0, 5)} ~</span>
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
  min-width: 350px;
  max-width: 350px;
  height: 100%;
  border-right: 1px solid #afb4bf;
  //position: ${(props) => (props.isOpen ? "absolute" : "inherit")};
  //left: 28px;
  //z-index: 10;
  padding: 30px;
`;

const IconBox = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: right;
  margin-top: 15px;
  margin-bottom: 5px;
  padding-right: 30px;
  cursor: pointer;
`;

const OtherUpdateWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 400px;
  //padding: 0 30px;
  //z-index: 10;
`;

const UpdateTitle = styled.span`
  width: 100%;
  line-height: 40px;
  margin: 0;
  margin-bottom: 12px;
  padding: 0 10px;
  border-bottom: 0.75px solid ${(props) => props.theme.Bg.color3};
  ${(props) => props.theme.SidebarTitleText};
`;

const UpdateContainer = styled.div`
  ${(props) => props.theme.FlexCol}
  padding-bottom: 20px;
`;

const ShareContainer = styled(UpdateContainer)`
  border-bottom: none;
`;

const UpdateBox = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  padding: 5px;
  border-radius: 10px;
  &:hover {
    background-color: ${(props) => props.theme.Bg.hoverColor};
    cursor: pointer;
  }
`;

const ImgBox = styled.div`
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 5px;
    margin-right: 10px;
  }
`;

const WriterBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
`;

const WriterTimeBox = styled.div`
  display: flex;
  gap: 5px;
  span {
    font-size: ${(props) => props.theme.Fs.size14};
    color: ${(props) => props.theme.Fs.color2};
  }
`;

const TimeBox = styled.div`
  min-width: 60px;
  margin-right: 5px;
  text-align: right;
  font-size: ${(props) => props.theme.Fs.size12};
`;

const NoneScheduleBox = styled.div`
  ${(props) => props.theme.BoxCustom};
  ${(props) => props.theme.FlexCol}
  height: 230px;
  gap: 20px;
  cursor: auto;
  div {
    font-size: ${(props) => props.theme.DescriptionText};
  }
`;
