import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function CalendarPostModal({ children, ...props }) {
  const outside = useRef();

  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: "100%", transition: { duration: 0.2 } },
    exit: { opacity: 0, y: "100%", transition: { duration: 0.2 } }, // 모달 닫힐 때 애니메이션 추가
  };

  useEffect(() => {
    if (props.isAddPost === false) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [props.isAddPost]);

  // useEffect(() => {
  //   const outsideClick = (e) => {
  //     if (!outside.current || !outside.current.contains(e.target)) {
  //       props.setIsAddPost(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", outsideClick);

  //   return () => {
  //     document.removeEventListener("mousedown", outsideClick);
  //   };
  // }, [props.isAddPost]);

  return (
    <AnimatePresence>
      {props.isAddPost && (
        <CalendarPostModalWrapper variants={backdropVariants} initial="hidden" animate="visible" exit="hidden">
          <PostModalContainer ref={outside} variants={modalVariants} initial="hidden" animate={"visible"} exit={"exit"}>
            {children}
          </PostModalContainer>
        </CalendarPostModalWrapper>
      )}
    </AnimatePresence>
  );
}

export default CalendarPostModal;

const CalendarPostModalWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

const PostModalContainer = styled(motion.div)`
  z-index: 999;
  width: 500px;
  min-height: 670px;
  padding: 0px 30px;
  background-color: white;
  border-radius: 20px;
`;
