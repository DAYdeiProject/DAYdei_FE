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
import { CancelIconWrap } from "./CalendarSidebar";

function SubscribeListControl({ clickedButtonIds, setClickedButtonIds, isSubmit, setIsSubmit, setIsSubscribeBoxOpen }) {
  // 구독 목록 박스 열었을 때 내가 구독하는 유저 목록 GET
  const dispatch = useDispatch();
  const userInfo = GetUserInfo();
  const [requestStatus, setRequestStatus] = useState(false);

  //useSelector로 구독하는 유저 정보 가져오기
  const { statusCodeHide, SubscribesList, isLoadingSubscribe } = useSelector((state) => state.subscribe);
  // console.log(SubscribesList);

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
  // console.log(clickedButtonIds);

  return (
    <>
      <SideSpaceWrapper>
        <MemoTitle>
          <div>구독 캘린더</div>
          <CancelIconWrap>
            <Cancel onClick={() => setIsSubscribeBoxOpen(false)} />
          </CancelIconWrap>
        </MemoTitle>
        <GapArea />
        <ContentWrap>
          <MembersArea>
            <SmallTitleWrap>구독 캘린더</SmallTitleWrap>
            <SubListContainer>
              {SubscribesList.filter((user) => user.isVisible).map((user) => (
                <BoxWrap key={user.id}>
                  <PhotoFrame src={user.profileImage ? user.profileImage : defaultProfile}></PhotoFrame>
                  <div>{user.nickName ? user.nickName : "이름 없음"}</div>
                  <Button id={user.id} isVisible={user.isVisible} />
                </BoxWrap>
              ))}
            </SubListContainer>
          </MembersArea>
          <MembersArea>
            <HideTitleWrap>숨김 캘린더</HideTitleWrap>
            <SubListContainer>
              {SubscribesList.filter((user) => user.isVisible === false).map((user) => (
                <BoxWrap key={user.id}>
                  <PhotoFrame src={user.profileImage ? user.profileImage : defaultProfile}></PhotoFrame>
                  <div>{user.nickName ? user.nickName : "이름 없음"}</div>
                  <Button id={user.id} isVisible={user.isVisible} />
                </BoxWrap>
              ))}
            </SubListContainer>
          </MembersArea>
        </ContentWrap>
      </SideSpaceWrapper>
    </>
  );
}

export default SubscribeListControl;

export const SideSpaceWrapper = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15rem;
  height: calc(1080px - 4rem - 0.0625rem);
  background-color: white;

  z-index: 1;
  flex-shrink: 0;
  border-left: 0.0625rem solid ${(props) => props.theme.Bg.color2};
  padding: 1.25rem 0;

  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 1440px) {
    position: absolute;
    right: 0;
  }
`;

export const GapArea = styled.div`
  height: 0.75rem;
  width: 13rem;
  border-bottom: 0.0625rem solid gray;
  margin-bottom: 0.75rem;
`;

const ContentWrap = styled.div`
  display: flex;
  width: 12rem;
  flex-direction: column;
  gap: 1.5rem;
`;

const MembersArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  height: 445px;
  @media screen and (max-height: 1064px) {
    height: 430px;
  }
  @media screen and (max-height: 1022px) {
    height: 400px;
  }
  @media screen and (max-height: 960px) {
    height: 380px;
  }
  @media screen and (max-height: 922px) {
    height: 360px;
  }
  @media screen and (max-height: 882px) {
    height: 340px;
  }
  @media screen and (max-height: 840px) {
    height: 320px;
  }
  @media screen and (max-height: 800px) {
    height: 300px;
  }
  @media screen and (max-height: 762px) {
    height: 280px;
  }
  @media screen and (max-height: 722px) {
    height: 260px;
  }
  @media screen and (max-height: 700px) {
    height: 240px;
  }
`;

const SmallTitleWrap = styled.div`
  width: 100%;
  height: 0.875rem;

  font-weight: 400;
  font-size: ${(props) => props.theme.Fs.size12};
  line-height: 0.875rem;
  color: ${(props) => props.theme.Bg.color2};
`;

const HideTitleWrap = styled(SmallTitleWrap)`
  border-top: 1px solid ${(props) => props.theme.Bg.color3};
  padding-top: 15px;
  padding-bottom: 10px;
`;

const SubListContainer = styled.div`
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const BoxWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.1875rem;
  align-items: center;
  width: 100%;
  height: 1.75rem;
  font-size: ${(props) => props.theme.Fs.size14};
  font-weight: 600;
  line-height: 1.0625rem;
`;

export const PhotoFrame = styled.img`
  padding: 0rem;
  margin-right: 0.5rem;

  width: 1rem;
  height: 1rem;
  border-radius: 50%;
`;

const ButtonStyle = styled.div`
  margin-left: auto;
  width: 1.875rem;
  height: 1.25rem;
  border: 0.0625rem solid black;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 0.625rem;
  border-radius: 0.3125rem;
  background-color: ${(props) => (props.isVisible ? "#FBDF96" : "white")};
  :hover {
    cursor: pointer;
  }
`;
