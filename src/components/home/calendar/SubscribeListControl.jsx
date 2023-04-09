import styled from "styled-components";
import { useParams } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MemoTitle } from "./CalendarSidebar";
import { GetUserInfo } from "../../../utils/cookie/userInfo";
import { __hideUser } from "../../../redux/modules/subscribeSlice";
import { __getSubscribeList } from "../../../redux/modules/subscribeSlice";
import defaultProfile from "../../../assets/defaultImage/profile.jpg";
import { ReactComponent as Cancel } from "../../../assets/defaultIcons/dismiss.svg";

function SubscribeListControl({ clickedButtonIds, setClickedButtonIds, isSubmit, setIsSubmit, setIsSubscribeBoxOpen }) {
  // 구독 목록 박스 열었을 때 내가 구독하는 유저 목록 GET
  const dispatch = useDispatch();
  const userInfo = GetUserInfo();
  const [requestStatus, setRequestStatus] = useState(false);

  //useSelector로 구독하는 유저 정보 가져오기
  const { statusCodeHide, SubscribesList, isLoadingSubscribe } = useSelector((state) => state.subscribe);
  console.log(SubscribesList);

  useEffect(() => {
    const id = userInfo.userId;
    let url = `${id}?sort=name&searchword=`;
    //console.log("검색어 없는 url-->", url);

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
          isVisible={isVisible}
          onClick={() => {
            showUserHandler(id);
          }}>
          표시
        </ButtonStyle>
      );
    }
    return (
      <ButtonStyle
        onClick={() => {
          hideUserHandler(id);
        }}>
        숨김
      </ButtonStyle>
    );
  };
  console.log(clickedButtonIds);

  return (
    <>
      <SideSpaceWrapper>
        <MemoTitle>
          <div>구독 캘린더</div>
          <Cancel onClick={() => setIsSubscribeBoxOpen(false)} />
        </MemoTitle>
        <GapArea />
        <ContentWrap>
          <MembersArea>
            <SmallTitleWrap>구독 캘린더</SmallTitleWrap>
            {SubscribesList.filter((user) => user.isVisible).map((user) => (
              <BoxWrap key={user.id}>
                <PhotoFrame src={user.profileImage ? user.profileImage : defaultProfile}></PhotoFrame>
                <div>{user.nickName ? user.nickName : "이름 없음"}</div>
                <Button id={user.id} isVisible={user.isVisible} />
              </BoxWrap>
            ))}
          </MembersArea>
          <MembersArea>
            <SmallTitleWrap>숨김 캘린더</SmallTitleWrap>
            {SubscribesList.filter((user) => user.isVisible === false).map((user) => (
              <BoxWrap key={user.id}>
                <PhotoFrame src={user.profileImage ? user.profileImage : defaultProfile}></PhotoFrame>
                <div>{user.nickName ? user.nickName : "이름 없음"}</div>
                <Button id={user.id} isVisible={user.isVisible} />
              </BoxWrap>
            ))}
          </MembersArea>
        </ContentWrap>
      </SideSpaceWrapper>
    </>
  );
}

export default SubscribeListControl;

export const SideSpaceWrapper = styled.div`
  position: fixed;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 240px;
  height: 100%;
  background-color: white;
  overflow: auto;
  z-index: 1;
  flex-shrink: 0;
  border-left: 1px solid black;
  padding-top: 20px;
  ::-webkit-scrollbar {
    display: none;
  }
  /* background: blue; */
`;

export const GapArea = styled.div`
  height: 12px;
  width: 192px;
  border-bottom: 1px solid gray;
  margin-bottom: 12px;
  /* background: yellow; */
`;

const ContentWrap = styled.div`
  display: flex;
  width: 192px;
  flex-direction: column;
  gap: 24px;
`;

const MembersArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SmallTitleWrap = styled.div`
  width: 100%;
  height: 14px;

  font-weight: 400;
  font-size: ${(props) => props.theme.Fs.size12};
  line-height: 14px;
  color: ${(props) => props.theme.Bg.fontColor3};
`;

const BoxWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3px;
  align-items: center;
  width: 100%;
  height: 28px;
  font-size: ${(props) => props.theme.Fs.size14};
  font-weight: 600;
  line-height: 17px;
  /* background-color: yellow; */
`;

export const PhotoFrame = styled.img`
  padding: 0px;
  margin-right: 8px;

  width: 16px;
  height: 16px;
  border-radius: 50%;
`;

const ButtonStyle = styled.div`
  margin-left: auto;
  width: 30px;
  height: 20px;
  border: 1px solid black;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.isVisible ? "#FBDF96" : "white")};
  :hover {
    cursor: pointer;
  }
`;
