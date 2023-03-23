import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CalendarPostModal from "./CalendarPostModal";
import { BiX } from "react-icons/bi";
import {
  BsTrash3,
  BsPencil,
  BsThreeDotsVertical,
  BsPeople,
  BsGeoAlt,
  BsChatLeftText,
  BsCardImage,
  BsCalendar4Range,
  BsChevronDown,
  BsChevronUp,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { __getPostDetail, __deletePost } from "../../../redux/modules/calendarSlice";
import Loading from "../../../components/Loading";
import { getDay, getYear, getMonth, getDate } from "date-fns";
import ColorFromDB, { DayAmPm, DayCheck } from "./CalendarBasic";
import Cookies from "js-cookie";
import UserInfo from "../../../utils/localStorage/userInfo";
import { useParams } from "react-router-dom";

export default function DetailPostModal({ ...props }) {
  const [friendToggle, setFriendToggle] = useState(false);
  const [imgToggle, setImgToggle] = useState(false);
  const [nowStart, setStart] = useState("");
  const [nowStartDay, setStartDay] = useState("");
  const [nowStartTime, setStartTime] = useState("");
  const [nowEnd, setEnd] = useState("");
  const [nowEndDay, setEndDay] = useState("");
  const [nowEndTime, setEndTime] = useState("");
  const [timeCheck, setTimeCheck] = useState(false);
  const [color, setColor] = useState("");
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
      setColor(color);
    }
  }, [detail]);

  useEffect(() => {
    if (props.detailPostId) {
      dispatch(__getPostDetail({ id: String(props.detailPostId), token }));
      props.setIsDetailPost(true);
    }
  }, [props.detailPostId]);

  // console.log(detail);
  // toggle
  const downDropClick = (data) => {
    data === "friend" ? setFriendToggle(true) : setImgToggle(true);
  };
  const upDropClick = (data) => {
    data === "friend" ? setFriendToggle(false) : setImgToggle(false);
  };

  // 수정하기 모달창 이동
  const modifyPostHandler = (id) => {
    props.setModifyPostId(id);
    closeModal();
    props.setIsAddPost(true);
  };
  // 닫기
  const closeModal = () => {
    props.setIsDetailPost(false);
    props.setDetailPostId("");
    setImgToggle(false);
    setFriendToggle(false);
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

  return (
    <>
      {isLoading && <Loading />}
      <CalendarPostModal isOpen={props.isDetailPost}>
        <DetailPostWrapper>
          <DetailContentWrapper>
            <HeaderWrapper>
              {String(userInfo) === String(param.id) && (
                <>
                  <BsPencil className="pencilIcon" onClick={() => modifyPostHandler(props.detailPostId)} />
                  <BsTrash3 className="trashIcon" onClick={() => deletePostHandler(props.detailPostId)} />
                </>
              )}
              <BsThreeDotsVertical className="dotsIcon" />
              <BiX className="closeIncon" onClick={closeModal} />
            </HeaderWrapper>
            {detail && (
              <DetailContetnContainer>
                <TitleWrapper isColor={color}>
                  <span>{detail?.title}</span>
                  <span>
                    {nowStart}
                    {nowStartDay}
                    {nowStartTime}-{nowEnd}
                    {nowEndDay}
                    {nowEndTime}
                  </span>
                </TitleWrapper>
                <FriendWrapper>
                  <ToggleContainer>
                    <TextBox>
                      <IconBox>
                        <BsPeople />
                      </IconBox>
                      <span>참여자 {detail.participant && detail?.participant.length !== 0 && "총 " + detail.participant.length + "명"}</span>
                    </TextBox>
                    <ToggieIconBox>
                      {detail.participant && detail?.participant.length !== 0 ? (
                        friendToggle ? (
                          <BsChevronUp onClick={() => upDropClick("friend")} />
                        ) : (
                          <BsChevronDown onClick={() => downDropClick("friend")} />
                        )
                      ) : (
                        <></>
                      )}
                    </ToggieIconBox>
                  </ToggleContainer>
                  <DropBox isShow={friendToggle}>
                    <FriendDropBox>
                      {detail.participant &&
                        detail.participant.map((list) => (
                          <div key={list.participentId}>
                            <img src=""></img>
                            <span>{list.participentName}</span>
                          </div>
                        ))}
                    </FriendDropBox>
                  </DropBox>
                </FriendWrapper>
                <LocationWrapper>
                  <LocationContentBox>
                    <IconBox>
                      <BsGeoAlt />
                    </IconBox>
                    <div>{detail?.location}</div>
                  </LocationContentBox>
                  <LocationContentBox>
                    <IconBox>
                      <BsChatLeftText />
                    </IconBox>
                    <div>{detail?.content}</div>
                  </LocationContentBox>
                </LocationWrapper>
                <ImgWrapper>
                  <ToggleContainer>
                    <TextBox>
                      <IconBox>
                        <BsCardImage />
                      </IconBox>
                      <span>총 사진</span>
                    </TextBox>
                    <ToggieIconBox>
                      {detail.image && detail?.image.length !== 0 ? (
                        imgToggle ? (
                          <BsChevronUp onClick={() => upDropClick("img")} />
                        ) : (
                          <BsChevronDown onClick={() => downDropClick("img")} />
                        )
                      ) : (
                        <></>
                      )}
                    </ToggieIconBox>
                  </ToggleContainer>
                  <DropBox isShow={imgToggle}>
                    <ImgDropBox>
                      {detail?.image &&
                        detail.image.map((list, i) => (
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
                      <BsCalendar4Range />
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
          <InviteWrapper>
            <span>동그라미 님이 초대하였습니다.</span>
            <div>
              <button>수락</button>
              <button>거절</button>
            </div>
          </InviteWrapper>
        </DetailPostWrapper>
      </CalendarPostModal>
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
  justify-content: right;
  margin: 20px 0;
  border-bottom: none !important;
  .pencilIcon {
    margin-right: 10px;
    font-size: 18px;
    color: ${(props) => props.theme.Bg.deepColor};
    cursor: pointer;
  }
  .trashIcon {
    /* display: ${(props) => (props.isDelete ? "block" : "none")}; */
    margin-right: 5px;
    font-size: 18px;
    color: ${(props) => props.theme.Bg.deepColor};
    cursor: pointer;
  }
  .closeIncon {
    font-size: 30px;
    color: ${(props) => props.theme.Bg.deepColor};
    cursor: pointer;
  }
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
    border-left: ${(props) => props.isColor && `3px solid ${props.isColor}`};
  }
  span:nth-child(2) {
    font-size: ${(props) => props.theme.Fs.smallText};
    color: ${(props) => props.theme.Bg.deepColor};
    padding-left: 13px;
    border-left: none;
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
  div {
    white-space: nowrap;
  }
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
  }
`;

const DropBox = styled.div`
  ${(props) => props.theme.FlexCol}
  display: ${(props) => (props.isShow ? "block" : "none")};
`;

const FriendDropBox = styled.div`
  width: 100%;
  height: 100px;
  margin-top: 10px;
  padding-left: 50px;
  background-color: lavender;
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
