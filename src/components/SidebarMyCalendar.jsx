import { getDay } from "date-fns";
import format from "date-fns/format";
import styled from "styled-components";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { textState } from "../redux/modules/headerReducer";
import { __getTodaySchedule, __getTodayUpdate } from "../redux/modules/calendarSlice";
import { GetUserInfo } from "../utils/cookie/userInfo";
import SidebarMiniCalendar from "./SidebarMiniCalendar";
import { DayCheck } from "../utils/calendar/CalendarBasic";
import defaultProfile from "../assets/defaultImage/profile.jpg";
import { ReactComponent as Smile } from "../assets/defaultIcons/smile.svg";
import { ReactComponent as LightEmoji } from "../assets/calendarIcon/lightEmoji.svg";
import { ReactComponent as NoneToday } from "../assets/calendarIcon/noneSchedule.svg";

export default function SidebarMyCalendar({ ...props }) {
  const dispatch = useDispatch();
  const userInfo = GetUserInfo();
  const now = format(new Date(), "yy.MM.dd");
  const day = DayCheck(getDay(new Date()));
  const nowDay = `${now} (${day})`;

  const { today, update } = useSelector((state) => state.calendar);
  const { text } = useSelector((state) => state.header);

  // 오늘의 일정, 업데이트한 친구 가져오기
  useEffect(() => {
    const today = format(new Date(), "yyyy-MM-dd");
    dispatch(__getTodaySchedule({ today, userId: userInfo.userId }));
    dispatch(__getTodayUpdate());
  }, [props.side]);

  const navigate = useNavigate();
  const moveUserPage = (id) => {
    navigate(`/${id}`);
  };

  // 닉네임 가져오기 위해..
  const headerProfile = useSelector((state) => state.users.headerProfile);

  // 오늘의 일정 클릭시
  const todayClickHandler = (postId) => {
    props.setDetailPostId(postId);
  };

  return (
    <>
      <SidebarWrapper>
        <NickNameContainer>
          <NickNameTitle>반가워요. {headerProfile.nickName}님👋🏻</NickNameTitle>
        </NickNameContainer>

        <TodayScheduleContainer>
          {text === "home" || text === undefined ? (
            <>
              <SideTitle>
                <span>오늘의 일정</span>
                <span>{nowDay}</span>
              </SideTitle>
              <TodayScheduleWrapper>
                {today.length === 0 ? (
                  <NoneSchedule>
                    <NoneToday />
                    <span>새로운 일정이 없습니다.</span>
                    <p>
                      달력을 보면서 일정을 확인할 수 있어요.
                      <br /> 완료한 할 일은 바로 체크해보세요.
                    </p>
                  </NoneSchedule>
                ) : (
                  today &&
                  today.map((list) => {
                    let allDay = "";
                    if (list.startTime === "00:00:00" && list.endTime === "00:00:00") {
                      allDay = "종일";
                    }
                    return (
                      <TodayScheduleBox key={list.id} onClick={() => todayClickHandler(list.id)}>
                        <IconBox>
                          <LightEmoji />
                        </IconBox>
                        <TodayBox>
                          <span>{list.title.length > 16 ? list.title.substr(0, 16) + "..." : list.title}</span>
                          <TodayTime>
                            {allDay === "종일" ? (
                              <span>{allDay}</span>
                            ) : (
                              <>
                                <span>{list.startTime.substr(0, 2) < 13 ? "오전" : "오후"}</span>
                                <span>{list.startTime.substr(0, 5)}</span>
                                <span>-</span>
                                <span>{list.endTime.substr(0, 2) < 13 ? "오전" : "오후"}</span>
                                <span>{list.endTime.substr(0, 5)}</span>
                              </>
                            )}
                          </TodayTime>
                        </TodayBox>
                      </TodayScheduleBox>
                    );
                  })
                )}
              </TodayScheduleWrapper>
            </>
          ) : (
            <SidebarMiniCalendar />
          )}
        </TodayScheduleContainer>

        <FriendsListContainer>
          <SideTitle>
            <span>업데이트한 친구</span>
            <span>{update.length}</span>
          </SideTitle>

          <FriendsWrapper>
            <FriendsListBox>
              {update.length === 0 ? (
                <NoneSchedule>
                  <Smile />
                  <span>새로운 친구를 만나보세요!</span>
                  <p>
                    다른 사람을 친구 추가나 구독하면
                    <br />
                    상대방의 캘린더를 볼 수 있어요.
                  </p>
                </NoneSchedule>
              ) : (
                update &&
                update.map((list) => (
                  <ListBox key={list.id}>
                    <ImgBox>
                      <img src={list.profileImage ? list.profileImage : defaultProfile} />
                    </ImgBox>
                    <InfoBox>
                      <span>{list.nickName}</span>
                      <span>@{list.email.split("@")[0]}</span>
                    </InfoBox>
                    <ButtonBox>
                      <div
                        onClick={() => {
                          moveUserPage(list.id);
                          dispatch(textState(""));
                        }}>
                        캘린더
                      </div>
                    </ButtonBox>
                  </ListBox>
                ))
              )}
            </FriendsListBox>
          </FriendsWrapper>
        </FriendsListContainer>
      </SidebarWrapper>
    </>
  );
}

const SidebarWrapper = styled.div`
  padding: 0 35px;
  padding-top: 48px;
  background: ${(props) => props.theme.Bg.color5};
`;

const NickNameContainer = styled.section`
  ${(props) => props.theme.FlexCol};
  margin-bottom: 40px;
`;

const NickNameTitle = styled.section`
  ${(props) => props.theme.SidebarTitleText};
  width: 100%;
  text-align: left;
`;

const SideTitle = styled(NickNameTitle)`
  ${(props) => props.theme.FlexRowBetween};
  margin-bottom: 20px;
  border-bottom: 1px solid ${(props) => props.theme.Bg.color1};
  padding: 0 2.5px;
  // 오늘의 일정 / 업데이트한 친구 text
  span:nth-child(1) {
    ${(props) => props.theme.SidebarTitleText};
    line-height: 35px;
    margin-bottom: 5.5px;
  }
  // 날짜 / 갯수
  span:nth-child(2) {
    ${(props) => props.theme.DescriptionText};
    color: ${(props) => props.theme.Fs.fontColor3};
  }
`;

const TodayScheduleContainer = styled.section`
  ${(props) => props.theme.FlexCol};
  padding-bottom: 10px;
`;

const TodayScheduleWrapper = styled.div`
  ${(props) => props.theme.FlexCol};
  justify-content: flex-start;
  gap: 3px;
  height: 255px;
  margin-bottom: 30px;
  overflow-y: auto;
`;
const TodayScheduleBox = styled.div`
  ${(props) => props.theme.FlexRow};
  justify-content: start;
  padding: 0 10px;
  gap: 15px;
  border-radius: 8px;
  &:hover {
    background-color: ${(props) => props.theme.Bg.hoverColor};
    cursor: pointer;
  }
`;

const IconBox = styled.div`
  ${(props) => props.theme.FlexCol};
  width: 10%;
  height: 50px;
`;
const TodayBox = styled.div`
  ${(props) => props.theme.FlexCol};
  align-items: flex-start;
  gap: 3px;
  width: 100%;
  height: 100%;
  span {
    ${(props) => props.theme.ContentTitleText};
  }
`;
const TodayTime = styled.div`
  display: flex;
  gap: 5px;
  span {
    ${(props) => props.theme.DescriptionText};
    font-weight: normal;
  }
`;

// 업데이트한 친구
const FriendsWrapper = styled(TodayScheduleWrapper)``;
const FriendsListContainer = styled(TodayScheduleContainer)`
  border: none;
`;
const FriendsListBox = styled.div`
  ${(props) => props.theme.FlexCol};
  gap: 5px;
`;
const ListBox = styled(TodayScheduleBox)`
  &:hover {
    cursor: auto;
  }
`;

const ImgBox = styled(IconBox)`
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;

const InfoBox = styled(TodayBox)`
  span:nth-child(2) {
    ${(props) => props.theme.DescriptionText};
    font-weight: normal;
  }
`;

const ButtonBox = styled.div`
  ${(props) => props.theme.FlexCol};
  width: 30%;
  div {
    ${(props) => props.theme.ButtonSmall};
    ${(props) => props.theme.FlexCol};
    width: 66px;
    height: 34px;
    font-weight: 600;
    color: ${(props) => props.theme.Bg.color1};
    ${(props) => props.theme.BtnClickYellow};
  }
`;

// 일정 없을때
const NoneSchedule = styled.div`
  ${(props) => props.theme.FlexCol};
  ${(props) => props.theme.BoxCustom}
  gap: 12px;
  width: 275px;
  height: 200px;
  background-color: white;
  cursor: auto;
  span {
    ${(props) => props.theme.ContentTitleText};
  }
  p {
    ${(props) => props.theme.DescriptionText};
    text-align: center;
    line-height: 18px;
  }
`;
