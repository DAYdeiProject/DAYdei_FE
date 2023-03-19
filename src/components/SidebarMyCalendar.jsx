import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getTodaySchedule, __getTodayUpdate } from "../redux/modules/calendarSlice";
import format from "date-fns/format";
import { getDay } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function SidebarMyCalendar({ nickName, side, movePage, setMovePage }) {
  //const URI = "http://daydei.s3-website.ap-northeast-2.amazonaws.com/friends";
  const URI = "http://localhost:3000/friends";
  const KAKAO = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_ID}&redirect_uri=${URI}&response_type=code&scope=friends`;

  const friendKakao = () => {
    window.location.href = KAKAO;
  };

  const dispatch = useDispatch();
  const token = Cookies.get("accessJWTToken");
  const now = format(new Date(), "yy.MM.dd");
  const nowDay = getDay(new Date());
  let day = "";
  if (nowDay === 0) {
    day = now + "(일)";
  } else if (nowDay === 1) {
    day = now + "(월)";
  } else if (nowDay === 2) {
    day = now + "(화)";
  } else if (nowDay === 3) {
    day = now + "(수)";
  } else if (nowDay === 4) {
    day = now + "(목)";
  } else if (nowDay === 5) {
    day = now + "(금)";
  } else if (nowDay === 6) {
    day = now + "(토)";
  }

  useEffect(() => {
    dispatch(__getTodaySchedule(token));
    dispatch(__getTodayUpdate(token));
  }, [side]);

  const { today, update, isLoding } = useSelector((state) => state.calendar);

  console.log("today-------", today);
  console.log("update-------", update);

  const navigate = useNavigate();
  const moveUserPage = (id) => {
    navigate(`/${id}`);
    setMovePage(true);
  };
  if (isLoding) <div>로딩중...</div>;
  return (
    <>
      <NickNameContainer>
        <NickNameTitle>안녕하세요. {nickName}님</NickNameTitle>
      </NickNameContainer>
      <TodayScheduleContainer>
        <SideTitle>
          <span>오늘의 일정</span>
          <span>{day}</span>
        </SideTitle>
        <TodayScheduleWrapper>
          {today &&
            today.map((list) => {
              let color = "";
              list.color === "RED"
                ? (color = "#EC899F")
                : list.color === "ORANGE"
                ? (color = "#EB8E54")
                : list.color === "YELLOW"
                ? (color = "#FCE0A4")
                : list.color === "GREEN"
                ? (color = "#94DD8E")
                : list.color === "BLUE"
                ? (color = "#95DFFF")
                : list.color === "NAVY"
                ? (color = "#4C7EA0")
                : (color = "#9747FF");

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
            })}
        </TodayScheduleWrapper>
        <TodayCountBox>
          <span>오늘은 {today.length}개의 일정이 있어요.</span>
        </TodayCountBox>
      </TodayScheduleContainer>

      <FriendsListContainer>
        <SideTitle>
          <span>업데이트한 친구</span>
          <span>0</span>
        </SideTitle>

        <FriendsWrapper>
          <FriendsListBox>
            {update.map((list) => {
              return (
                <ListBox key={list.userId}>
                  <ImgBox>
                    <img src=""></img>
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
                    <button onClick={() => moveUserPage(list.userId)}>캘린더</button>
                  </ButtonBox>
                </ListBox>
              );
            })}
          </FriendsListBox>
        </FriendsWrapper>
      </FriendsListContainer>
      {/* <button onClick={friendKakao}>카톡 친구 추가</button> */}
    </>
  );
}

const NickNameContainer = styled.section`
  ${(props) => props.theme.FlexCol};
  margin-bottom: 35px;
`;

const NickNameTitle = styled.section`
  font-size: ${(props) => props.theme.Fs.tag};
  width: 100%;
  text-align: left;
`;

const SideTitle = styled(NickNameTitle)`
  ${(props) => props.theme.FlexRowBetween};
  font-size: ${(props) => props.theme.Fs.day};
  margin-bottom: 20px;
  span:nth-child(2) {
    font-size: ${(props) => props.theme.Fs.xsmallText};
    color: ${(props) => props.theme.Bg.deepColor};
  }
`;

const TodayScheduleContainer = styled.section`
  ${(props) => props.theme.FlexCol};
  padding-bottom: 24px;
  border-bottom: 1px solid ${(props) => props.theme.Bg.borderColor};
  margin-bottom: 35px;
`;

const TodayScheduleWrapper = styled.div`
  ${(props) => props.theme.FlexCol};
  justify-content: flex-start;
  gap: 15px;
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
    background-color: coral;
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
  gap: 15px;
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
