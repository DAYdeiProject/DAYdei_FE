import { React } from "react";
import styled from "styled-components";
import ModalWrapper from "../../../elements/ModalWrapper";
import ModalBox from "../../../elements/ModalBox";

function CategoryModal({ CategoryModalRef }) {
  return (
    <ModalWrapper>
      <ModalBox>
        <div ref={CategoryModalRef}>
          <ModalContent>
            <TextWrapper>
              <TitleText>내 캘린더는 어떤 일정을 공유하나요?</TitleText>
              <SubText>관심사는 맞춤 설정에 활용됩니다.</SubText>
            </TextWrapper>
            <OptionsWrapper>
              <CategoryOption>
                <CategoryText>스포츠</CategoryText>
              </CategoryOption>
              <CategoryOption>
                <CategoryText>교육</CategoryText>
              </CategoryOption>
              <CategoryOption>
                <CategoryText>게임</CategoryText>
              </CategoryOption>
              <CategoryOption>
                <CategoryText>연예</CategoryText>
              </CategoryOption>
              <CategoryOption>
                <CategoryText>OTT</CategoryText>
              </CategoryOption>
              <CategoryOption>
                <CategoryText>경제</CategoryText>
              </CategoryOption>
            </OptionsWrapper>
            <ButtonArea>
              <Button>다음</Button>
            </ButtonArea>
          </ModalContent>
        </div>
      </ModalBox>
    </ModalWrapper>
  );
}

const ModalContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TextWrapper = styled.div`
  margin-bottom: 48px;
`;

const TitleText = styled.div`
  /* width: 405px; */
  height: 39px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: ${(props) => props.theme.Fs.mediumText};

  text-align: center;
  color: #121212;
`;

const SubText = styled.div`
  /* width: 267px; */
  height: 21px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  text-align: center;

  color: #bababa;
`;

const OptionsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-content: center;
  padding: 0px;
  width: 100%;
  height: 173px;
  /* background-color: pink; */
  margin-bottom: 64px;
`;

const CategoryOption = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  :hover {
    cursor: pointer;
  }
`;

const CategoryText = styled.div`
  border: 1px solid ${(props) => props.theme.Bg.deepColor};
  padding: 10px;
  width: 120px;
  border-radius: 20px;
  font-size: ${(props) => props.theme.Fs.tag};
  color: ${(props) => props.theme.Bg.deepColor};
`;

const ButtonArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.Bg.deepColor};
  width: 370px;
  height: 51px;
  align-items: center;
  text-align: center;
  font-size: ${(props) => props.theme.Fs.tag};
  color: ${(props) => props.theme.Bg.lightColor};
`;

export default CategoryModal;
