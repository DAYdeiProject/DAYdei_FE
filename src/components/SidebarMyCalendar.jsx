import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { __getTodaySchedule } from "../redux/modules/calendarSlice";
import { BsGeoAlt } from "react-icons/bs";

export default function SidebarMyCalendar({ nickName }) {
  //const URI = "http://daydei.s3-website.ap-northeast-2.amazonaws.com/friends";
  const URI = "http://localhost:3000/friends";
  const KAKAO = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_ID}&redirect_uri=${URI}&response_type=code&scope=friends`;

  const friendKakao = () => {
    window.location.href = KAKAO;
  };

  const dispatch = useDispatch();
  const token = Cookies.get("accessJWTToken");

  useEffect(() => {
    dispatch(__getTodaySchedule(token));
  }, []);
  // /api/home/today
  /*
    {
    “startTime” : 00:00:00,
    “endTime” : 00:00:00,
    “title” : “title1”,
    “color : “RED”
    // 장소 필요
    },
  */
  return (
    <>
      <NickNameContainer>
        <NickNameTitle>안녕하세요. {nickName}님</NickNameTitle>
      </NickNameContainer>
      <TodayScheduleContainer>
        <SideTitle>오늘의 일정</SideTitle>
        <TodayScheduleWrapper>
          <TodayScheduleBox>
            <TimeBox>
              <span>10:00</span>
              <span>오전</span>
            </TimeBox>
            <TodayBox>
              <TodayTitle>
                <ColorIcon color={"#bd7a7a"}></ColorIcon>
                <span>4조 조별 모임</span>
              </TodayTitle>
              <TodayLocation>
                <BsGeoAlt size={13} />
                <span>서울 마포구 합정동</span>
              </TodayLocation>
            </TodayBox>
          </TodayScheduleBox>

          <TodayScheduleBox>
            <TimeBox>
              <span>10:00</span>
              <span>오전</span>
            </TimeBox>
            <TodayBox>
              <TodayTitle>
                <ColorIcon color={"#bd7a7a"}></ColorIcon>
                <span>4조 조별 모임</span>
              </TodayTitle>
              <TodayLocation>
                <BsGeoAlt size={13} />
                <span>서울 마포구 합정동</span>
              </TodayLocation>
            </TodayBox>
          </TodayScheduleBox>

          <TodayScheduleBox>
            <TimeBox>
              <span>10:00</span>
              <span>오전</span>
            </TimeBox>
            <TodayBox>
              <TodayTitle>
                <ColorIcon color={"#bd7a7a"}></ColorIcon>
                <span>4조 조별 모임</span>
              </TodayTitle>
              <TodayLocation>
                <BsGeoAlt size={13} />
                <span>서울 마포구 합정동</span>
              </TodayLocation>
            </TodayBox>
          </TodayScheduleBox>

          <TodayScheduleBox>
            <TimeBox>
              <span>10:00</span>
              <span>오전</span>
            </TimeBox>
            <TodayBox>
              <TodayTitle>
                <ColorIcon color={"#bd7a7a"}></ColorIcon>
                <span>4조 조별 모임</span>
              </TodayTitle>
              <TodayLocation>
                <BsGeoAlt size={13} />
                <span>서울 마포구 합정동</span>
              </TodayLocation>
            </TodayBox>
          </TodayScheduleBox>
        </TodayScheduleWrapper>
      </TodayScheduleContainer>

      <FriendsListContainer>
        <SideTitle>친구 목록</SideTitle>
        <FriendsWrapper>
          <FriendsListBox>
            <ListBox>
              <ImgBox>
                <img src=""></img>
              </ImgBox>
              <InfoBox>
                <span>닉네임</span>
                <span>자기소개 한줄</span>
              </InfoBox>
              <button>캘린더</button>
            </ListBox>

            <ListBox>
              <ImgBox>
                <img src=""></img>
              </ImgBox>
              <InfoBox>
                <span>닉네임</span>
                <span>자기소개 한줄</span>
              </InfoBox>
              <button>캘린더</button>
            </ListBox>

            <ListBox>
              <ImgBox>
                <img src=""></img>
              </ImgBox>
              <InfoBox>
                <span>닉네임</span>
                <span>자기소개 한줄</span>
              </InfoBox>
              <button>캘린더</button>
            </ListBox>

            <ListBox>
              <ImgBox>
                <img src=""></img>
              </ImgBox>
              <InfoBox>
                <span>닉네임</span>
                <span>자기소개 한줄</span>
              </InfoBox>
              <button>캘린더</button>
            </ListBox>

            <ListBox>
              <ImgBox>
                <img src=""></img>
              </ImgBox>
              <InfoBox>
                <span>닉네임</span>
                <span>자기소개 한줄</span>
              </InfoBox>
              <button>캘린더</button>
            </ListBox>

            <ListBox>
              <ImgBox>
                <img src=""></img>
              </ImgBox>
              <InfoBox>
                <span>닉네임</span>
                <span>자기소개 한줄</span>
              </InfoBox>
              <button>캘린더</button>
            </ListBox>
          </FriendsListBox>
        </FriendsWrapper>
      </FriendsListContainer>
      {/* <button onClick={friendKakao}>카톡 친구 추가</button> */}
    </>
  );
}

const NickNameContainer = styled.section`
  ${(props) => props.theme.FlexCol};
  margin-bottom: 50px;
`;

const NickNameTitle = styled.section`
  font-size: ${(props) => props.theme.Fs.title};
  width: 100%;
  text-align: left;
`;

const SideTitle = styled(NickNameTitle)`
  margin-bottom: 20px;
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
  gap: 20px;
  height: 250px;
  overflow-y: auto;
`;
const TodayScheduleBox = styled.div`
  ${(props) => props.theme.FlexRow};
  justify-content: start;
  gap: 20px;
  border-radius: 10px;
  &:hover {
    background-color: white;
  }
`;

const TimeBox = styled.div`
  ${(props) => props.theme.FlexCol};
  gap: 8px;
  width: 30%;
  height: 60px;
  span {
    font-size: ${(props) => props.theme.Fs.tag};
  }
  span:nth-child(2) {
    font-size: ${(props) => props.theme.Fs.smallText};
    color: ${(props) => props.theme.Bg.deepColor};
  }
`;
const TodayBox = styled.div`
  ${(props) => props.theme.FlexCol};
  align-items: flex-start;
  gap: 8px;
  height: 60px;
`;
const TodayTitle = styled.div`
  ${(props) => props.theme.FlexRow};
  justify-content: start;
  gap: 10px;
  span {
    font-size: ${(props) => props.theme.Fs.tag};
  }
`;
const TodayLocation = styled(TodayTitle)`
  span {
    font-size: ${(props) => props.theme.Fs.smallText};
    color: ${(props) => props.theme.Bg.deepColor};
  }
`;

const ColorIcon = styled.div`
  background-color: ${(props) => props.color};
  width: 12px;
  height: 12px;
  border-radius: 50%;
`;

const FriendsWrapper = styled(TodayScheduleWrapper)``;
const FriendsListContainer = styled(TodayScheduleContainer)`
  border: none;
`;
const FriendsListBox = styled.div`
  ${(props) => props.theme.FlexCol};
  gap: 15px;
`;
const ListBox = styled(TodayScheduleBox)`
  ${(props) => props.theme.FlexRow};
  gap: 8px;
  height: 60px;
  padding: 0 5px;
  span {
    font-size: ${(props) => props.theme.Fs.tag};
  }
  span:nth-child(2) {
    font-size: ${(props) => props.theme.Fs.smallText};
    color: ${(props) => props.theme.Bg.deepColor};
  }
  button {
    width: 60px;
    height: 60%;
    border: 1px solid ${(props) => props.theme.Bg.borderColor};
    border-radius: 8px;
    background-color: white;
  }
`;

const ImgBox = styled.div`
  background-color: #9b9b4b;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 5px;
`;

const InfoBox = styled.div`
  ${(props) => props.theme.FlexCol};
  align-items: flex-start;
  width: 50%;
  gap: 8px;
`;
