import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { EventSourcePolyfill } from "event-source-polyfill";
import Cookies from "js-cookie";
import { useMediaQuery } from "react-responsive";
import SidebarMyCalendar from "../components/sidebar/SidebarMyCalendar";
import SidebarOtherCalendar from "../components/sidebar/SidebarOtherCalendar";
import { liveNotiState, newNotificationState, otherIdState, textState } from "../redux/modules/headerReducer";
import SseMessageBox from "../components/SseMessageBox";
import { ReactComponent as Right } from "../assets/defaultIcons/right.svg";
import { ReactComponent as Left } from "../assets/defaultIcons/left.svg";

function Sidebar({ ...props }) {
  const token = Cookies.get("accessJWTToken");
  const dispatch = useDispatch();

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
        dispatch(newNotificationState({ newState: true, message: result.content }));
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

  //스크린 크기 1440 미만임을 감지
  const isShortScreen = useMediaQuery({ maxWidth: 1440 });
  const [isSideStyleOpen, setIsSideStyleOpen] = useState(false);
  // > 아이콘 누르면 사이드바 열리게끔
  const openSideStyleHandler = () => {
    setIsSideStyleOpen(!isSideStyleOpen);
  };

  return (
    <>
      {isShortScreen ? (
        otherId && window.location.pathname === "/other" ? (
          <SideStyle>
            <SidebarOtherCalendar otherId={otherId} />
          </SideStyle>
        ) : isSideStyleOpen ? (
          <WholeWrapper>
            <SideStyle isShort={isShortScreen}>
              <SidebarMyCalendar side={props.side} setDetailPostId={props.setDetailPostId} />
            </SideStyle>
            <SideStyleShort isSideStyleOpen={isSideStyleOpen}>
              <IconWrapper>
                <Left onClick={openSideStyleHandler} />
              </IconWrapper>
            </SideStyleShort>
          </WholeWrapper>
        ) : (
          <SideStyleShort>
            <IconWrapper>
              <Right onClick={openSideStyleHandler} />
            </IconWrapper>
          </SideStyleShort>
        )
      ) : !otherId ? (
        <SideStyle>
          <SidebarMyCalendar side={props.side} setDetailPostId={props.setDetailPostId} />
        </SideStyle>
      ) : (
        <SideStyle>
          <SidebarOtherCalendar otherId={otherId} />
        </SideStyle>
      )}
      <SseMessageBox />
    </>
  );
}

export default Sidebar;

const WholeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  position: absolute;
`;

const SideStyle = styled.div`
  min-width: 21.875rem;
  max-width: 21.875rem;
  height: 100%;
  border-right: 0.0313rem solid ${(props) => props.theme.Bg.color1};
  background: ${(props) => props.theme.Bg.color5};
  position: ${(props) => (props.isSideStyleOpen ? "absolute" : "relative")};

  @media screen and (max-width: 1440px) {
    position: absolute;
    z-index: 2;
  }

  /* z-index: ${(props) => (props.isShort ? 10 : 0)}; */
`;

const SideStyleShort = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-right: 0.0313rem solid ${(props) => props.theme.Bg.color1};
  background: ${(props) => props.theme.Bg.color5};

  width: 2.125rem;
  text-align: center;
  left: ${(props) => (props.isSideStyleOpen ? "21.875rem" : "0rem")};
  /* position: ${(props) => (props.isSideStyleOpen ? "absolute" : "relative")}; */
  position: absolute;
  z-index: ${(props) => (props.isSideStyleOpen ? 2 : 0)};

  @media screen and (max-width: 1440px) {
    /* display: block; */
  }

  @media screen and (min-width: 1441px) {
    display: none;
  }
  /* background-color: skyblue; */
`;

const IconWrapper = styled.div`
  svg:hover {
    cursor: pointer;
  }
  /* background-color: pink; */
`;

// 실시간 알림창
// useEffect(() => {
//   let timer;
//   if (isMessageState) {
//     timer = setTimeout(() => {
//       setIsMessageState(false);
//     }, 3000); // 4초 후 모달이 자동으로 닫힘
//   }
//   return () => {
//     clearTimeout(timer);
//   };
// }, [isMessageState]);
