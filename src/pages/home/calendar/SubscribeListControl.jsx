import { React, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getSubscribeList } from "../../../redux/modules/subscribeSlice";
import { SideSpaceWrapper } from "./CalendarSidebar";

function SubscribeListControl({ isSubscribeBoxOpen }) {
  const [isCheckBoxClicked, setIsCheckBoxClicked] = useState("");
  // 구독 목록 박스 열었을 때 내가 구독하는 유저 목록 GET
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    const id = params.id;
    let url = `${id}?sort=name&searchword=`;
    dispatch(__getSubscribeList(url));
  }, [isSubscribeBoxOpen]);

  //useSelector로 구독하는 유저 정보 가져오기
  const { SubscribesList, isLoadingSubscribe } = useSelector((state) => state.subscribe);
  console.log(SubscribesList);

  const onClickCheckBoxHandler = () => {
    setIsCheckBoxClicked(!isCheckBoxClicked);
  };

  return (
    <>
      <SideSpaceWrapper>
        <WholeBoxWrap>
          <TitleWrap>구독자 List</TitleWrap>
          {SubscribesList.map((user) => (
            <>
              <ContentWrap key={user.id}>
                <BoxWrap>
                  <div>{user.nickName}</div>
                  <input type="checkbox" checked={true} onChange={onClickCheckBoxHandler} />
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
  /* background-color: yellow; */
  font-size: 24px;

  input {
    margin-left: 20px;
    height: 20px;
    width: 20px;
  }
`;
