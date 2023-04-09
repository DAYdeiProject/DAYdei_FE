import React, { useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { EventSourcePolyfill } from "event-source-polyfill";
import Cookies from "js-cookie";

import SidebarMyCalendar from "../components/sidebar/SidebarMyCalendar";
import SidebarOtherCalendar from "../components/sidebar/SidebarOtherCalendar";
import { GetUserInfo } from "../utils/cookie/userInfo";
import { useSelector } from "react-redux";

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

  return (
    <>
      {!otherId ? (
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

const SideStyle = styled.div`
  width: 21.875rem;
  height: 100%;
  border-right: 0.5px solid ${(props) => props.theme.Bg.color1};
  background: ${(props) => props.theme.Bg.color5};
  position: relative;
`;
