import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __addMemo, __getMemos } from "../../../redux/modules/memosSlice";

export default function CalendarSidebar() {
  //창의 열고닫힘 상태
  const [isTodoBoxOpen, setIsTodoBoxOpen] = useState(false);
  const [isSubscribeBoxOpen, setIsSubscribeBoxOpen] = useState(false);
  const [isAddMemoBoxOpen, setIsAddMemoBoxOpen] = useState(true);
  const [isInputBoxOpen, setIsInputBoxOpen] = useState(false);
  //메모에 적히는 제목,내용 상태
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //메모리스트 상태 추적
  const [memos, setMemos] = useState([]);

  //메모 상태변경 추적
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

  const statusCodeMemo = useSelector((state) => state.memos.statusCode);
  const updatedMemos = useSelector((state) => state.memos.updatedMemos);
  // console.log("셀렉터로 불러온 updatedMemos -->", updatedMemos);

  useEffect(() => {
    dispatch(__getMemos());
  }, []);

  useEffect(() => {
    if (statusCodeMemo === 200) {
      setMemos(updatedMemos);
    }
  }, [statusCodeMemo, updatedMemos]);

  //console.log("마지막최신화 memo-->", memos);

  return (
    <>
      <SidebarWrapper>
        <div onClick={handleTodoBoxOpen}>
          todo
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
              <div>Memos</div>
              <div>
                {memos.map((memo) => (
                  <>
                    <MemoBox>
                      <ContentWrapper>
                        <InputWrapper>{memo.title}</InputWrapper>
                        <InputWrapper>{memo.content}</InputWrapper>
                      </ContentWrapper>
                    </MemoBox>
                  </>
                ))}
              </div>
            </SideSpaceWrapper>
          )}
        </div>
        <div onClick={handleSubscribeBoxOpen}>
          구독
          {isSubscribeBoxOpen && <SideSpaceWrapper>구독자목록</SideSpaceWrapper>}
        </div>
      </SidebarWrapper>
    </>
  );
}

const SidebarWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  justify-content: flex-start;
  position: relative;
  //width: 500px;
  width: 50px;
  height: 100%;
  gap: 50px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.Bg.mainColor};
  cursor: pointer;
  /* background-color: pink; */
`;

const SideSpaceWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  right: 40px;
  width: 250px; /* adjust this value to change the width of the side space */
  height: 100%;
  background-color: white;
  z-index: 10;
  flex-shrink: 0;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
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
  padding-right: 10px;
  width: 100%;
  /* background-color: yellow; */
`;

const Button = styled.div`
  width: 50px;
  background-color: lightgray;
  border-radius: 4px;
  text-align: center;
  padding: 3px;
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
