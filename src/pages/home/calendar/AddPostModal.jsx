import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import CalendarPostModal from "./CalendarPostModal";
import { BiX } from "react-icons/bi";
import { BsClock, BsCalendar4Range, BsPeople, BsGeoAlt, BsChatLeftText, BsSearch, BsChevronDown, BsChevronUp, BsCardImage } from "react-icons/bs";
import { SlLock } from "react-icons/sl";

function AddPostModal({ isOpen, closeModal }) {
  const time = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "24:00",
  ];
  // 빨주노초파남보
  const colorList = ["#94dd8e", "#EC899F", "#eb8e54", "#FCE0A4", "#4c7ea0", "#9747FF", "#95DFFF"];
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  const [isAllDay, setIsAllDay] = useState(getValues("allDay"));
  const [color, setColor] = useState();

  const colorClick = (e) => {
    setColor(e.target.__reactProps$gav3a6frh24.value);
  };
  const isAllDayChange = () => {
    setIsAllDay(!isAllDay);
  };

  // 저장 버튼 눌렀을때
  const addPost = (data) => {
    // const subColor = color.;
    // console.log(subColor);
    const newPost = {
      title: data.title,
      startDate: data.startDate,
      endDate: data.endDate,
      startTime: data.startTime,
      endTime: data.endTime,
      content: data.content,
      image: "",
      location: data.location,
      participant: [],
      scope: data.scope,
      color: color,
    };
    console.log("data", data);
  };

  return (
    <CalendarPostModal isOpen={isOpen} isCancle={"취소"} closeModal={closeModal}>
      <AddPostWrapper onSubmit={handleSubmit(addPost)}>
        <HeaderWrapper>
          <BiX className="closeIncon" />
        </HeaderWrapper>

        <BodyWrapper>
          <TitleWrapper>
            <input {...register("title")} placeholder="일정 제목 추가" />
          </TitleWrapper>

          <DaysCheckWrapper>
            <DaysIconBox>
              <BsClock className="daysIcon" />
            </DaysIconBox>
            <DaysCheckContainer>
              <StartDateContainer>
                <span>시작</span>
                <input type="date" {...register("startDate")}></input>
                <select {...register("startTime")} disabled={isAllDay}>
                  {time.map((item, i) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </StartDateContainer>

              <div>
                <span>종료</span>
                <input type="date" {...register("endDate")} />
                <select {...register("endTime")} disabled={isAllDay}>
                  {time.map((item, i) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </DaysCheckContainer>

            <DaysAllCheckContainer>
              <input type="checkbox" {...register("allDay")} onChange={isAllDayChange}></input>
              <span>종일</span>
            </DaysAllCheckContainer>
          </DaysCheckWrapper>

          <ColorBoxWrapper>
            <BsCalendar4Range className="colorIcon" />
            <TextSpan>
              <span>달력</span>
            </TextSpan>
            <ColorBoxContainer>
              {colorList.map((item, i) => (
                <ColorBox key={i} value={item} {...register("color")} onClick={colorClick} />
              ))}
            </ColorBoxContainer>
          </ColorBoxWrapper>

          <InviteWrapper>
            <BsPeople className="inviteIcon" />
            <TextSpan>
              <span>초대</span>
            </TextSpan>
            <InviteSearchContainer>
              <InviteSearchBox>
                <BsSearch className="searchIcon" />
                <FriendBox>
                  <span>닉네임</span>
                  <BiX className="friendX" />
                </FriendBox>
                <input type="text" {...register("participant")} placeholder="닉네임, 이메일로 태그하여 친구 초대" />
              </InviteSearchBox>
              <SerchModalContainer isShow={false}></SerchModalContainer>
            </InviteSearchContainer>
          </InviteWrapper>

          <LocationWrapper>
            <BsGeoAlt className="locationIcon" />
            <TextSpan>
              <span>장소</span>
            </TextSpan>
            <ToggleContainer>
              <BsChevronDown className="showToggle" />
            </ToggleContainer>
            <WriteLocationBox isShow={false}>
              <input type="text" {...register("location")} />
            </WriteLocationBox>
          </LocationWrapper>

          <ContentWrapper>
            <BsChatLeftText className="contentIcon" />
            <TextSpan>
              <span>상세</span>
            </TextSpan>
            <ToggleContainer>
              <BsChevronDown className="showToggle" />
            </ToggleContainer>
            <WriteContentBox isShow={false}>
              <textarea {...register("content")} />
            </WriteContentBox>
          </ContentWrapper>

          <ScopeWrapper>
            <SlLock className="scopeIcon" />
            <TextSpan>
              <span>공개</span>
            </TextSpan>
            <SelectContainer>
              <select {...register("scope")}>
                <option value="ALL">전체공개</option>
                <option value="SUBSCRIBE">전체공개(스크랩허용)</option>
                <option value="FRIEND">친구공개</option>
                <option value="ME">나만보기</option>
              </select>
            </SelectContainer>
          </ScopeWrapper>
        </BodyWrapper>

        <SubmitButtonWrapper>
          <button>저장</button>
        </SubmitButtonWrapper>
      </AddPostWrapper>
    </CalendarPostModal>
  );
}

export default AddPostModal;

const AddPostWrapper = styled.form`
  span {
    font-size: ${(props) => props.theme.Fs.day};
    margin: 0 10px;
    text-align: center;
  }
`;

const HeaderWrapper = styled.section`
  ${(props) => props.theme.FlexRow}
  justify-content: right;
  margin-top: 20px;
  .closeIncon {
    font-size: 30px;
    color: ${(props) => props.theme.Bg.deepColor};
  }
`;

const BodyWrapper = styled.section`
  ${(props) => props.theme.FlexCol}
  align-items: flex-start;
  gap: 25px;
`;

// 타이틀 text
const TextSpan = styled.div`
  ${(props) => props.theme.FlexRow}
  width: 70px;
`;

// 제목쓰기 영역
const TitleWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  border-bottom: 1px solid ${(props) => props.theme.Bg.borderColor};
  input {
    width: 100%;
    height: 50px;
    font-size: ${(props) => props.theme.Fs.title};
  }
`;
// 날짜 체크 영역
const DaysCheckWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  height: 50px;
`;
const DaysIconBox = styled.div`
  height: 100%;
  display: flex;
  flex: 0;
  padding-top: 2px;
  .daysIcon {
    font-size: 16px;
    color: ${(props) => props.theme.Bg.deepColor};
  }
`;
const DaysCheckContainer = styled.div`
  flex: 10;
`;
const DaysAllCheckContainer = styled(DaysIconBox)`
  align-items: flex-start;
  flex: 2;
  span {
    margin: 0;
  }
`;
const StartDateContainer = styled.div`
  margin-bottom: 8px;
`;

// 색깔 선택 영역
const ColorBoxWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  .colorIcon {
    font-size: 18px;
    color: ${(props) => props.theme.Bg.deepColor};
  }
`;
const ColorBoxContainer = styled(ColorBoxWrapper)`
  justify-content: left;
`;
const ColorBox = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.value};
  border-radius: 50%;
  margin-right: 20px;
`;

// 초대하기 영역
const InviteWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  .inviteIcon {
    font-size: 18px;
    color: ${(props) => props.theme.Bg.deepColor};
  }
`;

const InviteSearchContainer = styled(InviteWrapper)`
  justify-content: left;
`;

const InviteSearchBox = styled(InviteSearchContainer)`
  height: 33px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.Bg.borderColor};
  border-radius: 8px;
  .searchIcon {
    font-size: 16px;
    color: ${(props) => props.theme.Bg.deepColor};
    margin-right: 5px;
  }
  input {
    width: 100%;
    font-size: 12px;
  }
`;

const FriendBox = styled.div`
  ${(props) => props.theme.FlexRow}
  width: 100px;
  height: 22px;
  padding: 0 5px;
  margin: 0 5px;
  border-radius: 20px;
  background-color: lightblue;
  span {
    margin: 0;
    margin-right: 5px;
    font-size: 11px;
  }
  .friendX {
    cursor: pointer;
  }
`;
const SerchModalContainer = styled.div`
  display: ${(props) => (props.isShow ? "block" : "none")};
  background-color: beige;
  width: 30px;
  height: 30px;
`;

// 장소 영역
const LocationWrapper = styled(InviteWrapper)`
  justify-content: left;
  padding-bottom: 20px;
  border-bottom: 1px solid ${(props) => props.theme.Bg.borderColor};
  .locationIcon {
    font-size: 18px;
    color: ${(props) => props.theme.Bg.deepColor};
  }
`;
const ToggleContainer = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
`;
const WriteLocationBox = styled.div`
  display: ${(props) => (props.isShow ? "block" : "none")};
  input {
    width: 100%;
    height: 33px;
    padding: 10px;
    font-size: 12px;
    border: 1px solid ${(props) => props.theme.Bg.borderColor};
    border-radius: 8px;
  }
`;

// 메모 영역
const ContentWrapper = styled(LocationWrapper)`
  .contentIcon {
    font-size: 16px;
    color: ${(props) => props.theme.Bg.deepColor};
  }
`;

const WriteContentBox = styled(WriteLocationBox)``;

// 공개범위 영역
const ScopeWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  margin-bottom: 50px;
  .scopeIcon {
    font-size: 16px;
    color: ${(props) => props.theme.Bg.deepColor};
  }
`;

const SelectContainer = styled(ScopeWrapper)`
  margin: 0;
  select {
    width: 90px;
    height: 21px;
    border: none;
    font-size: ${(props) => props.theme.Fs.smallText};
  }
`;

const SubmitButtonWrapper = styled.div`
  padding: 0 5px;
  button {
    width: 100%;
    height: 50px;
    border: none;
    border-radius: 5px;
    color: white;
    background-color: ${(props) => props.theme.Bg.deepColor};
  }
`;
