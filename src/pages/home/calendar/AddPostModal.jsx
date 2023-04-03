import React, { useState, useEffect, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { BiX } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { __createNewPost, __getTargetList, __postImgUpload, __getPostDetail, __updatePost, __deletePost } from "../../../redux/modules/calendarSlice";
import Cookies from "js-cookie";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { format } from "date-fns";
import postStyle from "../../../shared/style/PostStyle";
import ColorFromDB, { ColorList, ColorToDB, TimeList } from "./CalendarBasic";
import { ReactComponent as Clock } from "../../../assets/calendarIcon/clock.svg";
import { ReactComponent as Calendar } from "../../../assets/calendarIcon/calendar.svg";
import { ReactComponent as Invite } from "../../../assets/calendarIcon/invite.svg";
import { ReactComponent as Location } from "../../../assets/calendarIcon/location.svg";
import { ReactComponent as Memo } from "../../../assets/calendarIcon/memo.svg";
import { ReactComponent as ImageIcon } from "../../../assets/calendarIcon/image.svg";
import { ReactComponent as Lock } from "../../../assets/calendarIcon/lock.svg";
import { ReactComponent as Delete } from "../../../assets/calendarIcon/delete.svg";
import { ReactComponent as Up } from "../../../assets/defaultIcons/up.svg";
import { ReactComponent as Down } from "../../../assets/defaultIcons/down.svg";
import { ReactComponent as Dismiss } from "../../../assets/defaultIcons/dismiss.svg";
import { ReactComponent as Search } from "../../../assets/searchList/search.svg";
import defaultProfile from "../../../assets/defaultImage/profile.jpg";
import ModalBox from "../../../elements/ModalBox";

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

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(startDate);
  const [isAllDay, setIsAllDay] = useState(getValues("allDay"));
  const [color, setColor] = useState("RED");
  const [isColor, setIsColor] = useState("#F6A89E");
  const [isShowLocation, setIsShowLocation] = useState(false);
  const [isShowContent, setIsShowContent] = useState(false);
  const [isShowImg, setIsShowImg] = useState(false);
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
  // 이미지 뷰 뿌려줄 리스트
  const [fileImg, setFileImg] = useState([]);
  // 저장되어있던 이미지
  const [saveView, setSaveView] = useState([]);
  const dispatch = useDispatch();
  const token = Cookies.get("accessJWTToken");
  const outside = useRef();

  useEffect(() => {
    if (props.modifyPostId) {
      dispatch(__getPostDetail({ id: props.modifyPostId, token })).then((data) => {
        // 상세 정보 뿌려주기
        setValue("title", data.payload.title);
        setValue("startTime", data.payload.startTime.substr(0, 5));
        setValue("endTime", data.payload.endTime.substr(0, 5));
        setValue("location", data.payload.location);
        setValue("content", data.payload.content);
        setValue("scope", data.payload.scope);
        setColor(data.payload.color);

        const newStartTime = data.payload.startTime.substr(0, 5);
        const newEndTime = data.payload.endTime.substr(0, 5);
        if (newStartTime === "00:00" && newEndTime === "00:00") {
          setValue("allDay", "checked");
          setIsAllDay(true);
        }

        const newStart = new Date(data.payload.startDate);
        const newEnd = new Date(data.payload.endDate);
        setStartDate(newStart);
        setEndDate(newEnd);
        setSaveView(data.payload.image);

        if (data.payload.participant) {
          data.payload.participant.map((user) => {
            const newUser = {
              id: user.participentId,
              nickName: user.participentName,
            };
            setTargetPick((pre) => [...pre, newUser]);
            setTargetPickId((pre) => [...pre, parseInt(newUser.id)]);
          });
        }
        const color = ColorFromDB(data.payload.color);
        setIsColor(color);

        if (data.payload.location) {
          setIsShowLocation(true);
        }
        if (data.payload.content) {
          setIsShowContent(true);
        }
        if (data.payload.image.length !== 0) {
          setIsShowImg(true);
        }
      });
    }
  }, [props.modifyPostId]);

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

  // 친구 초대태그하기
  useEffect(() => {
    // findTarget 에 값이 있다면 입력을 멈춘것
    if (findTarget === "") {
      setTargetToggle(false);
    } else if (findTarget) {
      //console.log("날짜", startDate, endDate);
      //console.log("시간", watch("startTime"), watch("endTime"));

      const newStart = format(startDate, "yyyy-MM-dd");
      const newEnd = format(endDate, "yyyy-MM-dd");
      if (newStart > newEnd) {
        return alert("종료날짜가 시작날짜보다 빠릅니다. 다시 선택해주세요.");
      }
      let newStartTime = "";
      let newEndTime = "";

      if (isAllDay) {
        newStartTime = "00:00:00";
        newEndTime = "00:00:00";
      } else {
        if (watch("startTime") > watch("endTime")) {
          resetField("participant");
          return alert("종료시간이 시작시간보다 빠릅니다. 다시 선택해주세요.");
        }
        newStartTime = watch("startTime");
        newEndTime = watch("endTime");
      }

      const targetData = {
        searchWord: findTarget,
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
    const deletePick = targetPick.filter((list) => list.id !== id);
    const deletePickId = targetPickId.filter((list) => list !== id);

    // 픽한 리스트에 담기
    setTargetPick([...deletePick]);
    setTargetPickId([...deletePickId]);
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

  useEffect(() => {
    if (startDate < endDate || (props.modifyPostId && watch("startTime") === watch("endTime"))) {
      setIsAllDay(true);
      setValue("allDay", "checked");
    } else {
      setIsAllDay(false);
      setValue("allDay", "");
    }
  }, [endDate]);

  // 닫기
  const closeClickHandler = () => {
    props.setIsAddPost(false);
    // 초기화
    setIsAllDay(false);
    setIsColor("#F6A89E");
    setFileName([]);
    setFileImg([]);
    setFileList([]);
    setSaveView([]);
    setTargetPick([]);
    setTargetPickId([]);
    setStartDate(new Date());
    setEndDate(new Date());
    setIsShowLocation(false);
    setIsShowContent(false);
    setIsShowImg(false);
    props.setModifyPostId("");
    reset();
  };

  // 삭제
  const deleteClickHandler = () => {
    dispatch(__deletePost({ id: props.modifyPostId, token })).then(() => {
      alert("일정이 삭제되었습니다.");
      props.setSide(!props.side);
      props.setIsSubmit(!props.isSubmit);
      closeClickHandler();
    });
  };

  const showToggieHandler = (target) => {
    target === "location" ? setIsShowLocation(true) : target === "content" ? setIsShowContent(true) : setIsShowImg(true);
  };
  const hideToggieHandler = (target) => {
    target === "location" ? setIsShowLocation(false) : target === "content" ? setIsShowContent(false) : setIsShowImg(false);
  };

  const imgUploadHandler = (e) => {
    const img = Array.from(e.target.files);
    setFileList((pre) => [...pre, ...img]);
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
    //showToggieHandler("img");
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

  // 저장 버튼 눌렀을때
  const addPost = (data) => {
    if (data.title === "") {
      return alert("제목을 입력해주세요.");
    }
    const newStart = format(startDate, "yyyy-MM-dd");
    const newEnd = format(endDate, "yyyy-MM-dd");
    if (newStart > newEnd) {
      return alert("종료날짜가 시작날짜보다 빠릅니다. 다시 선택해주세요.");
    }
    let newStartTime = "";
    let newEndTime = "";

    if (isAllDay) {
      newStartTime = "00:00:00";
      newEndTime = "00:00:00";
    } else {
      if (data.startTime > data.endTime) {
        return alert("종료시간이 시작시간보다 빠릅니다. 다시 선택해주세요.");
      }
      newStartTime = data.startTime;
      newEndTime = data.endTime;
    }

    const imgList = new FormData();
    if (fileList.length > 3) {
      return alert("파일첨부는 최대 3개까지 첨부가능합니다.");
    } else {
      fileList.map((img) => {
        imgList.append("images", img);
      });
    }

    const newPost = {
      title: data.title,
      startDate: newStart,
      endDate: newEnd,
      startTime: newStartTime,
      endTime: newEndTime,
      color: color,
      participant: targetPickId,
      location: data.location,
      content: data.content,
      scope: data.scope,
    };

    // fileList == 새 파일 이미지 리스트
    if (fileList.length !== 0) {
      // 이미지 있을때
      dispatch(__postImgUpload({ images: imgList, token })).then((img) => {
        console.log("img 실해", img);
        // 수정하기 일때
        if (props.modifyPostId) {
          if (saveView.length !== 0) {
            // 이전 저장되어있던 이미지가 있다
            let saveNewView = [];
            saveNewView.push(...saveView);
            saveNewView.push(...img.payload);
            newPost.image = saveNewView;

            dispatch(__updatePost({ updatePost: newPost, postId: String(props.modifyPostId), token })).then((data) => {
              if (data.error) {
                alert("수정 실패하였습니다.");
                closeClickHandler();
              } else {
                alert("수정되었습니다.");
                props.setSide(!props.side);
                props.setIsSubmit(!props.isSubmit);
                closeClickHandler();
              }
            });
          } else {
            newPost.image = img.payload;
            dispatch(__updatePost({ updatePost: newPost, postId: String(props.modifyPostId), token })).then((data) => {
              if (data.error) {
                alert("수정 실패하였습니다.");
                closeClickHandler();
              } else {
                alert("수정되었습니다.");
                props.setSide(!props.side);
                props.setIsSubmit(!props.isSubmit);
                closeClickHandler();
              }
            });
          }
        } else {
          newPost.image = img.payload;
          dispatch(__createNewPost({ newPost, token })).then((data) => {
            console.log("일정작성시 실패----", data);
            if (data.error) {
              alert("작성 실패하였습니다.");
              closeClickHandler();
            } else {
              alert("작성 완료되었습니다.");
              props.setSide(!props.side);
              props.setIsSubmit(!props.isSubmit);
              closeClickHandler();
            }
          });
        }
      });
    } else {
      // 새이미지 없을때 + 수정하기 일때
      if (props.modifyPostId) {
        let saveNewView = [];
        saveNewView.push(...saveView);
        newPost.image = saveNewView;

        dispatch(__updatePost({ updatePost: newPost, postId: String(props.modifyPostId), token })).then((data) => {
          if (data.error) {
            closeClickHandler();
            return alert("수정 실패하였습니다.");
          } else {
            alert("수정되었습니다.");
            props.setSide(!props.side);
            props.setIsSubmit(!props.isSubmit);
            closeClickHandler();
          }
        });
      } else {
        dispatch(__createNewPost({ newPost, token })).then((data) => {
          if (data.error) {
            alert("작성 실패하였습니다.");
            closeClickHandler();
          } else {
            alert("작성 완료되었습니다.");
            props.setSide(!props.side);
            props.setIsSubmit(!props.isSubmit);
            closeClickHandler();
          }
        });
      }
    }
  };

  return (
    <ModalBox isOpen={props.isAddPost} width={"500px"} height={"640px"}>
      <postStyle.AddPostWrapper onSubmit={handleSubmit(addPost)}>
        <postStyle.HeaderWrapper>
          {props.modifyPostId && <Delete width={22} height={22} onClick={deleteClickHandler} className="deleteIcon" />}
          <Dismiss className="closeIcon" onClick={closeClickHandler} />
        </postStyle.HeaderWrapper>

        <postStyle.TitleWrapper>
          <input {...register("title")} placeholder="일정 제목 추가" />
        </postStyle.TitleWrapper>

        <postStyle.BodyWrapper>
          <postStyle.DaysCheckWrapper>
            <postStyle.DaysIconBox>
              <Clock />
            </postStyle.DaysIconBox>
            <postStyle.DaysCheckContainer>
              <postStyle.StartDateContainer>
                <span>시작</span>
                <postStyle.CustomDatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="yyyy-MM-dd" locale={ko} />
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
                <postStyle.CustomDatePicker selected={endDate} onChange={(date) => setEndDate(date)} minDate={startDate} dateFormat="yyyy-MM-dd" locale={ko} />
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
            <Calendar />
            <postStyle.TextSpan>
              <span>달력</span>
            </postStyle.TextSpan>
            <postStyle.ColorBoxContainer>
              <div>
                {colorList.map((item, i) => (
                  <postStyle.ColorBox key={i} value={item} isClick={item === isColor} {...register("color")} onClick={() => colorClick(item)} />
                ))}
              </div>
            </postStyle.ColorBoxContainer>
          </postStyle.ColorBoxWrapper>

          <postStyle.InviteWrapper>
            <Invite />
            <postStyle.TextSpan>
              <span>초대</span>
            </postStyle.TextSpan>
            <postStyle.InviteSearchContainer>
              <postStyle.InviteSearchBox>
                <postStyle.InviteIconBox>
                  <Search className="searchIcon" />
                </postStyle.InviteIconBox>
                <postStyle.FriendPickBox>
                  {targetPick?.map((pick) => (
                    <postStyle.FriendBox key={pick.id}>
                      <span>{pick.nickName}</span>
                      <BiX className="friendX" onClick={() => deleteTarget(pick.id)} />
                    </postStyle.FriendBox>
                  ))}
                </postStyle.FriendPickBox>
                <postStyle.FriendBoxInput>
                  <input type="text" {...register("participant")} placeholder="친구 닉네임, 이메일 검색" />
                </postStyle.FriendBoxInput>
              </postStyle.InviteSearchBox>
              <postStyle.SerchModalContainer isShow={targetToggle} ref={outside}>
                {targetList?.map((list) => {
                  const newEmail = list.email.split("@");
                  return (
                    <postStyle.TartgetBox key={list.id} value={list.id} onClick={() => targetClick({ id: list.id, nickName: list.nickName })}>
                      <postStyle.TargetBoxImg>
                        <img src={list.profileImage ? list.profileImage : defaultProfile}></img>
                      </postStyle.TargetBoxImg>
                      <postStyle.TargetBoxText>
                        <span>
                          {list.nickName} ( @{newEmail[0]} )
                        </span>
                        <span>
                          {list.introduction
                            ? list.introduction.length > 20
                              ? `${list.introduction.substr(0, 20)}...`
                              : list.introduction
                            : `${list.nickName}의 캘린더입니다.`}
                        </span>
                      </postStyle.TargetBoxText>
                    </postStyle.TartgetBox>
                  );
                })}
              </postStyle.SerchModalContainer>
            </postStyle.InviteSearchContainer>
          </postStyle.InviteWrapper>

          <postStyle.LocationWrapper>
            <postStyle.LocationContainer onClick={isShowLocation ? () => hideToggieHandler("location") : () => showToggieHandler("location")}>
              <Location />
              <postStyle.TextSpan>
                <span>장소</span>
              </postStyle.TextSpan>
              <postStyle.ToggleContainer>{isShowLocation ? <Up className="showToggle" /> : <Down className="showToggle" />}</postStyle.ToggleContainer>
            </postStyle.LocationContainer>
            <postStyle.WriteLocationBox isShow={isShowLocation}>
              <input type="text" {...register("location")} />
            </postStyle.WriteLocationBox>
          </postStyle.LocationWrapper>

          <postStyle.ContentWrapper>
            <postStyle.ContentBoxContainer onClick={isShowContent ? () => hideToggieHandler("content") : () => showToggieHandler("content")}>
              <Memo />
              <postStyle.TextSpan>
                <span>상세</span>
              </postStyle.TextSpan>
              <postStyle.ToggleContainer>{isShowContent ? <Up className="showToggle" /> : <Down className="showToggle" />}</postStyle.ToggleContainer>
            </postStyle.ContentBoxContainer>
            <postStyle.WriteContentBox isShow={isShowContent}>
              <div>
                <textarea {...register("content")} />
              </div>
            </postStyle.WriteContentBox>
          </postStyle.ContentWrapper>

          <postStyle.ImgWrapper>
            <postStyle.ImgContainer onClick={isShowImg ? () => hideToggieHandler("img") : () => showToggieHandler("img")}>
              <ImageIcon />
              <postStyle.TextSpan>
                <span>사진</span>
              </postStyle.TextSpan>
              <postStyle.ToggleContainer>{isShowImg ? <Up className="showToggle" /> : <Down className="showToggle" />}</postStyle.ToggleContainer>
            </postStyle.ImgContainer>
            <postStyle.ModifyImgUploadBox isShow={isShowImg}>
              <postStyle.ImgUploadBox>
                <postStyle.ImgUploadListBox>
                  {saveView &&
                    saveView?.map((list, i) => {
                      const save = "save";
                      let sliceName = "..." + list.substr(-7, 3);
                      return (
                        <postStyle.ImgBox key={i}>
                          <span>{sliceName}.jpg</span>
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
                  <input id="inputImg" type="file" accept="image/*" multiple onChange={imgUploadHandler} key={new Date()} />
                </postStyle.ImgLabel>
              </postStyle.ImgUploadBox>
              <postStyle.PreviewContainer>
                <postStyle.PreviewBox>
                  {saveView.map((url, i) => {
                    return <img key={i} src={url} />;
                  })}
                  {fileImg.map((url, i) => {
                    return <img key={i} src={url} />;
                  })}
                </postStyle.PreviewBox>
              </postStyle.PreviewContainer>
            </postStyle.ModifyImgUploadBox>
          </postStyle.ImgWrapper>
          <postStyle.ScopeWrapper>
            <Lock />
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
        </postStyle.BodyWrapper>

        <postStyle.SubmitButtonWrapper isEdit={props.modifyPostId && true}>
          <button>{props.modifyPostId ? "수정하기" : "일정 만들기"}</button>
        </postStyle.SubmitButtonWrapper>
      </postStyle.AddPostWrapper>
    </ModalBox>
  );
}

export default AddPostModal;
