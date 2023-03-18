import React, { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import CalendarPostModal from "./CalendarPostModal";
import { BiX } from "react-icons/bi";
import { BsClock, BsCalendar4Range, BsPeople, BsGeoAlt, BsChatLeftText, BsSearch, BsChevronDown, BsChevronUp, BsCardImage } from "react-icons/bs";
import { SlLock } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { __createNewPost, __getTargetList } from "../../../redux/modules/calendarSlice";
import Cookies from "js-cookie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

function AddPostModal({ isAddPost, setIsAddPost }) {
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
  const colorList = ["#EC899F", "#EB8E54", "#FCE0A4", "#94DD8E", "#95DFFF", "#4C7EA0", "#9747FF"];
  const {
    register,
    handleSubmit,
    getValues,
    resetField,
    watch,
    formState: { errors },
  } = useForm();

  const [isAllDay, setIsAllDay] = useState(getValues("allDay"));
  const [color, setColor] = useState("RED");
  const [isColor, setIsColor] = useState("#EC899F");
  const [isShowLocation, setIsShowLocation] = useState(false);
  const [isShowContent, setIsShowContent] = useState(false);
  const [findTarget, setFindTarget] = useState("");
  const [targetList, setTargetList] = useState([]);
  const [targetToggle, setTargetToggle] = useState(false);
  const [targetPick, setTargetPick] = useState([]);
  // db에 보내줄 친구 리스트
  const [targetPickId, setTargetPickId] = useState([]);
  // db에 보내줄 파일 리스트
  const [fileList, setFileList] = useState([]);
  // 이름 뿌려줄 리스트
  const [fileName, setFileName] = useState([]);
  const dispatch = useDispatch();
  const token = Cookies.get("accessJWTToken");

  // 친구 검색어 입력시 debounce 처리
  // custom debounce
  const debounce = (callback, delay) => {
    let timerId = null;
    return (...args) => {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };
  const handleSearchText = useCallback(
    debounce((text) => setFindTarget(text), 300),
    []
  );
  // useForm watch 이용해서 input 값 가져오기
  useEffect(() => {
    handleSearchText(watch("participant"));
  }, [watch("participant")]);

  useEffect(() => {
    // findTarget 에 값이 있다면 입력을 멈춘것
    if (findTarget === "") {
      setTargetToggle(false);
    } else if (findTarget) {
      const targetData = {
        target: findTarget,
        token,
      };
      dispatch(__getTargetList(targetData)).then((data) => {
        setTargetList(data.payload);
        setTargetToggle(true);
      });
    }
  }, [findTarget]);

  // 해당 친구 클릭
  const targetClick = (data) => {
    if (!targetPick.some((list) => list.id === data.id)) {
      setTargetPick([...targetPick, data]);
      setTargetPickId([...targetPickId, data.id]);
    }
    setTargetToggle(false);
    // useForm 특정필드 초기화
    resetField("participant");
  };

  // 클릭한 친구 삭제
  const deleteTarget = (id) => {
    const deletdPick = targetPick.filter((list) => list.id !== id);
    const deletdPickId = targetPick.filter((list) => list.id !== id).map((list) => list.id);

    // 픽한 리스트에 담기
    setTargetPick([...deletdPick]);
    setTargetPickId([...deletdPickId]);
  };

  // 클릭한 이미지 파일 삭제
  const deleteImgFile = (index) => {
    // fileName ,fileList 값 삭제
    const newName = fileName.filter((item, i) => i !== index);
    const newList = fileList.filter((item, i) => i !== index);

    setFileName([...newName]);
    setFileList([...newList]);
  };

  const colorClick = (data) => {
    setIsColor(data);
    switch (data) {
      case "#EC899F":
        return setColor("RED");
      case "#EB8E54":
        return setColor("ORANGE");
      case "#FCE0A4":
        return setColor("YELLOW");
      case "#94DD8E":
        return setColor("GREEN");
      case "#95DFFF":
        return setColor("BLUE");
      case "#4C7EA0":
        return setColor("NAVY");
      default:
        return setColor("PURPLE");
    }
  };

  const isAllDayChange = () => {
    setIsAllDay(!isAllDay);
  };

  const closeClickHandler = () => {
    setIsAddPost(false);
  };
  const showToggieHandler = (target) => {
    target === "location" ? setIsShowLocation(true) : setIsShowContent(true);
  };
  const hideToggieHandler = (target) => {
    target === "location" ? setIsShowLocation(false) : setIsShowContent(false);
  };

  const imgUploadHandler = (e) => {
    //console.log("사진 : ", e.target.files); // => 객체!! 배열아님
    setFileName([]);
    const img = Array.from(e.target.files);
    setFileList([...img]);
    // 파일 이름 뿌려주기 위해서
    img.forEach((list) => {
      let newName = list.name.split(".")[0];

      if (newName.length > 3) {
        let sliceName = "..." + newName.substr(-3);
        setFileName((state) => [...state, sliceName]);
      } else {
        setFileName((state) => [...state, newName]);
      }
    });
  };

  // 제목이 비었을때
  useEffect(() => {
    if (errors.title) alert(errors.title.message);
  }, [errors]);

  // 저장 버튼 눌렀을때
  const addPost = (data) => {
    console.log(data);
    // 날짜는 date 형식으로~~~~~
    // startDate + startTime  | endDate + endTime : yyyy-mm-dd HH:MM:ss

    // 이미지빼고 나머지 정보들은 string 으로 formData 아님!!!!
    const newStart = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
    const newEnd = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + (endDate.getDate() + 1);
    const newPost = new FormData();
    newPost.append("title", String(data.title));
    newPost.append("startDate", String(newStart));
    newPost.append("endDate", String(newEnd));
    newPost.append("startTime", String(data.startTime));
    newPost.append("endTime", String(data.endTime));
    newPost.append("color", String(color));
    newPost.append("participant", targetPickId);
    newPost.append("location", String(data.location));
    newPost.append("content", String(data.content));
    newPost.append("scope", String(data.scope));
    // fileList.map((img) => {
    //   newPost.append("image", img);
    // });
    newPost.append("image", "");

    dispatch(__createNewPost({ newPost, token }));

    // for (let num of newPost.keys()) {
    //   console.log("formData key----> : ", num);
    // }
    for (let num of newPost.values()) {
      console.log("formData valuse----> : ", num);
    }
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <CalendarPostModal isAddPost={isAddPost} setIsAddPost={setIsAddPost} isCancle={"취소"}>
      <AddPostWrapper onSubmit={handleSubmit(addPost)}>
        <HeaderWrapper>
          <BiX className="closeIncon" onClick={closeClickHandler} />
        </HeaderWrapper>

        <BodyWrapper>
          <BodyContainer>
            <TitleWrapper>
              <input {...register("title", { required: "제목을 입력해주세요." })} placeholder="일정 제목 추가" />
            </TitleWrapper>

            <DaysCheckWrapper>
              <DaysIconBox>
                <BsClock className="daysIcon" />
              </DaysIconBox>
              <DaysCheckContainer>
                <StartDateContainer>
                  <span>시작</span>
                  <CustomDatePicker selected={startDate} onChange={(date) => setStartDate(date)} minDate={new Date()} dateFormat="yyyy-MM-dd" locale={ko} />
                  <select {...register("startTime")} disabled={isAllDay}>
                    {time.map((item, i) => (
                      <option key={i} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </StartDateContainer>

                <StartDateContainer>
                  <span>종료</span>
                  <CustomDatePicker selected={endDate} onChange={(date) => setEndDate(date)} minDate={startDate} dateFormat="yyyy-MM-dd" locale={ko} />
                  <select {...register("endTime")} disabled={isAllDay}>
                    {time.map((item, i) => (
                      <option key={i} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </StartDateContainer>
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
                  <ColorBox key={i} value={item} isClick={item === isColor} {...register("color")} onClick={() => colorClick(item)} />
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
                  <div>
                    <BsSearch className="searchIcon" />
                  </div>
                  <FriendPickBox>
                    {targetPick?.map((pick) => (
                      <FriendBox key={pick.id}>
                        <span>{pick.nickName}</span>
                        <BiX className="friendX" onClick={() => deleteTarget(pick.id)} />
                      </FriendBox>
                    ))}
                  </FriendPickBox>
                  <FriendBoxInput>
                    <input type="text" {...register("participant")} placeholder="닉네임, 이메일 검색" />
                  </FriendBoxInput>
                </InviteSearchBox>
                <SerchModalContainer isShow={targetToggle}>
                  {targetList?.map((list) => {
                    const newEmail = list.email.split("@");
                    return (
                      <TartgetBox key={list.id} value={list.id} onClick={() => targetClick({ id: list.id, nickName: list.nickName })}>
                        <TargetBoxImg>
                          <img src=""></img>
                        </TargetBoxImg>
                        <TargetBoxText>
                          <span>
                            {list.nickName} ( {newEmail[0]} )
                          </span>
                          <span>{list.introduction ? list.introduction : "아직 작성된 소개글이 없습니다."}</span>
                        </TargetBoxText>
                      </TartgetBox>
                    );
                  })}
                </SerchModalContainer>
              </InviteSearchContainer>
            </InviteWrapper>

            <LocationWrapper>
              <LocationContainer>
                <BsGeoAlt className="locationIcon" />
                <TextSpan>
                  <span>장소</span>
                </TextSpan>
                <ToggleContainer>
                  {isShowLocation ? (
                    <BsChevronUp className="showToggle" onClick={() => hideToggieHandler("location")} />
                  ) : (
                    <BsChevronDown className="showToggle" onClick={() => showToggieHandler("location")} />
                  )}
                </ToggleContainer>
              </LocationContainer>
              <WriteLocationBox isShow={isShowLocation}>
                <input type="text" {...register("location")} />
              </WriteLocationBox>
            </LocationWrapper>

            <ContentWrapper>
              <ContentBoxContainer>
                <BsChatLeftText className="contentIcon" />
                <TextSpan>
                  <span>상세</span>
                </TextSpan>
                <ToggleContainer>
                  {isShowContent ? (
                    <BsChevronUp className="showToggle" onClick={() => hideToggieHandler("content")} />
                  ) : (
                    <BsChevronDown className="showToggle" onClick={() => showToggieHandler("content")} />
                  )}
                </ToggleContainer>
              </ContentBoxContainer>
              <WriteContentBox isShow={isShowContent}>
                <textarea {...register("content")} />
              </WriteContentBox>
            </ContentWrapper>

            <ImgWrapper>
              <ImgContainer>
                <BsCardImage className="imgIcon" />
                <TextSpan>
                  <span>사진</span>
                </TextSpan>
                <ImgUploadBox>
                  <ImgUploadListBox>
                    {fileName?.map((list, i) => {
                      return (
                        <ImgBox key={i}>
                          <span>{list}.jpg</span>
                          <BiX className="friendX" onClick={() => deleteImgFile(i)} />
                        </ImgBox>
                      );
                    })}
                  </ImgUploadListBox>
                  <div>
                    <ImgLabel htmlFor="inputImg">
                      <ImgUploadButton>파일추가</ImgUploadButton>
                      <input id="inputImg" type="file" accept="image/*" multiple onChange={imgUploadHandler} />
                    </ImgLabel>
                  </div>
                </ImgUploadBox>
              </ImgContainer>
            </ImgWrapper>

            <ScopeWrapper>
              <SlLock className="scopeIcon" />
              <TextSpan>
                <span>공개</span>
              </TextSpan>
              <SelectContainer>
                <select {...register("scope", { required: true })}>
                  <option value="ALL">전체공개</option>
                  <option value="SUBSCRIBE">전체공개(스크랩허용)</option>
                  <option value="FRIEND">친구공개</option>
                  <option value="ME">나만보기</option>
                </select>
              </SelectContainer>
            </ScopeWrapper>
          </BodyContainer>
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
    cursor: pointer;
  }
`;

const BodyWrapper = styled.section`
  height: 530px;
  padding: 0 10px;
  overflow-y: auto;
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.Bg.borderColor};
  }
`;

const BodyContainer = styled.div`
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
  padding-top: 2px;
  .daysIcon {
    font-size: 16px;
    color: ${(props) => props.theme.Bg.deepColor};
  }
`;
const DaysCheckContainer = styled.div`
  ${(props) => props.theme.FlexCol}
`;
const DaysAllCheckContainer = styled(DaysIconBox)`
  ${(props) => props.theme.FlexRow}
  width: 80px;
  align-items: flex-start;
  span {
    margin: 0;
    font-size: ${(props) => props.theme.Fs.smallText};
  }
`;
const StartDateContainer = styled.div`
  ${(props) => props.theme.FlexRow}
  width: 100%;
  margin-bottom: 8px;
  span {
    min-width: 32px;
  }
  .react-datepicker-wrapper {
    width: 100px;
    margin-right: 10px;
  }
  select {
    margin-right: 115px;
    border: none;
    font-size: ${(props) => props.theme.Fs.smallText};
  }
`;
const CustomDatePicker = styled(DatePicker)`
  width: 100px;
  font-size: ${(props) => props.theme.Fs.day};
  cursor: pointer;
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
  width: ${(props) => (props.isClick ? "25px" : "20px")};
  height: ${(props) => (props.isClick ? "25px" : "20px")};
  background-color: ${(props) => props.value};
  border-radius: 50%;
  margin-right: 20px;
  border: ${(props) => props.isClick && "3px solid #686363"};
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
  position: relative;
`;

const InviteSearchBox = styled(InviteSearchContainer)`
  width: 340px;
  height: 40px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.Bg.borderColor};
  border-radius: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  &::-webkit-scrollbar {
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.Bg.borderColor}; /* 스크롤 바의 색상 */
  }
  .searchIcon {
    font-size: 14px;
    color: ${(props) => props.theme.Bg.deepColor};
    margin-right: 5px;
  }
`;
const FriendPickBox = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  width: auto;
`;
const FriendBox = styled.div`
  ${(props) => props.theme.FlexRow}
  min-width: 80px;
  height: 22px;
  padding: 0 5px;
  margin: 0 5px;
  border-radius: 5px;
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
const FriendBoxInput = styled.div`
  ${(props) => props.theme.FlexRow}
  width: 0;
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
  background-color: #ececec;
  width: 98%;
  height: 200px;
  padding: 10px 20px;
  border-radius: 10px;
  display: ${(props) => (props.isShow ? "block" : "none")};
  z-index: 100;
`;

const TartgetBox = styled.div`
  ${(props) => props.theme.FlexRow}
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: lightskyblue;
  }
`;
const TargetBoxImg = styled.div`
  width: 50px;
  height: 45px;
  img {
    background-color: lightcoral;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const TargetBoxText = styled.div`
  ${(props) => props.theme.FlexCol}
  align-items: flex-start;
  gap: 5px;
  span {
    font-size: ${(props) => props.theme.Fs.xsmallText};
  }
`;

// 장소 영역
const LocationWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  padding-bottom: 20px;
  border-bottom: 1px solid ${(props) => props.theme.Bg.borderColor};
`;
const LocationContainer = styled(InviteWrapper)`
  justify-content: left;
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
  width: 100%;
  margin-top: 10px;
  input {
    width: 100%;
    height: 40px;
    padding: 10px;
    font-size: 12px;
    border: 1px solid ${(props) => props.theme.Bg.borderColor};
    border-radius: 8px;
  }
`;

// 메모 영역
const ContentWrapper = styled(LocationWrapper)``;
const ContentBoxContainer = styled(LocationContainer)`
  .contentIcon {
    font-size: 16px;
    color: ${(props) => props.theme.Bg.deepColor};
  }
`;
const WriteContentBox = styled(WriteLocationBox)`
  textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    border: 1px solid ${(props) => props.theme.Bg.borderColor};
    border-radius: 8px;
    font-size: ${(props) => props.theme.Fs.xsmallText};
    resize: none;
  }
`;

// 이미지 업로드 영역
const ImgWrapper = styled(LocationWrapper)``;
const ImgContainer = styled(LocationContainer)`
  .imgIcon {
    font-size: 14px;
    color: ${(props) => props.theme.Bg.deepColor};
  }
`;
const ImgUploadBox = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  width: 340px;
  height: 30px;
`;

const ImgLabel = styled.label`
  input {
    display: none;
  }
`;
const ImgUploadButton = styled.div`
  width: 70px;
  line-height: 30px;
  margin-left: 8px;
  border-radius: 5px;
  text-align: center;
  background-color: ${(props) => props.theme.Bg.middleColor};
  font-size: ${(props) => props.theme.Fs.xsmallText};
  cursor: pointer;
`;

const ImgUploadListBox = styled(InviteSearchBox)`
  border: none;
  padding: 0;
`;
const ImgBox = styled(FriendBox)`
  width: 0;
  height: 25px;
`;

// 공개범위 영역
const ScopeWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  margin-bottom: 20px;
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
