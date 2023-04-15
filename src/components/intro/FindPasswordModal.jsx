import { React, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { __requestNewPassword } from "../../redux/modules/usersSlice";

import Modal from "../../elements/Modal";
import ModalWrap from "../../elements/ModalWrap";
import useOutSideClick from "../../hooks/useOutsideClick";
import useLogin from "../../hooks/useLogin";

function FindPasswordModal({ setIsFindPasswordModalOpen }) {
  const handleFindPasswordModalClose = () => {
    setIsFindPasswordModalOpen(false);
  };

  const DropdownFindPasswordRef = useRef(null);
  useOutSideClick(DropdownFindPasswordRef, handleFindPasswordModalClose);

  const { email, handleEmailChange } = useLogin();

  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setBirthday(e.target.value + day);
  };

  const handleDayChange = (e) => {
    setDay(e.target.value);
    setBirthday(month + e.target.value);
  };

  const dispatch = useDispatch();
  const findPasswordHandler = () => {
    if (email === "" || birthday === "") {
      alert("회원정보를 모두 입력해 주세요!");
    }
    const userInfo = { email, birthday };
    dispatch(__requestNewPassword(userInfo)).then((data) => {
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
        <Modal width="420px" height="360px">
          <WholeAreaWrapper ref={DropdownFindPasswordRef}>
            <TopTextWrap>비밀번호 찾기</TopTextWrap>
            <InputWrapper>
              <EmailWrap>
                <TextWrapSmall>이메일 : </TextWrapSmall>
                <InputWrap>
                  <input type="text" value={email} onChange={handleEmailChange} autoFocus />
                </InputWrap>
              </EmailWrap>
              <BirthdayWrapCustom>
                <TextWrapSmall>생일 : </TextWrapSmall>
                <BirthdayInputCustom onChange={handleMonthChange}>
                  <option value="">월</option>
                  {Array.from({ length: 12 }, (_, index) => {
                    const monthValue = (index + 1).toString().padStart(2, "0");
                    return <option value={monthValue}>{monthValue}</option>;
                  })}
                </BirthdayInputCustom>
                <BirthdayInputCustom onChange={handleDayChange}>
                  <option value="">일</option>
                  {Array.from({ length: 31 }, (_, index) => {
                    const dayValue = (index + 1).toString().padStart(2, "0");
                    return <option value={dayValue}>{dayValue}</option>;
                  })}
                </BirthdayInputCustom>
              </BirthdayWrapCustom>
              {/* <InputWrap>
                <input type="text" placeholder="생일 (예시 : 0325)" value={birthday} onChange={handleBirthdayChange} />
              </InputWrap> */}
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
  gap: -10px;
  margin-top: 10px;
  /* background-color: pink; */
`;

const TopTextWrap = styled.div`
  margin-top: 2rem;
  font-size: ${(props) => props.theme.Fs.size24};
  margin-bottom: 3rem;
  font-weight: 800;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: pink; */
  gap: 1.5625rem;
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem 15rem 1rem 1.5rem;
  gap: 0.75rem;

  width: 18.2rem;
  height: 3rem;

  background: #ffffff;

  border: 0.0625rem solid ${(props) => props.theme.Bg.middleColor};
  border-radius: 0.25rem;
`;

const EmailWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BirthdayWrapCustom = styled.div`
  max-width: 23.125rem;
  height: 3.25rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const TextWrapSmall = styled.div`
  width: 4.6875rem;
  font-size: ${(props) => props.theme.Fs.size18};
  font-weight: 500;
`;

const BirthdayInputCustom = styled.select`
  width: 10rem;
  height: 2.875rem;
  border: 0.0625rem solid ${(props) => props.theme.Bg.color3};
  border-radius: 0.5rem;
  text-align: center;
  border: 1px solid black;
`;

const ButtonArea = styled.div`
  margin-top: 2rem;
  border-radius: 0.25rem;
  width: 11.5625rem;
  height: 3.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.Bg.mainColor5};
  color: ${(props) => props.theme.Bg.color6};
  font-weight: 600;
  :hover {
    cursor: pointer;
  }
`;
