import { React, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getSubscribeList } from "../../../redux/modules/subscribeSlice";
import { MemoTitle, SideSpaceWrapper } from "./CalendarSidebar";
import { __hideUser } from "../../../redux/modules/subscribeSlice";
import { ReactComponent as Cancel } from "../../../assets/defaultIcons/dismiss.svg";

function SubscribeListControl({ clickedButtonIds, setClickedButtonIds, isSubmit, setIsSubmit, setIsSubscribeBoxOpen }) {
  // 구독 목록 박스 열었을 때 내가 구독하는 유저 목록 GET
  const dispatch = useDispatch();
  const params = useParams();
  const [requestStatus, setRequestStatus] = useState(false);

  //useSelector로 구독하는 유저 정보 가져오기
  const { statusCodeHide, SubscribesList, isLoadingSubscribe } = useSelector((state) => state.subscribe);
  console.log(SubscribesList);

  useEffect(() => {
    const id = params.id;
    let url = `${id}?sort=name&searchword=`;
    console.log("검색어 없는 url-->", url);

    dispatch(__getSubscribeList(url));
  }, [requestStatus]);

  const showUserHandler = (id) => {
    dispatch(__hideUser(id)).then((data) => {
      if (!data.error) {
        setRequestStatus(!requestStatus);
        setIsSubmit(!isSubmit);
      }
    });
    setClickedButtonIds((prev) => prev.filter((prevId) => prevId !== id));
  };

  const hideUserHandler = (id) => {
    dispatch(__hideUser(id)).then((data) => {
      if (!data.error) {
        setRequestStatus(!requestStatus);
        setIsSubmit(!isSubmit);
      }
    });
    setClickedButtonIds((prev) => [...prev, id]);
  };

  const Button = ({ id, isVisible }) => {
    if (isVisible) {
      return (
        <ButtonStyle
          onClick={() => {
            showUserHandler(id);
          }}>
          숨기기
        </ButtonStyle>
      );
    }
    return (
      <ButtonStyle
        onClick={() => {
          hideUserHandler(id);
        }}>
        일정표시
      </ButtonStyle>
    );
  };
  console.log(clickedButtonIds);

  return (
    <>
      <SideSpaceWrapper>
        <MemoTitle>
          <div>구독 List ({SubscribesList.length})</div>
          <Cancel onClick={() => setIsSubscribeBoxOpen(false)} />
        </MemoTitle>

        {SubscribesList.map((user) => (
          <>
            <ContentWrap>
              <BoxWrap key={user.id}>
                <div>{user.nickName ? user.nickName : "이름 없음"}</div>
                <Button id={user.id} isVisible={user.isVisible} />
              </BoxWrap>
            </ContentWrap>
          </>
        ))}
      </SideSpaceWrapper>
    </>
  );
}

export default SubscribeListControl;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;

  /* background-color: pink; */
`;

const BoxWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3px;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.Fs.size18};
  font-weight: 800;
  width: 200px;
  /* background-color: yellow; */
`;

const ButtonStyle = styled.div`
  margin-left: auto;
  border: 1px solid black;
  font-size: ${(props) => props.theme.Fs.size14};
  padding: 8px 10px;
  border-radius: 5px;
  :hover {
    cursor: pointer;
  }
  /* background-color: pink; */
`;
