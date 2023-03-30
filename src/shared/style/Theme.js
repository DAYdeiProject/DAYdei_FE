import { css } from "styled-components";

const Bg = {
  mainColor: "#E7E7E7", // 헤더
  lightColor: "#F5F5F5", // sidebar
  middleColor: "#BABABA", // 버튼 연한색
  deepColor: "#626262", // 버튼 진한색
  errorColor: "#DF5445", // 에러
  successColor: "#4FB400", // success
  border1: "#afb4bf", // main border
  border2: "#ebebeb", // 정보 없을때 나오는 div border
  button1: "#f2f4f6", // 버튼
  fontBlack: "#121212", // title
  color1: "#494d55", // header nav font + desc
  fontColor2: "#626262", // 친구/구독 리스트 한줄 소개
  fontColor3: "#afb4bf", // 날짜 + email(리스트 중 닉네임 밑에)

  //---------------------------------------------------
  color1: "#121212",
  color2: "#494D55",
  color3: "#AFB4BF",
  color4: "#F2F4F6",
  color5: "#FBFEFF",
  color6: "#FFFFFF",

  mainColor1: "#F6A89E;",
  mainColor2: "#FBDF96;",
  mainColor3: "#CFF4F1;",
  mainColor4: "#A7EAFF;",
  mainColor5: "#0EAFE1;",
  mainColor6: "#E2CCFB;",

  calendar1: "#FFEBF5",
  calendar2: "#FDF2DE",
  calendar3: "#EEF9F7",
  calendar4: "#DFF3FE",
  calendar5: "#B8EEFF",
  calendar6: "#EFECFF",
  calendar7: "#F2F4F6",

  hoverColor: "#eef9f7",
};

const Fs = {
  xLargeText: "30px", // 회원가입, 로그인 text
  largeText: "28px", // logo , calendar 년월
  mediumText: "24px", // header nav , 친구추천 page
  title: "20px", // sidebar title
  tag: "18px", // 카테고리 tag
  day: "16px", // 달력 요일  , 버튼 text , 로그인 input text
  smallText: "14px", // 작은글씨
  xsmallText: "12px", // 더 작은글씨

  // --------------------------------------------------
  sizeLogo: "30px",
  size28: "28px",
  size24: "24px",
  size20: "20px",
  size18: "18px",
  size16: "16px",
  size14: "14px",
  size12: "12px",
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

const HeaderText = css`
  font-size: 20px;
  font-weight: 600;
  color: #494d55;
`;

// sidebar title
const SidebarTitleText = css`
  font-size: 16px;
  font-weight: 600;
  color: #121212;
`;

// content 중 제목 / 닉네임
const ContentTitleText = css`
  font-size: 14px;
  font-weight: 600;
  color: #121212;
`;
// 설명 text
const DescriptionText = css`
  font-size: 12px;
  font-weight: normal;
  color: #626262;
`;

// 버튼 large
const ButtonLarge = css`
  background-color: #ffffff;
  width: 100%;
  height: 48px;
  color: #ffffff;
  border: solid 1.4px #121212;
  box-shadow: 1px 1px 0 0 #000;
  border-radius: 4px;
  cursor: pointer;
`;

// 버튼 middle
const ButtonMedium = css`
  background-color: #ffffff;
  width: 144px;
  height: 40px;
  color: #ffffff;
  border: solid 1.4px #121212;
  box-shadow: 1px 1px 0 0 #000;
  border-radius: 4px;
  cursor: pointer;
`;

// 버튼 small
const ButtonSmall = css`
  background-color: #ffffff;
  width: 78px;
  height: 40px;
  color: #ffffff;
  border: solid 1.4px #121212;
  box-shadow: 1px 1px 0 0 #000;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
`;

// box border + shadow
const BoxCustom = css`
  border: solid 1.4px #121212;
  box-shadow: 2px 2px 0 0 #000;
  border-radius: 8px;
  cursor: pointer;
`;

const BtnClickYellow = css`
  &:active {
    background-color: #fbdf96;
  }
`;

const BtnHoverYellow = css`
  &:hover {
    background-color: #fbdf96;
  }
`;

const theme = {
  FlexRow,
  FlexRowBetween,
  FlexCol,
  HeaderText,
  SidebarTitleText,
  ContentTitleText,
  DescriptionText,
  ButtonLarge,
  ButtonMedium,
  ButtonSmall,
  BoxCustom,
  BtnClickYellow,
  BtnHoverYellow,
  Bg,
  Fs,
};

export default theme;
