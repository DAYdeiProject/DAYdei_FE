import { css } from "styled-components";

const Bg = {
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
  mainColor7: "#E1E7ED;",

  calendar1: "#FFEBF5",
  calendar2: "#FDF2DE",
  calendar3: "#EEF9F7",
  calendar4: "#DFF3FE",
  calendar5: "#B8EEFF",
  calendar6: "#EFECFF",
  calendar7: "#F2F4F6",

  hoverColor: "#eef9f7",
  memoColor: "#f1fbfe",
  redColor: "#DF5445",
  greenColor: "#58c179",
};

const Fs = {
  sizeLogo: "1.875rem",
  size28: " 1.75rem",
  size24: "1.5rem",
  size20: "1.25rem",
  size18: "1.125rem",
  size16: "1rem",
  size14: "0.875rem",
  size12: "0.75rem",
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
