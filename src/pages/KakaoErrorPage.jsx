import Cookies from "js-cookie";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import flow1 from "../assets/kakaoError/flow1.png";
import flow2 from "../assets/kakaoError/flow2.png";
import flow3 from "../assets/kakaoError/flow3.png";
import flow4 from "../assets/kakaoError/flow4.png";
import flow5 from "../assets/kakaoError/flow5.png";
import flow6 from "../assets/kakaoError/flow6.png";
import flow7 from "../assets/kakaoError/flow7.png";
import flow8 from "../assets/kakaoError/flow8.png";
import flow9 from "../assets/kakaoError/flow9.png";
import { ReactComponent as LeftIcon } from "../assets/defaultIcons/left.svg";
import { ReactComponent as RightIcon } from "../assets/defaultIcons/right.svg";
import { ReactComponent as Main1 } from "../assets/main/main1.svg";
import { ReactComponent as Logo } from "../assets/main/logo.svg";

export default function KakaoErrorPage() {
  const navigate = useNavigate();
  const slideRef = useRef();
  const pointRef1 = useRef();
  const pointRef2 = useRef();
  const pointRef3 = useRef();
  const pointRef4 = useRef();
  const pointRef5 = useRef();
  const pointRef6 = useRef();
  const pointRef7 = useRef();
  const pointRef8 = useRef();
  const pointRef9 = useRef();
  const [imgIndex, setImgIndex] = useState(0);
  const [dotIndex, setDotIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);

  const IMG_WIDTH = 420;
  const slideRange = imgIndex * IMG_WIDTH;

  const indexList = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${slideRange}px)`;
  }, [imgIndex]);

  useEffect(() => {
    pointRef1.current.style.opacity = "0";
    pointRef2.current.style.opacity = "0";
    pointRef3.current.style.opacity = "0";
    pointRef4.current.style.opacity = "0";
    pointRef5.current.style.opacity = "0";
    pointRef6.current.style.opacity = "0";
    pointRef7.current.style.opacity = "0";
    pointRef8.current.style.opacity = "0";
    pointRef9.current.style.opacity = "0";

    setTimeout(() => {
      if (itemIndex === 0) {
        pointRef1.current.style.opacity = "1";
      } else if (itemIndex === 1) {
        pointRef2.current.style.opacity = "1";
      } else if (itemIndex === 2) {
        pointRef3.current.style.opacity = "1";
      } else if (itemIndex === 3) {
        pointRef4.current.style.opacity = "1";
      } else if (itemIndex === 4) {
        pointRef5.current.style.opacity = "1";
      } else if (itemIndex === 5) {
        pointRef6.current.style.opacity = "1";
      } else if (itemIndex === 6) {
        pointRef7.current.style.opacity = "1";
      } else if (itemIndex === 7) {
        pointRef8.current.style.opacity = "1";
      } else {
        pointRef9.current.style.opacity = "1";
      }
    }, 450);
  }, [itemIndex]);

  const prevClickHandler = () => {
    if (imgIndex === 0) return;
    setImgIndex(imgIndex - 1);
    setDotIndex(dotIndex - 1);
    setItemIndex(itemIndex - 1);
  };

  const nextClickHandler = () => {
    if (imgIndex === 8) return;
    setImgIndex(imgIndex + 1);
    setDotIndex(dotIndex + 1);
    setItemIndex(itemIndex + 1);
  };

  const dotClickHandler = (index) => {
    setImgIndex(index);
    setDotIndex(index);
    setItemIndex(index);
  };

  const moveHomePageHandler = () => {
    Cookies.remove("accessJWTToken");
    navigate("/");
  };

  return (
    <>
      <Wrapper>
        <MessageContainer>
          <MessageBox>
            <span>데이데이는</span>
            <span>이메일, 생일 필수 동의 해주셔야 이용 가능합니다.</span>
            <span>불편하시겠지만 안내에 따라 </span>
            <span>연결된 서비스 해제 후 다시 로그인해주세요.</span>
            <span>꼬옥...다시 이용해주세요..기다릴게요💓</span>
            <HomeBtn onClick={moveHomePageHandler}>홈으로 가기</HomeBtn>
          </MessageBox>
        </MessageContainer>
        <SliderWrapper>
          <MoveWrapper onClick={prevClickHandler}>
            <LeftIcon />
          </MoveWrapper>
          <ImgWrapper>
            <ImgBox ref={slideRef}>
              <img src={flow9} />
              <img src={flow1} />
              <img src={flow2} />
              <img src={flow3} />
              <img src={flow4} />
              <img src={flow5} />
              <img src={flow6} />
              <img src={flow7} />
              <img src={flow8} />
            </ImgBox>
          </ImgWrapper>
          <MoveWrapper onClick={nextClickHandler}>
            <RightIcon />
          </MoveWrapper>

          <Point1Box ref={pointRef1} isShow={itemIndex === 0}></Point1Box>
          <Point2Box ref={pointRef2} isShow={itemIndex === 1}></Point2Box>
          <Point3Box ref={pointRef3} isShow={itemIndex === 2}></Point3Box>
          <Point4Box ref={pointRef4} isShow={itemIndex === 3}></Point4Box>
          <Point5Box ref={pointRef5} isShow={itemIndex === 4}></Point5Box>
          <Point6Box ref={pointRef6} isShow={itemIndex === 5}></Point6Box>
          <Point7Box ref={pointRef7} isShow={itemIndex === 6}></Point7Box>
          <Point8Box ref={pointRef8} isShow={itemIndex === 7}></Point8Box>
          <Point9Box ref={pointRef9} isShow={itemIndex === 8}></Point9Box>
        </SliderWrapper>
        <DotWrapper>
          {indexList.map((_, i) => (
            <Dot key={i} isActive={dotIndex === i} onClick={() => dotClickHandler(i)} />
          ))}
        </DotWrapper>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  width: 100vw;
  height: 100vh;
  gap: 30px;
  margin-left: 300px;
`;

const SliderWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  gap : 15px;
  margin: 0 auto;
  position: relative;
  width: 700px;
`;

const ImgWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  width: 420px;
  height: 730px;
  overflow: hidden;
`;

const ImgBox = styled.div`
  display: flex;
  ${(props) => props.theme.FlexRow}
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  img {
    min-width: 380px;
    height: 700px;
    margin: 0 20px;
    border: 1px solid ${(props) => props.theme.Bg.color1};
    border-radius: 40px;
    box-shadow: 3px 3px 15px 0px rgba(0, 0, 0, 0.8);
  }
`;

const MoveWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.theme.Bg.mainColor2};
  background-color: #ffffff;
  cursor: pointer;
`;

const DotWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
`;

const Dot = styled.div`
  width: ${(props) => (props.isActive ? "20px" : "8px")};
  height: 8px;
  border-radius: ${(props) => (props.isActive ? "20px" : "50%")};
  background-color: ${(props) => (props.isActive ? props.theme.Bg.mainColor2 : props.theme.Bg.color3)};
  cursor: pointer;
  margin: 0 8px;
`;

const MessageContainer = styled.div`
  position: absolute;
  top: 10%;
  left: 20%;
  z-index: 500;
  gap: 20px;
  ${(props) => props.theme.FlexCol}
  width: 400px;
`;

const MessageBox = styled.div`
  ${(props) => props.theme.FlexCol}
  align-items: flex-start;
  gap: 10px;
  width: 420px;
  height: 300px;
  padding: 20px;
  font-size: 18px;
  ${(props) => props.theme.BoxCustom}
  background-color: #ffffff;
  border: 1px solid #121212;

  span:nth-child(1) {
    font-size: 24px;
    font-weight: 600;
  }
`;

const HomeBtn = styled.button`
  width: 100%;
  height: 50px;
  font-size: 16px;
  margin-top: 15px;
  ${(props) => props.theme.BoxCustom};
  background-color: ${(props) => props.theme.Bg.mainColor2};
`;

const Point1Box = styled.div`
  position: absolute;
  top: 360px;
  width: 320px;
  height: 180px;
  border: 6px solid red;
  display: ${(props) => (props.isShow ? "block" : "none")};
`;
const Point2Box = styled.div`
  position: absolute;
  top: 45px;
  right: 140px;
  width: 80px;
  height: 80px;
  border: 6px solid red;
  display: ${(props) => (props.isShow ? "block" : "none")};
`;
const Point3Box = styled.div`
  position: absolute;
  top: 190px;
  width: 380px;
  height: 50px;
  border: 6px solid red;
  display: ${(props) => (props.isShow ? "block" : "none")};
`;
const Point4Box = styled.div`
  position: absolute;
  top: 555px;
  width: 380px;
  height: 50px;
  border: 6px solid red;
  display: ${(props) => (props.isShow ? "block" : "none")};
`;
const Point5Box = styled.div`
  position: absolute;
  top: 360px;
  width: 380px;
  height: 110px;
  border: 6px solid red;
  display: ${(props) => (props.isShow ? "block" : "none")};
`;
const Point6Box = styled.div`
  position: absolute;
  top: 145px;
  width: 380px;
  height: 50px;
  border: 6px solid red;
  display: ${(props) => (props.isShow ? "block" : "none")};
`;

const Point7Box = styled.div`
  position: absolute;
  top: 440px;
  width: 380px;
  height: 70px;
  border: 6px solid red;
  display: ${(props) => (props.isShow ? "block" : "none")};
`;
const Point8Box = styled.div`
  position: absolute;
  top: 390px;
  width: 380px;
  height: 65px;
  border: 6px solid red;
  display: ${(props) => (props.isShow ? "block" : "none")};
`;
const Point9Box = styled.div`
  position: absolute;
  top: 275px;
  width: 380px;
  height: 65px;
  border: 6px solid red;
  display: ${(props) => (props.isShow ? "block" : "none")};
`;
