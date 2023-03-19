import React, { useCallback, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import CalendarPostModal from "./CalendarPostModal";
import { BiX } from "react-icons/bi";
import {
  BsClock,
  BsCalendar4Range,
  BsPeople,
  BsGeoAlt,
  BsChatLeftText,
  BsSearch,
  BsChevronDown,
  BsChevronUp,
  BsCardImage,
} from "react-icons/bs";
import { SlLock } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { __createNewPost, __getTargetList } from "../../../redux/modules/calendarSlice";
import Cookies from "js-cookie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { format } from "date-fns";
import postStyle from "../../../shared/style/PostStyle";

function AddPostModal({ isAddPost, setIsAddPost, setSide }) {
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
    reset,
    formState: { errors },
  } = useForm();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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
  const outside = useRef();

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
    debounce((text) => setFindTarget(text), 500),
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
      setTargetPickId([...targetPickId, parseInt(data.id)]);
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

  // 초대 토글 닫기
  useEffect(() => {
    const outsideClick = (e) => {
      if (!outside.current || !outside.current.contains(e.target)) {
        setTargetToggle(false);
      }
    };
    document.addEventListener("mousedown", outsideClick);
  }, [targetToggle]);

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
    // 초기화
    setIsAllDay(false);
    setIsColor("#EC899F");
    setFileName([]);
    setTargetPick([]);
    setStartDate(new Date());
    setEndDate(new Date());
    reset();
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
    const newStart = format(startDate, "yyyy-MM-dd");
    const newEnd = format(endDate.setDate(endDate.getDate() + 1), "yyyy-MM-dd");

    // let newStartTime = "";
    // let newEndTime = "";
    // if (!data.allDay) {
    //   newStartTime = data.startTime;
    //   newEndTime = data.endTime;
    // }

    const newPost = {
      title: data.title,
      startDate: newStart,
      endDate: newEnd,
      startTime: data.startTime,
      endTime: data.endTime,
      color: color,
      participant: targetPickId,
      location: data.location,
      content: data.content,
      scope: data.scope,
      image: [""],
    };

    console.log("newPost-------------", newPost);

    // fileList.map((img) => {
    //   newPost.append("image", img);
    // });
    //newPost.append("image", "");

    dispatch(__createNewPost({ newPost, token }));
    setIsAddPost(false);
    setSide(true);

    // for (let num of newPost.keys()) {
    //   console.log("formData key----> : ", num);
    // }
    // for (let num of newPost.values()) {
    //   console.log("formData valuse----> : ", num);
    // }
  };

  return (
    <CalendarPostModal isAddPost={isAddPost} setIsAddPost={setIsAddPost}>
      <postStyle.AddPostWrapper onSubmit={handleSubmit(addPost)}>
        <postStyle.HeaderWrapper>
          <BiX className="closeIncon" onClick={closeClickHandler} />
        </postStyle.HeaderWrapper>

        <postStyle.BodyWrapper>
          <postStyle.BodyContainer>
            <postStyle.TitleWrapper>
              <input {...register("title", { required: "제목을 입력해주세요." })} placeholder="일정 제목 추가" />
            </postStyle.TitleWrapper>

            <postStyle.DaysCheckWrapper>
              <postStyle.DaysIconBox>
                <BsClock className="daysIcon" />
              </postStyle.DaysIconBox>
              <postStyle.DaysCheckContainer>
                <postStyle.StartDateContainer>
                  <span>시작</span>
                  <postStyle.CustomDatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    minDate={new Date()}
                    dateFormat="yyyy-MM-dd"
                    locale={ko}
                  />
                  <select {...register("startTime")} disabled={isAllDay}>
                    {time.map((item, i) => (
                      <option key={i} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </postStyle.StartDateContainer>

                <postStyle.StartDateContainer>
                  <span>종료</span>
                  <postStyle.CustomDatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    minDate={startDate}
                    dateFormat="yyyy-MM-dd"
                    locale={ko}
                  />
                  <select {...register("endTime")} disabled={isAllDay}>
                    {time.map((item, i) => (
                      <option key={i} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </postStyle.StartDateContainer>
              </postStyle.DaysCheckContainer>

              <postStyle.DaysAllCheckContainer>
                <input type="checkbox" {...register("allDay")} onChange={isAllDayChange}></input>
                <span>종일</span>
              </postStyle.DaysAllCheckContainer>
            </postStyle.DaysCheckWrapper>

            <postStyle.ColorBoxWrapper>
              <BsCalendar4Range className="colorIcon" />
              <postStyle.TextSpan>
                <span>달력</span>
              </postStyle.TextSpan>
              <postStyle.ColorBoxContainer>
                {colorList.map((item, i) => (
                  <postStyle.ColorBox
                    key={i}
                    value={item}
                    isClick={item === isColor}
                    {...register("color")}
                    onClick={() => colorClick(item)}
                  />
                ))}
              </postStyle.ColorBoxContainer>
            </postStyle.ColorBoxWrapper>

            <postStyle.InviteWrapper>
              <BsPeople className="inviteIcon" />
              <postStyle.TextSpan>
                <span>초대</span>
              </postStyle.TextSpan>
              <postStyle.InviteSearchContainer>
                <postStyle.InviteSearchBox>
                  <div>
                    <BsSearch className="searchIcon" />
                  </div>
                  <postStyle.FriendPickBox>
                    {targetPick?.map((pick) => (
                      <postStyle.FriendBox key={pick.id}>
                        <span>{pick.nickName}</span>
                        <BiX className="friendX" onClick={() => deleteTarget(pick.id)} />
                      </postStyle.FriendBox>
                    ))}
                  </postStyle.FriendPickBox>
                  <postStyle.FriendBoxInput>
                    <input type="text" {...register("participant")} placeholder="닉네임, 이메일 검색" />
                  </postStyle.FriendBoxInput>
                </postStyle.InviteSearchBox>
                <postStyle.SerchModalContainer isShow={targetToggle} ref={outside}>
                  {targetList?.map((list) => {
                    const newEmail = list.email.split("@");
                    return (
                      <postStyle.TartgetBox
                        key={list.id}
                        value={list.id}
                        onClick={() => targetClick({ id: list.id, nickName: list.nickName })}>
                        <postStyle.TargetBoxImg>
                          <img src=""></img>
                        </postStyle.TargetBoxImg>
                        <postStyle.TargetBoxText>
                          <span>
                            {list.nickName} ( {newEmail[0]} )
                          </span>
                          <span>{list.introduction ? list.introduction : "아직 작성된 소개글이 없습니다."}</span>
                        </postStyle.TargetBoxText>
                      </postStyle.TartgetBox>
                    );
                  })}
                </postStyle.SerchModalContainer>
              </postStyle.InviteSearchContainer>
            </postStyle.InviteWrapper>

            <postStyle.LocationWrapper>
              <postStyle.LocationContainer>
                <BsGeoAlt className="locationIcon" />
                <postStyle.TextSpan>
                  <span>장소</span>
                </postStyle.TextSpan>
                <postStyle.ToggleContainer>
                  {isShowLocation ? (
                    <BsChevronUp className="showToggle" onClick={() => hideToggieHandler("location")} />
                  ) : (
                    <BsChevronDown className="showToggle" onClick={() => showToggieHandler("location")} />
                  )}
                </postStyle.ToggleContainer>
              </postStyle.LocationContainer>
              <postStyle.WriteLocationBox isShow={isShowLocation}>
                <input type="text" {...register("location")} />
              </postStyle.WriteLocationBox>
            </postStyle.LocationWrapper>

            <postStyle.ContentWrapper>
              <postStyle.ContentBoxContainer>
                <BsChatLeftText className="contentIcon" />
                <postStyle.TextSpan>
                  <span>상세</span>
                </postStyle.TextSpan>
                <postStyle.ToggleContainer>
                  {isShowContent ? (
                    <BsChevronUp className="showToggle" onClick={() => hideToggieHandler("content")} />
                  ) : (
                    <BsChevronDown className="showToggle" onClick={() => showToggieHandler("content")} />
                  )}
                </postStyle.ToggleContainer>
              </postStyle.ContentBoxContainer>
              <postStyle.WriteContentBox isShow={isShowContent}>
                <textarea {...register("content")} />
              </postStyle.WriteContentBox>
            </postStyle.ContentWrapper>

            <postStyle.ImgWrapper>
              <postStyle.ImgContainer>
                <BsCardImage className="imgIcon" />
                <postStyle.TextSpan>
                  <span>사진</span>
                </postStyle.TextSpan>
                <postStyle.ImgUploadBox>
                  <postStyle.ImgUploadListBox>
                    {fileName?.map((list, i) => {
                      return (
                        <postStyle.ImgBox key={i}>
                          <span>{list}.jpg</span>
                          <BiX className="friendX" onClick={() => deleteImgFile(i)} />
                        </postStyle.ImgBox>
                      );
                    })}
                  </postStyle.ImgUploadListBox>
                  <div>
                    <postStyle.ImgLabel htmlFor="inputImg">
                      <postStyle.ImgUploadButton>파일추가</postStyle.ImgUploadButton>
                      <input id="inputImg" type="file" accept="image/*" multiple onChange={imgUploadHandler} />
                    </postStyle.ImgLabel>
                  </div>
                </postStyle.ImgUploadBox>
              </postStyle.ImgContainer>
            </postStyle.ImgWrapper>

            <postStyle.ScopeWrapper>
              <SlLock className="scopeIcon" />
              <postStyle.TextSpan>
                <span>공개</span>
              </postStyle.TextSpan>
              <postStyle.SelectContainer>
                <select {...register("scope", { required: true })}>
                  <option value="ALL">전체공개</option>
                  <option value="SUBSCRIBE">전체공개(스크랩허용)</option>
                  <option value="FRIEND">친구공개</option>
                  <option value="ME">나만보기</option>
                </select>
              </postStyle.SelectContainer>
            </postStyle.ScopeWrapper>
          </postStyle.BodyContainer>
        </postStyle.BodyWrapper>

        <postStyle.SubmitButtonWrapper>
          <button>저장</button>
        </postStyle.SubmitButtonWrapper>
      </postStyle.AddPostWrapper>
    </CalendarPostModal>
  );
}

export default AddPostModal;
