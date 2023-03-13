import { css } from "styled-components";

const Bg = {
  mainColor: "#E7E7E7", // 헤더
  lightColor: "#F5F5F5", // sidebar
  borderColor: "#AFAFAF", // border
  middleColor: "#BABABA", // 버튼 연한색
  deepColor: "#626262", // 버튼 진한색
  errorColor: "#DF5445", // 에러
  successColor: "#4FB400", // success
};

const Fs = {
  xLargeText: "30px", // 회원가입, 로그인 text
  largeText: "28px", // logo , calendar 년월
  mediumText: "24px", // header nav , 친구추천 page
  title: "20px", // sidebar title
  tag: "18px", // 카테고리 tag
  day: "16px", // 달력 요일  , 버튼 text , 로그인 input text
  smallText: "14px", // 작은글씨
};

const FlexRow = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const FlexRowBetween = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const FlexCol = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const theme = {
  FlexRow,
  FlexRowBetween,
  FlexCol,
  Bg,
  Fs,
};

export default theme;
