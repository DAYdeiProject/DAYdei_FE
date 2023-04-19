import { debounce } from "lodash";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import React, { useState, useCallback, useEffect } from "react";
import { alertState } from "../../../redux/modules/alertReducer";
import { TextSpan } from "./PostColor";
import { LocationWrapper } from "./PostLocation";
import { MaxSizeFile } from "../../../utils/calendar/CalendarBasic";
import { BiX } from "react-icons/bi";
import { ReactComponent as Up } from "../../../assets/defaultIcons/up.svg";
import { ReactComponent as Down } from "../../../assets/defaultIcons/down.svg";
import { ReactComponent as ImageIcon } from "../../../assets/calendarIcon/image.svg";

export default function PostImage({ ...props }) {
  const [fileList, setFileList] = useState([]);
  const [fileName, setFileName] = useState([]);
  const [fileImg, setFileImg] = useState([]);
  const [saveView, setSaveView] = useState([]);
  const [isShowImg, setIsShowImg] = useState(false);

  const dispatch = useDispatch();

  const imgUploadHandler = (e) => {
    const img = Array.from(e.target.files);

    // size 확인
    const imgResult = MaxSizeFile(img);
    if (!imgResult) {
      return dispatch(alertState({ state: true, comment: "1장당 10MB, 총 크기는 20MB만 가능합니다. 다시 선택해주세요.", max: true }));
    }

    // 3장 제한
    if (img.length + fileList.length + saveView.length > 3) {
      return dispatch(alertState({ state: true, comment: "사진첨부는 최대 3장만 가능합니다." }));
    }

    setFileList((pre) => [...pre, ...img]);

    // 파일 이름 뿌려주기 위해서
    img.forEach((list) => {
      let newName = list.name.split(".")[0];

      if (newName.length > 3) {
        let sliceName = "..." + newName.substr(-3);
        setFileName((state) => [...state, sliceName]);
      } else {
        setFileName((state) => [...state, newName]);
      }
    });

    // 프리뷰
    let fileUrl = [];
    for (let i = 0; i < img.length; i++) {
      let file = img[i];
      let fileReader = new FileReader();
      fileReader.onload = () => {
        fileUrl[i] = fileReader.result;
        setFileImg([...fileImg, ...fileUrl]);
      };
      fileReader.readAsDataURL(file);
    }
  };

  // 클릭한 이미지 파일 삭제
  const deleteImgFile = (index, save) => {
    if (save) {
      const newSaveView = saveView.filter((_, i) => i !== index);
      setSaveView([...newSaveView]);
    } else {
      // fileName ,fileList, fileImg 값 삭제
      const newName = fileName.filter((_, i) => i !== index);
      const newList = fileList.filter((_, i) => i !== index);
      const newView = fileImg.filter((_, i) => i !== index);
      setFileName([...newName]);
      setFileList([...newList]);
      setFileImg([...newView]);
    }
  };

  // 수정하기
  useEffect(() => {
    if (props.postDetail.length !== 0) {
      if (props.postDetail.image.length !== 0) {
        setSaveView(props.postDetail.image);
        setIsShowImg(true);
      }
    }
  }, [props.postDetail]);

  useEffect(() => {
    props.setFileList(fileList);
    props.setSaveView(saveView);
  }, [fileList, saveView]);

  return (
    <>
      <LocationWrapper>
        <ImgContainer onClick={isShowImg ? () => setIsShowImg(false) : () => setIsShowImg(true)}>
          <ImageIcon className="imgIcon" />
          <TextSpan>
            <span>사진</span>
          </TextSpan>
          <ImgComment>
            <span>❗사진첨부는 최대 3장만 가능합니다.❗</span>
          </ImgComment>
          <ToggleImgContainer>{isShowImg ? <Up className="showToggle" /> : <Down className="showToggle" />}</ToggleImgContainer>
        </ImgContainer>
        <ModifyImgUploadBox isShow={isShowImg}>
          <ImgUploadBox>
            <ImgUploadListBox>
              {saveView &&
                saveView?.map((list, i) => {
                  const save = "save";
                  let sliceName = "..." + list.substr(-7, 3);
                  return (
                    <ImgBox key={i}>
                      <ImgBoxText>{sliceName}.jpg</ImgBoxText>
                      <BiX className="friendX" onClick={() => deleteImgFile(i, save)} />
                    </ImgBox>
                  );
                })}

              {fileName?.map((list, i) => {
                return (
                  <ImgBox key={i}>
                    <ImgBoxText>{list}.jpg</ImgBoxText>
                    <BiX className="friendX" onClick={() => deleteImgFile(i)} />
                  </ImgBox>
                );
              })}
            </ImgUploadListBox>
            <ImgLabel htmlFor="inputImg">
              <ImgUploadButton>파일추가</ImgUploadButton>
              <input id="inputImg" type="file" accept="image/*" multiple onChange={imgUploadHandler} key={new Date()} />
            </ImgLabel>
          </ImgUploadBox>
          <PreviewContainer>
            <PreviewBox>
              {saveView.map((url, i) => {
                return <img key={i} src={url} alt="imgUpload" />;
              })}

              {fileImg.map((url, i) => {
                return <img key={i} src={url} alt="imgUpload" />;
              })}
            </PreviewBox>
          </PreviewContainer>
        </ModifyImgUploadBox>
      </LocationWrapper>
    </>
  );
}

const ImgContainer = styled.div`
  ${(props) => props.theme.FlexRowBetween}
  justify-content: space-around;
  cursor: pointer;
  .imgIcon {
    margin-right: 5px;
  }
`;

const ToggleImgContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 10%;
`;
const ImgUploadBox = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  height: 30px;
`;
const ImgLabel = styled.label`
  cursor: pointer;
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
  ${(props) => props.theme.BtnHoverYellow};
`;
const ImgUploadListBox = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  height: 40px;
  gap: 10px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;

  &::-webkit-scrollbar {
    height: 5px;
  }
`;
const ImgBox = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: space-between;
  width: 90px;
  height: 25px;
  padding: 0 8px;
  background-color: ${(props) => props.theme.Bg.color4};
  border-radius: 4px;

  .friendX {
    cursor: pointer;
    min-width: 15px;
  }
`;

const ImgBoxText = styled.span`
  font-size: 12px !important;
  text-align: center;
  margin: 0 !important;
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

const ImgComment = styled.div`
  ${(props) => props.theme.FlexCol};
  align-items: flex-start;
  span {
    font-size: 12px;
  }
`;
