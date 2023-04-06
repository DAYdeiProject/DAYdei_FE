import Cookies from "js-cookie";
import styled from "styled-components";
import { getDay, format } from "date-fns";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import ModalBox from "../../../elements/ModalBox";
import { GetUserInfo } from "../../../utils/cookie/userInfo";
import useOutsideClick from "../../../hooks/useOutsideClick";
import ColorFromDB, { DayAmPm, DayCheck } from "../../../utils/calendar/CalendarBasic";
import { setNotificationPostId, textState } from "../../../redux/modules/headerReducer";
import { __getPostDetail, __deletePost, __acceptSharePost, __rejectSharePost } from "../../../redux/modules/calendarSlice";
import defaultProfile from "../../../assets/defaultImage/profile.jpg";
import { ReactComponent as Up } from "../../../assets/defaultIcons/up.svg";
import { ReactComponent as Memo } from "../../../assets/calendarIcon/memo.svg";
import { ReactComponent as Edit } from "../../../assets/calendarIcon/edit.svg";
import { ReactComponent as Down } from "../../../assets/defaultIcons/down.svg";
import { ReactComponent as MoreY } from "../../../assets/calendarIcon/moreY.svg";
import { ReactComponent as Delete } from "../../../assets/calendarIcon/delete.svg";
import { ReactComponent as Invite } from "../../../assets/calendarIcon/invite.svg";
import { ReactComponent as ImageIcon } from "../../../assets/calendarIcon/image.svg";
import { ReactComponent as Dismiss } from "../../../assets/defaultIcons/dismiss.svg";
import { ReactComponent as Location } from "../../../assets/calendarIcon/location.svg";
import { ReactComponent as EditCalendar } from "../../../assets/calendarIcon/editCalendar.svg";

export default function DetailPostModal({ ...props }) {
  const [friendToggle, setFriendToggle] = useState(true);
  const [imgToggle, setImgToggle] = useState(true);
  const [nowStart, setStart] = useState("");
  const [nowStartTime, setStartTime] = useState("");
  const [nowEnd, setEnd] = useState("");
  const [nowEndTime, setEndTime] = useState("");
  const [isColor, setIsColor] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  // 알림 클릭시 넘어온 값 저장
  const [notiState, setNotiState] = useState("");
  const [notiContent, setNotiContent] = useState("");
  // 정보있는거에 따른 높이 state
  const [isHeight, setIsHeight] = useState("");
  const outside = useRef();
  const dispatch = useDispatch();
  const token = Cookies.get("accessJWTToken");
  const userInfo = GetUserInfo();
  const param = useParams();

  const { detail } = useSelector((state) => state.calendar);
  const { notiInfo } = useSelector((state) => state.header);
  //console.log("detail postId==========", props.detailPostId);
  //console.log("notiInfo data==========", notiInfo);

  useEffect(() => {
    if (detail) {
      if (detail.startDate) {
        //날짜;
        const newStart = format(new Date(detail?.startDate), "yy.MM.dd");
        const newEnd = format(new Date(detail?.endDate), "yy.MM.dd");
        // 요일
        const startDay = DayCheck(getDay(new Date(detail.startDate)));
        const endDay = DayCheck(getDay(new Date(detail.endDate)));
        //날짜 + 요일;
        const resultStart = `${newStart} (${startDay})`;
        const resultEnd = `${newEnd} (${endDay})`;
        setStart(resultStart);
        setEnd(resultEnd);
      }

      // 시간
      if (detail.startTime !== detail.endTime) {
        let dayStartTime = DayAmPm(detail.startTime);
        let dayEndTime = DayAmPm(detail.endTime);
        setStartTime(dayStartTime);
        setEndTime(dayEndTime);
      }

      if (detail?.participant === [] && detail?.location === "" && detail?.content === "" && detail?.image === []) {
        setIsHeight("250px");
      }

      const color = ColorFromDB(detail.color);
      setIsColor(color);
    }
  }, [detail, props.isSubmit]);

  useEffect(() => {
    if (props.detailPostId) {
      dispatch(__getPostDetail({ id: props.detailPostId }));
      props.setIsDetailPost(true);
    } else if (props.otherCalendarPostId) {
      dispatch(__getPostDetail({ id: props.otherCalendarPostId }));
      props.setIsDetailPost(true);
    } else if (notiInfo) {
      setNotiContent(notiInfo.content);
      setNotiState(notiInfo.notiState);
      dispatch(__getPostDetail({ id: notiInfo.postId })).then((data) => {
        if (data.error) {
          if (data.payload.response.data.statusCode === 404) {
            alert("존재하지 않는 일정입니다.");
          }
        } else {
          props.setIsDetailPost(true);
        }
      });
    }
  }, [props.detailPostId, props.otherCalendarPostId, notiInfo, props.isSubmit]);

  // toggle
  const downDropClick = (data) => {
    data === "friend" ? setFriendToggle(true) : setImgToggle(true);
  };
  const upDropClick = (data) => {
    data === "friend" ? setFriendToggle(false) : setImgToggle(false);
  };

  // 닫기 눌렀을때 state 초기화
  const closeSetting = () => {
    props.setIsDetailPost(false);
    props.setDetailPostId("");
    props.setOtherCalendarPostId("");
    setIsEditOpen(false);
    setFriendToggle(true);
    setImgToggle(true);
    setNotiState("");
    setNotiContent("");
    setStartTime("");
    setEndTime("");
    setIsColor("");
    dispatch(setNotificationPostId(""));
    dispatch(textState("home"));
  };
  // 닫기 클릭시(더보기에서 왔으면 더보기 true로)
  const closeModal = () => {
    if (props.againToday) {
      props.setIsTodaySchedule(true);
    }
    closeSetting();
  };
  // 모달 바깥영역 클릭시
  const outsideClick = () => {
    closeSetting();
    props.setAgainToday(false);
  };

  useOutsideClick(outside, outsideClick);

  // dot아이콘 누르면
  const editOpenClickHandler = () => {
    setIsEditOpen(!isEditOpen);
  };
  // 수정하기 모달창 이동
  const modifyPostHandler = (id) => {
    console.log("수정하기--->", id);
    props.setModifyPostId(id);
    closeModal();
    props.setIsAddPost(true);
  };
  // 삭제
  const deletePostHandler = (id) => {
    dispatch(__deletePost({ id, token })).then(() => {
      alert("일정이 삭제되었습니다.");
      props.setIsDetailPost(false);
      props.setSide(!props.side);
      props.setIsSubmit(!props.isSubmit);
      closeModal();
    });
  };

  // 공유일정 수락
  const acceptClick = () => {
    dispatch(__acceptSharePost({ postId: notiInfo.postId })).then((data) => {
      if (data.payload.statusCode === 400) {
        alert("수락 요청이 실패하였습니다.");
      } else {
        alert("일정을 수락하였습니다.");
        props.setOtherCalendarState(true);
        props.setIsSubmit(!props.isSubmit);
        closeModal();
      }
    });
  };
  // 공유일정 거절
  const rejectClick = () => {
    dispatch(__rejectSharePost({ postId: notiInfo.postId })).then((data) => {
      if (data.payload.statusCode === 400) {
        alert("거절 요청이 실패하였습니다.");
      } else {
        alert("일정을 거절하였습니다.");
        props.setOtherCalendarState(true);
        props.setIsSubmit(!props.isSubmit);
        closeModal();
      }
    });
  };

  return (
    <>
      <ModalBox isOpen={props.isDetailPost} width={"500px"} height={isHeight}>
        <DetailPostWrapper ref={outside}>
          <DetailContentWrapper>
            <HeaderWrapper>
              {String(userInfo.userId) === String(param.id) && detail.postSubscribeCheck === null && String(userInfo.userId) === String(detail.writer.id) && (
                <MoreY className="dotsIcon" onClick={editOpenClickHandler} />
              )}
              <Dismiss className="closeIncon" onClick={closeModal} />
              {isEditOpen && String(userInfo.userId) === String(param.id) && detail.postSubscribeCheck === null && (
                <EditBoxContainer>
                  <EditBox onClick={() => modifyPostHandler(props.detailPostId ? props.detailPostId : notiInfo.postId)}>
                    <Edit className="pencilIcon" />
                    <span>수정하기</span>
                  </EditBox>
                  <EditBox onClick={() => deletePostHandler(props.detailPostId ? props.detailPostId : notiInfo.postId)}>
                    <Delete className="trashIcon" />
                    <span>삭제하기</span>
                  </EditBox>
                </EditBoxContainer>
              )}
            </HeaderWrapper>
            {detail && (
              <DetailContetnContainer>
                <TitleWrapper pickColor={isColor}>
                  <span>{detail?.title}</span>
                  <TitleTimeContainer>
                    <span>{nowStart}</span>
                    {nowStartTime && <span>{nowStartTime}</span>}
                    <span>~</span>
                    <span>{nowEnd}</span>
                    {nowEndTime && <span>{nowEndTime}</span>}
                  </TitleTimeContainer>
                </TitleWrapper>
                <ContentWrapper>
                  {detail.participant && detail?.participant.length !== 0 && (
                    <FriendWrapper>
                      <ToggleContainer>
                        <TextBox>
                          <IconBox>
                            <Invite />
                          </IconBox>
                          <span>참여자 {"총 " + (detail.participant.length + 1) + "명"}</span>
                        </TextBox>
                        <ToggieIconBox>
                          {detail.participant && detail?.participant.length !== 0 ? (
                            friendToggle ? (
                              <Up onClick={() => upDropClick("friend")} />
                            ) : (
                              <Down onClick={() => downDropClick("friend")} />
                            )
                          ) : (
                            <></>
                          )}
                        </ToggieIconBox>
                      </ToggleContainer>
                      <DropBox isShow={friendToggle}>
                        <FriendDropBox>
                          {detail.writer && (
                            <WriterBox>
                              <img src={detail.writer.profileImage ? detail.writer.profileImage : defaultProfile} />
                              <span>{detail.writer.name}</span>
                              <div></div>
                            </WriterBox>
                          )}
                          {detail.participant &&
                            detail.participant.map((list) => (
                              <WriterBox key={list.participentId}>
                                <img src={list.profileImage ? list.profileImage : defaultProfile} />
                                <span>{list.participentName}</span>
                              </WriterBox>
                            ))}
                        </FriendDropBox>
                      </DropBox>
                    </FriendWrapper>
                  )}
                  {(detail.location || detail.content) && (
                    <LocationWrapper>
                      {detail.location && (
                        <LocationContentBox>
                          <IconBox>
                            <Location />
                          </IconBox>
                          <TextArea>{detail?.location}</TextArea>
                        </LocationContentBox>
                      )}
                      {detail.content && (
                        <LocationContentBox>
                          <IconBox>
                            <Memo />
                          </IconBox>
                          <TextArea>{detail?.content}</TextArea>
                        </LocationContentBox>
                      )}
                    </LocationWrapper>
                  )}
                  {detail.image && detail?.image.length !== 0 && (
                    <ImgWrapper>
                      <ToggleContainer>
                        <TextBox>
                          <IconBox>
                            <ImageIcon />
                          </IconBox>
                          <span>총 사진</span>
                        </TextBox>
                        <ToggieIconBox>
                          {imgToggle ? <Up onClick={() => upDropClick("imgBox")} /> : <Down onClick={() => downDropClick("imgBox")} />}
                        </ToggieIconBox>
                      </ToggleContainer>
                      <DropBox isShow={imgToggle}>
                        <ImgDropBox>
                          {detail?.image.map((list, i) => (
                            <ImgFile key={i}>
                              <img src={list} />
                            </ImgFile>
                          ))}
                        </ImgDropBox>
                      </DropBox>
                    </ImgWrapper>
                  )}
                </ContentWrapper>
                <ScopeWidthWrapper>
                  <ScopeWrapper>
                    <ScopeContainer>
                      <IconBox>
                        <EditCalendar />
                      </IconBox>
                      <span>캘린더</span>
                    </ScopeContainer>
                    <ScopeTextBox>
                      <span>
                        {detail?.scope && detail.scope === "ALL"
                          ? "전체공개"
                          : detail.scope === "SUBSCRIBE"
                          ? "전체공개(스크랩허용)"
                          : detail.scope === "FRIEND"
                          ? "친구공개"
                          : "나만보기"}
                      </span>
                    </ScopeTextBox>
                  </ScopeWrapper>
                </ScopeWidthWrapper>
              </DetailContetnContainer>
            )}
          </DetailContentWrapper>
          {detail.writer && detail?.writer.id !== userInfo.userId && (
            <InviteWrapper>
              {notiInfo ? (
                notiState === "requestPost" ? (
                  <>
                    <span>{detail?.writer && detail.writer.name}님이 초대하였습니다.</span>
                    <div>
                      <button onClick={acceptClick}>수락</button>
                      <button onClick={rejectClick}>거절</button>
                    </div>
                  </>
                ) : (
                  notiState === "acceptPost" && (
                    <span>
                      {notiContent.split("@")[0]}
                      {notiContent.split("@")[1]}
                    </span>
                  )
                )
              ) : (
                <span>{detail.writer.name}님의 일정입니다.</span>
              )}
            </InviteWrapper>
          )}
        </DetailPostWrapper>
      </ModalBox>
    </>
  );
}

const DetailPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  section {
    border-top: 1px solid ${(props) => props.theme.Bg.color3};
  }
  section:nth-child(1) {
    border-top: none;
  }
`;

const DetailContentWrapper = styled.div`
  padding: 0px 30px;
`;

const HeaderWrapper = styled.section`
  ${(props) => props.theme.FlexRow}
  gap : 8px;
  justify-content: right;
  margin-top: 25px;
  margin-bottom: 10px;
  border-top: none !important;
  position: relative;
  .dotsIcon,
  .closeIncon {
    cursor: pointer;
  }
`;
const ContentWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  justify-content: space-between;
  min-height: 150px;
  max-height: 500px;
  margin-bottom: 20px;
  padding-right: 10px;
  overflow-y: auto;
`;

const EditBoxContainer = styled.div`
  position: absolute;
  top: 30px;
  right: -90px;
  ${(props) => props.theme.FlexCol};
  gap: 8px;
  width: 140px;
  height: 90px;
  padding: 10px 5px;
  ${(props) => props.theme.BoxCustom};
  background-color: #ffffff;
`;

const EditBox = styled.div`
  ${(props) => props.theme.FlexRow};
  justify-content: left;
  gap: 10px;
  height: 100%;
  padding: 0 10px;
  border-radius: 4px;
  ${(props) => props.theme.BtnClickYellow};
  ${(props) => props.theme.BtnHoverYellow};
  cursor: pointer;
`;
const DetailContetnContainer = styled.div`
  ${(props) => props.theme.FlexCol}
  justify-content: space-between;
  padding: 0 10px;
  padding-bottom: 10px;
`;

const TitleWrapper = styled.section`
  ${(props) => props.theme.FlexCol}
  align-items: flex-start;
  gap: 8px;
  ${(props) => props.theme.ContentTitleText};
  font-size: 24px;
  padding-bottom: 20px;
  margin-bottom: 15px;
  border-top: none !important;
  border-bottom: 1px solid ${(props) => props.theme.Bg.color3};
  span {
    padding-left: 10px;
    border-left: ${(props) => props.pickColor && `4px solid` + props.pickColor};
  }
`;

const TitleTimeContainer = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  padding-left: 10px;
  gap: 5px;
  span {
    font-size: 14px;
    color: ${(props) => props.theme.Bg.color2};
    border-left: none;
    padding: 0;
  }
  div {
    ${(props) => props.theme.FlexRow}
    width: 15px;
  }
`;

const FriendWrapper = styled.section`
  ${(props) => props.theme.FlexCol}
  padding: 20px 0;
`;
const LocationWrapper = styled(FriendWrapper)`
  ${(props) => props.theme.FlexCol}
  align-items: flex-start;
  gap: 30px;
`;

const LocationContentBox = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  align-items: flex-start;
`;
const TextArea = styled.div`
  width: 360px;
  padding: 0 10px;
  white-space: pre-wrap;
`;

const ImgWrapper = styled(FriendWrapper)`
  ${(props) => props.theme.FlexCol}
`;

const ScopeWidthWrapper = styled.div`
  width: 100%;
`;
const ScopeWrapper = styled.div`
  ${(props) => props.theme.FlexRowBetween}
  padding: 20px 0;
  border-top: 1px solid ${(props) => props.theme.Bg.color3};
`;
const ScopeContainer = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
`;

const IconBox = styled.div`
  ${(props) => props.theme.FlexCol}
  width: 50px;
`;

const ToggleContainer = styled.div`
  ${(props) => props.theme.FlexRowBetween}
`;

const TextBox = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
`;
const ToggieIconBox = styled.div``;

// 초대일정 알림 클릭시
const InviteWrapper = styled.div`
  background-color: #f2f4f6;
  ${(props) => props.theme.FlexRowBetween}
  height: 50px;
  padding: 0 40px;
  border-radius: 0 0 20px 20px;
  button {
    border: none;
    background-color: transparent;
    font-size: ${(props) => props.theme.Fs.size14};
    cursor: pointer;
  }
  button:nth-child(1) {
    color: ${(props) => props.theme.Bg.mainColor5};
  }
  button:nth-child(2) {
    color: #df5445;
  }
`;

const DropBox = styled.div`
  ${(props) => props.theme.FlexCol}
  display: ${(props) => (props.isShow ? "block" : "none")};
`;

const FriendDropBox = styled.div`
  width: 100%;
  margin-top: 10px;
  padding-left: 50px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const WriterBox = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  gap: 10px;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  span {
    font-size: ${(props) => props.theme.Fs.size14};
  }
  div {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.Bg.mainColor5};
  }
`;

const ImgDropBox = styled.div`
  width: 100%;
  margin: 10px 0;
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 5px;
`;

const ImgFile = styled.div`
  img {
    width: 100%;
    height: 100%;
  }
`;

const ScopeTextBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
`;
