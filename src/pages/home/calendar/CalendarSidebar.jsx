import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";
import { __addMemo, __getMemos, __deleteMemo, __fixMemo } from "../../../redux/modules/memosSlice";
import { ReactComponent as Star } from "../../../assets/defaultIcons/star.svg";
import { ReactComponent as Note } from "../../../assets/defaultIcons/note.svg";
import { ReactComponent as Cancel } from "../../../assets/defaultIcons/dismiss.svg";
import { ReactComponent as Memo } from "../../../assets/defaultIcons/memo.svg";
import { ReactComponent as MoreY } from "../../../assets/calendarIcon/moreY.svg";

import { __getSubscribeList } from "../../../redux/modules/subscribeSlice";
import SubscribeListControl from "./SubscribeListControl";
import ProfileSettingModal from "../profile/ProfileSettingModal";

export default function CalendarSidebar({ ...props }) {
  //창의 열고닫힘 상태
  const [isTodoBoxOpen, setIsTodoBoxOpen] = useState(false);
  const [isSubscribeBoxOpen, setIsSubscribeBoxOpen] = useState(false);
  const [isAddMemoBoxOpen, setIsAddMemoBoxOpen] = useState(true);
  const [isInputBoxOpen, setIsInputBoxOpen] = useState(false);
  const [isEditDropDownOpen, setIsEditDropDownOpen] = useState(false);
  //메모에 적히는 제목,내용 상태
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // 수정 메모 제목, 내용 상태
  const [fixedTitle, setFixedTitle] = useState("");
  const [fixedContent, setFixedContent] = useState("");
  //메모리스트 상태 추적
  const [memos, setMemos] = useState([]);
  //수정할 메모박스 추적
  const [clickedMemoId, setClickedMemoId] = useState(null);
  const [clickedButtonIds, setClickedButtonIds] = useState([]);

  //메모 상태변경 추적
  const handleFixedTitleChange = (e) => {
    setFixedTitle(e.target.value);
  };

  const handleFixedContentChange = (e) => {
    setFixedContent(e.target.value);
  };

  //수정메모 상태변경 추적

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleTodoBoxOpen = () => {
    setIsTodoBoxOpen(!isTodoBoxOpen);
    setIsSubscribeBoxOpen(false);
    setIsAddMemoBoxOpen(true);
    setIsInputBoxOpen(false);
    setClickedMemoId(null);
  };

  const handleSubscribeBoxOpen = () => {
    setIsSubscribeBoxOpen(!isSubscribeBoxOpen);
    setIsTodoBoxOpen(false);
  };

  const handleInputBoxOpen = () => {
    setIsInputBoxOpen(!isInputBoxOpen);
    // setIsAddMemoBoxOpen(false);
  };

  // 메모 제출버튼 클릭 시 호출되는 함수
  const dispatch = useDispatch();
  const submitMemoHandler = () => {
    const memo = { title, content };
    if (title !== "" && content !== "") {
      dispatch(__addMemo(memo)).then(() => {
        dispatch(__getMemos());
      });
      setIsInputBoxOpen(false);
      setIsAddMemoBoxOpen(true);
      setTitle("");
      setContent("");
    } else {
      setIsInputBoxOpen(false);
      setIsAddMemoBoxOpen(true);
      setTitle("");
      setContent("");
    }
  };

  //메모 추가 후의 메모리스트 불러오기
  const statusCodeMemo = useSelector((state) => state.memos.statusCode);
  const statusCodeDelete = useSelector((state) => state.memos.statusCodeDelete);
  const updatedMemos = useSelector((state) => state.memos.updatedMemos);

  // console.log("셀렉터로 불러온 updatedMemos -->", updatedMemos);

  //메모 박스 열렸을 때 메모 정보 GET
  useEffect(() => {
    dispatch(__getMemos());
  }, [isTodoBoxOpen]);

  useEffect(() => {
    if (statusCodeMemo === 200 || statusCodeDelete === 200) {
      setMemos(updatedMemos);
    }
  }, [statusCodeMemo, updatedMemos]);

  //메모 삭제

  const deleteMemoHandler = (id) => {
    dispatch(__deleteMemo(id)).then(() => {
      dispatch(__getMemos());
    });
  };

  //수정할 메모박스찾기 함수
  const findClickedMemoHandler = (id) => {
    if (id !== clickedMemoId) {
      setFixedTitle("");
      setFixedContent("");
    }
    setClickedMemoId(id);
  };

  //메모 수정

  const fixMemoHandler = (id) => {
    const memo = memos.find((memo) => memo.id === id);
    const fixedMemo = { title: fixedTitle || memo.title, content: fixedContent || memo.content };
    dispatch(__fixMemo({ id, fixedMemo })).then(() => {
      dispatch(__getMemos());
    });
    setClickedMemoId(null);
  };

  const EditDropdownHandler = () => {
    setIsEditDropDownOpen(!isEditDropDownOpen);
  };

  return (
    <>
      <WholeWrapper>
        <SidebarWrapper>
          <div onClick={handleTodoBoxOpen}>
            <Note />
          </div>
          <div onClick={handleSubscribeBoxOpen}>
            <Star />
          </div>
        </SidebarWrapper>

        {isTodoBoxOpen && (
          <SideSpaceWrapper onClick={(e) => e.stopPropagation()}>
            <UpperArea>
              <MemoTitle>
                <div>내 메모 목록</div>
                <Cancel onClick={() => setIsTodoBoxOpen(false)} />
              </MemoTitle>
              <GapArea />
              {isAddMemoBoxOpen && (
                <AddMemoBox>
                  <SmallText>내 메모</SmallText>
                  <AddBox onClick={handleInputBoxOpen}>
                    <Memo /> 메모 추가하기
                  </AddBox>
                  {isInputBoxOpen && (
                    <InputBox>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          submitMemoHandler();
                        }}>
                        <ContentWrapper>
                          <InputBar type="text" placeholder="제목을 입력해주세요" value={title} onChange={handleTitleChange} autoFocus />
                          <InputBarContent type="text" placeholder="내용을 입력해주세요" value={content} onChange={handleContentChange} />
                        </ContentWrapper>
                        <button hidden>제출</button>
                      </form>
                    </InputBox>
                  )}
                </AddMemoBox>
              )}
            </UpperArea>
            <UnderWrap>
              {updatedMemos.map((memo) => (
                <div key={memo.id}>
                  {clickedMemoId === memo.id ? (
                    <MemoBox>
                      <input type="text" placeholder="제목" value={fixedTitle} onChange={handleFixedTitleChange} />
                      <input type="text" placeholder="내용" value={fixedContent} onChange={handleFixedContentChange} />
                      <MemoBoxButtonWrapper>
                        <FixButton onClick={() => fixMemoHandler(memo.id)}>수정</FixButton>
                      </MemoBoxButtonWrapper>
                    </MemoBox>
                  ) : (
                    <MemoBox>
                      <UpperBox>
                        <div>{memo.title}</div>
                        <MoreY width="16px" height="16px" onClick={EditDropdownHandler}></MoreY>
                      </UpperBox>
                      <UnderBox>{memo.content}</UnderBox>
                      <MemoBoxButtonWrapper>
                        <HiPencil onClick={() => findClickedMemoHandler(memo.id)} />
                        <FaTrash
                          onClick={() => {
                            deleteMemoHandler(memo.id);
                          }}
                        />
                      </MemoBoxButtonWrapper>
                    </MemoBox>
                  )}
                </div>
              ))}
            </UnderWrap>
          </SideSpaceWrapper>
        )}
        {isSubscribeBoxOpen && (
          <SubscribeListControl
            clickedButtonIds={clickedButtonIds}
            setClickedButtonIds={setClickedButtonIds}
            isSubmit={props.isSubmit}
            setIsSubmit={props.setIsSubmit}
            setIsSubscribeBoxOpen={setIsSubscribeBoxOpen}
          />
        )}
      </WholeWrapper>
    </>
  );
}

const WholeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

//사이드바
const SidebarWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  display: flex;
  justify-content: flex-start;
  width: 46px;
  height: 100%;
  gap: 30px;
  padding-top: 50px;
  border-left: solid 1px #121212;
  cursor: pointer;
  /* background-color: lightgreen; */
`;

//사이드바 아이콘 클릭 시 나오는 영역
export const SideSpaceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 240px;
  height: 100%;
  background-color: white;
  overflow: auto;
  z-index: 10;
  flex-shrink: 0;
  border: 1px solid black;
  gap: 18px;

  padding-top: 20px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

//메모 모달 상단(메모 추가하기까지)
const UpperArea = styled.div``;

//메모 타이틀
export const MemoTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0px;
  gap: 98px;

  /* width: 192px; */
  height: 21px;
  font-weight: 500;
  font-size: ${(props) => props.theme.Fs.size18}
  line-height: 21px;

  color: ${(props) => props.theme.Bg.color1};
  /* background: pink; */
`;

export const GapArea = styled.div`
  height: 12px;
  width: 200px;
  border-bottom: 1px solid gray;
  margin-bottom: 12px;
`;

// 내 메모 + 메모 추가하기 영역
const AddMemoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;

  width: 192px;
  min-height: 54px;
  /* background: pink; */
`;

// 내 메모
const SmallText = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: ${(props) => props.theme.Bg.color3};
`;

// 메모 추가하기
const AddBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  width: 192px;
  height: 28px;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  color: ${(props) => props.theme.Bg.mainColor5};
  :hover {
    background: #f1fbfe;

    > div > svg {
      display: block;
    }
  }

  > div > svg {
    display: none;
  }
`;

// 입력창 전체
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 192px;
  height: 50px;

  background: #f1fbfe;
  border-radius: 4px;
`;

// 입력창 내부
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 184px;
  height: 38px;
  gap: 8px;

  /* background: pink; */
`;

// 입력창 input에 대한 상세 style
const InputBar = styled.input`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 4px;
  background: #f1fbfe;
  height: 14px;
  ::placeholder {
    color: ${(props) => props.theme.Bg.color3};
  }
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: ${(props) => props.theme.Bg.color1};
`;

const InputBarContent = styled(InputBar)`
  font-weight: 400;
  line-height: 150%;
  color: ${(props) => props.theme.Bg.color2};
`;

//입력완료한 메모박스가 쌓이는 하단 영역
const UnderWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

//입력완료한 메모박스
const MemoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 6px;
  gap: 8px;

  width: 192px;
  height: auto;

  border: 1px solid ${(props) => props.theme.Bg.border1};
  border-radius: 4px;
  word-break: break-word;

  :hover {
    background: #f1fbfe;
  }
`;

const MemoBoxButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  padding-right: 5px;
  width: 100%;
  gap: 10px;
  margin-top: 10px;
  background: pink;
`;

const UpperBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 184px;
  justify-content: space-between;

  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: ${(props) => props.theme.Bg.color1};
`;

const EditDropDown = styled.div`
  position: absolute;
  width: 60px;
  height: 40px;
  background: skyblue;
  z-index: 10;
  top: 10px;
  left: 10px;
`;

const UnderBox = styled.div`\
font-weight: normal;
font-size:12px;
line-height:150%;
`;

const FixButton = styled.div`
  width: 50px;
  background-color: lightgray;
  border-radius: 4px;
  text-align: center;
  padding: 3px;
`;
