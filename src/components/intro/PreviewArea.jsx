import React from "react";
import styled from "styled-components";
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
    height: calc(1080px - 4rem - 0.0625rem);
    border: none;

    @media screen and (max-height: 1080px) {
      height: calc(100vh - 4rem - 0.0625rem);
    }
  }
`;
