import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { EventSourcePolyfill } from "event-source-polyfill";
import Cookies from "js-cookie";
import { useMediaQuery } from "react-responsive";

import SidebarMyCalendar from "../components/sidebar/SidebarMyCalendar";
import SidebarOtherCalendar from "../components/sidebar/SidebarOtherCalendar";
import { GetUserInfo } from "../utils/cookie/userInfo";
import { ReactComponent as Right } from "../assets/defaultIcons/right.svg";
import { ReactComponent as Left } from "../assets/defaultIcons/left.svg";

function Sidebar({ ...props }) {
  const token = Cookies.get("accessJWTToken");
  const param = useParams();
  const userInfo = GetUserInfo();

  // SSE 알림
  //  "Content-Type": "text/event-stream",
  //     Connection: "keep-alive",
  let eventConnect = "";
  useEffect(() => {
    console.log("sse--------");
    eventConnect = new EventSourcePolyfill(`https://sparta-daln.shop/api/connect`, {
      headers: {
        Authorization: token,
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
      },
      heartbeatTimeout: 3600000,
      withCredentials: true,
    });

    eventConnect.onMessage = (event) => {
      console.log("connect event ==> ", event.data);
      //const result = JSON.parse(event.data);
      //console.log("result json ==> ", result);
      //const data = checkJSON !== "EventStream" && JSON.parse(event.data);

      // if (!result.includes("EventStream")) {
      //   console.log("message===> ", result.content);
      //   //setSseData(result);
      //   //setIsMessageState(true);
      // }
    };
    return () => eventConnect.close();
  }, []);

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

  const { otherId } = useSelector((state) => state.usersInfo);
  //스크린 크기 1440 미만임을 감지
  const isShortScreen = useMediaQuery({ maxWidth: 1440 });
  const [isSideStyleOpen, setIsSideStyleOpen] = useState(false);
  // > 아이콘 누르면 사이드바 열리게끔
  const openSideStyleHandler = () => {
    setIsSideStyleOpen(!isSideStyleOpen);
  };

  console.log(isSideStyleOpen);

  return (
    <>
      {isShortScreen ? (
        isSideStyleOpen ? (
          !otherId ? (
            <WholeWrapper>
              <SideStyle isShort={isShortScreen}>
                <SidebarMyCalendar side={props.side} setDetailPostId={props.setDetailPostId} />
              </SideStyle>
              <SideStyleShort isSideStyleOpen={isSideStyleOpen}>
                <Left onClick={openSideStyleHandler} />
              </SideStyleShort>
            </WholeWrapper>
          ) : (
            <WholeWrapper>
              <SideStyle>
                <SidebarOtherCalendar otherId={otherId} />
              </SideStyle>
              <SideStyleShort>
                <Left onClick={openSideStyleHandler} />
              </SideStyleShort>
            </WholeWrapper>
          )
        ) : (
          <SideStyleShort>
            <Right onClick={openSideStyleHandler} />
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
  /* flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto; */
  height: 100%;
  border-right: 0.0313rem solid ${(props) => props.theme.Bg.color1};
  background: ${(props) => props.theme.Bg.color5};

  width: 34px;
  text-align: center;
  left: ${(props) => (props.isSideStyleOpen ? "21.875rem" : "0rem")};
  position: ${(props) => (props.isSideStyleOpen ? "absolute" : "relative")};
  z-index: ${(props) => (props.isSideStyleOpen ? 2 : 0)};

  /* & > div {
    width: 100%;
  } */

  @media screen and (max-width: 1440px) {
    display: block;
  }

  @media screen and (min-width: 1441px) {
    display: none;
  }
`;
