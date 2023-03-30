import { React, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getSubscribeList } from "../../../redux/modules/subscribeSlice";
import { SideSpaceWrapper } from "./CalendarSidebar";
import { __hideUser } from "../../../redux/modules/subscribeSlice";
import { click } from "@testing-library/user-event/dist/click";

function SubscribeListControl({ clickedButtonIds, setClickedButtonIds }) {
  // 클릭당한 버튼 아이디 추적
  console.log(clickedButtonIds);

  // 구독 목록 박스 열었을 때 내가 구독하는 유저 목록 GET
  const dispatch = useDispatch();

  //useSelector로 구독하는 유저 정보 가져오기
  const { SubscribesList, isLoadingSubscribe } = useSelector((state) => state.subscribe);
  console.log(SubscribesList);

  const showUserHandler = (id) => {
    dispatch(__hideUser(id));
    setClickedButtonIds((prev) => prev.filter((prevId) => prevId !== id));
  };

  const hideUserHandler = (id) => {
    dispatch(__hideUser(id));
    setClickedButtonIds((prev) => [...prev, id]);
  };

  const Button = ({ id }) => {
    if (clickedButtonIds.includes(id)) {
      return (
        <ButtonStyle
          onClick={() => {
            showUserHandler(id);
          }}>
          일정 표시
        </ButtonStyle>
      );
    }
    return (
      <ButtonStyle
        onClick={() => {
          hideUserHandler(id);
        }}>
        숨기기
      </ButtonStyle>
    );
  };

  return (
    <>
      <SideSpaceWrapper>
        <WholeBoxWrap>
          <TitleWrap>구독 List ({SubscribesList.length})</TitleWrap>
          {SubscribesList.map((user) => (
            <>
              <ContentWrap>
                <BoxWrap key={user.id}>
                  <div>{user.nickName ? user.nickName : "이름 없음"}</div>
                  <Button id={user.id} />
                </BoxWrap>
              </ContentWrap>
            </>
          ))}
        </WholeBoxWrap>
      </SideSpaceWrapper>
    </>
  );
}

export default SubscribeListControl;

const WholeBoxWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: pink; */
`;

const TitleWrap = styled.div`
  font-size: 28px;
  margin-top: 20px;
  margin-bottom: 50px;
`;

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
