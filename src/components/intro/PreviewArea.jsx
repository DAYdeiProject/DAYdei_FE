import React from "react";
import styled from "styled-components";
import mainImg from "../../assets/defaultImage/mainImg.png";
import previewMain from "../../assets/defaultImage/previewMain.gif";
import main from "../../assets/defaultImage/main.gif";

export default function PreviewArea() {
  return (
    <>
      <Wrapprer>
        <PreviewWrapper>
          <ImgWarpper>
            <img src={main} />
          </ImgWarpper>
        </PreviewWrapper>
      </Wrapprer>
    </>
  );
}

const Wrapprer = styled.div`
  ${(props) => props.theme.FlexCol};
  overflow: hidden;
  width: 70%;
  height: 100%;
`;
const PreviewWrapper = styled.div`
  ${(props) => props.theme.FlexCol};
  justify-content: flex-start;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const ImgWarpper = styled.div`
  img {
    width: 100%;
    // height: 100%;
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
