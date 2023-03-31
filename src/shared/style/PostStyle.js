import styled from "styled-components";
import DatePicker from "react-datepicker";

const AddPostWrapper = styled.form`
  padding: 0 30px;
  span {
    font-size: ${(props) => props.theme.Fs.size16};
    margin: 0 10px;
    text-align: center;
  }
`;

const HeaderWrapper = styled.section`
  ${(props) => props.theme.FlexRow}
  justify-content: right;
  margin-top: 25px;
  margin-bottom: 5px;
  .deleteIcon {
    margin-right: 10px;
    cursor: pointer;
  }
  .closeIcon {
    cursor: pointer;
  }
`;

const BodyWrapper = styled.section`
  // background-color: lavender;
  max-height: 420px;
  margin-top: 25px;
  padding: 0 10px;
  overflow-y: auto;
  ${(props) => props.theme.FlexCol}
  align-items: flex-start;
  justify-content: flex-start;
  gap: 25px;
`;

const BodyContainer = styled.div`
  /* ${(props) => props.theme.FlexCol}
  align-items: flex-start;
  gap: 25px; */
`;

// 타이틀 text
const TextSpan = styled.div`
  ${(props) => props.theme.FlexRow}
  width: 70px;
`;

// 제목쓰기 영역
const TitleWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  border-bottom: 1px solid ${(props) => props.theme.Bg.color3};
  input {
    width: 100%;
    height: 50px;
    font-size: ${(props) => props.theme.Fs.size24};
  }
`;
// 날짜 체크 영역
const DaysCheckWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  height: 50px;
`;
const DaysIconBox = styled.div`
  height: 100%;
  display: flex;
  padding-top: 2px;
`;
const DaysCheckContainer = styled.div`
  ${(props) => props.theme.FlexCol}
  width: 330px;
  margin-left: 8px;
`;
const DaysAllCheckContainer = styled(DaysIconBox)`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  width: 80px;
  align-items: flex-start;
  span {
    margin: 0;
    font-size: ${(props) => props.theme.Fs.size14};
  }
`;
const StartDateContainer = styled.div`
  ${(props) => props.theme.FlexRow}
  width: 100%;
  margin-bottom: 8px;
  span {
    min-width: 32px;
  }
  .react-datepicker-wrapper {
    width: 100px;
    margin-right: 10px;
  }
  select {
    margin-right: 115px;
    border: none;
    font-size: ${(props) => props.theme.Fs.size16};
  }
`;
const CustomDatePicker = styled(DatePicker)`
  width: 100px;
  font-size: ${(props) => props.theme.Fs.size16};
  cursor: pointer;
`;

// 색깔 선택 영역
const ColorBoxWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
`;
const ColorBoxContainer = styled(ColorBoxWrapper)`
  justify-content: left;
`;
const ColorBox = styled.div`
  width: ${(props) => (props.isClick ? "21px" : "18px")};
  height: ${(props) => (props.isClick ? "22px" : "18px")};
  background-color: ${(props) => props.value};
  border-radius: 50%;
  margin-right: 20px;
  border: ${(props) => (props.isClick ? "2.5px solid #121212" : "0.5px solid #121212")};
`;

// 초대하기 영역
const InviteWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
`;

const InviteSearchContainer = styled(InviteWrapper)`
  justify-content: left;
  position: relative;
`;

const InviteSearchBox = styled(InviteSearchContainer)`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  min-width: 330px;
  max-width: 330px;
  height: 40px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.Bg.color3};
  border-radius: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  &::-webkit-scrollbar {
    height: 5px;
  }
  .searchIcon {
    margin-right: 5px;
  }
`;

const InviteIconBox = styled.div`
  ${(props) => props.theme.FlexCol}
  width: 15px;
`;
const FriendPickBox = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  width: auto;
`;
// 타겟 클릭시 이름 리스트
const FriendBox = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: space-between;
  min-width: 80px;
  height: 25px;
  padding: 0 8px;
  margin: 0 5px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.Bg.mainColor4};
  span {
    margin: 0;
    margin-right: 5px;
    font-size: ${(props) => props.theme.Fs.size12};
  }
  .friendX {
    cursor: pointer;
  }
`;
const FriendBoxInput = styled.div`
  ${(props) => props.theme.FlexRow}
  width: 0;
  min-width: 200px;
  input {
    font-size: 12px;
    width: 100%;
  }
`;
const SerchModalContainer = styled.div`
  position: absolute;
  top: 45px;
  ${(props) => props.theme.FlexCol}
  justify-content: flex-start;
  gap: 10px;
  min-width: 330px;
  max-width: 330px;
  height: 200px;
  overflow-y: auto;
  padding: 10px 15px;
  border: 1px solid ${(props) => props.theme.Bg.color3};
  border-radius: 10px;
  background-color: white;
  display: ${(props) => (props.isShow ? "block" : "none")};
  z-index: 100;
`;

const TartgetBox = styled.div`
  ${(props) => props.theme.FlexRow}
  padding: 5px 10px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.Bg.calendar5};
  }
`;
const TargetBoxImg = styled.div`
  width: 50px;
  height: 45px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const TargetBoxText = styled.div`
  ${(props) => props.theme.FlexCol}
  align-items: flex-start;
  gap: 5px;
  span {
    font-size: ${(props) => props.theme.Fs.size14};
  }
`;

// 장소 영역
const LocationWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  padding-bottom: 20px;
  border-bottom: 1px solid ${(props) => props.theme.Bg.color3};
`;
const LocationContainer = styled(InviteWrapper)`
  justify-content: left;
`;

const ToggleContainer = styled.div`
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

// 메모 영역
const ContentWrapper = styled(LocationWrapper)``;
const ContentBoxContainer = styled(LocationContainer)``;
const WriteContentBox = styled(WriteLocationBox)`
  textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    border: 1px solid ${(props) => props.theme.Bg.color3};
    border-radius: 8px;
    font-size: ${(props) => props.theme.Fs.size14};
    resize: none;
  }
`;

// 이미지 업로드 영역
const ImgWrapper = styled(LocationWrapper)``;
const ImgContainer = styled(LocationContainer)``;
const ImgUploadBox = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  height: 30px;
`;
const ImgLabel = styled.label`
  input {
    display: none;
  }
`;
const ImgUploadButton = styled.div`
  ${(props) => props.theme.ButtonSmall};
  width: 70px;
  height: 30px;
  line-height: 30px;
  margin-left: 8px;
  text-align: center;
  color: #121212;
`;
const ImgUploadListBox = styled(InviteSearchBox)`
  width: 100%;
  border: none;
  padding: 0;
`;
const ImgBox = styled(FriendBox)`
  justify-content: space-between;
  width: 90px;
  height: 25px;
  padding: 0 8px;
  background-color: ${(props) => props.theme.Bg.color4};
  span {
    text-align: center;
    margin: 0;
  }
`;

const ModifyImgUploadBox = styled.div`
  display: ${(props) => (props.isShow ? "block" : "none")};
  width: 100%;
  margin-top: 20px;
`;

const PreviewContainer = styled.div`
  gap: 10px;
  margin-top: 20px;
`;

const PreviewBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 5px;
  img {
    width: 100%;
    height: 100%;
  }
`;

// 공개범위 영역
const ScopeWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
`;

const SelectContainer = styled(ScopeWrapper)`
  margin: 0;
  border: none;
  select {
    width: 150px;
    height: 21px;
    border: none;
    font-size: ${(props) => props.theme.Fs.size14};
  }
`;

const SubmitButtonWrapper = styled.div`
  padding: 0 5px;
  button {
    ${(props) => props.theme.ButtonLarge}
    background-color: ${(props) => (props.isEdit ? props.theme.Bg.mainColor2 : props.theme.Bg.mainColor5)};
    color: ${(props) => (props.isEdit ? props.theme.Bg.color1 : props.theme.Bg.color6)};
    font-size: ${(props) => props.theme.Fs.size14};
    font-weight: 500;
    margin-top: 30px;
  }
`;

const postStyle = {
  AddPostWrapper,
  HeaderWrapper,
  BodyWrapper,
  BodyContainer,
  TextSpan,
  TitleWrapper,
  DaysCheckWrapper,
  DaysIconBox,
  DaysCheckContainer,
  DaysAllCheckContainer,
  StartDateContainer,
  CustomDatePicker,
  ColorBoxWrapper,
  ColorBoxContainer,
  ColorBox,
  InviteWrapper,
  InviteSearchContainer,
  InviteSearchBox,
  InviteIconBox,
  FriendPickBox,
  FriendBox,
  FriendBoxInput,
  SerchModalContainer,
  TartgetBox,
  TargetBoxImg,
  TargetBoxText,
  LocationWrapper,
  LocationContainer,
  ToggleContainer,
  WriteLocationBox,
  ContentWrapper,
  ContentBoxContainer,
  WriteContentBox,
  ImgWrapper,
  ImgContainer,
  ImgUploadBox,
  ImgLabel,
  ImgUploadButton,
  ImgUploadListBox,
  ImgBox,
  ModifyImgUploadBox,
  PreviewContainer,
  PreviewBox,
  ScopeWrapper,
  SelectContainer,
  SubmitButtonWrapper,
};
export default postStyle;
