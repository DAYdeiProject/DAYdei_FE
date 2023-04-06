import { React, useState } from "react";
import styled from "styled-components";
import ModalWrap from "../../../elements/ModalWrap";
import Modal from "../../../elements/Modal";
import { useDispatch, useSelector } from "react-redux";
import { __addCategories } from "../../../redux/modules/usersSlice";
import FriendRecommendModal from "./FriendRecommendModal";

function CategoryModal({ setIsModalVisible, setIsButtonClicked }) {
  const [showFriendRecommendModal, setShowFriendRecommendModal] = useState(false);
  const Category = ["스포츠", "교육", "연예", "게임", "OTT", "경제"];

  const [selectedCategories, setSelectedCategories] = useState([]);
  const categoryMap = { 스포츠: "SPORTS", 교육: "EDUCATION", 연예: "ENTERTAINMENT", 게임: "GAME", OTT: "OTT", 경제: "ECONOMY" };
  const updatedCategories = selectedCategories.map((category) => categoryMap[category]);
  const Categories = { category: updatedCategories };

  const handleCategoryClick = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const dispatch = useDispatch();
  const onClickSubmitHandler = () => {
    if (updatedCategories.length === 0) {
      alert("카테고리를 1개 이상 선택해 주세요!");
    } else {
      dispatch(__addCategories(Categories));
      setShowFriendRecommendModal(true);
    }
  };

  return (
    <>
      {showFriendRecommendModal ? (
        <FriendRecommendModal
          showFriendRecommendModal={showFriendRecommendModal}
          setShowFriendRecommendModal={setShowFriendRecommendModal}
          setIsModalVisible={setIsModalVisible}
          setIsButtonClicked={setIsButtonClicked}
        />
      ) : (
        <ModalWrap>
          <Modal padding="48px 38px">
            <div>
              <ModalContent>
                <UpperWrapper>
                  <TextWrapper>
                    <TextUpper>
                      내 캘린더는 <BoldedText>어떤 일정</BoldedText>을 공유하나요?
                    </TextUpper>
                    <TextBottom>
                      <p>관심있는 카테고리를 설정하시면 </p>
                      <p>맞춤 설정에 활용되며, 내 프로필에도 표시됩니다.</p>
                    </TextBottom>
                  </TextWrapper>
                  <OptionsWrapper>
                    {Category.map((item) => (
                      <CategoryOption isSelected={selectedCategories.includes(item)} key={item} onClick={() => handleCategoryClick(item)}>
                        <CategoryText>{item}</CategoryText>
                      </CategoryOption>
                    ))}
                  </OptionsWrapper>
                </UpperWrapper>
                <ButtonArea>
                  <ButtonBottom onClick={onClickSubmitHandler}>다음</ButtonBottom>
                </ButtonArea>
              </ModalContent>
            </div>
          </Modal>
        </ModalWrap>
      )}
    </>
  );
}

export const ModalContent = styled.div`
  width: 320px;
  height: 318px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: pink; */
  gap: 44px;
`;

export const UpperWrapper = styled.div`
  width: 311px;
  height: 232px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 8px;

  width: 311px;
  height: 66px;
`;

const TextUpper = styled.div`
  display: flex;
  font-size: ${(props) => props.theme.Fs.size20};
  font-weight: 500;
  line-height: 24px;
`;

const BoldedText = styled(TextUpper)`
  font-weight: 700;
  margin-left: 5px;
`;

const TextBottom = styled.div`
  width: 250px;
  height: 34px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 500;
  font-size: ${(props) => props.theme.Fs.size12};
  line-height: 140%;
  color: #afb4bf;
`;

const OptionsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  gap: 16px;
  width: 180px;
  height: 134px;
  /* background-color: yellow; */
`;

const CategoryOption = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 86px;
  height: 34px;
  border: 1px solid black;
  border-radius: 99px;
  :hover {
    cursor: pointer;
  }
  background-color: ${(props) => (props.isSelected ? props.theme.Bg.mainColor2 : props.theme.Bg.color6)};
`;

const CategoryText = styled.div`
  font-size: ${(props) => props.theme.Fs.size14};
  font-weight: 600;
`;

export const ButtonArea = styled.div`
  width: 100%;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonBottom = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 170px;
  height: 42px;
  font-size: ${(props) => props.theme.Fs.tag};
  color: ${(props) => props.theme.Bg.lightColor};
  background: #494d55;

  border: 1.4px solid #121212;

  box-shadow: 2px 2px 0px #000000;
  border-radius: 4px;
  :hover {
    cursor: pointer;
  }
`;

export default CategoryModal;
