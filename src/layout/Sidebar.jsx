import React, { useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { EventSourcePolyfill } from "event-source-polyfill";
import Cookies from "js-cookie";

import SidebarMyCalendar from "../components/sidebar/SidebarMyCalendar";
import SidebarOtherCalendar from "../components/sidebar/SidebarOtherCalendar";
import { GetUserInfo } from "../utils/cookie/userInfo";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { newNotificationState } from "../redux/modules/headerReducer";
import SseMessageBox from "../components/SseMessageBox";

function Sidebar({ ...props }) {
  const token = Cookies.get("accessJWTToken");
  const param = useParams();
  const userInfo = GetUserInfo();
  const [sseState, setSseState] = useState(false);
  const dispatch = useDispatch();

  // 다른 유저캘린더 갔을때
  const { otherId, notiState } = useSelector((state) => state.header);
  //const { notiState } = useSelector((state) => state.header);

  // SSE 알림
  let eventConnect = "";
  let message = "";
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
        setSseState(true);
        console.log("sse message==>", result);

        //message = result.content.split("@");
        //console.log("split message", message);
      }
    };
    return () => eventConnect.close();
  }, []);

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
      {notiState && <SseMessageBox isState={notiState.state} isMessage={notiState.message} />}
    </>
  );
}

export default Sidebar;

const SideStyle = styled.div`
  min-width: 21.875rem;
  max-width: 21.875rem;
  height: 100%;
  border-right: 0.0313rem solid ${(props) => props.theme.Bg.color1};
  background: ${(props) => props.theme.Bg.color5};
  position: relative;
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
