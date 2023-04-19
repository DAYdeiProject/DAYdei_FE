import { debounce } from "lodash";
import styled from "styled-components";
import React, { useEffect, useState, useCallback } from "react";
import { TextSpan } from "./PostColor";
import { ReactComponent as Up } from "../../../assets/defaultIcons/up.svg";
import { ReactComponent as Down } from "../../../assets/defaultIcons/down.svg";
import { ReactComponent as Location } from "../../../assets/calendarIcon/location.svg";

export default function PostLocation({ ...props }) {
  const [inputValue, setInputValue] = useState("");
  const [isShowLocation, setIsShowLocation] = useState(false);

  const locationInputHandler = (text) => {
    props.setLocation(text);
  };
  const debounceHandler = useCallback(
    debounce((text) => locationInputHandler(text), 500),
    []
  );
  useEffect(() => {
    debounceHandler(inputValue);
  }, [inputValue]);

  const enterKyeHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (props.postDetail.length !== 0) {
      if (props.postDetail.location) {
        setInputValue(props.postDetail.location);
        setIsShowLocation(true);
        props.setLocation(props.postDetail.location);
      }
    }
  }, [props.postDetail]);

  return (
    <>
      <LocationWrapper>
        <LocationContainer onClick={isShowLocation ? () => setIsShowLocation(false) : () => setIsShowLocation(true)}>
          <Location />
          <TextSpan>
            <span>장소</span>
          </TextSpan>
          <ToggleContainer>{isShowLocation ? <Up className="showToggle" /> : <Down className="showToggle" />}</ToggleContainer>
        </LocationContainer>
        <WriteLocationBox isShow={isShowLocation}>
          <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} maxLength={22} onKeyDown={enterKyeHandler} />
        </WriteLocationBox>
      </LocationWrapper>
    </>
  );
}

export const LocationWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  padding-bottom: 20px;
  border-bottom: 1px solid ${(props) => props.theme.Bg.color3};
`;
export const LocationContainer = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  cursor: pointer;
`;

export const ToggleContainer = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
`;
const WriteLocationBox = styled.div`
  display: ${(props) => (props.isShow ? "block" : "none")};
  width: 100%;
  margin-top: 10px;
  input {
    width: 100%;
    height: 40px;
    padding: 10px;
    font-size: 14px;
    border: 1px solid ${(props) => props.theme.Bg.color3};
    border-radius: 8px;
  }
`;
