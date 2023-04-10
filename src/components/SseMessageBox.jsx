import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

export default function SseMessageBox({ ...props }) {
  //const { notiState } = useSelector((state) => state.header);

  // console.log("메세지 박스에서===>", notiState);

  return (
    <>
      <MessageBox isState={props.isState}>
        <span>{props.isMessage}</span>
        <span></span>
      </MessageBox>
    </>
  );
}

const MessageBox = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;

  width: 300px;
  height: 200px;
  z-index: 500;
  background-color: lightcoral;
  //transform: ${(props) => !props.isState && "transLateY(100%)"};
  //transition: transform 0.5s;
  /* position: absolute;
  bottom: 0rem;
  right: 0;
  width: 18.75rem;
  height: 9.375rem;
  background-color: #ffffff;
  border: 0.0625rem solid black;
  padding: 1.25rem;
  transform: ${(props) => !props.isMessage && "transLateY(100%)"};
  transition: transform 0.5s; */
`;
