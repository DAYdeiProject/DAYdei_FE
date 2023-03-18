import React from "react";
import styled from "styled-components";
import ModalWrap from "../../../elements/ModalWrap";
import Modal from "../../../elements/Modal";
import { ModalContent } from "./CategoryModal";

function FriendRecommendModal({ setShowFriendRecommendModal, setIsModalVisible }) {
  return (
    <>
      <ModalWrap>
        <Modal>
          <ModalContent>랜덤친구추천!</ModalContent>
          <div>
            <button
              onClick={() => {
                setShowFriendRecommendModal(false);
                setIsModalVisible(false);
              }}>
              닫기
            </button>
          </div>
        </Modal>
      </ModalWrap>
    </>
  );
}

export default FriendRecommendModal;
