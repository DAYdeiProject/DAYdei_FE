import { React, useState } from "react";
import styled from "styled-components";
import ModalBox from "../../../elements/ModalBox";
import { useDispatch } from "react-redux";
import { __memberOut } from "../../../redux/modules/usersSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { textState } from "../../../redux/modules/headerReducer";
import { otherIdState } from "../../../redux/modules/headerReducer";

function MemberOutModal({ ...props }) {
  const [userKey, setUserKey] = useState("");

  const onChangeUserKeyHandler = (e) => {
    setUserKey(e.target.value);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const memberOutHandler = () => {
    const user = { userKey };

    dispatch(__memberOut(user)).then((data) => {
      if (data.payload === "탈퇴가 완료되었습니다.") {
        alert("탈퇴 완료");
        props.setIsProfileSettingModalOpen(false);
        props.setIsMemberOutModalOpen(false);
        Cookies.remove("accessJWTToken");
        if (!Cookies.get("accessJWTToken")) {
          navigate("/");
          dispatch(textState("home"));
          dispatch(otherIdState(""));
        }
      }
    });
  };

  return (
    <>
      <ModalBox isOpen={props.isMemberOutModalOpen} width="300px" height="150px">
        <ModalInnerWrap>
          DAYDEI를 탈퇴하시겠습니까?
          <InputWrap>
            <input type="text" placeholder="이메일의 @앞부분까지 작성" value={userKey} onChange={onChangeUserKeyHandler} />
          </InputWrap>
          <ButtonsWrap>
            <div onClick={memberOutHandler}>탈퇴하기</div>
            <div onClick={() => props.setIsMemberOutModalOpen(false)}>돌아가기</div>
          </ButtonsWrap>
        </ModalInnerWrap>
      </ModalBox>
    </>
  );
}

export default MemberOutModal;

const ModalInnerWrap = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  /* background-color: skyblue; */
`;

const InputWrap = styled.div`
  border: 1px solid ${(props) => props.theme.Bg.color3};
  padding: 4px 10px;
  border-radius: 0.5rem;
`;

const ButtonsWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
