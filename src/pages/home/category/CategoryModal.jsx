import { React } from "react";
import styled from "styled-components";
import ModalWrapper from "../../../elements/Modalwrapper";
import ModalBox from "../../../elements/Modalbox";

function CategoryModal({ CategoryModalRef }) {
  return (
    <ModalWrapper>
      <ModalBox>
        <div ref={CategoryModalRef}>
          <ModalContent>모달입니다</ModalContent>
        </div>
      </ModalBox>
    </ModalWrapper>
  );
}

const ModalContent = styled.div`
  width: 500px;
`;

export default CategoryModal;
