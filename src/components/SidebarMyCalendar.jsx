import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getTodaySchedule, __getTodayUpdate } from "../redux/modules/calendarSlice";
import format from "date-fns/format";
import { getDay } from "date-fns";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import ColorFromDB from "../pages/home/calendar/CalendarBasic";
import UserInfo from "../utils/localStorage/userInfo";
import SidebarMiniCalendar from "./SidebarMiniCalendar";
import { ReactComponent as NoneToday } from "../assets/lcon/calendarIcon/noneSchedule.svg";
import { ReactComponent as Smile } from "../assets/lcon/smile.svg";

export default function SidebarMyCalendar({ ...props }) {
  const dispatch = useDispatch();
  const token = Cookies.get("accessJWTToken");
  const userInfo = UserInfo();
  const now = format(new Date(), "yy.M.dd");
  const nowDay = getDay(new Date());
  let day = "";
  if (nowDay === 0) {
    day = now + " (일)";
  } else if (nowDay === 1) {
    day = now + " (월)";
  } else if (nowDay === 2) {
    day = now + " (화)";
  } else if (nowDay === 3) {
    day = now + " (수)";
  } else if (nowDay === 4) {
    day = now + " (목)";
  } else if (nowDay === 5) {
    day = now + " (금)";
  } else if (nowDay === 6) {
    day = now + " (토)";
  }
  const { today, update, isLoading } = useSelector((state) => state.calendar);
  //console.log("update", update);
  useEffect(() => {
    const today = format(new Date(), "yyyy-MM-dd");
    dispatch(__getTodaySchedule({ today, userId: userInfo.userId, token }));
    dispatch(__getTodayUpdate(token));
  }, [props.side]);

  const navigate = useNavigate();
  const moveUserPage = (id) => {
    navigate(`/${id}`);
  };

  return (
    <>
      {isLoading && <Loading />}
      <SidebarWrapper>
        <NickNameContainer>
          <NickNameTitle>반가워요. {props.nickName}님👋🏻</NickNameTitle>
        </NickNameContainer>

        <TodayScheduleContainer>
          {props.isCalnedar ? (
            <>
              <SideTitle>
                <span>오늘의 일정</span>
                <span>{day}</span>
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
                    let color = ColorFromDB(list.color);
                    return (
                      <TodayScheduleBox key={list.id}>
                        <IconBox>
                          <div></div>
                        </IconBox>
                        <TodayBox>
                          <span>{list.title}</span>
                          <TodayTime>
                            <span>{list.startTime.substr(0, 2) < 13 ? "오전" : "오후"}</span>
                            <span>{list.startTime.substr(0, 5)}</span>
                            <span>-</span>
                            <span>{list.endTime.substr(0, 2) < 13 ? "오전" : "오후"}</span>
                            <span>{list.endTime.substr(0, 5)}</span>
                          </TodayTime>
                        </TodayBox>
                        <ColorCheck>
                          <ColorIcon color={color}></ColorIcon>
                        </ColorCheck>
                      </TodayScheduleBox>
                    );
                  })
                )}
              </TodayScheduleWrapper>
              <TodayCountBox>
                <span>{today.length !== 0 && "오늘은 {today.length}개의 일정이 있어요."}</span>
              </TodayCountBox>
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
                      <img src={list.profileImage} />
                    </ImgBox>
                    <InfoBox>
                      <span>{list.nickName}</span>
                      <span>
                        {list.introduction
                          ? list.introduction.length > 15
                            ? list.introduction.substr(0, 15)
                            : list.introduction
                          : "아직 자기소개가 없습니다."}
                      </span>
                    </InfoBox>
                    <ButtonBox>
                      <button onClick={() => moveUserPage(list.id)}>캘린더</button>
                    </ButtonBox>
                  </ListBox>
                ))
              )}
            </FriendsListBox>
          </FriendsWrapper>
        </FriendsListContainer>
        {/* <button onClick={friendKakao}>카톡 친구 추가</button> */}
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
  padding-bottom: 24px;
`;

const TodayScheduleWrapper = styled.div`
  ${(props) => props.theme.FlexCol};
  justify-content: flex-start;
  gap: 5px;
  height: 250px;
  margin-bottom: 20px;
  overflow-y: auto;
`;
const TodayScheduleBox = styled.div`
  ${(props) => props.theme.FlexRow};
  justify-content: start;
  padding: 0 10px;
  gap: 10px;
  border-radius: 10px;
  &:hover {
    background-color: white;
  }
`;

const IconBox = styled.div`
  ${(props) => props.theme.FlexCol};
  width: 10%;
  height: 50px;
  div {
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }
`;
const TodayBox = styled.div`
  ${(props) => props.theme.FlexCol};
  align-items: flex-start;
  gap: 3px;
  width: 70%;
  height: 100%;
  span {
    font-size: ${(props) => props.theme.Fs.smallText};
  }
`;
const TodayTime = styled.div`
  display: flex;
  gap: 5px;
  span {
    font-size: ${(props) => props.theme.Fs.xsmallText};
    color: ${(props) => props.theme.Bg.deepColor};
  }
`;
const ColorCheck = styled.div`
  ${(props) => props.theme.FlexCol};
  width: 15%;
`;
const ColorIcon = styled.div`
  width: 15px;
  height: 15px;
  background-color: ${(props) => (props.isCheck ? props.color : "transparent")};
  border: ${(props) => (props.isCheck ? "none" : `2px solid ${props.color}`)};
  border-radius: 50%;
`;

const TodayCountBox = styled.div`
  font-size: ${(props) => props.theme.Fs.xsmallText};
  color: ${(props) => props.theme.Bg.deepColor};
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
const ListBox = styled(TodayScheduleBox)``;

const ImgBox = styled(IconBox)`
  img {
    background-color: coral;
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }
`;

const InfoBox = styled(TodayBox)`
  span:nth-child(2) {
    font-size: ${(props) => props.theme.Fs.xsmallText};
    color: ${(props) => props.theme.Bg.deepColor};
  }
`;

const ButtonBox = styled(ColorCheck)`
  width: 30%;
  button {
    width: 60px;
    height: 32px;
    background-color: ${(props) => props.theme.Bg.middleColor};
    font-size: ${(props) => props.theme.Fs.xsmallText};
    border: none;
    border-radius: 5px;
  }
`;

// 일정 없을때
const NoneSchedule = styled.div`
  ${(props) => props.theme.FlexCol};
  ${(props) => props.theme.BoxCustom}
  gap: 12px;
  width: 275px;
  height: 200px;
  span {
    ${(props) => props.theme.ContentTitleText};
  }
  p {
    ${(props) => props.theme.DescriptionText};
    text-align: center;
    line-height: 18px;
  }
`;
