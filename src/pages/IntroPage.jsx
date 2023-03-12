import { React, useState, useRef } from "react";
import styled from "styled-components";
import { FlexRow } from "../shared/style/Theme";
import { Link } from "react-router-dom";
import { LoginWrapper } from "./JoinPage";

import ModalWrapper from "../elements/Modalwrapper";
import ModalBox from "../elements/Modalbox";
import useOutSideClick from "../hooks/useOutsideClick";

function IntroPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const ModalBoxRef = useRef(null);
  useOutSideClick(ModalBoxRef, handleModalClose);

  return (
    <>
      <LoginWrapper>
        <IntroWrapper>
          <button>
            <Link to="/login">로그인으로 이동</Link>
          </button>
          <button onClick={() => setIsModalOpen(true)}>모달 테스트</button>
        </IntroWrapper>
      </LoginWrapper>

      {isModalOpen && (
        <ModalWrapper>
          <ModalBox>
            <div ref={ModalBoxRef}>
              <div>모달입니다!</div>
            </div>
          </ModalBox>
        </ModalWrapper>
      )}
    </>
  );
}

const IntroWrapper = styled.div`
  ${FlexRow}
`;

export default IntroPage;
