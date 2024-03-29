import styled from "styled-components";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubscribeListControl from "./SubscribeListControl";
import { __getSubscribeList } from "../../../redux/modules/subscribeSlice";
import { __addMemo, __getMemos, __deleteMemo, __fixMemo } from "../../../redux/modules/memosSlice";
import { FaTrash } from "react-icons/fa";
import { ReactComponent as Star } from "../../../assets/defaultIcons/star.svg";
import { ReactComponent as Note } from "../../../assets/defaultIcons/note.svg";
import { ReactComponent as Memo } from "../../../assets/defaultIcons/memo.svg";
import { ReactComponent as MoreY } from "../../../assets/calendarIcon/moreY.svg";
import { ReactComponent as Cancel } from "../../../assets/defaultIcons/dismiss.svg";

export default function CalendarSidebar({ ...props }) {
  //창의 열고닫힘 상태
  const [isTodoBoxOpen, setIsTodoBoxOpen] = useState(false);
  const [isSubscribeBoxOpen, setIsSubscribeBoxOpen] = useState(false);
  const [isAddMemoBoxOpen, setIsAddMemoBoxOpen] = useState(true);
  const [isInputBoxOpen, setIsInputBoxOpen] = useState(false);
  //메모에 적히는 제목,내용 상태
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // 수정 메모 제목, 내용 상태
  const [fixedTitle, setFixedTitle] = useState("");
  const [fixedContent, setFixedContent] = useState("");
  //메모리스트 상태 추적
  const [memos, setMemos] = useState([]);
  //hover된 메모박스 추적
  const [hoveredMemoId, setHoveredMemoId] = useState(null);
  //클릭된 MoreY의 id 추적
  const [isClickedMoreYId, setIsClickedMoreYId] = useState(false);
  //수정할 메모박스 추적
  const [clickedMemoId, setClickedMemoId] = useState(null);
  //SubscribeListControl로 전달되는 상태
  const [clickedButtonIds, setClickedButtonIds] = useState([]);

  //수정메모 상태변경 추적
  const handleTitleChange = (e) => {
    autoResizeTextArea(e.target);
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    autoResizeTextArea(e.target);
    setContent(e.target.value);
  };

  //텍스트 길이에 따라 textarea 높이 조절
  function autoResizeTextArea(element) {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  }

  //메모 상태변경 추적
  const handleFixedTitleChange = (e) => {
    autoResizeTextArea(e.target);
    setFixedTitle(e.target.value);
  };

  const handleFixedContentChange = (e) => {
    autoResizeTextArea(e.target);
    setFixedContent(e.target.value);
  };

  //메모 모달 열고닫기 함수
  const handleTodoBoxOpen = () => {
    setIsTodoBoxOpen(!isTodoBoxOpen);
    setIsSubscribeBoxOpen(false);
    setIsAddMemoBoxOpen(true);
    setIsInputBoxOpen(false);
    setClickedMemoId(null);
  };
  // 메모 모달 내 '메모 추가하기' 누르면 input박스 열림
  const handleInputBoxOpen = () => {
    setIsInputBoxOpen(!isInputBoxOpen);
    // setIsAddMemoBoxOpen(false);
  };

  //구독 가리기/보이기 모달 열고닫기 함수
  const handleSubscribeBoxOpen = () => {
    setIsSubscribeBoxOpen(!isSubscribeBoxOpen);
    setIsTodoBoxOpen(false);
  };

  // 메모 제출버튼 클릭 시 호출되는 함수
  const dispatch = useDispatch();
  const submitMemoHandler = () => {
    const memo = { title, content };
    if ((title === "" && content !== "") || (title !== "" && content === "")) {
      alert("제목과 내용 모두 입력해주세요!");
    } else {
      if (title !== "" || content !== "") {
        if (title.length <= 10) {
          dispatch(__addMemo(memo)).then(() => {
            dispatch(__getMemos());
          });
          setIsInputBoxOpen(false);
          setIsAddMemoBoxOpen(true);
          setTitle("");
          setContent("");
        } else {
          alert("제목은 10자 이내로 입력해 주세요!");
        }
      } else {
        setIsInputBoxOpen(false);
        setIsAddMemoBoxOpen(true);
        setTitle("");
        setContent("");
      }
    }
  };

  //메모 추가 후의 메모리스트 불러오기
  const statusCodeMemo = useSelector((state) => state.memos.statusCode);
  const statusCodeDelete = useSelector((state) => state.memos.statusCodeDelete);
  const updatedMemos = useSelector((state) => state.memos.updatedMemos);

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
    if (window.confirm("메모를 삭제하시겠습니까?")) {
      dispatch(__deleteMemo(id)).then(() => {
        dispatch(__getMemos());
      });
    }
  };

  //수정할 메모박스찾기 함수
  const findClickedMemoHandler = (id) => {
    if (id !== clickedMemoId) {
      setFixedTitle("");
      setFixedContent("");
    }
    setClickedMemoId(id);
  };

  //Hover된 box의 id 기억하기
  const findHoveredMemoHandler = (id) => {
    setHoveredMemoId(id);
    setIsClickedMoreYId(false);
  };

  //메모 수정-삭제 드롭다운 모달 열고닫기
  const ClickedMoreYHandler = (event, memoId) => {
    event.stopPropagation();
    setIsClickedMoreYId(!isClickedMoreYId);
  };

  //메모 수정
  const fixMemoHandler = (id) => {
    const memo = memos.find((memo) => memo.id === id);
    const fixedMemo = { title: fixedTitle || memo.title, content: fixedContent || memo.content };
    if (fixedTitle.length <= 10) {
      dispatch(__fixMemo({ id, fixedMemo })).then(() => {
        dispatch(__getMemos());
      });
      setClickedMemoId(null);
      setHoveredMemoId(null);
    } else {
      alert("제목은 10자 이내로 작성해 주세요!");
    }
  };

  return (
    <>
      <WholeWrapper>
        <SidebarWrapper isTodo={isTodoBoxOpen} isSub={isSubscribeBoxOpen}>
          <div onClick={handleTodoBoxOpen}>
            <Note />
          </div>
          <div onClick={handleSubscribeBoxOpen}>
            <Star />
          </div>
        </SidebarWrapper>

        {isTodoBoxOpen && (
          <SideSpaceWrapper onClick={(e) => e.stopPropagation()} isTodo={isTodoBoxOpen}>
            <UpperArea>
              <MemoTitle>
                <div>내 메모 목록</div>
                <CancelIconWrap>
                  <Cancel onClick={() => setIsTodoBoxOpen(false)} />
                </CancelIconWrap>
              </MemoTitle>
              <GapArea />
              {isAddMemoBoxOpen && (
                <AddMemoBox>
                  <SmallText>내 메모</SmallText>
                  <AddBox onClick={handleInputBoxOpen}>
                    <Memo /> 메모 추가하기
                  </AddBox>
                  {updatedMemos.length === 0 && !isInputBoxOpen && (
                    <>
                      <NoMemoSignBox>
                        <MemoIconWrap />
                        <NoMemoText>
                          <p>작성한 메모가 없습니다.</p>
                          <p>새로운 메모를 작성해 보세요!</p>
                        </NoMemoText>
                      </NoMemoSignBox>
                    </>
                  )}

                  {isInputBoxOpen && (
                    <InputBox>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          submitMemoHandler();
                        }}>
                        <ContentWrapper>
                          <InputBar placeholder="제목" value={title} onChange={handleTitleChange} autoFocus rows={1} />
                          <InputBarContent placeholder="내용을 입력해주세요" value={content} onChange={handleContentChange} rows={1} />
                        </ContentWrapper>
                        <MemoSubmit>완료</MemoSubmit>
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
                    <InputBox>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          fixMemoHandler(memo.id);
                        }}>
                        <ContentWrapper>
                          <InputBar placeholder="제목 수정" defaultValue={memo.title} onChange={handleFixedTitleChange} autoFocus rows={1} />
                          <InputBarContent placeholder="내용을 수정해주세요" defaultValue={memo.content} onChange={handleFixedContentChange} rows={1} />
                        </ContentWrapper>
                        <MemoSubmit>수정</MemoSubmit>
                      </form>
                    </InputBox>
                  ) : (
                    <MemoBox onMouseEnter={() => findHoveredMemoHandler(memo.id)} onClick={() => findClickedMemoHandler(memo.id)}>
                      <UpperBox>
                        <TitleBox>{memo.title}</TitleBox>
                        {hoveredMemoId === memo.id ? (
                          <IconWrap>
                            <MoreY width="16px" height="16px" onClick={(event) => ClickedMoreYHandler(event, memo.id)} />
                            {isClickedMoreYId && (
                              <OptionsWrap
                                onClick={() => {
                                  deleteMemoHandler(memo.id);
                                }}>
                                <FaTrash />
                              </OptionsWrap>
                            )}
                          </IconWrap>
                        ) : null}
                      </UpperBox>
                      <UnderBox>{memo.content}</UnderBox>
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
  height: calc(1080px - 4rem - 0.0625rem);
`;

//사이드바
const SidebarWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  justify-content: flex-start;
  position: relative;
  right: ${(props) => (props.isTodo || props.isSub ? "15rem" : "0")};
  width: 2.875rem;
  height: 100%;
  gap: 1.875rem;
  padding-top: 3.125rem;
  border-left: solid 0.0625rem #121212;
  cursor: pointer;
  background: white;
  z-index: 1;
`;

//사이드바 아이콘 클릭 시 나오는 영역
export const SideSpaceWrapper = styled.div`
  position: absolute;
  right: 0;
  ${(props) => props.theme.FlexCol}
  justify-content: flex-start;

  width: 15rem;
  height: 100%;
  background-color: white;

  z-index: 10;
  flex-shrink: 0;
  border-left: 0.0625rem solid black;
  gap: 1.125rem;
  padding-top: 1.25rem;

  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-height: 1080px) {
    height: calc(100vh - 4rem - 0.0625rem);
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
  padding: 0rem;
  gap: 6.125rem;
  /* width: 192px; */
  height: 1.3125rem;
  font-weight: 500;
  font-size: ${(props) => props.theme.Fs.size18};
  line-height: 1.3125rem;
  color: ${(props) => props.theme.Bg.color1};
  margin-bottom: 10px;
`;

export const CancelIconWrap = styled.div`
  :hover {
    cursor: pointer;
  }
`;

export const GapArea = styled.div`
  height: 0.75rem;
  width: 12.5rem;
  border-bottom: 0.0625rem solid gray;
  margin-bottom: 0.75rem;
`;

// 내 메모 + 메모 추가하기 영역
const AddMemoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  width: 12rem;
  min-height: 3.375rem;
`;

// 내 메모
const SmallText = styled.div`
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 0.875rem;
  color: ${(props) => props.theme.Bg.color3};
`;

// 메모 추가하기 글씨 박스
const AddBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  width: 12rem;
  height: 1.75rem;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 140%;
  color: ${(props) => props.theme.Bg.mainColor5};
  :hover {
    background: #f1fbfe;
  }
`;

//메모 없을 때 알려주는 박스
const NoMemoSignBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  gap: 0.4rem;
`;

// 메모 없음 아이콘 큰사이즈
const MemoIconWrap = styled(Memo)`
  width: 8rem;
  height: 8rem;
  filter: brightness(0) invert(80%);
`;

//메모 없음 텍스트
const NoMemoText = styled.div`
  font-size: ${(props) => props.theme.Fs.size16};
  font-weight: 500;
  color: ${(props) => props.theme.Bg.color3};
  text-align: center;

  p:nth-child(1) {
    font-size: ${(props) => props.theme.Fs.size16};
    margin-bottom: 0.3rem;
  }

  p:nth-child(2) {
    font-size: ${(props) => props.theme.Fs.size12};
  }
`;

// 입력창 전체
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 12rem;
  background: #f1fbfe;
  border-radius: 0.25rem;
`;

// 입력창 내부
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  width: 12rem;
  height: auto;
`;

// 입력창 input에 대한 상세 style
const InputBar = styled.textarea`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0rem 0.25rem;
  background: #f1fbfe;
  min-height: 1rem;

  font-weight: 500;
  font-size: 16px;
  border: none;
  margin-bottom: 10px;
  height: auto;
  overflow: hidden;
  resize: none;
  ::placeholder {
    color: ${(props) => props.theme.Bg.color3};
    font-size: ${(props) => props.theme.Fs.size16};
  }
`;

const InputBarContent = styled(InputBar)`
  font-weight: 400;
  color: ${(props) => props.theme.Bg.color2};
  min-height: 1rem;

  font-weight: 500;
  font-size: 14px;
  ::placeholder {
    font-size: ${(props) => props.theme.Fs.size12};
  }
`;

const MemoSubmit = styled.button`
  display: flex;
  justify-content: center;
  width: fit-content;
  padding: 5px 12px;
  border-radius: 5px;
  font-size: ${(props) => props.theme.Fs.size12};
  color: ${(props) => props.theme.Bg.color1};
  background-color: ${(props) => props.theme.Bg.mainColor3};
  margin-left: auto;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border: none;
  :hover {
    color: ${(props) => props.theme.Bg.color6};
    background-color: ${(props) => props.theme.Bg.mainColor5};
    cursor: pointer;
  }
`;

//입력완료한 메모박스가 쌓이는 하단 영역
const UnderWrap = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  padding-bottom: 30px;
  gap: 0.75rem;

  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`;

//입력완료한 메모박스
const MemoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0.375rem;
  /* gap: 8px; */
  width: 12rem;
  height: auto;
  border: 0.0625rem solid ${(props) => props.theme.Bg.border1};
  border-radius: 0.25rem;
  word-break: break-word;
  :hover {
    background: #f1fbfe;
  }
`;

const UpperBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 11.5rem;

  justify-content: space-between;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: ${(props) => props.theme.Bg.color1};
`;

const TitleBox = styled.div`
  font-size: ${(props) => props.theme.Fs.size16};
  margin-bottom: 10px;
`;

const IconWrap = styled.div`
  position: relative;
  :hover {
    cursor: pointer;
  }
`;

const OptionsWrap = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  gap: 0.125rem;
  top: 1rem;
  right: 0.3125rem;
  width: 2.4rem;
  height: 1.875rem;
  border-radius: 0.3125rem;
  border: 0.0625rem solid black;
  background: white;
  :hover {
    background-color: ${(props) => props.theme.Bg.color3};
  }
`;

const UnderBox = styled.div`
  font-weight: normal;
  font-size: 0.75rem;
  line-height: 150%;
`;
