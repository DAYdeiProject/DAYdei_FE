import styled from "styled-components";
import DatePicker from "react-datepicker";

const AddPostWrapper = styled.form`
  span {
    font-size: ${(props) => props.theme.Fs.day};
    margin: 0 10px;
    text-align: center;
  }
`;

const HeaderWrapper = styled.section`
  ${(props) => props.theme.FlexRow}
  justify-content: right;
  margin-top: 20px;
  .trashIcon {
    display: ${(props) => (props.isDelete ? "block" : "none")};
    margin-right: 5px;
    font-size: 18px;
    color: ${(props) => props.theme.Bg.deepColor};
    cursor: pointer;
  }
  .closeIncon {
    font-size: 30px;
    color: ${(props) => props.theme.Bg.deepColor};
    cursor: pointer;
  }
`;

const BodyWrapper = styled.section`
  height: 530px;
  padding: 0 10px;
  overflow-y: auto;
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.Bg.borderColor};
  }
`;

const BodyContainer = styled.div`
  ${(props) => props.theme.FlexCol}
  align-items: flex-start;
  gap: 25px;
`;

// 타이틀 text
const TextSpan = styled.div`
  ${(props) => props.theme.FlexRow}
  width: 70px;
`;

// 제목쓰기 영역
const TitleWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  border-bottom: 1px solid ${(props) => props.theme.Bg.borderColor};
  input {
    width: 100%;
    height: 50px;
    font-size: ${(props) => props.theme.Fs.title};
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
  .daysIcon {
    font-size: 16px;
    color: ${(props) => props.theme.Bg.deepColor};
  }
`;
const DaysCheckContainer = styled.div`
  ${(props) => props.theme.FlexCol}
`;
const DaysAllCheckContainer = styled(DaysIconBox)`
  ${(props) => props.theme.FlexRow}
  width: 80px;
  align-items: flex-start;
  span {
    margin: 0;
    font-size: ${(props) => props.theme.Fs.smallText};
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
    font-size: ${(props) => props.theme.Fs.smallText};
  }
`;
const CustomDatePicker = styled(DatePicker)`
  width: 100px;
  font-size: ${(props) => props.theme.Fs.day};
  cursor: pointer;
`;

// 색깔 선택 영역
const ColorBoxWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  .colorIcon {
    font-size: 18px;
    color: ${(props) => props.theme.Bg.deepColor};
  }
`;
const ColorBoxContainer = styled(ColorBoxWrapper)`
  justify-content: left;
`;
const ColorBox = styled.div`
  width: ${(props) => (props.isClick ? "25px" : "20px")};
  height: ${(props) => (props.isClick ? "25px" : "20px")};
  background-color: ${(props) => props.value};
  border-radius: 50%;
  margin-right: 20px;
  border: ${(props) => props.isClick && "3px solid #686363"};
`;

// 초대하기 영역
const InviteWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  .inviteIcon {
    font-size: 18px;
    color: ${(props) => props.theme.Bg.deepColor};
  }
`;

const InviteSearchContainer = styled(InviteWrapper)`
  justify-content: left;
  position: relative;
`;

const InviteSearchBox = styled(InviteSearchContainer)`
  width: 340px;
  height: 40px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.Bg.borderColor};
  border-radius: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  &::-webkit-scrollbar {
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.Bg.borderColor}; /* 스크롤 바의 색상 */
  }
  .searchIcon {
    font-size: 14px;
    color: ${(props) => props.theme.Bg.deepColor};
    margin-right: 5px;
  }
`;
const FriendPickBox = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  width: auto;
`;
const FriendBox = styled.div`
  ${(props) => props.theme.FlexRow}
  min-width: 80px;
  height: 22px;
  padding: 0 5px;
  margin: 0 5px;
  border-radius: 5px;
  background-color: lightblue;
  span {
    margin: 0;
    margin-right: 5px;
    font-size: 11px;
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
  background-color: #ececec;
  width: 98%;
  height: 200px;
  padding: 10px 20px;
  border-radius: 10px;
  display: ${(props) => (props.isShow ? "block" : "none")};
  z-index: 100;
`;

const TartgetBox = styled.div`
  ${(props) => props.theme.FlexRow}
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: lightskyblue;
  }
`;
const TargetBoxImg = styled.div`
  width: 50px;
  height: 45px;
  img {
    background-color: lightcoral;
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
    font-size: ${(props) => props.theme.Fs.xsmallText};
  }
`;

// 장소 영역
const LocationWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  padding-bottom: 20px;
  border-bottom: 1px solid ${(props) => props.theme.Bg.borderColor};
`;
const LocationContainer = styled(InviteWrapper)`
  justify-content: left;
  .locationIcon {
    font-size: 18px;
    color: ${(props) => props.theme.Bg.deepColor};
  }
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
    font-size: 12px;
    border: 1px solid ${(props) => props.theme.Bg.borderColor};
    border-radius: 8px;
  }
`;

// 메모 영역
const ContentWrapper = styled(LocationWrapper)``;
const ContentBoxContainer = styled(LocationContainer)`
  .contentIcon {
    font-size: 16px;
    color: ${(props) => props.theme.Bg.deepColor};
  }
`;
const WriteContentBox = styled(WriteLocationBox)`
  textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    border: 1px solid ${(props) => props.theme.Bg.borderColor};
    border-radius: 8px;
    font-size: ${(props) => props.theme.Fs.xsmallText};
    resize: none;
  }
`;

// 이미지 업로드 영역
const ImgWrapper = styled(LocationWrapper)``;
const ImgContainer = styled(LocationContainer)`
  .imgIcon {
    font-size: 14px;
    color: ${(props) => props.theme.Bg.deepColor};
  }
`;
const ImgUploadBox = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  //width: ${(props) => (props.isShowImg ? "400px" : "340px")};
  height: 30px;
`;

const ImgLabel = styled.label`
  input {
    display: none;
  }
`;
const ImgUploadButton = styled.div`
  width: 70px;
  line-height: 30px;
  margin-left: 8px;
  border-radius: 5px;
  text-align: center;
  background-color: ${(props) => props.theme.Bg.middleColor};
  font-size: ${(props) => props.theme.Fs.xsmallText};
  cursor: pointer;
`;

const ImgUploadListBox = styled(InviteSearchBox)`
  width: 100%;
  border: none;
  padding: 0;
`;
const ImgBox = styled(FriendBox)`
  width: 0;
  height: 25px;
`;

const ModifyImgUploadBox = styled.div`
  display: ${(props) => (props.isShow ? "block" : "none")};
  width: 100%;
  margin-top: 20px;
`;

const PreviewContainer = styled.div`
  ${(props) => props.theme.FlexCol}
  gap: 10px;
  margin-top: 20px;
  img {
    width: 330px;
    height: 330px;
  }
`;

// 공개범위 영역
const ScopeWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  margin-bottom: 20px;
  .scopeIcon {
    font-size: 16px;
    color: ${(props) => props.theme.Bg.deepColor};
  }
`;
const SelectContainer = styled(ScopeWrapper)`
  margin: 0;
  select {
    width: 90px;
    height: 21px;
    border: none;
    font-size: ${(props) => props.theme.Fs.smallText};
  }
`;

const SubmitButtonWrapper = styled.div`
  padding: 0 5px;
  button {
    width: 100%;
    height: 50px;
    border: none;
    border-radius: 5px;
    color: white;
    background-color: ${(props) => props.theme.Bg.deepColor};
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
  ScopeWrapper,
  SelectContainer,
  SubmitButtonWrapper,
};
export default postStyle;
