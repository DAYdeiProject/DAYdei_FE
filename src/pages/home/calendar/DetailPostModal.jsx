import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { __getPostDetail, __deletePost, __acceptSharePost, __rejectSharePost } from "../../../redux/modules/calendarSlice";
import Loading from "../../../components/Loading";
import { getDay, getYear, getMonth, getDate } from "date-fns";
import ColorFromDB, { DayAmPm, DayCheck } from "./CalendarBasic";
import Cookies from "js-cookie";
import UserInfo from "../../../utils/localStorage/userInfo";
import { useParams } from "react-router-dom";
import { ReactComponent as EditCalendar } from "../../../assets/lcon/calendarIcon/editCalendar.svg";
import { ReactComponent as Invite } from "../../../assets/lcon/calendarIcon/invite.svg";
import { ReactComponent as Location } from "../../../assets/lcon/calendarIcon/location.svg";
import { ReactComponent as Memo } from "../../../assets/lcon/calendarIcon/memo.svg";
import { ReactComponent as ImageIcon } from "../../../assets/lcon/calendarIcon/image.svg";
import { ReactComponent as Delete } from "../../../assets/lcon/calendarIcon/delete.svg";
import { ReactComponent as Edit } from "../../../assets/lcon/calendarIcon/edit.svg";
import { ReactComponent as MoreY } from "../../../assets/lcon/calendarIcon/moreY.svg";
import { ReactComponent as Up } from "../../../assets/lcon/up.svg";
import { ReactComponent as Down } from "../../../assets/lcon/down.svg";
import { ReactComponent as Dismiss } from "../../../assets/lcon/dismiss.svg";
import ModalBox from "../../../elements/ModalBox";

export default function DetailPostModal({ ...props }) {
  const [friendToggle, setFriendToggle] = useState(false);
  const [imgToggle, setImgToggle] = useState(false);
  const [nowStart, setStart] = useState("");
  const [nowStartDay, setStartDay] = useState("");
  const [nowStartTime, setStartTime] = useState("");
  const [nowEnd, setEnd] = useState("");
  const [nowEndDay, setEndDay] = useState("");
  const [nowEndTime, setEndTime] = useState("");
  const [isColor, setIsColor] = useState("");
  const [tagResult, setTagResult] = useState("");
  const [tagComment, setTagComment] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const dispatch = useDispatch();
  const token = Cookies.get("accessJWTToken");
  const userInfo = UserInfo();
  const param = useParams();

  const { detail, isLoading } = useSelector((state) => state.calendar);

  useEffect(() => {
    if (detail) {
      const year = getYear(new Date(detail.startDate));
      const month = getMonth(new Date(detail.startDate));
      const date = getDate(new Date(detail.startDate));
      const yearEnd = getYear(new Date(detail.endDate));
      const monthEnd = getMonth(new Date(detail.endDate));
      const dateEnd = getDate(new Date(detail.endDate));
      setStart(`${year}.${month + 1}.${date}`);
      setEnd(`${yearEnd}.${monthEnd + 1}.${dateEnd}`);

      if (detail.startTime !== detail.endTime) {
        let dayStartTime = DayAmPm(detail.startTime);
        let dayEndTime = DayAmPm(detail.endTime);
        setStartTime(dayStartTime);
        setEndTime(dayEndTime);
      }

      const start = getDay(new Date(detail.startDate));
      const end = getDay(new Date(detail.endDate));
      const startDay = DayCheck(start);
      const endDay = DayCheck(end);
      setStartDay(startDay);
      setEndDay(endDay);
      const color = ColorFromDB(detail.color);
      setIsColor(color);
    }
  }, [detail]);

  useEffect(() => {
    if (props.detailPostId) {
      dispatch(__getPostDetail({ id: props.detailPostId, token }));
      props.setIsDetailPost(true);
    } else if (props.otherCalendarPostId) {
      dispatch(__getPostDetail({ id: props.otherCalendarPostId, token }));
      props.setIsDetailPost(true);
    } else if (props.notificationPostId) {
      setTagComment(props.notificationPostId.comment);
      setTagResult(props.notificationPostId.result);
      dispatch(__getPostDetail({ id: props.notificationPostId.returnId, token }));
      props.setIsDetailPost(true);
    }
  }, [props.detailPostId, props.otherCalendarPostId, props.notificationPostId]);

  // toggle
  const downDropClick = (data) => {
    data === "friend" ? setFriendToggle(true) : setImgToggle(true);
  };
  const upDropClick = (data) => {
    data === "friend" ? setFriendToggle(false) : setImgToggle(false);
  };

  // 닫기
  const closeModal = () => {
    props.setIsDetailPost(false);
    props.setDetailPostId("");
    props.setNotificationPostId("");
    props.setOtherCalendarPostId("");
    setImgToggle(false);
    setFriendToggle(false);
    setTagComment("");
    setTagResult("");
    setIsEditOpen(false);
  };
  // dot아이콘 누르면
  const editOpenClickHandler = () => {
    setIsEditOpen(!isEditOpen);
  };
  // 수정하기 모달창 이동
  const modifyPostHandler = (id) => {
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
    });
  };

  // 공유일정 수락
  const acceptClick = () => {
    dispatch(__acceptSharePost({ postId: props.notificationPostId.returnId, token })).then((data) => {
      if (data.payload.statusCode === 200) {
        alert("일정을 수락하였습니다.");
        props.setOtherCalendarState(true);
        props.setIsSubmit(!props.isSubmit);
        closeModal();
      } else {
        alert("이미 처리한 요청입니다.");
      }
    });
  };
  // 공유일정 거절
  const rejectClick = () => {
    dispatch(__rejectSharePost({ postId: props.notificationPostId.returnId, token })).then((data) => {
      if (data.payload.statusCode === 200) {
        alert("일정을 거절하였습니다.");
        props.setOtherCalendarState(true);
        props.setIsSubmit(!props.isSubmit);
        closeModal();
      } else {
        alert("이미 처리한 요청입니다.");
      }
    });
  };

  console.log("isEditOpen", isEditOpen);
  return (
    <>
      {isLoading && <Loading />}
      <ModalBox isOpen={props.isDetailPost} width={"500px"} height={"580px"}>
        <DetailPostWrapper>
          <DetailContentWrapper>
            <HeaderWrapper>
              {String(userInfo.userId) === String(param.id) && detail.postSubscribeCheck === null && (
                <MoreY className="dotsIcon" onClick={editOpenClickHandler} />
              )}
              <Dismiss className="closeIncon" onClick={closeModal} />
              {isEditOpen && String(userInfo.userId) === String(param.id) && detail.postSubscribeCheck === null && (
                <EditBoxContainer>
                  <EditBox onClick={() => modifyPostHandler(props.detailPostId)}>
                    <Edit className="pencilIcon" />
                    <span>수정하기</span>
                  </EditBox>
                  <EditBox onClick={() => deletePostHandler(props.detailPostId)}>
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
                    <span>({nowStartDay})</span>
                    <span>{nowStartTime}</span>
                    <span>-</span>
                    <span>{nowEnd}</span>
                    <span>({nowEndDay})</span>
                    <span>{nowEndTime}</span>
                  </TitleTimeContainer>
                </TitleWrapper>
                <FriendWrapper>
                  <ToggleContainer>
                    <TextBox>
                      <IconBox>
                        <Invite />
                      </IconBox>
                      <span>참여자 {detail.participant && detail?.participant.length !== 0 && "총 " + (detail.participant.length + 1) + "명"}</span>
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
                          <img src={detail.writer.profileImage} />
                          <span>{detail.writer.name}</span>
                          <div></div>
                        </WriterBox>
                      )}
                      {detail.participant &&
                        detail.participant.map((list) => (
                          <WriterBox key={list.participentId}>
                            <img src={list.profileImage} />
                            <span>{list.participentName}</span>
                          </WriterBox>
                        ))}
                    </FriendDropBox>
                  </DropBox>
                </FriendWrapper>
                <LocationWrapper>
                  <LocationContentBox>
                    <IconBox>
                      <Location />
                    </IconBox>
                    <TextArea>{detail?.location}</TextArea>
                  </LocationContentBox>
                  <LocationContentBox>
                    <IconBox>
                      <Memo />
                    </IconBox>
                    <TextArea>{detail?.content}</TextArea>
                  </LocationContentBox>
                </LocationWrapper>
                <ImgWrapper>
                  <ToggleContainer>
                    <TextBox>
                      <IconBox>
                        <ImageIcon />
                      </IconBox>
                      <span>총 사진</span>
                    </TextBox>
                    <ToggieIconBox>
                      {detail.image &&
                        detail?.image.length !== 0 &&
                        (imgToggle ? <Up onClick={() => upDropClick("imgBox")} /> : <Down onClick={() => downDropClick("imgBox")} />)}
                    </ToggieIconBox>
                  </ToggleContainer>
                  <DropBox isShow={imgToggle}>
                    <ImgDropBox>
                      {detail.image &&
                        detail?.image.map((list, i) => (
                          <ImgFile key={i}>
                            <img src={list} />
                          </ImgFile>
                        ))}
                    </ImgDropBox>
                  </DropBox>
                </ImgWrapper>
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
              </DetailContetnContainer>
            )}
          </DetailContentWrapper>
          {tagResult && (
            <InviteWrapper>
              {tagResult === "requestPost" ? (
                <>
                  <span>{detail?.writer && detail.writer.name} 님이 초대하였습니다.</span>
                  <div>
                    <button onClick={acceptClick}>수락</button>
                    <button onClick={rejectClick}>거절</button>
                  </div>
                </>
              ) : (
                tagResult === "acceptPost" && (
                  <span>
                    {tagComment.split("@")[0]}
                    {tagComment.split("@")[1]}
                  </span>
                )
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
  height: 670px;
  section {
    border-bottom: 1px solid ${(props) => props.theme.Bg.middleColor};
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
  border-bottom: none !important;
  position: relative;
  .dotsIcon {
    cursor: pointer;
  }

  .closeIncon {
    font-size: 30px;
    color: ${(props) => props.theme.Bg.deepColor};
    cursor: pointer;
  }
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
  height: 550px;
  padding: 0 10px;
  padding-bottom: 20px;
  overflow-y: auto;
`;

const TitleWrapper = styled.section`
  ${(props) => props.theme.FlexCol}
  align-items: flex-start;
  gap: 8px;
  font-size: ${(props) => props.theme.Fs.title};
  padding-bottom: 25px;
  span {
    padding-left: 10px;
    border-left: ${(props) => props.pickColor && `3px solid` + props.pickColor};
  }
`;

const TitleTimeContainer = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  padding-left: 10px;
  gap: 5px;
  span {
    font-size: ${(props) => props.theme.Fs.smallText};
    color: ${(props) => props.theme.Bg.deepColor};
    border-left: none;
    padding: 0;
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
const ScopeWrapper = styled(FriendWrapper)`
  ${(props) => props.theme.FlexRowBetween}
  border-bottom: none !important;
`;
const ScopeContainer = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
`;

const IconBox = styled.div`
  ${(props) => props.theme.FlexCol}
  width: 50px;
  color: ${(props) => props.theme.Bg.deepColor};
`;

const ToggleContainer = styled.div`
  ${(props) => props.theme.FlexRowBetween}
`;

const TextBox = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
`;
const ToggieIconBox = styled.div``;

const InviteWrapper = styled.div`
  background-color: ${(props) => props.theme.Bg.lightColor};
  ${(props) => props.theme.FlexRowBetween}
  height: 50px;
  padding: 0 40px;
  border-radius: 0 0 20px 20px;
  button {
    border: none;
    background-color: transparent;
    font-size: ${(props) => props.theme.Fs.smallText};
    color: ${(props) => props.theme.Bg.deepColor};
    cursor: pointer;
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
  gap: 5px;
`;

const WriterBox = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  padding: 10px;
  gap: 10px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  span {
    font-size: ${(props) => props.theme.Fs.smallText};
  }
  div {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: coral;
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
  background-color: lemonchiffon;
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
