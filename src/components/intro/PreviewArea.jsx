import React from "react";
import styled from "styled-components";
import mainImg from "../../assets/defaultImage/mainImg.png";

export default function PreviewArea() {
  return (
    <>
      <PreviewWrapper>
        <ImgWarpper>
          <img src={mainImg} />
        </ImgWarpper>
      </PreviewWrapper>
    </>
  );
}
const ImgWarpper = styled.div`
  img {
    width: 100%;
    height: calc(100vh - 4rem - 0.0625rem);
    border: none;
    @media screen and (max-height: 1032.22px) {
      height: 1032.22px;
    }
    @media screen and (max-height: 929px) {
      height: 929px;
    }
    @media screen and (max-height: 844.55px) {
      height: 844.55px;
    }
    @media screen and (max-height: 743.2px) {
      height: 743.2px;
    }
    @media screen and (max-height: 619.33px) {
      height: 619.33px;
    }
  }
`;
const PreviewWrapper = styled.div`
  ${(props) => props.theme.FlexCol};
  background-color: ${(props) => props.theme.Bg.calendar2};
  overflow: hidden;
  width: 70%;
`;
