import { React, useRef } from "react";
import styled from "styled-components";
import ModalWrap from "../../elements/ModalWrap";
import Modal from "../../elements/Modal";
import useOutSideClick from "../../hooks/useOutsideClick";
import useLogin from "../../hooks/useLogin";
import { useDispatch, useSelector } from "react-redux";
import { __requestNewPassword } from "../../redux/modules/usersSlice";

function FindPasswordModal({ setIsFindPasswordModalOpen }) {
  const handleFindPasswordModalClose = () => {
    setIsFindPasswordModalOpen(false);
  };

  const DropdownFindPasswordRef = useRef(null);
  useOutSideClick(DropdownFindPasswordRef, handleFindPasswordModalClose);

  const { email, handleEmailChange, birthday, handleBirthdayChange } = useLogin();

  const dispatch = useDispatch();
  const findPasswordHandler = () => {
    if (email === "" || birthday === "") {
      alert("회원정보를 모두 입력해 주세요!");
    }
    const userInfo = { email, birthday };
    dispatch(__requestNewPassword(userInfo)).then((data) => {
      console.log(data);
      if (data.payload === 200) {
        alert("입력하신 이메일로 새 비밀번호를 발급해 드렸습니다.");
        setIsFindPasswordModalOpen(false);
      } else if (email !== "" && birthday !== "") {
        alert("입력하신 정보를 다시 확인해주세요.");
      }
    });
  };

  const { isLoading, statusCode } = useSelector((state) => state.users);

  return (
    <>
      <ModalWrap>
        <Modal height="450px">
          <WholeAreaWrapper ref={DropdownFindPasswordRef}>
            <TopTextWrap>비밀번호 찾기</TopTextWrap>
            <InputWrapper>
              <InputWrap>
                <input type="text" placeholder="이메일 주소" value={email} onChange={handleEmailChange} autoFocus />
              </InputWrap>
              <InputWrap>
                <input type="text" placeholder="생일 (예시 : 0325)" value={birthday} onChange={handleBirthdayChange} />
              </InputWrap>
            </InputWrapper>
            <ButtonArea onClick={findPasswordHandler}>{isLoading ? "로딩중.." : "임시 비밀번호 받기"}</ButtonArea>
          </WholeAreaWrapper>
        </Modal>
      </ModalWrap>
    </>
  );
}

export default FindPasswordModal;

const WholeAreaWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopTextWrap = styled.div`
  font-size: ${(props) => props.theme.Fs.xLargeText};
  margin-bottom: 50px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: pink; */
  gap: 25px;
  /* border: 1px solid black; */
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 240px 16px 24px;
  gap: 12px;

  width: 370px;
  height: 52px;

  background: #ffffff;

  border: 1px solid ${(props) => props.theme.Bg.middleColor};
  border-radius: 4px;

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const ButtonArea = styled.div`
  margin-top: 50px;
  border-radius: 4px;
  width: 185px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.Bg.deepColor};
  color: ${(props) => props.theme.Bg.lightColor};
  :hover {
    cursor: pointer;
  }
`;
