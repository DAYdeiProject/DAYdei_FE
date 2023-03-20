import React, { useEffect } from "react";
import styled from "styled-components";
import ModalWrap from "../../../elements/ModalWrap";
import Modal from "../../../elements/Modal";
import { ModalContent } from "./CategoryModal";
import { useDispatch, useSelector } from "react-redux";
import { __getFamousList } from "../../../redux/modules/friendsSlice";

function FriendRecommendModal({ setShowFriendRecommendModal, setIsModalVisible }) {
  const FamousList = useSelector((state) => state.friends.FamousList);
  console.log(FamousList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getFamousList());
  });

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
