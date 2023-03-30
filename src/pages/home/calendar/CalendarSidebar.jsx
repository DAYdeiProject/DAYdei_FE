import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";
import { __addMemo, __getMemos, __deleteMemo, __fixMemo } from "../../../redux/modules/memosSlice";
import { ReactComponent as Star } from "../../../assets/lcon/star.svg";
import { ReactComponent as Note } from "../../../assets/lcon/note.svg";
import { useParams } from "react-router-dom";
import { __getSubscribeList } from "../../../redux/modules/subscribeSlice";
import SubscribeListControl from "./SubscribeListControl";

export default function CalendarSidebar() {
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
  //수정할 메모박스 추적
  const [clickedMemoId, setClickedMemoId] = useState(null);
  //클릭된 구독리스트 유저 아이디 추적
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
    setIsInputBoxOpen(true);
    setIsAddMemoBoxOpen(false);
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

  return (
    <>
      {isTodoBoxOpen && (
        <SideSpaceWrapper onClick={(e) => e.stopPropagation()}>
          {isAddMemoBoxOpen && <AddMemoBox onClick={handleInputBoxOpen}>+ 메모 작성하기</AddMemoBox>}
          {isInputBoxOpen && (
            <InputBox>
              <ContentWrapper>
                <InputWrapper>
                  제목 : <SearchBar type="text" value={title} onChange={handleTitleChange} autoFocus />
                </InputWrapper>
                <InputWrapper>
                  내용 :<SearchBar type="text" value={content} onChange={handleContentChange} />
                </InputWrapper>
              </ContentWrapper>
              <ButtonWrapper>
                <Button onClick={submitMemoHandler}>완료</Button>
              </ButtonWrapper>
            </InputBox>
          )}
          <MemoText>Memos</MemoText>
          <div>
            {updatedMemos.map((memo) => (
              <div key={memo.id}>
                {clickedMemoId === memo.id ? (
                  <MemoBox>
                    <ContentWrapper>
                      <InputWrapper>
                        <input type="text" placeholder="제목" value={fixedTitle} onChange={handleFixedTitleChange} />
                      </InputWrapper>
                      <InputWrapper>
                        <input type="text" placeholder="내용" value={fixedContent} onChange={handleFixedContentChange} />
                      </InputWrapper>
                      <MemoBoxButtonWrapper>
                        <FixButton onClick={() => fixMemoHandler(memo.id)}>수정</FixButton>
                      </MemoBoxButtonWrapper>
                    </ContentWrapper>
                  </MemoBox>
                ) : (
                  <MemoBox>
                    <ContentWrapper>
                      <InputWrapper>{memo.title}</InputWrapper>
                      <InputWrapper>{memo.content}</InputWrapper>
                    </ContentWrapper>
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
          </div>
        </SideSpaceWrapper>
      )}
      {isSubscribeBoxOpen && <SubscribeListControl clickedButtonIds={clickedButtonIds} setClickedButtonIds={setClickedButtonIds} />}
      <SidebarWrapper>
        <div onClick={handleTodoBoxOpen}>
          <Note />
        </div>
        <div onClick={handleSubscribeBoxOpen}>
          <Star />
        </div>
      </SidebarWrapper>
    </>
  );
}

const SidebarWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  justify-content: flex-start;
  width: 46px;
  height: 100%;
  gap: 30px;
  padding-top: 50px;
  border-left: solid 1px #121212;
  cursor: pointer;
`;

export const SideSpaceWrapper = styled.div`
  display: flex;
  bottom: 0px;
  right: 40px;
  width: 250px; /* adjust this value to change the width of the side space */
  height: 100%;
  background-color: white;
  overflow: auto;
  z-index: 10;
  flex-shrink: 0;
  border: 1px solid black;

  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const AddMemoBox = styled.div`
  display: flex;
  padding-left: 5px;
  align-items: center;
  width: 200px;
  border-radius: 4px;
  height: 50px;
  border: 1px solid black;
  margin-bottom: 30px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 225px;
  /* height: 200px; */
  border-radius: 4px;
  height: 100px;
  border: 1px solid black;
  margin-bottom: 30px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  gap: 4px;
  margin-bottom: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const SearchBar = styled.input`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-left: 5px;
  padding: 5px;

  border-radius: 4px;
  width: 100px;
  max-height: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  padding-right: 5px;
  width: 100%;
  gap: 10px;
`;

const Button = styled.div`
  width: 50px;
  background-color: lightgray;
  border-radius: 4px;
  text-align: center;
  padding: 3px;
  margin-bottom: 3px;
`;

const MemoText = styled.div`
  margin-bottom: 30px;
`;

const MemoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 225px;
  /* height: 200px; */
  border-radius: 4px;
  height: 100px;
  border: 1px solid black;
  margin-bottom: 10px;
`;

const MemoBoxButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  padding-right: 5px;
  width: 100%;
  gap: 10px;
  margin-top: 10px;
`;

const FixButton = styled.div`
  width: 50px;
  background-color: lightgray;
  border-radius: 4px;
  text-align: center;
  padding: 3px;
`;
