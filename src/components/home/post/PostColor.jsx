import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { ColorDeepFromDB } from "../../../utils/calendar/CalendarBasic";
import { ColorList, ColorToDB } from "../../../utils/calendar/CalendarBasic";
import { ReactComponent as Calendar } from "../../../assets/calendarIcon/calendar.svg";

export default function PostColor({ ...props }) {
  const [isColor, setIsColor] = useState("#F6A89E");
  const colorList = ColorList();

  const colorClick = (data) => {
    const color = ColorToDB(data);
    props.setColor(color);
    setIsColor(data);
  };

  useEffect(() => {
    if (props.postDetail.length !== 0) {
      const color = ColorDeepFromDB(props.postDetail.color);
      setIsColor(color);
      props.setColor(props.postDetail.color);
    }
  }, [props.postDetail]);

  return (
    <>
      <ColorBoxWrapper>
        <Calendar />
        <TextSpan>
          <span>달력</span>
        </TextSpan>
        <ColorBoxContainer>
          <div>
            {colorList.map((item, i) => (
              <ColorBox key={i} value={item} isClick={item === isColor} onClick={() => colorClick(item)} />
            ))}
          </div>
        </ColorBoxContainer>
      </ColorBoxWrapper>
    </>
  );
}

export const TextSpan = styled.div`
  ${(props) => props.theme.FlexRow}
  width: 70px;
`;

const ColorBoxWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  width: 340px;
`;
const ColorBoxContainer = styled(ColorBoxWrapper)`
  justify-content: left;
  div {
    display: flex;
    justify-content: left;
    align-items: center;
  }
`;
const ColorBox = styled.div`
  width: ${(props) => (props.isClick ? "21px" : "18px")};
  height: ${(props) => (props.isClick ? "22px" : "18px")};
  background-color: ${(props) => props.value};
  border-radius: 50%;
  margin-right: 20px;
  border: ${(props) => (props.isClick ? "3px solid #353535" : "0.5px solid #353535")};
  cursor: pointer;
`;
