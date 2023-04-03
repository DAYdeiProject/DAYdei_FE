import React from "react";
import styled from "styled-components";
import { ReactComponent as Main1 } from "../../assets/main/main1.svg";
import { ReactComponent as Main2 } from "../../assets/main/main2.svg";
import { ReactComponent as Main3 } from "../../assets/main/main3.svg";
import { ReactComponent as Main4 } from "../../assets/main/main4.svg";
import { ReactComponent as Main5 } from "../../assets/main/main5.svg";
import { ReactComponent as Main6 } from "../../assets/main/main6.svg";
import { ReactComponent as Main7 } from "../../assets/main/main7.svg";
import { ReactComponent as Union1 } from "../../assets/main/union1.svg";
import { ReactComponent as Union2 } from "../../assets/main/union2.svg";
import { ReactComponent as Union3 } from "../../assets/main/union3.svg";
import { ReactComponent as Union4 } from "../../assets/main/union4.svg";
import { ReactComponent as Union5 } from "../../assets/main/union5.svg";
import { ReactComponent as Union6 } from "../../assets/main/union6.svg";
import { ReactComponent as Union7 } from "../../assets/main/union7.svg";

export default function PreviewArea() {
  return (
    <>
      <PreviewWrapper>
        <TextContainer>
          <span>
            <TextBold>일상을 계획</TextBold>하는 즐거움으로
          </span>
          <span>
            하루를 더 <TextBold>효율적으로</TextBold>관리해보세요!
          </span>
        </TextContainer>
        <Main1 className="main1" />
        <Main2 className="main2" />
        <Main3 className="main3" />
        <Main4 className="main4" />
        <Main5 className="main5" />
        <Main6 className="main6" />
        <Main7 className="main7" />
        <Union1 className="union1" />
        <Union2 className="union2" />
        <Union3 className="union3" />
        <Union4 className="union4" />
        <Union5 className="union5" />
        <Union6 className="union6" />
        <Union7 className="union7" />
        <Union2 className="union8" />
      </PreviewWrapper>
    </>
  );
}

const PreviewWrapper = styled.div`
  background: ${(props) => props.theme.Bg.calendar2};
  width: 100%;
  height: 100%;
  position: relative;
  .main1,
  .main2,
  .main3,
  .main4,
  .main5,
  .main6,
  .main7,
  .union1,
  .union2,
  .union3,
  .union4,
  .union5,
  .union6,
  .union7,
  .union8 {
    position: absolute;
    top: 0;
  }
  // 31
  .main1 {
    top: 88px;
    left: 174px;
  }
  // 왼쪽 text
  .main2 {
    top: 275px;
    left: 143px;
  }
  // 오른쪽 text
  .main3 {
    top: 194.13px;
    left: 672.28px;
  }
  // 포스트잇
  .main4 {
    top: 428px;
    left: 919px;
  }
  // 그래프
  .main5 {
    top: 825px;
    left: 247px;
  }
  // 손가락
  .main6 {
    top: 291px;
    left: 351px;
  }
  // 눈알
  .main7 {
    top: 181px;
    left: 676px;
  }
  // 포스트잇 밑 돼지꼬리
  .union1 {
    top: 615px;
    left: 910px;
  }
  // 포스트잇 밑 별
  .union2 {
    top: 593px;
    left: 866px;
  }
  // 포스트잇 밑 하트
  .union3 {
    top: 712px;
    left: 1015px;
  }
  // 포스트잇 밑 큰 별
  .union4 {
    top: 836px;
    left: 928px;
  }
  // 왼쪽 별 두개
  .union5 {
    top: 732px;
    left: 163px;
  }
  // 왼쪽 돼지꼬리
  .union6 {
    top: 562px;
    left: 174px;
  }
  // 왼쪽 하트
  .union7 {
    top: 512px;
    left: 255px;
  }
  // 왼쪽 작은 별
  .union8 {
    top: 303px;
    left: 418px;
  }
`;

// 메인 텍스트
const TextContainer = styled.div`
  position: absolute;
  top: 93px;
  left: 290px;
  ${(props) => props.theme.FlexCol};
  align-items: flex-start;
  gap: 15px;
  span {
    font-size: 24px;
  }
`;
const TextBold = styled.span`
  font-weight: 600;
`;
