import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { ReactComponent as Search } from "../../../assets/searchList/search.svg";
import { BiX } from "react-icons/bi";
import { useCallback } from "react";
import { debounce } from "lodash";
import { useEffect } from "react";
import format from "date-fns/format";
import { useRef } from "react";
import { ReactComponent as Invite } from "../../../assets/calendarIcon/invite.svg";
import { useDispatch } from "react-redux";
import { __getTargetList } from "../../../redux/modules/calendarSlice";
import defaultProfile from "../../../assets/defaultImage/profile.jpg";
import { TextSpan } from "./PostColor";

export default function PostInvite({ ...props }) {
  const [inputValue, setInputValue] = useState("");
  const [targetList, setTargetList] = useState([]);
  const [targetToggle, setTargetToggle] = useState(false);
  const [targetPick, setTargetPick] = useState([]);

  const outside = useRef();
  const dispatch = useDispatch();

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  // dispatch
  const friendListHandler = (text) => {
    if (text === "") {
      setTargetToggle(false);
    } else if (text !== "") {
      // @ 붙여서 검색할때
      let newWord = "";
      if (text.substr(0, 1) === "@" && text.length > 1) {
        newWord = text.substr(1);
      } else {
        newWord = text;
      }
      const newStart = format(props.startDate, "yyyy-MM-dd");
      const newEnd = format(props.endDate, "yyyy-MM-dd");
      let newStartTime = "";
      let newEndTime = "";

      if (props.isAllDay) {
        newStartTime = "00:00";
        newEndTime = "00:00";
      } else {
        newStartTime = props.startTime;
        newEndTime = props.endTime;
      }

      const targetData = {
        searchWord: newWord,
        startDate: newStart,
        endDate: newEnd,
        startTime: newStartTime,
        endTime: newEndTime,
      };
      dispatch(__getTargetList(targetData)).then((data) => {
        setTargetList(data.payload);
        setTargetToggle(true);
      });
    }
  };

  const debounceHandler = useCallback(
    debounce((text) => friendListHandler(text), 500),
    []
  );

  // input 값 가져오기
  useEffect(() => {
    debounceHandler(inputValue);
  }, [inputValue]);

  // 해당 친구 클릭
  const targetClick = (data) => {
    if (!targetPick.some((list) => list.id === data.id)) {
      setTargetPick([...targetPick, data]);
    }
    setTargetToggle(false);
    // input 초기화
    setInputValue("");
  };

  // 클릭한 친구 삭제
  const deleteTarget = (id) => {
    const deletePick = targetPick.filter((list) => list.id !== id);

    // 픽한 리스트에 담기
    setTargetPick([...deletePick]);
  };

  // 엔터키 막기
  const enterKyeHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (props.postDetail.length !== 0) {
      if (props.postDetail.participant.length !== 0) {
        props.setTargetPick(props.postDetail.participant);

        props.postDetail.participant.map((user) => {
          const newUser = {
            id: user.participentId,
            nickName: user.participentName,
          };
          setTargetPick((pre) => [...pre, newUser]);
        });
      }
    }
  }, [props.postDetail]);

  // 초대 리스트 토글 닫기
  useEffect(() => {
    const outsideClick = (e) => {
      if (!outside.current || !outside.current.contains(e.target)) {
        setTargetToggle(false);
      }
    };
    document.addEventListener("mousedown", outsideClick);
  }, [targetToggle]);

  useEffect(() => {
    props.setTargetPick(targetPick);
  }, [targetPick]);

  return (
    <>
      <InviteWrapper onKeyDown={enterKyeHandler}>
        <Invite />
        <TextSpan>
          <span>초대</span>
        </TextSpan>
        <InviteSearchContainer>
          <InviteSearchBox>
            <InviteIconBox>
              <Search className="searchIcon" />
            </InviteIconBox>
            <FriendPickBox>
              {targetPick?.map((pick) => (
                <FriendBox key={pick.id}>
                  <FriendBoxText>{pick.nickName}</FriendBoxText>
                  <BiX className="friendX" onClick={() => deleteTarget(pick.id)} />
                </FriendBox>
              ))}
            </FriendPickBox>
            <FriendBoxInput>
              <input type="text" value={inputValue} onChange={inputChangeHandler} placeholder="친구 닉네임, 이메일 검색" autoComplete="off" />
            </FriendBoxInput>
          </InviteSearchBox>
          <SerchModalContainer isShow={targetToggle} ref={outside}>
            <SerchModalBox>
              {targetList.length === 0 ? (
                <NoneTargetBox>해당되는 친구가 없습니다.</NoneTargetBox>
              ) : (
                targetList?.map((list) => {
                  return (
                    <TartgetBox
                      key={list.id}
                      value={list.id}
                      onClick={() => targetClick({ id: list.id, nickName: list.nickName, isCheck: list.scheduleCheck })}>
                      <TargetBoxImg>
                        <img src={list.profileImage ? list.profileImage : defaultProfile} alt="profile" />
                      </TargetBoxImg>
                      <TargetBoxText>
                        <span>{list.nickName}</span>
                        <TargetBoxCheck isScheduleCheck={list.scheduleCheck}>
                          <div></div>
                          <span>{list.scheduleCheck ? "일정 있음" : "일정 없음"}</span>
                        </TargetBoxCheck>
                      </TargetBoxText>
                    </TartgetBox>
                  );
                })
              )}
            </SerchModalBox>
          </SerchModalContainer>
        </InviteSearchContainer>
      </InviteWrapper>
    </>
  );
}

const InviteWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
`;

const InviteSearchContainer = styled(InviteWrapper)`
  justify-content: left;
  position: relative;
`;

const InviteSearchBox = styled(InviteSearchContainer)`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  min-width: 330px;
  max-width: 330px;
  height: 40px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.Bg.color3};
  border-radius: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  &::-webkit-scrollbar {
    height: 5px;
  }
  .searchIcon {
    margin-right: 5px;
  }
`;

const InviteIconBox = styled.div`
  ${(props) => props.theme.FlexCol}
  width: 15px;
`;
const FriendPickBox = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  width: auto;
`;
// 타겟 클릭시 이름 리스트
const FriendBox = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: space-between;
  min-width: 80px;
  height: 25px;
  padding: 0 8px;
  margin: 0 5px;
  border-radius: 4px;
  gap: 5px;
  background-color: ${(props) => props.theme.Bg.mainColor4};
  .friendX {
    cursor: pointer;
    min-width: 15px;
  }
`;

const FriendBoxText = styled.div`
  margin: 0;
  min-width: 60px;
  text-align: left;
  font-size: 12px;
`;

const FriendBoxInput = styled.div`
  ${(props) => props.theme.FlexRow}
  width: 100%;
  min-width: 200px;

  input {
    font-size: 12px;
    width: 100%;
  }
`;
const SerchModalContainer = styled.div`
  position: absolute;
  top: 45px;
  ${(props) => props.theme.FlexCol}
  justify-content: flex-start;
  gap: 10px;
  min-width: 330px;
  max-width: 330px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.Bg.color3};
  border-radius: 10px;
  background-color: white;
  display: ${(props) => (props.isShow ? "block" : "none")};
  z-index: 100;
`;
const SerchModalBox = styled.div`
  width: 100%;
  height: 210px;
  padding-right: 5px;
  overflow-y: auto;
`;
const NoneTargetBox = styled.div`
  padding: 10px;
`;

const TartgetBox = styled.div`
  ${(props) => props.theme.FlexRow}
  padding: 5px 10px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.Bg.hoverColor};
  }
`;
const TargetBoxImg = styled.div`
  width: 50px;
  height: 45px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid ${(props) => props.theme.Bg.color2};
  }
`;

const TargetBoxText = styled.div`
  ${(props) => props.theme.FlexCol}
  align-items: flex-start;
  gap: 5px;
  span {
    font-size: ${(props) => props.theme.Fs.size14};
  }
`;

const TargetBoxCheck = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  gap: 3px;
  padding-left: 10px;
  div {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${(props) => (props.isScheduleCheck ? props.theme.Bg.redColor : props.theme.Bg.greenColor)};
  }
  span {
    font-size: 12px;
    margin: 0;
  }
`;
