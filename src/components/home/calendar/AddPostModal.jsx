import Cookies from "js-cookie";
import { format } from "date-fns";
import { debounce } from "lodash";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { __createNewPost, __getTargetList, __postImgUpload, __getPostDetail, __updatePost, __deletePost } from "../../../redux/modules/calendarSlice";
import { alertState } from "../../../redux/modules/alertReducer";
import { getPostDetail } from "../../../redux/modules/postReducer";
import PostDate from "../post/PostDate";
import PostColor from "../post/PostColor";
import PostImage from "../post/PostImage";
import PostInvite from "../post/PostInvite";
import PostContent from "../post/PostContent";
import PostLocation from "../post/PostLocation";
import ModalBox from "../../../elements/ModalBox";
import { ReactComponent as Lock } from "../../../assets/calendarIcon/lock.svg";
import { ReactComponent as Delete } from "../../../assets/calendarIcon/delete.svg";
import { ReactComponent as Dismiss } from "../../../assets/defaultIcons/dismiss.svg";

function AddPostModal({ ...props }) {
  const { register, handleSubmit, setValue, reset } = useForm();
  // date
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(startDate);
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [isAllDay, setIsAllDay] = useState("");
  // color
  const [color, setColor] = useState("");
  // invite
  const [targetPick, setTargetPick] = useState([]);
  // location
  const [location, setLocation] = useState("");
  // content
  const [content, setContent] = useState("");
  // image
  const [fileList, setFileList] = useState([]);
  const [saveView, setSaveView] = useState([]);

  const dispatch = useDispatch();

  const { postDetail } = useSelector((state) => state.post);

  useEffect(() => {
    if (props.modifyPostId) {
      dispatch(__getPostDetail({ id: props.modifyPostId })).then((data) => {
        dispatch(getPostDetail(data.payload));
        setValue("title", data.payload.title);
        setValue("scope", data.payload.scope);
      });
    }
  }, [props.modifyPostId]);

  // 날짜 클릭시 해당날짜의 일정추가
  useEffect(() => {
    if (props.pickDate) {
      props.setIsAddPost(true);
    }
  }, [props.pickDate]);

  // 닫기
  const closeClickHandler = () => {
    props.setIsAddPost(false);
    // 초기화
    setStartDate(new Date());
    setEndDate(new Date());
    setStartTime("00:00");
    setEndTime("00:00");
    setIsAllDay("");
    setColor("");
    setTargetPick([]);
    setLocation("");
    setContent("");
    setFileList([]);
    setSaveView([]);
    props.setModifyPostId("");
    reset();
    dispatch(getPostDetail([]));
  };

  // 삭제
  const deleteClickHandler = () => {
    dispatch(__deletePost({ id: props.modifyPostId })).then(() => {
      dispatch(alertState({ state: true, comment: "일정이 삭제되었습니다." }));
      props.setSide(!props.side);
      props.setIsSubmit(!props.isSubmit);
      closeClickHandler();
    });
  };

  // 저장 버튼 눌렀을때
  const addPost = (data) => {
    debounceSubmitHandler(data);
  };

  const debounceSubmitHandler = debounce((data) => {
    if (data.title === "") {
      return dispatch(alertState({ state: true, comment: "제목을 입력해주세요." }));
    }
    const newStart = format(startDate, "yyyy-MM-dd");
    const newEnd = format(endDate, "yyyy-MM-dd");
    if (newStart > newEnd) {
      return dispatch(alertState({ state: true, comment: "종료날짜가 시작날짜보다 빠릅니다. 다시 선택해주세요.", max: true }));
    }

    let newStartTime = "";
    let newEndTime = "";
    if (isAllDay === "checked") {
      newStartTime = "00:00";
      newEndTime = "00:00";
    } else {
      newStartTime = startTime;
      newEndTime = endTime;
    }

    // 친구
    let newInvite = [];
    if (targetPick.length !== 0) {
      targetPick.map((list) => {
        newInvite.push(list.id);
      });
    }

    // 사진
    const imgList = new FormData();
    fileList.map((img) => {
      imgList.append("images", img);
    });

    let newColor = "";
    if (color === "") {
      if (props.modifyPostId) {
        newColor = postDetail.color;
      }
      newColor = "RED";
    } else {
      newColor = color;
    }

    const newPost = {
      title: data.title,
      startDate: newStart,
      endDate: newEnd,
      startTime: newStartTime,
      endTime: newEndTime,
      color: newColor,
      participant: newInvite,
      location: location,
      content: content,
      scope: data.scope,
    };

    // fileList == 새 파일 이미지 리스트
    if (fileList.length !== 0) {
      // 이미지 있을때
      dispatch(__postImgUpload({ images: imgList })).then((img) => {
        // 수정하기 일때
        if (props.modifyPostId) {
          if (saveView.length !== 0) {
            // 이전 저장되어있던 이미지가 있다
            let saveNewView = [];
            saveNewView.push(...saveView);
            saveNewView.push(...img.payload);
            newPost.image = saveNewView;
            dispatch(__updatePost({ updatePost: newPost, postId: String(props.modifyPostId) })).then((data) => {
              if (data.error) {
                dispatch(alertState({ state: true, comment: "수정 실패하였습니다." }));
                closeClickHandler();
              } else {
                dispatch(alertState({ state: true, comment: "수정 되었습니다." }));
                props.setSide(!props.side);
                props.setIsSubmit(!props.isSubmit);
                closeClickHandler();
              }
            });
          } else {
            newPost.image = img.payload;
            dispatch(__updatePost({ updatePost: newPost, postId: String(props.modifyPostId) })).then((data) => {
              if (data.error) {
                dispatch(alertState({ state: true, comment: "수정 실패하였습니다." }));
                closeClickHandler();
              } else {
                dispatch(alertState({ state: true, comment: "수정 되었습니다." }));
                props.setSide(!props.side);
                props.setIsSubmit(!props.isSubmit);
                closeClickHandler();
              }
            });
          }
        } else {
          newPost.image = img.payload;
          dispatch(__createNewPost(newPost)).then((data) => {
            if (data.error) {
              dispatch(alertState({ state: true, comment: "작성 실패하였습니다." }));
              closeClickHandler();
            } else {
              dispatch(alertState({ state: true, comment: "작성 완료되었습니다." }));
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

        dispatch(__updatePost({ updatePost: newPost, postId: String(props.modifyPostId) })).then((data) => {
          if (data.error) {
            closeClickHandler();
            dispatch(alertState({ state: true, comment: "수정 실패하였습니다." }));
          } else {
            dispatch(alertState({ state: true, comment: "수정 되었습니다." }));
            props.setSide(!props.side);
            props.setIsSubmit(!props.isSubmit);
            closeClickHandler();
          }
        });
      } else {
        dispatch(__createNewPost(newPost)).then((data) => {
          if (data.error) {
            dispatch(alertState({ state: true, comment: "작성 실패하였습니다." }));
            closeClickHandler();
          } else {
            dispatch(alertState({ state: true, comment: "작성 완료되었습니다." }));
            props.setSide(!props.side);
            props.setIsSubmit(!props.isSubmit);
            closeClickHandler();
          }
        });
      }
    }
  }, 300);

  return (
    <ModalBox isOpen={props.isAddPost} width={"500px"} height={"640px"}>
      <AddPostWrapper onSubmit={handleSubmit(addPost)}>
        <HeaderWrapper>
          {props.modifyPostId && <Delete width={22} height={22} onClick={deleteClickHandler} className="deleteIcon" />}
          <Dismiss className="closeIcon" onClick={closeClickHandler} />
        </HeaderWrapper>

        <TitleWrapper>
          <input {...register("title")} placeholder="일정 제목 추가" maxLength={18} />
        </TitleWrapper>

        <BodyWrapper>
          <PostDate
            postDetail={postDetail}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setIsAllDay={setIsAllDay}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            pickDate={props.pickDate}
          />
          <PostColor postDetail={postDetail} setColor={setColor} />
          <PostInvite
            postDetail={postDetail}
            startDate={startDate}
            endDate={endDate}
            isAllDay={isAllDay}
            startTime={startTime}
            endTime={endTime}
            setTargetPick={setTargetPick}
          />
          <PostLocation postDetail={postDetail} setLocation={setLocation} />
          <PostContent postDetail={postDetail} setContent={setContent} />
          <PostImage postDetail={postDetail} setFileList={setFileList} setSaveView={setSaveView} />

          <ScopeWrapper>
            <Lock />
            <TextSpan>
              <span>공개</span>
            </TextSpan>
            <SelectContainer>
              <ScopeSelectBox {...register("scope", { required: true })}>
                <option value="ALL">전체공개</option>
                <option value="SUBSCRIBE">전체공개(스크랩허용)</option>
                <option value="FRIEND">친구공개</option>
                {targetPick.length === 0 && <option value="ME">나만보기</option>}
              </ScopeSelectBox>
            </SelectContainer>
          </ScopeWrapper>
        </BodyWrapper>

        <SubmitButtonWrapper isEdit={props.modifyPostId && true}>
          <button>{props.modifyPostId ? "수정하기" : "일정 만들기"}</button>
        </SubmitButtonWrapper>
      </AddPostWrapper>
    </ModalBox>
  );
}

export default AddPostModal;

const AddPostWrapper = styled.form`
  padding: 0 30px;
  span {
    font-size: ${(props) => props.theme.Fs.size16};
    margin: 0 10px;
    text-align: center;
  }
`;

export const HeaderWrapper = styled.section`
  ${(props) => props.theme.FlexRow}
  justify-content: right;
  margin-top: 25px;
  margin-bottom: 10px;
  .deleteIcon {
    margin-right: 10px;
    cursor: pointer;
  }
  .closeIcon {
    cursor: pointer;
  }
`;

const BodyWrapper = styled.section`
  max-height: 420px;
  margin-top: 25px;
  padding: 0 10px;
  overflow-y: auto;
  ${(props) => props.theme.FlexCol}
  align-items: flex-start;
  justify-content: flex-start;
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
  border-bottom: 1px solid ${(props) => props.theme.Bg.color3};
  input {
    width: 100%;
    height: 50px;
    font-size: ${(props) => props.theme.Fs.size24};
  }
`;

// 공개범위 영역
const ScopeWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
`;

const SelectContainer = styled(ScopeWrapper)`
  margin: 0;
  border: none;
`;

const ScopeSelectBox = styled.select`
  width: 150px;
  height: 21px;
  border: none;
  cursor: pointer;
`;

const SubmitButtonWrapper = styled.div`
  padding: 0 5px;
  button {
    ${(props) => props.theme.ButtonLarge}
    background-color: ${(props) => (props.isEdit ? props.theme.Bg.mainColor2 : props.theme.Bg.mainColor5)};
    color: ${(props) => (props.isEdit ? props.theme.Bg.color1 : props.theme.Bg.color6)};
    font-size: ${(props) => props.theme.Fs.size16};
    font-weight: 500;
    margin-top: 30px;
  }
`;
