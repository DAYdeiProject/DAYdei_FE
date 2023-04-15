import Cookies from "js-cookie";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import { liveNotiState, newNotificationComment, newNotificationState, otherIdState, textState } from "../redux/modules/headerReducer";
import useOutsideClick from "../hooks/useOutsideClick";
import SidebarMyCalendar from "../components/sidebar/SidebarMyCalendar";
import SidebarOtherCalendar from "../components/sidebar/SidebarOtherCalendar";
import { ReactComponent as Left } from "../assets/defaultIcons/left.svg";
import { ReactComponent as Right } from "../assets/defaultIcons/right.svg";

function Sidebar({ ...props }) {
  const outside = useRef();
  const token = Cookies.get("accessJWTToken");
  const dispatch = useDispatch();
  const location = useLocation();

  // 다른 유저캘린더 갔을때
  const { otherId, text } = useSelector((state) => state.header);

  // SSE 알림
  let eventConnect = "";
  useEffect(() => {
    eventConnect = new EventSourcePolyfill(`https://sparta-daln.shop/api/subscribe`, {
      headers: {
        Authorization: token,
      },
      heartbeatTimeout: 3600000,
      withCredentials: true,
    });

    eventConnect.onmessage = (event) => {
      if (!event.data.includes("EventStream")) {
        const result = JSON.parse(event.data);
        dispatch(newNotificationState(true));
        dispatch(newNotificationComment({ message: result.content }));
        dispatch(liveNotiState(true));
        if (text !== "home") {
          dispatch(textState(text));
        } else if (otherId) {
          dispatch(otherIdState(otherId));
        }
      }
    };
    return () => eventConnect.close();
  }, []);

  //스크린 크기 1518 미만임을 감지
  const isShortScreen = useMediaQuery({ maxWidth: 1518 });
  const [isSideStyleOpen, setIsSideStyleOpen] = useState(false);
  // > 아이콘 누르면 사이드바 열리게끔
  const openSideStyleHandler = () => {
    setIsSideStyleOpen(!isSideStyleOpen);
  };

  // 1518 일때 사이드 바깥영역 클릭시 닫히게
  const closeSide = () => {
    if (isShortScreen) {
      setIsSideStyleOpen(false);
    }
  };
  useOutsideClick(outside, closeSide);

  console.log("sidebar location-->", location.pathname);
  return (
    <>
      {isShortScreen ? (
        location.pathname === "/other" || location.pathname === "/friendsdetail" ? (
          <SideOtherStyle>
            <SidebarOtherCalendar otherId={otherId} />
          </SideOtherStyle>
        ) : isSideStyleOpen ? (
          <WholeWrapper ref={outside}>
            <SideStyle isShort={isShortScreen}>
              <SidebarMyCalendar side={props.side} setDetailPostId={props.setDetailPostId} />
            </SideStyle>
            <SideStyleShort onClick={openSideStyleHandler}>
              <IconWrapper isSideStyleOpen={isSideStyleOpen}>
                <Left />
              </IconWrapper>
            </SideStyleShort>
          </WholeWrapper>
        ) : (
          <SideStyleShort onClick={openSideStyleHandler}>
            <IconWrapper>
              <Right />
            </IconWrapper>
          </SideStyleShort>
        )
      ) : location.pathname !== "/other" && location.pathname !== "/friendsdetail" ? (
        <SideStyle>
          <SidebarMyCalendar side={props.side} setDetailPostId={props.setDetailPostId} />
        </SideStyle>
      ) : (
        <SideOtherStyle>
          <SidebarOtherCalendar otherId={otherId} />
        </SideOtherStyle>
      )}
    </>
  );
}

export default Sidebar;

const WholeWrapper = styled.div`
  display: flex;
  height: calc(1080px - 4rem - 0.0625rem);
  position: absolute;
`;

const SideStyle = styled.div`
  // 사이드
  min-width: 21.875rem;
  max-width: 21.875rem;
  height: calc(1080px - 4rem - 0.0625rem);

  border-right: 0.0313rem solid ${(props) => props.theme.Bg.color1};
  background: ${(props) => props.theme.Bg.color5};

  @media screen and (max-width: 1518px) {
    position: absolute;
    z-index: 2;
  }
`;

const SideOtherStyle = styled.div`
  // 사이드
  min-width: 21.875rem;
  max-width: 21.875rem;
  height: calc(1080px - 4rem - 0.0625rem);

  @media screen and (max-width: 1518px) {
    position: absolute;
    z-index: 5;
  }
`;

const SideStyleShort = styled.div`
  //미니 왼쪽
  height: calc(1080px - 4rem - 0.0625rem);
`;

const IconWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  width: 2.125rem;
  height: calc(1080px - 4rem - 0.0625rem);
  border-right: 1px solid ${(props) => props.theme.Bg.color2};
  border-left: ${(props) => props.isSideStyleOpen && `1px solid ${props.theme.Bg.color2}`};
  background: ${(props) => props.theme.Bg.color5};

  position: absolute;
  z-index: 50;
  left: ${(props) => (props.isSideStyleOpen ? "270px" : "0rem")};
  transform: ${(props) => (props.isSideStyleOpen ? "translateX(100%)" : "translateX(0)")};

  @media screen and (max-height: 1080px) {
    height: calc(101vh - 4rem - 0.0625rem);
  }
  :hover {
    cursor: pointer;
  }
`;
