import { debounce } from "lodash";
import styled from "styled-components";
import React, { useState, useEffect, useCallback } from "react";
import { TextSpan } from "./PostColor";
import { LocationWrapper, LocationContainer, ToggleContainer } from "./PostLocation";
import { ReactComponent as Up } from "../../../assets/defaultIcons/up.svg";
import { ReactComponent as Memo } from "../../../assets/calendarIcon/memo.svg";
import { ReactComponent as Down } from "../../../assets/defaultIcons/down.svg";

export default function PostContent({ ...props }) {
  const [inputValue, setInputValue] = useState("");
  const [isShowContent, setIsShowContent] = useState(false);

  const contentInputHandler = (text) => {
    props.setContent(text);
  };
  const debounceHandler = useCallback(
    debounce((text) => contentInputHandler(text), 500),
    []
  );
  useEffect(() => {
    debounceHandler(inputValue);
  }, [inputValue]);

  useEffect(() => {
    if (props.postDetail.length !== 0) {
      if (props.postDetail.content) {
        setInputValue(props.postDetail.content);
        setIsShowContent(true);
        props.setContent(props.postDetail.content);
      }
    }
  }, [props.postDetail]);

  return (
    <>
      <LocationWrapper>
        <LocationContainer onClick={isShowContent ? () => setIsShowContent(false) : () => setIsShowContent(true)}>
          <Memo />
          <TextSpan>
            <span>상세</span>
          </TextSpan>
          <ToggleContainer>{isShowContent ? <Up className="showToggle" /> : <Down className="showToggle" />}</ToggleContainer>
        </LocationContainer>
        <WriteContentBox isShow={isShowContent}>
          <TextareaBox>
            <textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          </TextareaBox>
        </WriteContentBox>
      </LocationWrapper>
    </>
  );
}

const WriteContentBox = styled.div`
  display: ${(props) => (props.isShow ? "block" : "none")};
  width: 100%;
  margin-top: 10px;
`;

const TextareaBox = styled.div`
  border: 1px solid ${(props) => props.theme.Bg.color3};
  border-radius: 8px;
  padding: 10px;

  textarea {
    width: 100%;
    height: 100px;
    font-size: 14px;
    border: none;
    resize: none;
  }
`;
