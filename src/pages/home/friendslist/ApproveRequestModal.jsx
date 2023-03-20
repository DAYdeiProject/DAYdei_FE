import React from "react";
import ModalWrap from "../../../elements/ModalWrap";
import Modal from "../../../elements/Modal";

function ApproveRequestModal({ ApproveRequestModalRef }) {
  return (
    <ModalWrap>
      <Modal>
        <div ref={ApproveRequestModalRef}>친구 신청 받아주세요!</div>
      </Modal>
    </ModalWrap>
  );
}

export default ApproveRequestModal;
