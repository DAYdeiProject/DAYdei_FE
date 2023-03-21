import React, { useCallback, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import CalendarPostModal from "./CalendarPostModal";
import { BiX } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";
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
import {
  __createNewPost,
  __getTargetList,
  __postImgUpload,
  __getPostDetail,
  __updatePost,
  __deletePost,
} from "../../../redux/modules/calendarSlice";
import Cookies from "js-cookie";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { format } from "date-fns";
import postStyle from "../../../shared/style/PostStyle";
import add from "date-fns/add";
import ColorFromDB, { ColorList, ColorToDB, TimeList } from "./CalendarBasic";

function AddPostModal({ ...props }) {
  const time = TimeList();
  const colorList = ColorList();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    resetField,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // 쓰레기통 아이콘
  const [isDelete, setIsDelete] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(startDate);
  const [isAllDay, setIsAllDay] = useState(getValues("allDay"));
  const [color, setColor] = useState("RED");
  const [isColor, setIsColor] = useState("#EC899F");
  const [isShowLocation, setIsShowLocation] = useState(false);
  const [isShowContent, setIsShowContent] = useState(false);
  const [isShowImg, setIsShowImg] = useState(false);
  const [findTarget, setFindTarget] = useState("");
  const [targetList, setTargetList] = useState([]);
  const [targetToggle, setTargetToggle] = useState(false);
  const [targetPick, setTargetPick] = useState([]);
  // 저장되어있던 친구
  const [savePick, setSavePick] = useState([]);
  // db에 보내줄 친구 리스트
  const [targetPickId, setTargetPickId] = useState([]);
  // db에 보내줄 파일 리스트
  const [fileList, setFileList] = useState([]);
  // 이름 뿌려줄 리스트
  const [fileName, setFileName] = useState([]);
  // 이미지 뷰 뿌려줄 리스트
  const [fileImg, setFileImg] = useState([]);
  // 저장되어있던 이미지
  const [saveView, setSaveView] = useState([]);
  const dispatch = useDispatch();
  const token = Cookies.get("accessJWTToken");
  const outside = useRef();

  useEffect(() => {
    if (props.detailPostId) {
      dispatch(__getPostDetail({ id: props.detailPostId, token })).then((data) => {
        // 정보 뿌려주기
        setValue("title", data.payload.title);
        setValue("startTime", data.payload.startTime.substr(0, 5));
        setValue("endTime", data.payload.endTime.substr(0, 5));
        setValue("location", data.payload.location);
        setValue("content", data.payload.content);
        setValue("scope", data.payload.scope);
        setColor(data.payload.color);

        const newStart = new Date(data.payload.startDate);
        const newEnd = add(new Date(data.payload.endDate), { days: -1 });
        setStartDate(newStart);
        setEndDate(newEnd);
        setSaveView(data.payload.image);
        if (data.payload.participent.length !== 0) {
          data.payload.participent.map((user) => {
            const newUser = {
              id: user.participentId,
              nickName: user.participentName,
            };
            setTargetPick([...targetPick, newUser]);
            setTargetPickId([...targetPickId, parseInt(newUser.id)]);
          });
        }

        const color = ColorFromDB(data.payload.color);
        setIsColor(color);

        props.setIsAddPost(true);
        setIsDelete(true);
      });
    }
  }, [props.detailPostId]);

  // 날짜 클릭시 해당날짜의 일정추가
  useEffect(() => {
    if (props.pickDate) {
      setStartDate(props.pickDate);
      setEndDate(props.pickDate);
      props.setIsAddPost(true);
    }
  }, [props.pickDate]);

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
    debounce((text) => setFindTarget(text), 200),
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

  // 색깔 클릭시
  const colorClick = (data) => {
    setIsColor(data);
    const color = ColorToDB(data);
    setColor(color);
  };

  // 종일 체크
  const isAllDayChange = () => {
    setIsAllDay(!isAllDay);
  };

  // 일정 삭제하기
  const deletePostHandler = (id) => {
    //console.log(id);
    dispatch(__deletePost({ id, token })).then((data) => {
      alert(data.payload);
      props.setIsAddPost(false);
    });
  };
  // 닫기
  const closeClickHandler = () => {
    props.setIsAddPost(false);
    // 초기화
    setIsAllDay(false);
    setIsColor("#EC899F");
    setFileName([]);
    setFileImg([]);
    setSaveView([]);
    setTargetPick([]);
    setStartDate(new Date());
    setEndDate(new Date());
    setIsShowLocation(false);
    setIsShowContent(false);
    setIsShowImg(false);
    setIsDelete(false);
    props.setDetailPostId("");
    reset();
  };
  const showToggieHandler = (target) => {
    target === "location" ? setIsShowLocation(true) : target === "content" ? setIsShowContent(true) : setIsShowImg(true);
  };
  const hideToggieHandler = (target) => {
    target === "location" ? setIsShowLocation(false) : target === "content" ? setIsShowContent(false) : setIsShowImg(false);
  };

  const imgUploadHandler = (e) => {
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

    // 프리뷰
    let fileUrl = [];
    for (let i = 0; i < img.length; i++) {
      let file = img[i];
      let fileReader = new FileReader();
      fileReader.onload = () => {
        fileUrl[i] = fileReader.result;
        setFileImg([...fileImg, ...fileUrl]);
      };
      fileReader.readAsDataURL(file);
    }
  };

  // 클릭한 이미지 파일 삭제
  const deleteImgFile = (index, save) => {
    if (save) {
      const newSaveView = saveView.filter((itme, i) => i !== index);
      setSaveView([...newSaveView]);
    } else {
      // fileName ,fileList, fileImg 값 삭제
      const newName = fileName.filter((item, i) => i !== index);
      const newList = fileList.filter((item, i) => i !== index);
      const newView = fileImg.filter((item, i) => i !== index);
      setFileName([...newName]);
      setFileList([...newList]);
      setFileImg([...newView]);
    }
  };

  // 제목이 비었을때
  useEffect(() => {
    if (errors.title) alert(errors.title.message);
  }, [errors]);

  // 저장 버튼 눌렀을때
  const addPost = (data) => {
    const newStart = format(startDate, "yyyy-MM-dd");
    const newEnd = format(endDate.setDate(endDate.getDate() + 1), "yyyy-MM-dd");

    const imgList = new FormData();
    fileList.map((img) => {
      imgList.append("images", img);
    });

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
    };

    if (fileList.length) {
      // 이미지 있을때
      dispatch(__postImgUpload({ images: imgList, token })).then((data) => {
        // 수정하기 일때
        if (props.detailPostId) {
          if (saveView) {
            // 이전 저장되어있던 이미지가 있다
            let saveNewView = [];
            saveNewView.push(...saveView);
            saveNewView.push(...data.payload);
            newPost.image = saveNewView;
            dispatch(__updatePost({ updatePost: newPost, postId: props.detailPostId, token }));
            alert("수정되었습니다.");
            props.setSide(true);
            closeClickHandler();
          } else {
            newPost.image = data.payload;
            dispatch(__createNewPost({ newPost, token })).then((data) => {
              alert(data.payload);
              props.setSide(true);
              closeClickHandler();
            });
          }
        } else {
          newPost.image = data.payload;
          dispatch(__createNewPost({ newPost, token })).then((data) => {
            alert(data.payload);
            props.setSide(true);
            closeClickHandler();
          });
        }
      });
    } else {
      // 이미지 없을때 + 수정하기 일때
      if (props.detailPostId) {
        dispatch(__updatePost({ updatePost: newPost, postId: props.detailPostId, token }));
        alert("수정되었습니다.");
        props.setSide(true);
        closeClickHandler();
      } else {
        dispatch(__createNewPost({ newPost, token })).then((data) => {
          alert(data.payload);
          props.setSide(true);
          closeClickHandler();
        });
      }
    }
  };

  return (
    <CalendarPostModal isAddPost={props.isAddPost} setIsAddPost={props.setIsAddPost}>
      <postStyle.AddPostWrapper onSubmit={handleSubmit(addPost)}>
        <postStyle.HeaderWrapper isDelete={isDelete}>
          <BsTrash3 className="trashIcon" onClick={() => deletePostHandler(props.detailPostId)} />
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
                <postStyle.ToggleContainer>
                  {isShowImg ? (
                    <BsChevronUp className="showToggle" onClick={() => hideToggieHandler("img")} />
                  ) : (
                    <BsChevronDown className="showToggle" onClick={() => showToggieHandler("img")} />
                  )}
                </postStyle.ToggleContainer>
              </postStyle.ImgContainer>
              <postStyle.ModifyImgUploadBox isShow={isShowImg}>
                <postStyle.ImgUploadBox>
                  <postStyle.ImgUploadListBox>
                    {saveView &&
                      saveView?.map((list, i) => {
                        const save = "save";
                        //let sliceName = "..." + list.substr(-7, 3);
                        return (
                          <postStyle.ImgBox key={i}>
                            <span>파일{i}.jpg</span>
                            <BiX className="friendX" onClick={() => deleteImgFile(i, save)} />
                          </postStyle.ImgBox>
                        );
                      })}
                    {fileName?.map((list, i) => {
                      return (
                        <postStyle.ImgBox key={i}>
                          <span>{list}.jpg</span>
                          <BiX className="friendX" onClick={() => deleteImgFile(i)} />
                        </postStyle.ImgBox>
                      );
                    })}
                  </postStyle.ImgUploadListBox>
                  <postStyle.ImgLabel htmlFor="inputImg">
                    <postStyle.ImgUploadButton>파일추가</postStyle.ImgUploadButton>
                    <input id="inputImg" type="file" accept="image/*" multiple onChange={imgUploadHandler} />
                  </postStyle.ImgLabel>
                </postStyle.ImgUploadBox>
                <postStyle.PreviewContainer>
                  {saveView.map((url, i) => {
                    return <img key={i} src={url}></img>;
                  })}
                  {fileImg.map((url, i) => {
                    return <img key={i} src={url}></img>;
                  })}
                </postStyle.PreviewContainer>
              </postStyle.ModifyImgUploadBox>
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
          <button>{props.detailPostId ? "수정" : "저장"}</button>
        </postStyle.SubmitButtonWrapper>
      </postStyle.AddPostWrapper>
    </CalendarPostModal>
  );
}

export default AddPostModal;
