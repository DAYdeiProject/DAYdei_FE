import React from "react";
import styled from "styled-components";

export default function NotifiactionModalBox({ ...props }) {
  return (
    <>
      <NotificationWrapper>NotifiactionModalBox</NotificationWrapper>
    </>
  );
}

const NotificationWrapper = styled.div`
  position: absolute;
  top: 40px;
  right: 45px;
  z-index: 50;
  width: 334px;
  height: 210px;
  padding: 16px 14px 40px 14px;
  ${(props) => props.theme.BoxCustom}
  background-color: lavender;
`;
