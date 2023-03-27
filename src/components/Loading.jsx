import React from "react";
import styled from "styled-components";
import { PulseLoader, ScaleLoader, SyncLoader, FadeLoader, BeatLoader } from "react-spinners";

export default function Loading({ loading }) {
  return (
    <LoadingBackground>
      <BeatLoader color="#c95d5d" loading={loading} size={20} />
    </LoadingBackground>
  );
}

const LoadingBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
